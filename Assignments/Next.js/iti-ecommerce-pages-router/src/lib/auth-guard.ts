import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export async function requireAuth() {
  const session = await auth();

  if (!session?.user) {
    return {
      session: null,
      unauthorized: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
    };
  }

  return { session, unauthorized: null };
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await auth();
  return Boolean(session?.user);
}
