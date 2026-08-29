import Razorpay from 'razorpay';
import crypto from 'crypto';

// Live Production Razorpay Account Credentials
const keyId = process.env.RAZORPAY_KEY_ID || 'rzp_live_SE3ZS0Lx0QfzHY';
const keySecret = process.env.RAZORPAY_KEY_SECRET || 'frnjslzbHncuoQRjrPFIuY7R';

export const isDemoRazorpay = false;

export const razorpayInstance = new Razorpay({
  key_id: keyId,
  key_secret: keySecret,
});

/**
 * Validates the HMAC-SHA256 signature sent by Razorpay after successful customer payment.
 */
export function verifyRazorpaySignature({
  orderId,
  paymentId,
  signature,
}: {
  orderId: string;
  paymentId: string;
  signature: string;
}): boolean {
  if (!orderId || !paymentId || !signature) {
    return false;
  }
  
  const body = `${orderId}|${paymentId}`;
  const expectedSignature = crypto
    .createHmac('sha256', keySecret)
    .update(body)
    .digest('hex');
    
  return expectedSignature === signature;
}

export { keyId, keySecret };
