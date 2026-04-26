// src/modules/themes/ThemeService.ts

import { db } from '@/lib/db/client';
import { redis } from '@/lib/redis/client';

export interface ThemeConfig {
  id: string;
  name: string;
  hero_image_url: string;
  hero_image_mobile_url?: string;
  overlay_heading: string;
  overlay_subheading?: string;
  cta_text?: string;
  cta_link?: string;
  badge_text?: string;
  priority: number;
}

export class ThemeService {
  private static CACHE_KEY = 'theme:active';
  private static CACHE_TTL = 300; // 5 minutes

  /**
   * Resolves the active theme based on current time and priority
   */
  async getActiveTheme(): Promise<ThemeConfig> {
    try {
      // 1. Check Redis Cache
      const cached = await redis.get(ThemeService.CACHE_KEY);
      if (cached) {
        return (typeof cached === 'string' ? JSON.parse(cached) : cached) as ThemeConfig;
      }

      // 2. Query DB
      // We look for themes that are 'active' or 'scheduled' and within current date range.
      // We also look for the 'is_default' fallback.
      const now = new Date().toISOString();

      const { data: themes, error } = await db
        .from('themes')
        .select('*')
        .or(`status.eq.active,status.eq.scheduled`)
        .or(`start_date.lte.${now},is_default.eq.true`)
        // Filter end_date >= now OR end_date is NULL (default)
        // Note: Complex filters often better handled with .filter or multiple conditions
        .order('priority', { ascending: false });

      if (error) {
        throw new Error(`DB Error fetching themes: ${error.message}`);
      }

      // 3. Filter results locally for strict time bounds (Supabase OR is broad)
      const currentTime = new Date().getTime();
      const resolvedTheme = themes.find(t => {
        if (t.is_default) return true;
        
        const start = t.start_date ? new Date(t.start_date).getTime() : 0;
        const end = t.end_date ? new Date(t.end_date).getTime() : Infinity;
        
        return currentTime >= start && currentTime <= end;
      });

      if (!resolvedTheme) {
        throw new Error('No valid theme found, not even a default one.');
      }

      // 4. Cache and Return
      await redis.set(ThemeService.CACHE_KEY, JSON.stringify(resolvedTheme), {
        ex: ThemeService.CACHE_TTL
      });

      return resolvedTheme;
    } catch (err) {
      console.error('Theme Resolution Failed:', err);
      throw err;
    }
  }

  /**
   * Invalidates the theme cache (useful for admin updates)
   */
  async invalidateCache() {
    await redis.del(ThemeService.CACHE_KEY);
  }
}
