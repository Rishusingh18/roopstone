// src/app/api/leads/route.ts

import { NextRequest } from 'next/server';
import { LeadService, LeadCreateInput } from '@/modules/leads/LeadService';
import { successResponse, errorResponse } from '@/lib/utils/response';
import { z } from 'zod';

const leadService = new LeadService();

/**
 * Public endpoint to capture leads from various forms
 */
export async function POST(req: NextRequest) {
  try {
    const body: LeadCreateInput = await req.json();

    const lead = await leadService.createLead(body);

    return successResponse({
      leadId: lead.id,
      message: 'Thank you! Our heritage specialists will reach out shortly via WhatsApp/Phone.'
    }, 201);

  } catch (error) {
    console.error('API Lead Capture Error:', error);

    if (error instanceof z.ZodError) {
      return errorResponse(
        error.errors[0].message, 
        400, 
        'VALIDATION_ERROR'
      );
    }

    return errorResponse(
      'Failed to capture inquiry. Please try again or contact us via WhatsApp.', 
      500, 
      'LEAD_CAPTURE_ERROR'
    );
  }
}
