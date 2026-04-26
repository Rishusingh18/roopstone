// src/app/api/theme/active/route.ts

import { NextRequest } from 'next/server';
import { ThemeService } from '@/modules/themes/ThemeService';
import { successResponse, errorResponse } from '@/lib/utils/response';

const themeService = new ThemeService();

export async function GET(req: NextRequest) {
  try {
    const activeTheme = await themeService.getActiveTheme();
    return successResponse(activeTheme);
  } catch (error) {
    console.error('API Active Theme Error:', error);
    return errorResponse('Failed to resolve active theme', 500, 'THEME_ERROR');
  }
}
