/**
 * Transactional Email Dispatcher
 * Sends instant post-purchase receipts with cryptographically signed access links.
 */

interface SendOrderEmailParams {
  toEmail: string;
  customerName: string;
  orderRef: string;
  productTitle: string;
  amountInRs: number;
  downloadUrl: string;
  expiresInHours?: number;
}

export async function sendOrderConfirmationEmail({
  toEmail,
  customerName,
  orderRef,
  productTitle,
  amountInRs,
  downloadUrl,
  expiresInHours = 24,
}: SendOrderEmailParams): Promise<{ success: boolean; messageId?: string }> {
  const host = process.env.NEXT_PUBLIC_APP_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://gopustak.in');
  const fullDownloadLink = downloadUrl.startsWith('http') ? downloadUrl : `${host}${downloadUrl}`;

  console.log('====================================================');
  console.log(`[EMAIL DISPATCH] 📧 To: ${toEmail} (${customerName})`);
  console.log(`[ORDER] Ref: ${orderRef} | Ebook: ${productTitle} | Paid: ₹${amountInRs}`);
  console.log(`[SECURE ACCESS LINK]: ${fullDownloadLink}`);
  console.log(`[EXPIRATION]: Valid for ${expiresInHours} hours`);
  console.log('====================================================');

  // If Resend API Key is provided
  if (process.env.RESEND_API_KEY) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'GoPustak <support@gopustak.in>',
          to: [toEmail],
          subject: `Your Ebook Download Access: ${productTitle} [Order #${orderRef}]`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1e293b; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px;">
              <div style="text-align: center; margin-bottom: 24px;">
                <h1 style="color: #0f172a; margin: 0; font-size: 22px; font-weight: 800;">GOPUSTAK.IN</h1>
                <p style="color: #64748b; margin: 4px 0 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Premium Ebooks for Serious Aspirants</p>
              </div>

              <div style="background: #f8fafc; border-radius: 8px; padding: 18px; margin-bottom: 24px; border: 1px solid #e2e8f0;">
                <p style="margin: 0 0 8px; font-size: 14px;">Hello <strong>${customerName}</strong>,</p>
                <p style="margin: 0; font-size: 14px; color: #334155;">Thank you for your purchase! Your payment of <strong>₹${amountInRs}</strong> for <strong>${productTitle}</strong> has been successfully verified.</p>
              </div>

              <div style="text-align: center; margin: 32px 0;">
                <a href="${fullDownloadLink}" style="background: #d97706; color: #0f172a; font-weight: 700; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-size: 15px; display: inline-block; box-shadow: 0 4px 6px -1px rgba(217, 119, 6, 0.2);">
                  DOWNLOAD YOUR EBOOK (PDF)
                </a>
                <p style="font-size: 11px; color: #94a3b8; margin-top: 10px;">Link valid for ${expiresInHours} hours. For security, please download and save the file to your device.</p>
              </div>

              <table style="width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 24px;">
                <tr><td style="padding: 8px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Order Reference</td><td style="padding: 8px 0; text-align: right; font-weight: 600; font-family: monospace; border-bottom: 1px solid #f1f5f9;">${orderRef}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Ebook Item</td><td style="padding: 8px 0; text-align: right; font-weight: 600; border-bottom: 1px solid #f1f5f9;">${productTitle}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Format</td><td style="padding: 8px 0; text-align: right; font-weight: 600; border-bottom: 1px solid #f1f5f9;">Digital PDF</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">Amount Paid</td><td style="padding: 8px 0; text-align: right; font-weight: 700; color: #059669;">₹${amountInRs}</td></tr>
              </table>

              <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 11px; color: #94a3b8; text-align: center;">
                <p style="margin: 0 0 6px;">Need assistance? Contact support at <a href="mailto:gopustak@outlook.com" style="color: #d97706;">gopustak@outlook.com</a></p>
                <p style="margin: 0;">Connect on Telegram: <a href="https://t.me/Gopustak_official" style="color: #0284c7;">@Gopustak_official</a></p>
              </div>
            </div>
          `,
        }),
      });

      const resData = await res.json();
      return { success: res.ok, messageId: resData.id };
    } catch (err) {
      console.error('[Resend Email Error]:', err);
    }
  }

  return { success: true };
}
