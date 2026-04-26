// src/lib/integrations/resend.ts

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder_key_for_build');

export { resend };

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  react?: React.ReactElement | React.ReactNode;
  html?: string;
  from?: string;
}

/**
 * Sends a transactional email using Resend
 */
export async function sendEmail(options: SendEmailOptions) {
  try {
    const { data, error } = await resend.emails.send({
      from: options.from || 'Roop Stone Arts <notifications@roopstone.com>',
      to: options.to,
      subject: options.subject,
      react: options.react as any,
      html: options.html,
    });

    if (error) {
      console.error('Resend Error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Unexpected Email Error:', err);
    return { success: false, error: err };
  }
}
