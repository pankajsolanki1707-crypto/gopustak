import crypto from 'crypto';

const SECRET_KEY = process.env.DOWNLOAD_SECRET_KEY || 'gopustak_download_secret_key_2026';

export function generateDownloadToken(orderId: string, expiresInHours = 24): { token: string; expiresAt: Date } {
  const expiresAt = new Date(Date.now() + expiresInHours * 60 * 60 * 1000);
  const payload = `${orderId}:${expiresAt.getTime()}`;
  const signature = crypto.createHmac('sha256', SECRET_KEY).update(payload).digest('hex');
  const token = Buffer.from(`${payload}:${signature}`).toString('base64url');
  return { token, expiresAt };
}

export function verifyDownloadToken(token: string): { valid: boolean; orderId?: string; expired?: boolean } {
  try {
    const decoded = Buffer.from(token, 'base64url').toString('utf8');
    const [orderId, expiresTimeStr, signature] = decoded.split(':');
    if (!orderId || !expiresTimeStr || !signature) {
      return { valid: false };
    }
    const payload = `${orderId}:${expiresTimeStr}`;
    const expectedSig = crypto.createHmac('sha256', SECRET_KEY).update(payload).digest('hex');
    if (expectedSig !== signature) {
      return { valid: false };
    }
    const expiresTime = parseInt(expiresTimeStr, 10);
    if (Date.now() > expiresTime) {
      return { valid: false, orderId, expired: true };
    }
    return { valid: true, orderId, expired: false };
  } catch (err) {
    return { valid: false };
  }
}
