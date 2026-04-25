// src/modules/estimator/EstimatorService.ts

import { db } from '@/lib/db/client';
import { redis } from '@/lib/redis/client';
import { ValidationError } from '@/lib/utils/errors';

export type TempleType = 'wall_mounted' | 'floor_standing' | 'pooja_room_complete';
export type MaterialGrade = 'premium_makrana' | 'standard_vietnam' | 'italian_carrara';
export type CarvingComplexity = 'minimal' | 'moderate' | 'intricate_heritage';

export interface EstimatorInputs {
  templeType: TempleType;
  widthFt: number;
  heightFt: number;
  material: MaterialGrade;
  complexity: CarvingComplexity;
  backlit: boolean;
  internationalShipping: boolean;
}

export interface EstimatorRules {
  baseRatePerSqft: number;
  materialMultipliers: Record<MaterialGrade, number>;
  complexityMultipliers: Record<CarvingComplexity, number>;
  templeTypeMultipliers: Record<TempleType, number>;
  surchargeBacklit: number;
  surchargeIntlShipping: number;
  quoteBandPercent: number;
}

export class EstimatorService {
  private static CACHE_KEY = 'estimator:config';
  private static CACHE_TTL = 300; // 5 minutes

  /**
   * Loads pricing coefficients from DB with Redis caching
   */
  async loadConfig(): Promise<EstimatorRules> {
    try {
      // 1. Try Cache
      const cached = await redis.get(EstimatorService.CACHE_KEY);
      if (cached) {
        return (typeof cached === 'string' ? JSON.parse(cached) : cached) as EstimatorRules;
      }

      // 2. Fetch from DB
      const { data: rows, error } = await db
        .from('estimator_config')
        .select('config_key, config_value');

      if (error || !rows) {
        console.error('Database error fetching estimator config:', error);
        throw new Error('Failed to load pricing configuration');
      }

      // 3. Transform rows to Rules object
      const rules: Partial<EstimatorRules> = {};
      
      rows.forEach((row) => {
        const value = row.config_value;
        switch (row.config_key) {
          case 'base_rate_per_sqft':
            rules.baseRatePerSqft = (value as any).value;
            break;
          case 'material_multipliers':
            rules.materialMultipliers = value as any;
            break;
          case 'complexity_multipliers':
            rules.complexityMultipliers = value as any;
            break;
          case 'temple_type_multipliers':
            rules.templeTypeMultipliers = value as any;
            break;
          case 'surcharge_backlit':
            rules.surchargeBacklit = (value as any).value;
            break;
          case 'surcharge_intl_shipping':
            rules.surchargeIntlShipping = (value as any).value;
            break;
          case 'quote_band_percent':
            rules.quoteBandPercent = Number(value);
            break;
        }
      });

      const finalRules = rules as EstimatorRules;

      // 4. Update Cache
      await redis.set(EstimatorService.CACHE_KEY, JSON.stringify(finalRules), {
        ex: EstimatorService.CACHE_TTL,
      });

      return finalRules;
    } catch (err) {
      console.error('Estimator Configuration Load Failed:', err);
      // Fallback or rethrow? For production, we want to know if it fails.
      throw err;
    }
  }

  /**
   * Main calculation engine
   */
  async calculate(inputs: EstimatorInputs) {
    const rules = await this.loadConfig();

    // 1. Validate inputs
    if (inputs.widthFt <= 0 || inputs.heightFt <= 0) {
      throw new ValidationError('Dimensions must be greater than zero');
    }

    const sqft = inputs.widthFt * inputs.heightFt;
    
    // 2. Base calculation
    const base = sqft * rules.baseRatePerSqft;
    const withType = base * (rules.templeTypeMultipliers[inputs.templeType] || 1.0);
    const withMaterial = withType * (rules.materialMultipliers[inputs.material] || 1.0);
    const withComplexity = withMaterial * (rules.complexityMultipliers[inputs.complexity] || 1.0);

    let finalPrice = withComplexity;

    // 3. Surcharges
    if (inputs.backlit) finalPrice += rules.surchargeBacklit;
    if (inputs.internationalShipping) finalPrice += rules.surchargeIntlShipping;

    // 4. Applying the indicative range (e.g. +/- 10%)
    const band = rules.quoteBandPercent / 100;

    return {
      priceMin: Math.floor(finalPrice * (1 - band)),
      priceMax: Math.floor(finalPrice * (1 + band)),
      currency: 'INR',
      breakdown: {
        sqft,
        basePrice: Math.floor(base),
        afterType: Math.floor(withType),
        afterMaterial: Math.floor(withMaterial),
        afterComplexity: Math.floor(withComplexity),
        surcharges: Math.floor(finalPrice - withComplexity),
      },
      configSnapshot: rules, // Stored with the estimate in DB later
    };
  }
}
