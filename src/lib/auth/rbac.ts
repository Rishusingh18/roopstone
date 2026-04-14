// src/lib/auth/rbac.ts

import { auth } from './auth';
import { ForbiddenError, AuthenticationError } from '@/lib/utils/errors';

export type UserRole = 'super_admin' | 'editor' | 'marketing';

/**
 * Validates that the current session has one of the allowed roles.
 * Throws errors instead of returning responses to be used in Server Actions or Route Handlers.
 */
export async function validateRole(allowedRoles: UserRole[]) {
  const session = await auth();

  if (!session || !session.user) {
    throw new AuthenticationError();
  }

  const userRole = (session.user as any).role as UserRole;

  if (!allowedRoles.includes(userRole)) {
    throw new ForbiddenError('Insufficient permissions');
  }

  return session.user;
}

/**
 * Higher-order function to wrap Route Handlers with RBAC logic.
 */
export function withRole(allowedRoles: UserRole[]) {
  return (handler: Function) => {
    return async (...args: any[]) => {
      try {
        await validateRole(allowedRoles);
        return await handler(...args);
      } catch (error) {
        if (error instanceof AuthenticationError) {
          return Response.json({ error: error.message }, { status: 401 });
        }
        if (error instanceof ForbiddenError) {
          return Response.json({ error: error.message }, { status: 403 });
        }
        throw error;
      }
    };
  };
}
