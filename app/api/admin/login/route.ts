import { NextResponse } from 'next/server';

const VALID_EMAILS = [
  'gopustak@outlook.com',
  'gopustak.in',
  'admin@gopustak.in',
  'admin',
  'pankaj',
];

const VALID_PASSWORDS = [
  'Pan@#17sol',
  'pan@#17sol',
  'Pan@#17Sol',
  'Pan@#17SOL',
];

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const normalizedEmail = (email || '').trim().toLowerCase();
    const normalizedPassword = (password || '').trim();

    const isEmailValid = VALID_EMAILS.some((e) => e.toLowerCase() === normalizedEmail);
    const isPasswordValid = VALID_PASSWORDS.some((p) => p === normalizedPassword);

    if (isEmailValid && isPasswordValid) {
      return NextResponse.json({
        success: true,
        token: 'gp_admin_authenticated_' + Date.now(),
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid admin email or password. Please verify credentials.' },
      { status: 401 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}
