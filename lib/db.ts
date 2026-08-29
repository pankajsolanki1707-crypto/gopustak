import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

function getDatabaseUrl(): string {
  // If an external remote DB is configured (PostgreSQL, MySQL, Supabase, Neon, etc.)
  if (process.env.DATABASE_URL && !process.env.DATABASE_URL.startsWith('file:')) {
    return process.env.DATABASE_URL;
  }

  // Running in Vercel / AWS Lambda / Serverless environment
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.NODE_ENV === 'production') {
    const tmpDbPath = path.join('/tmp', 'dev.db');
    
    // Copy bundled seed db to writable /tmp if not already initialized
    if (!fs.existsSync(tmpDbPath)) {
      const candidates = [
        path.join(process.cwd(), 'prisma', 'dev.db'),
        path.join(process.cwd(), 'dev.db'),
        path.resolve('./prisma/dev.db'),
        path.resolve('./dev.db'),
      ];

      for (const candidate of candidates) {
        if (fs.existsSync(candidate)) {
          try {
            fs.copyFileSync(candidate, tmpDbPath);
            console.log(`[DB] Copied SQLite database from ${candidate} to ${tmpDbPath}`);
            break;
          } catch (err) {
            console.error(`[DB] Failed to copy from ${candidate}:`, err);
          }
        }
      }
    }

    if (fs.existsSync(tmpDbPath)) {
      return `file:${tmpDbPath}`;
    }
  }

  // Local development fallback
  const localPrismaDb = path.join(process.cwd(), 'prisma', 'dev.db');
  if (fs.existsSync(localPrismaDb)) {
    return `file:${localPrismaDb}`;
  }

  const localRootDb = path.join(process.cwd(), 'dev.db');
  if (fs.existsSync(localRootDb)) {
    return `file:${localRootDb}`;
  }

  return process.env.DATABASE_URL || 'file:./prisma/dev.db';
}

const dbUrl = getDatabaseUrl();

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: dbUrl,
      },
    },
    log: ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
