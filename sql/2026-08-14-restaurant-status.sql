-- Adds a review status to restaurants.
--
-- Run this in the Supabase SQL editor (project slhjiyxfjplbyhmrqgyy) BEFORE
-- deploying the onboarding form, otherwise inserts that carry `status` are
-- rejected with 42703 (the app falls back to inserting without it, but the
-- column is what the approval queue is meant to read).
--
-- Values:
--   submitted — captured via the PassPrive Business onboarding form, awaiting review
--   approved  — checked by an admin and live
--   rejected  — reviewed and turned down
--
-- The default is 'approved' on purpose: every row that exists today was created
-- by an admin in passprive-admin and is already live, and passprive-admin's
-- insert does not send `status`. Only submissions from the onboarding form set
-- 'submitted' explicitly.

alter table public.restaurants
  add column if not exists status text not null default 'approved';

alter table public.restaurants
  drop constraint if exists restaurants_status_check;

alter table public.restaurants
  add constraint restaurants_status_check
  check (status in ('submitted', 'approved', 'rejected'));

create index if not exists restaurants_status_idx
  on public.restaurants (status);
