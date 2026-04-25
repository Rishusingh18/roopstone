// src/modules/cms/AuditService.ts

import { db } from '@/lib/db/client';
import { NextRequest } from 'next/server';

export interface AuditLogInput {
  userId: string;
  action: string;
  entityType: 'product' | 'project' | 'theme' | 'lead' | 'estimator_config';
  entityId: string;
  oldData?: any;
  newData?: any;
  ipAddress?: string;
  userAgent?: string;
}

export class AuditService {
  /**
   * Logs an administrative action to the database
   */
  async logAction(input: AuditLogInput) {
    const { error } = await db.from('audit_logs').insert({
      user_id: input.userId,
      action: input.action,
      entity_type: input.entityType,
      entity_id: input.entityId,
      old_data: input.oldData || null,
      new_data: input.newData || null,
      ip_address: input.ipAddress || null,
      user_agent: input.userAgent || null,
    });

    if (error) {
      console.error('Failed to write audit log:', error);
      // We don't throw here to avoid failing the main transaction,
      // but in production, you might want more robust error handling.
    }
  }

  /**
   * Helper to extract metadata from a request
   */
  static getRequestMeta(req: NextRequest) {
    return {
      ipAddress: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || undefined,
      userAgent: req.headers.get('user-agent') || undefined,
    };
  }
}
