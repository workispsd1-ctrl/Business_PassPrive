// lib/restaurantOnboarding.ts
// Write path for restaurant onboarding. Mirrors passprive-admin's
// lib/restaurantAdmin.ts so both apps produce identical rows in Supabase.
import { supabaseBrowser } from '@/lib/supabaseBrowser';

export const RESTAURANT_STORAGE_BUCKET = 'restaurant';
export const RESTAURANT_STORAGE_PREFIX = 'restaurant';

/** Review status written by this app. See sql/2026-08-14-restaurant-status.sql. */
export const SUBMITTED_STATUS = 'submitted';

export const DAY_NAMES = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as const;

export type DayName = (typeof DAY_NAMES)[number];

// Supabase stores day_of_week with Sunday = 0.
const DAY_INDEX: Record<DayName, number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

export type DayHours = {
  open: string;
  close: string;
  closed: boolean;
};

export type OfferInput = {
  title: string;
  description: string;
  offer_type: string;
  discount_value: string;
  min_spend: string;
  start_at: string;
  end_at: string;
};

export type AssetType = 'food' | 'ambience' | 'menu';

export type RestaurantSubmission = {
  name: string;
  phone: string;
  area: string;
  city: string;
  full_address: string;
  maps_url: string;
  latitude: string;
  longitude: string;
  description: string;
  cost_for_two: string;
  is_pure_veg: boolean;
  cuisines: string[];
  facilities: string[];
  highlights: string[];
  opening_hours: Record<DayName, DayHours>;
  avg_duration_minutes: string;
  advance_booking_days: string;
  max_bookings_per_slot: string;
  cancellation_available: boolean;
  cancellation_cutoff_minutes: string;
  modification_available: boolean;
  modification_cutoff_minutes: string;
  cover_charge_enabled: boolean;
  cover_charge_amount: string;
  booking_terms: string;
  offers: OfferInput[];
  food_images: File[];
  ambience_images: File[];
  menu_images: File[];
};

function asString(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

function asNumber(value: unknown): number | null {
  if (value === '' || value === null || value === undefined) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

/**
 * Pull coordinates out of a pasted Google Maps link.
 * Handles the common shapes: `@lat,lng,17z`, `?q=lat,lng`, `!3dlat!4dlng`.
 * Short links (maps.app.goo.gl) don't contain coordinates — those must be
 * opened first so the full URL can be copied.
 */
export function parseMapsCoordinates(url: string): { lat: number; lng: number } | null {
  if (!url.trim()) return null;

  const patterns = [
    /@(-?\d+\.\d+),(-?\d+\.\d+)/,
    /[?&]q=(-?\d+\.\d+),\s*(-?\d+\.\d+)/,
    /[?&]ll=(-?\d+\.\d+),\s*(-?\d+\.\d+)/,
    /!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/,
    /^\s*(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)\s*$/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      const lat = Number(match[1]);
      const lng = Number(match[2]);
      if (Math.abs(lat) <= 90 && Math.abs(lng) <= 180) {
        return { lat, lng };
      }
    }
  }

  return null;
}

async function buildUniqueSlug(baseValue: string) {
  const normalizedBase = slugify(baseValue) || `restaurant-${Date.now()}`;

  for (let attempt = 0; attempt < 50; attempt += 1) {
    const candidate = attempt === 0 ? normalizedBase : `${normalizedBase}-${attempt + 1}`;
    const { data, error } = await supabaseBrowser
      .from('restaurants')
      .select('id')
      .eq('slug', candidate)
      .maybeSingle();

    if (error) throw error;
    if (!data) return candidate;
  }

  return `${normalizedBase}-${Date.now()}`;
}

function buildStoragePath(restaurantId: string, assetType: AssetType, fileName: string) {
  const extension = fileName.split('.').pop() || 'jpg';
  const random = Math.random().toString(36).slice(2, 9);
  return `${RESTAURANT_STORAGE_PREFIX}/${assetType}/${restaurantId}/${Date.now()}-${random}.${extension}`;
}

function extractStoragePath(publicUrl: string): string | null {
  if (!publicUrl) return null;
  const objectPublicMatch = publicUrl.match(/\/object\/public\/[^/]+\/(.+)$/);
  if (objectPublicMatch?.[1]) return objectPublicMatch[1];
  return publicUrl.match(/\/restaurant\/(.+)$/)?.[1] ?? null;
}

async function uploadImages(restaurantId: string, files: File[], assetType: AssetType) {
  const urls: string[] = new Array(files.length).fill('');
  const uploadedPaths: string[] = [];

  try {
    const batchSize = 3;
    for (let index = 0; index < files.length; index += batchSize) {
      const batch = files.slice(index, index + batchSize);
      await Promise.all(
        batch.map(async (file, batchIndex) => {
          const fileIndex = index + batchIndex;
          const path = buildStoragePath(restaurantId, assetType, file.name);

          const { error } = await supabaseBrowser.storage
            .from(RESTAURANT_STORAGE_BUCKET)
            .upload(path, file);

          if (error) throw error;
          uploadedPaths.push(path);

          const { data } = supabaseBrowser.storage
            .from(RESTAURANT_STORAGE_BUCKET)
            .getPublicUrl(path);

          urls[fileIndex] = data.publicUrl;
        })
      );
    }

    return urls.filter(Boolean);
  } catch (error) {
    // Don't leave orphaned objects in storage if part of the batch failed.
    if (uploadedPaths.length > 0) {
      await supabaseBrowser.storage.from(RESTAURANT_STORAGE_BUCKET).remove(uploadedPaths);
    }
    throw error;
  }
}

function buildTagRows(restaurantId: string, form: RestaurantSubmission) {
  const groups = [
    { type: 'cuisine', values: form.cuisines },
    { type: 'facility', values: form.facilities },
    { type: 'highlight', values: form.highlights },
  ];

  return groups.flatMap((group) =>
    group.values
      .map((value) => asString(value))
      .filter((value): value is string => Boolean(value))
      .map((value, index) => ({
        restaurant_id: restaurantId,
        tag_type: group.type,
        tag_value: value,
        sort_order: index,
      }))
  );
}

function buildMediaRows(
  restaurantId: string,
  urls: { food: string[]; ambience: string[]; menu: string[] }
) {
  const groups: { type: AssetType; values: string[] }[] = [
    { type: 'food', values: urls.food },
    { type: 'ambience', values: urls.ambience },
    { type: 'menu', values: urls.menu },
  ];

  return groups.flatMap((group) =>
    group.values.filter(Boolean).map((fileUrl, index) => ({
      restaurant_id: restaurantId,
      asset_type: group.type,
      file_url: fileUrl,
      file_path: extractStoragePath(fileUrl),
      sort_order: index,
      is_active: true,
    }))
  );
}

function buildOpeningHoursRows(restaurantId: string, hours: Record<DayName, DayHours>) {
  return DAY_NAMES.map((day) => {
    const entry = hours[day];
    const closed = Boolean(entry.closed || (!entry.open && !entry.close));

    return {
      restaurant_id: restaurantId,
      day_of_week: DAY_INDEX[day],
      open_time: closed ? null : asString(entry.open),
      close_time: closed ? null : asString(entry.close),
      is_closed: closed,
    };
  });
}

function buildOfferRows(restaurantId: string, offers: OfferInput[]) {
  return offers
    .filter((offer) => asString(offer.title))
    .map((offer) => ({
      restaurant_id: restaurantId,
      title: asString(offer.title) ?? '',
      description: asString(offer.description),
      offer_type: asString(offer.offer_type)?.toLowerCase() ?? null,
      discount_value: asNumber(offer.discount_value),
      min_spend: asNumber(offer.min_spend),
      start_at: asString(offer.start_at),
      end_at: asString(offer.end_at),
      is_active: true,
      metadata: {},
    }));
}

/** Booking terms are stored as an array — one line or comma-separated item each. */
function bookingTermsToArray(value: string): string[] {
  return value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export type SubmitResult = { id: string; slug: string };

/**
 * Create the restaurant, upload its three photo sets, then write the related
 * rows (tags, media, opening hours, offers). On any failure after the insert
 * the restaurant row is deleted so a half-created record isn't left behind.
 */
export async function submitRestaurant(form: RestaurantSubmission): Promise<SubmitResult> {
  const slug = await buildUniqueSlug(`${form.name} ${form.area} ${form.city}`.trim() || form.name);

  const payload: Record<string, unknown> = {
    name: form.name.trim(),
    slug,
    // Submitted here = PENDING REVIEW, not live.
    // The consumer app filters every restaurant query on is_active=true, so
    // false keeps it out of listings, search and "near me" entirely.
    // on_boarded=false additionally hides the booking/call actions on the
    // detail screen. Both are flipped by an admin in passprive-admin once the
    // submission has been checked.
    is_active: false,
    on_boarded: false,
    booking_enabled: true,
    is_pure_veg: form.is_pure_veg,
    modification_available: form.modification_available,
    cancellation_available: form.cancellation_available,
    cover_charge_enabled: form.cover_charge_enabled,
    is_advertised: false,
  };

  const optional: Record<string, unknown> = {
    phone: asString(form.phone),
    area: asString(form.area),
    city: asString(form.city),
    full_address: asString(form.full_address),
    description: asString(form.description),
    latitude: asNumber(form.latitude),
    longitude: asNumber(form.longitude),
    cost_for_two: asNumber(form.cost_for_two),
    avg_duration_minutes: asNumber(form.avg_duration_minutes),
    advance_booking_days: asNumber(form.advance_booking_days),
    max_bookings_per_slot: asNumber(form.max_bookings_per_slot),
    modification_cutoff_minutes: form.modification_available
      ? asNumber(form.modification_cutoff_minutes)
      : null,
    cancellation_cutoff_minutes: form.cancellation_available
      ? asNumber(form.cancellation_cutoff_minutes)
      : null,
    cover_charge_amount: form.cover_charge_enabled ? asNumber(form.cover_charge_amount) : null,
  };

  for (const [key, value] of Object.entries(optional)) {
    if (value !== null && value !== undefined && value !== '') {
      payload[key] = value;
    }
  }

  const terms = bookingTermsToArray(form.booking_terms);
  if (terms.length) {
    payload.booking_terms = terms;
  }

  let insert = await supabaseBrowser
    .from('restaurants')
    .insert({ ...payload, status: SUBMITTED_STATUS })
    .select('id')
    .single();

  // PostgREST rejects an unknown column from its schema cache with PGRST204
  // before the insert ever reaches Postgres; 42703 is the raw Postgres code for
  // the same thing. Until sql/2026-08-14-restaurant-status.sql has been run the
  // column doesn't exist, so retry without it rather than failing the whole
  // submission — is_active/on_boarded still keep the row off the app.
  if (insert.error?.code === 'PGRST204' || insert.error?.code === '42703') {
    console.warn(
      'restaurants.status is missing — run sql/2026-08-14-restaurant-status.sql. ' +
        'Saving without a status for now.'
    );
    insert = await supabaseBrowser.from('restaurants').insert(payload).select('id').single();
  }

  if (insert.error || !insert.data?.id) {
    throw insert.error || new Error('Failed to create restaurant');
  }

  const restaurantId = insert.data.id as string;

  try {
    const [food, ambience, menu] = await Promise.all([
      uploadImages(restaurantId, form.food_images, 'food'),
      uploadImages(restaurantId, form.ambience_images, 'ambience'),
      uploadImages(restaurantId, form.menu_images, 'menu'),
    ]);

    const coverImage = food[0] || ambience[0] || null;

    const rowSets: [string, Record<string, unknown>[]][] = [
      ['restaurant_tags', buildTagRows(restaurantId, form)],
      ['restaurant_media_assets', buildMediaRows(restaurantId, { food, ambience, menu })],
      ['restaurant_opening_hours', buildOpeningHoursRows(restaurantId, form.opening_hours)],
      ['restaurant_offers', buildOfferRows(restaurantId, form.offers)],
    ];

    await Promise.all(
      rowSets.map(async ([table, rows]) => {
        if (!rows.length) return;
        const { error } = await supabaseBrowser.from(table).insert(rows);
        if (error) throw error;
      })
    );

    if (coverImage) {
      const { error } = await supabaseBrowser
        .from('restaurants')
        .update({ cover_image: coverImage })
        .eq('id', restaurantId);
      if (error) throw error;
    }

    return { id: restaurantId, slug };
  } catch (error) {
    await supabaseBrowser.from('restaurants').delete().eq('id', restaurantId);
    throw error;
  }
}
