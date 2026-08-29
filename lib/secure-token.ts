import crypto from 'crypto';

const SECRET_KEY = process.env.SECRET_TOKEN_KEY || 'gopustak_secure_ebook_token_secret_key_2026_super_secure';

/**
 * Generates a cryptographically random, unguessable raw download token.
 */
export function generateCryptographicToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Computes the SHA-256 hash of a raw token for secure database storage.
 * Only the hash is persisted, matching cryptographic best practices.
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
