// src/modules/leads/templates/LeadAdminEmail.ts

/**
 * Generates the HTML for an admin notification about a new lead.
 */
export function getLeadAdminEmailHtml(lead: any) {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
      <h2 style="color: #111827; margin-bottom: 20px;">New Inquiry Received</h2>
      
      <div style="background-color: #f9fafb; padding: 16px; border-radius: 6px; margin-bottom: 20px;">
        <p style="margin: 0; color: #4b5563; font-size: 14px;">Contact Details</p>
        <h3 style="margin: 4px 0 0 0; color: #111827;">${lead.full_name}</h3>
        <p style="margin: 4px 0 0 0; color: #111827;">${lead.phone}</p>
        ${lead.email ? `<p style="margin: 2px 0 0 0; color: #111827;">${lead.email}</p>` : ''}
      </div>

      <div style="margin-bottom: 20px;">
        <p style="margin: 0; color: #4b5563; font-size: 14px;">Source</p>
        <p style="margin: 4px 0 0 0; font-weight: 500; color: #111827;">${lead.source.toUpperCase()}</p>
      </div>

      ${lead.city ? `
      <div style="margin-bottom: 20px;">
        <p style="margin: 0; color: #4b5563; font-size: 14px;">Location</p>
        <p style="margin: 4px 0 0 0; color: #111827;">${lead.city}</p>
      </div>` : ''}

      ${lead.message ? `
      <div style="margin-bottom: 20px;">
        <p style="margin: 0; color: #4b5563; font-size: 14px;">Message</p>
        <p style="margin: 4px 0 0 0; color: #111827; line-height: 1.5;">${lead.message}</p>
      </div>` : ''}

      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
        <a href="https://roopstone.com/admin/leads/${lead.id}" 
           style="display: inline-block; background-color: #7e22ce; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600;">
          View in Admin Dashboard
        </a>
      </div>

      <p style="margin-top: 20px; color: #9ca3af; font-size: 12px;">
        This is an automated notification from Roop Stone Arts Backend.
      </p>
    </div>
  `;
}
