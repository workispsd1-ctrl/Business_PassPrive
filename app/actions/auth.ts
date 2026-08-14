// app/actions/auth.ts
'use server';

import { supabaseFromToken } from '@/lib/supabaseHeadless';

// Mirrors passprive-admin: only these roles may sign in here.
const ALLOWED_ROLES = new Set(['admin', 'superadmin']);

export type AdminUser = {
  id: string;
  email: string;
  fullName: string;
  role: string;
};

export type VerifyResult =
  | { status: 200; user: AdminUser }
  | { status: 401 | 403; error: string };

/**
 * Verify a Supabase access token and confirm the account is an admin.
 * The token is checked server-side against Supabase — the client can't fake it.
 */
export async function verifyAdminSession(
  accessToken: string | undefined
): Promise<VerifyResult> {
  if (!accessToken) {
    return { status: 401, error: 'Token missing' };
  }

  const supabase = supabaseFromToken(accessToken);
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return { status: 401, error: 'Session is invalid or expired.' };
  }

  const { data: profile } = await supabase
    .from('users')
    .select('role, full_name')
    .eq('id', user.id)
    .maybeSingle();

  const role = String(user.user_metadata?.role ?? profile?.role ?? '')
    .trim()
    .toLowerCase();

  if (!ALLOWED_ROLES.has(role)) {
    return { status: 403, error: 'This account does not have admin access.' };
  }

  const fullName =
    (profile?.full_name as string | null) ??
    (user.user_metadata?.full_name as string | undefined) ??
    (user.email ? user.email.split('@')[0] : 'Admin');

  return {
    status: 200,
    user: {
      id: user.id,
      email: user.email ?? '',
      fullName,
      role,
    },
  };
}
