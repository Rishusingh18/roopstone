// src/modules/leads/LeadService.ts

import { db } from '@/lib/db/client';
import { ValidationError } from '@/lib/utils/errors';
import { z } from 'zod';
import { sendEmail } from '@/lib/integrations/resend';
import { getLeadAdminEmailHtml } from './templates/LeadAdminEmail';

export const LeadCreateSchema = z.object({
  fullName: z.string().min(2, 'Name is too short'),
  phone: z.string().min(10, 'Invalid phone number'),
  email: z.string().email().optional().or(z.literal('')),
  city: z.string().optional(),
  message: z.string().optional(),
  source: z.enum(['estimator', 'contact_form', 'whatsapp', 'consultation', 'gallery']),
  estimateId: z.string().uuid().optional(),
  utm: z.object({
    source: z.string().optional(),
    medium: z.string().optional(),
    campaign: z.string().optional(),
  }).optional(),
  recaptchaToken: z.string().optional(),
});

export type LeadCreateInput = z.infer<typeof LeadCreateSchema>;

export class LeadService {
  /**
   * Captures a new lead and stores it in the database.
   * Fired from various entry points (Estimator, Contact Form, etc.)
   */
  async createLead(input: LeadCreateInput) {
    // 1. Validate Input
    const validated = LeadCreateSchema.parse(input);

    // 2. Insert into DB
    const { data: lead, error } = await db
      .from('leads')
      .insert({
        full_name: validated.fullName,
        phone: validated.phone,
        email: validated.email || null,
        city: validated.city || null,
        message: validated.message || null,
        source: validated.source,
        estimate_id: validated.estimateId || null,
        utm_source: validated.utm?.source || null,
        utm_medium: validated.utm?.medium || null,
        utm_campaign: validated.utm?.campaign || null,
        status: 'new',
      })
      .select()
      .single();

    if (error) {
      console.error('Database error creating lead:', error);
      throw new Error('Failed to capture lead');
    }

    // 3. Automated Notifications (Async in NextJS background)
    // In a full production env, this would be a BullMQ job. 
    // For now, we fire and forget to minimize latency.
    this.notifyAdmins(lead).catch(err => console.error('Admin notify failed:', err));

    return lead;
  }

  /**
   * Internal helper to send email alerts to administrators
   */
  private async notifyAdmins(lead: any) {
    await sendEmail({
      to: 'admin@roopstone.com', // TODO: Fetch from settings or env
      subject: `New Lead: ${lead.full_name} (${lead.source})`,
      html: getLeadAdminEmailHtml(lead),
    });
  }

  /**
   * Fetches leads for the admin dashboard (role-guarded in API)
   */
  async listLeads(options: { page?: number; limit?: number; status?: string }) {
    const { page = 1, limit = 20, status } = options;
    const offset = (page - 1) * limit;

    let query = db
      .from('leads')
      .select('*, estimates(*)', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (status) {
      query = query.eq('status', status);
    }

    const { data, count, error } = await query;

    if (error) throw error;

    return {
      leads: data,
      total: count || 0,
      page,
      totalPages: Math.ceil((count || 0) / limit),
    };
  }

  /**
   * Updates lead status (e.g., 'new' -> 'contacted')
   */
  async updateStatus(id: string, status: string, userId: string) {
    const { data: lead, error } = await db
      .from('leads')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // TODO: Log in Audit Log
    
    return lead;
  }
}
