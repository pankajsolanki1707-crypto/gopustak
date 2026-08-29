import Razorpay from 'razorpay';
import crypto from 'crypto';

const keyId = process.env.RAZORPAY_KEY_ID || 'rzp_test_gopustak_demo';
const keySecret = process.env.RAZORPAY_KEY_SECRET || 'gopustak_secret_key_demo_12345';

export const isDemoRazorpay = !process.env.RAZORPAY_KEY_ID;

export const razorpayInstance = new Razorpay({
  key_id: keyId,
  key_secret: keySecret,
});

export function verifyRazorpaySignature({
  orderId,
  paymentId,
  signature,
}: {
  orderId: string;
  paymentId: string;
  signature: string;
}): boolean {
  if (isDemoRazorpay && signature.startsWith('demo_sig_')) {
    return true;
  }
  const body = orderId + '|' + paymentId;
  const expectedSignature = crypto
    .createHmac('sha256', keySecret)
    .update(body.toString())
    .digest('hex');
  return expectedSignature === signature;
}

export { keyId, keySecret };
