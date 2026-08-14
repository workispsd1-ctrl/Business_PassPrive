// lib/supabaseBrowser.ts
// Same Supabase project as passprive-admin, so admin accounts work on both.
import { createBrowserClient } from '@supabase/ssr';

export const supabaseBrowser = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
