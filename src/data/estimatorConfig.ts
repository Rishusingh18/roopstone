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

export const EST_BASE_RATE_PER_SQFT = 5000; // INR

export const MAT_MULTIPLIERS: Record<MaterialGrade, number> = {
  standard_vietnam: 1.0,
  premium_makrana: 1.8,
  italian_carrara: 2.2
};

export const COMPLEXITY_MULTIPLIERS: Record<CarvingComplexity, number> = {
  minimal: 1.0,
  moderate: 1.5,
  intricate_heritage: 2.5
};

export const SURCHARGE_BACKLIT = 15000; // Base flat charge for lighting
export const SURCHARGE_INTL_SHIPPING = 85000;

export function calculateIndicativePrice(inputs: EstimatorInputs): { min: number, max: number } {
  // Simple area based metric
  const sqft = inputs.widthFt * inputs.heightFt;
  
  let basePrice = sqft * EST_BASE_RATE_PER_SQFT;
  
  // Floor standing usually has depth, adding a flat multiplier
  if (inputs.templeType === 'floor_standing') basePrice *= 1.4;
  if (inputs.templeType === 'pooja_room_complete') basePrice *= 2.5;

  let finalPrice = basePrice * MAT_MULTIPLIERS[inputs.material] * COMPLEXITY_MULTIPLIERS[inputs.complexity];
  
  if (inputs.backlit) finalPrice += SURCHARGE_BACKLIT;
  if (inputs.internationalShipping) finalPrice += SURCHARGE_INTL_SHIPPING;

  // Render a range band (e.g. +/- 10% for indicative quotes)
  return {
    min: Math.floor(finalPrice * 0.9),
    max: Math.floor(finalPrice * 1.1)
  };
}
