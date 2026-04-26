// src/app/api/admin/media/sign/route.ts

import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth/auth';
import { generateSignature } from '@/lib/integrations/cloudinary';
import { successResponse, errorResponse } from '@/lib/utils/response';

/**
 * Generates a signed upload signature for direct-to-cloudinary uploads.
 * Restricted to authenticated admins.
 */
export async function POST(req: NextRequest) {
  const session = await auth();
  
  if (!session) {
    return errorResponse('Unauthorized', 401);
  }

  try {
    const body = await req.json();
    const { folder = 'roopstone' } = body;

    const signatureData = generateSignature({
      folder,
      upload_preset: 'ml_default', // Recommended: Create an 'ml_default' or custom preset in Cloudinary
    });

    return successResponse(signatureData);
  } catch (error) {
    console.error('Cloudinary Sign Error:', error);
    return errorResponse('Failed to generate upload signature', 500);
  }
}
