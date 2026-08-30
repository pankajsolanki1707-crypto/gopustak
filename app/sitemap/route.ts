import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const url = new URL(req.url);
  return NextResponse.redirect(new URL('/sitemap.xml', url.origin), 301);
}
