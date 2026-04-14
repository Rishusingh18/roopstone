// src/app/api/estimator/calculate/route.ts

import { NextRequest } from 'next/server';
import { EstimatorService, EstimatorInputs } from '@/modules/estimator/EstimatorService';
import { successResponse, errorResponse } from '@/lib/utils/response';
import { ValidationError } from '@/lib/utils/errors';

const estimator = new EstimatorService();

export async function POST(req: NextRequest) {
  try {
    const body: EstimatorInputs = await req.json();

    // Basic Input Validation (Further validation inside Service)
    if (!body.templeType || !body.material || !body.complexity) {
      return errorResponse('Missing required selection fields', 400, 'MISSING_FIELDS');
    }

    const result = await estimator.calculate(body);

    return successResponse(result);
  } catch (error) {
    console.error('API Estimator Error:', error);

    if (error instanceof ValidationError) {
      return errorResponse(error.message, 400, error.code);
    }

    return errorResponse('Calculation engine error', 500, 'INTERNAL_ENGINE_ERROR');
  }
}
