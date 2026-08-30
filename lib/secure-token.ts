import crypto from 'crypto';

const SECRET_KEY = process.env.SECRET_TOKEN_KEY || 'gopustak_secure_ebook_token_secret_key_2026_super_secure';

export interface OrderTokenPayload {
  orderRef: string;
  productId: string;
  productSlug?: string;
  productTitle: string;
  customerName: string;
  customerEmail: string;
  amountInPaise: number;
  exp: number; // Unix timestamp in ms
}

/**
 * Creates a tamper-proof cryptographically signed order token holding verified purchase metadata.
 */
export function createSignedOrderToken(payload: Omit<OrderTokenPayload, 'exp'>): string {
  const fullPayload: OrderTokenPayload = {
    ...payload,
    exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours validity
  };
  const jsonStr = JSON.stringify(fullPayload);
  const base64Data = Buffer.from(jsonStr, 'utf8').toString('base64url');
  const signature = crypto.createHmac('sha256', SECRET_KEY).update(base64Data).digest('base64url');
  return `${base64Data}.${signature}`;
}

/**
 * Verifies and decodes a signed order token.
 */
export function verifySignedOrderToken(token: string): OrderTokenPayload | null {
  if (!token || typeof token !== 'string' || !token.includes('.')) {
    return null;
  }
  const [base64Data, signature] = token.split('.');
  if (!base64Data || !signature) {
    return null;
  }

  const expectedSignature = crypto.createHmac('sha256', SECRET_KEY).update(base64Data).digest('base64url');
  if (expectedSignature !== signature) {
    return null;
  }

  try {
    const jsonStr = Buffer.from(base64Data, 'base64url').toString('utf8');
    const parsed = JSON.parse(jsonStr) as OrderTokenPayload;
    if (Date.now() > parsed.exp) {
      console.warn('[Token Expired]:', parsed.orderRef);
      return null;
    }
    return parsed;
  } catch (e) {
    return null;
  }
}

/**
 * Generates a cryptographically random raw download token.
 */
export function generateCryptographicToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Computes the SHA-256 hash of a raw token for secure database storage.
 */
export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token.trim()).digest('hex');
}

/**
 * Signs a payload using HMAC-SHA256 for tamper-proof transport.
 */
export function signPayload(payload: string): string {
  return crypto.createHmac('sha256', SECRET_KEY).update(payload).digest('hex');
}

/**
 * Verifies that a signed token payload has not been tampered with.
 */
export function verifySignature(payload: string, signature: string): boolean {
  const expected = signPayload(payload);
  return crypto.timingSafeEqual(Buffer.from(expected, 'utf8'), Buffer.from(signature, 'utf8'));
}
