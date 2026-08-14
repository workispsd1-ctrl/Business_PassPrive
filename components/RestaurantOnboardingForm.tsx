'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  DAY_NAMES,
  parseMapsCoordinates,
  submitRestaurant,
  type DayHours,
  type DayName,
  type OfferInput,
  type RestaurantSubmission,
} from '@/lib/restaurantOnboarding';

const CUISINE_OPTIONS = [
  'North Indian',
  'South Indian',
  'Chinese',
  'Mauritian',
  'Creole',
  'Continental',
  'Italian',
  'French',
  'Mughlai',
  'Seafood',
  'Asian',
  'Japanese',
  'Thai',
  'Mexican',
  'Barbecue',
  'Cafe',
  'Bakery',
  'Desserts',
  'Street Food',
  'Fast Food',
];

const FACILITY_OPTIONS = [
  'Rooftop',
  'Parking',
  'Valet Parking',
  'Live Music',
  'DJ',
  'Pet Friendly',
  'Outdoor Seating',
  'Sea View',
  'Air Conditioned',
  'Bar / Serves Alcohol',
  'Private Dining',
  'Family Friendly',
  'Wheelchair Accessible',
  'Free Wi-Fi',
  'Card Payments',
  'Takeaway',
];

const OFFER_TYPES = [
  { value: 'percentage', label: 'Percentage off' },
  { value: 'flat', label: 'Flat amount off' },
  { value: 'cover_discount', label: 'Cover charge discount' },
];

function defaultHours(): Record<DayName, DayHours> {
  return DAY_NAMES.reduce(
    (acc, day) => {
      acc[day] = { open: '11:00', close: '23:00', closed: false };
      return acc;
    },
    {} as Record<DayName, DayHours>
  );
}

function emptyOffer(): OfferInput {
  return {
    title: '',
    description: '',
    offer_type: 'percentage',
    discount_value: '',
    min_spend: '',
    start_at: '',
    end_at: '',
  };
}

type PhotoSet = 'food_images' | 'ambience_images' | 'menu_images';

type Props = {
  adminName: string;
  onDone?: () => void;
};

export function RestaurantOnboardingForm({ adminName, onDone }: Props) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    area: '',
    city: '',
    full_address: '',
    maps_url: '',
    latitude: '',
    longitude: '',
    description: '',
    cost_for_two: '',
    is_pure_veg: false,
    avg_duration_minutes: '90',
    advance_booking_days: '30',
    max_bookings_per_slot: '',
    cancellation_available: true,
    cancellation_cutoff_minutes: '120',
    modification_available: true,
    modification_cutoff_minutes: '120',
    cover_charge_enabled: false,
    cover_charge_amount: '',
    booking_terms: '',
  });

  const [cuisines, setCuisines] = useState<string[]>([]);
  const [customCuisine, setCustomCuisine] = useState('');
  const [facilities, setFacilities] = useState<string[]>([]);
  const [highlights, setHighlights] = useState('');
  const [hours, setHours] = useState<Record<DayName, DayHours>>(defaultHours);
  const [offers, setOffers] = useState<OfferInput[]>([]);
  const [photos, setPhotos] = useState<Record<PhotoSet, File[]>>({
    food_images: [],
    ambience_images: [],
    menu_images: [],
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [savedSlug, setSavedSlug] = useState<string | null>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  const coordinates = useMemo(
    () =>
      form.latitude && form.longitude
        ? `${Number(form.latitude).toFixed(6)}, ${Number(form.longitude).toFixed(6)}`
        : '',
    [form.latitude, form.longitude]
  );

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((previous) => ({ ...previous, [key]: value }));
  }

  function toggleFrom(list: string[], value: string) {
    return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
  }

  function handleMapsUrl(value: string) {
    update('maps_url', value);
    const parsed = parseMapsCoordinates(value);
    if (parsed) {
      setForm((previous) => ({
        ...previous,
        maps_url: value,
        latitude: String(parsed.lat),
        longitude: String(parsed.lng),
      }));
    }
  }

  function addPhotos(set: PhotoSet, files: FileList | null) {
    if (!files?.length) return;
    // Copy the FileList to a real array NOW. The caller clears the input's
    // value right after this returns, which empties the live FileList — if we
    // read it lazily inside the state updater it would already be empty.
    const added = Array.from(files);
    setPhotos((previous) => ({ ...previous, [set]: [...previous[set], ...added] }));
  }

  function removePhoto(set: PhotoSet, index: number) {
    setPhotos((previous) => ({
      ...previous,
      [set]: previous[set].filter((_, itemIndex) => itemIndex !== index),
    }));
  }

  function validate(): string {
    if (!form.name.trim()) return 'Business name is required.';
    if (!form.phone.trim()) return 'Contact number is required.';
    if (!form.full_address.trim()) return 'Full address is required.';
    if (!form.area.trim()) return 'Area is required.';
    if (!form.city.trim()) return 'City is required.';
    if (!form.latitude || !form.longitude) {
      return 'Google Maps location is required — paste the map link so we can pin the exact spot.';
    }
    if (!cuisines.length) return 'Pick at least one cuisine or category.';
    if (!form.cost_for_two.trim()) return 'Approximate cost for two is required.';
    if (!form.description.trim()) return 'Add a short 1–2 line description.';
    if (DAY_NAMES.every((day) => hours[day].closed)) {
      return 'Opening hours are required — at least one day must be open.';
    }
    if (DAY_NAMES.some((day) => !hours[day].closed && (!hours[day].open || !hours[day].close))) {
      return 'Every open day needs both an opening and a closing time.';
    }
    if (!photos.menu_images.length) {
      return 'Menu photos are required — upload every page, clear enough to read the prices.';
    }
    return '';
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      errorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    const submission: RestaurantSubmission = {
      ...form,
      cuisines,
      facilities,
      highlights: highlights
        .split(/\r?\n|,/)
        .map((item) => item.trim())
        .filter(Boolean),
      opening_hours: hours,
      offers,
      food_images: photos.food_images,
      ambience_images: photos.ambience_images,
      menu_images: photos.menu_images,
    };

    setSubmitting(true);
    try {
      const result = await submitRestaurant(submission);
      setSavedSlug(result.slug);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (submitError) {
      console.error('Restaurant onboarding failed:', submitError);
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Could not save the restaurant. Please try again.'
      );
      errorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } finally {
      setSubmitting(false);
    }
  }

  function resetForSecondEntry() {
    setForm({
      name: '',
      phone: '',
      area: '',
      city: '',
      full_address: '',
      maps_url: '',
      latitude: '',
      longitude: '',
      description: '',
      cost_for_two: '',
      is_pure_veg: false,
      avg_duration_minutes: '90',
      advance_booking_days: '30',
      max_bookings_per_slot: '',
      cancellation_available: true,
      cancellation_cutoff_minutes: '120',
      modification_available: true,
      modification_cutoff_minutes: '120',
      cover_charge_enabled: false,
      cover_charge_amount: '',
      booking_terms: '',
    });
    setCuisines([]);
    setFacilities([]);
    setHighlights('');
    setHours(defaultHours());
    setOffers([]);
    setPhotos({ food_images: [], ambience_images: [], menu_images: [] });
    setSavedSlug(null);
    setError('');
  }

  if (savedSlug) {
    return (
      <div className="onboarding-saved">
        <div className="launch-check launch-check-pending">
          <i className="fas fa-clock" />
        </div>
        <h2 className="onboarding-title">
          Submitted for <em>Review.</em>
        </h2>
        <p className="onboarding-intro">
          {form.name || 'The restaurant'} was saved as <strong>{savedSlug}</strong> — photos,
          opening hours, booking rules and offers included.
        </p>
        <div className="onboarding-actions">
          <button type="button" className="btn btn-primary" onClick={resetForSecondEntry}>
            Add Another Restaurant →
          </button>
          {onDone && (
            <button type="button" className="btn btn-secondary" onClick={onDone}>
              Done
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <form className="rform" onSubmit={handleSubmit} noValidate>
      <header className="rform-header">
        <div className="launch-badge">
          <span className="launch-dot" /> Restaurant Onboarding
        </div>
        <h2 className="onboarding-title">
          Add a <em>Restaurant.</em>
        </h2>
        <p className="onboarding-intro">
          Signed in as {adminName}. Fill in everything below — these details drive search,
          &ldquo;near me&rdquo; distance sorting, price filters and the booking flow.
        </p>
        <p className="onboarding-pending-note">
          <i className="fas fa-circle-info" /> Restaurants submitted here are saved as{' '}
          <strong>pending</strong>. They go live only after an admin approves them in the
          dashboard.
        </p>
      </header>

      {/* ---------- Business ---------- */}
      <fieldset className="rform-section">
        <legend>1. Business</legend>

        <div className="rform-grid">
          <label className="rfield rfield-wide">
            <span className="rfield-label">
              Business name <b>*</b>
            </span>
            <input
              type="text"
              value={form.name}
              onChange={(event) => update('name', event.target.value)}
              placeholder="e.g. La Terrasse Rooftop"
              required
            />
          </label>

          <label className="rfield">
            <span className="rfield-label">
              Contact number <b>*</b>
            </span>
            <input
              type="tel"
              value={form.phone}
              onChange={(event) => update('phone', event.target.value)}
              placeholder="+230 5xxx xxxx"
              required
            />
          </label>

          <label className="rfield">
            <span className="rfield-label">
              Cost for two (approx.) <b>*</b>
            </span>
            <input
              type="number"
              min="0"
              step="50"
              value={form.cost_for_two}
              onChange={(event) => update('cost_for_two', event.target.value)}
              placeholder="1500"
              required
            />
            <span className="rfield-hint">Used for price filters and sorting.</span>
          </label>

          <label className="rfield rfield-wide">
            <span className="rfield-label">
              Short description <b>*</b>
            </span>
            <textarea
              rows={2}
              value={form.description}
              onChange={(event) => update('description', event.target.value)}
              placeholder="1–2 lines about the place — the vibe, the signature dish, the view."
              required
            />
          </label>

          <div className="rfield rfield-wide">
            <span className="rfield-label">Kitchen type</span>
            <div className="rform-chips">
              <button
                type="button"
                className={`rchip ${form.is_pure_veg ? 'selected' : ''}`}
                aria-pressed={form.is_pure_veg}
                onClick={() => update('is_pure_veg', true)}
              >
                <i className="fas fa-leaf" /> Pure veg
              </button>
              <button
                type="button"
                className={`rchip ${!form.is_pure_veg ? 'selected' : ''}`}
                aria-pressed={!form.is_pure_veg}
                onClick={() => update('is_pure_veg', false)}
              >
                <i className="fas fa-drumstick-bite" /> Serves non-veg
              </button>
            </div>
          </div>
        </div>
      </fieldset>

      {/* ---------- Location ---------- */}
      <fieldset className="rform-section">
        <legend>2. Location</legend>

        <div className="rform-grid">
          <label className="rfield rfield-wide">
            <span className="rfield-label">
              Full address <b>*</b>
            </span>
            <textarea
              rows={2}
              value={form.full_address}
              onChange={(event) => update('full_address', event.target.value)}
              placeholder="Street, building, landmark"
              required
            />
          </label>

          <label className="rfield">
            <span className="rfield-label">
              Area <b>*</b>
            </span>
            <input
              type="text"
              value={form.area}
              onChange={(event) => update('area', event.target.value)}
              placeholder="e.g. Grand Baie"
              required
            />
          </label>

          <label className="rfield">
            <span className="rfield-label">
              City <b>*</b>
            </span>
            <input
              type="text"
              value={form.city}
              onChange={(event) => update('city', event.target.value)}
              placeholder="e.g. Port Louis"
              required
            />
          </label>

          <label className="rfield rfield-wide">
            <span className="rfield-label">
              Google Maps pin <b>*</b>
            </span>
            <input
              type="url"
              value={form.maps_url}
              onChange={(event) => handleMapsUrl(event.target.value)}
              placeholder="Paste the Google Maps link, or type: -20.164321, 57.504681"
            />
            <span className="rfield-hint">
              {coordinates ? (
                <span className="rfield-ok">
                  <i className="fas fa-location-dot" /> Pinned at {coordinates}
                </span>
              ) : (
                'Open the place in Google Maps, copy the URL from the address bar, and paste it here. Short goo.gl links must be opened first — they don’t contain coordinates.'
              )}
            </span>
          </label>

          <label className="rfield">
            <span className="rfield-label">Latitude</span>
            <input
              type="text"
              inputMode="decimal"
              value={form.latitude}
              onChange={(event) => update('latitude', event.target.value)}
              placeholder="-20.164321"
            />
          </label>

          <label className="rfield">
            <span className="rfield-label">Longitude</span>
            <input
              type="text"
              inputMode="decimal"
              value={form.longitude}
              onChange={(event) => update('longitude', event.target.value)}
              placeholder="57.504681"
            />
          </label>
        </div>
      </fieldset>

      {/* ---------- Opening hours ---------- */}
      <fieldset className="rform-section">
        <legend>3. Opening hours</legend>
        <p className="rform-note">
          Set the hours for each day. Tick <strong>Closed</strong> to mark the weekly off.
        </p>

        <div className="rhours">
          {DAY_NAMES.map((day) => {
            const entry = hours[day];
            return (
              <div key={day} className={`rhours-row ${entry.closed ? 'is-closed' : ''}`}>
                <span className="rhours-day">{day}</span>
                <input
                  type="time"
                  value={entry.open}
                  disabled={entry.closed}
                  aria-label={`${day} opening time`}
                  onChange={(event) =>
                    setHours((previous) => ({
                      ...previous,
                      [day]: { ...previous[day], open: event.target.value },
                    }))
                  }
                />
                <span className="rhours-sep">to</span>
                <input
                  type="time"
                  value={entry.close}
                  disabled={entry.closed}
                  aria-label={`${day} closing time`}
                  onChange={(event) =>
                    setHours((previous) => ({
                      ...previous,
                      [day]: { ...previous[day], close: event.target.value },
                    }))
                  }
                />
                <label className="rhours-off">
                  <input
                    type="checkbox"
                    checked={entry.closed}
                    onChange={(event) =>
                      setHours((previous) => ({
                        ...previous,
                        [day]: { ...previous[day], closed: event.target.checked },
                      }))
                    }
                  />
                  Closed
                </label>
              </div>
            );
          })}
        </div>
      </fieldset>

      {/* ---------- Cuisine & facilities ---------- */}
      <fieldset className="rform-section">
        <legend>4. Cuisine &amp; facilities</legend>

        <div className="rfield rfield-wide">
          <span className="rfield-label">
            Cuisine &amp; category <b>*</b>
          </span>
          <div className="rform-chips">
            {Array.from(new Set([...CUISINE_OPTIONS, ...cuisines])).map((option) => (
              <button
                key={option}
                type="button"
                className={`rchip ${cuisines.includes(option) ? 'selected' : ''}`}
                aria-pressed={cuisines.includes(option)}
                onClick={() => setCuisines((previous) => toggleFrom(previous, option))}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="rform-inline">
            <input
              type="text"
              value={customCuisine}
              onChange={(event) => setCustomCuisine(event.target.value)}
              placeholder="Add another cuisine"
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  const value = customCuisine.trim();
                  if (value && !cuisines.includes(value)) {
                    setCuisines((previous) => [...previous, value]);
                  }
                  setCustomCuisine('');
                }
              }}
            />
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                const value = customCuisine.trim();
                if (value && !cuisines.includes(value)) {
                  setCuisines((previous) => [...previous, value]);
                }
                setCustomCuisine('');
              }}
            >
              Add
            </button>
          </div>
        </div>

        <div className="rfield rfield-wide">
          <span className="rfield-label">Facilities &amp; highlights</span>
          <div className="rform-chips">
            {FACILITY_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                className={`rchip ${facilities.includes(option) ? 'selected' : ''}`}
                aria-pressed={facilities.includes(option)}
                onClick={() => setFacilities((previous) => toggleFrom(previous, option))}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <label className="rfield rfield-wide">
          <span className="rfield-label">Anything else worth highlighting</span>
          <textarea
            rows={2}
            value={highlights}
            onChange={(event) => setHighlights(event.target.value)}
            placeholder="One per line — e.g. Chef's table, Sunset sessions on Fridays"
          />
        </label>
      </fieldset>

      {/* ---------- Photos ---------- */}
      <fieldset className="rform-section">
        <legend>5. Photos</legend>

        <PhotoUploader
          id="foodPhotos"
          title="Food photos"
          hint="The dishes themselves — the ones guests order most."
          files={photos.food_images}
          onAdd={(files) => addPhotos('food_images', files)}
          onRemove={(index) => removePhoto('food_images', index)}
        />
        <PhotoUploader
          id="ambiencePhotos"
          title="Ambience / interior photos"
          hint="Seating, decor, the view — what the place feels like."
          files={photos.ambience_images}
          onAdd={(files) => addPhotos('ambience_images', files)}
          onRemove={(index) => removePhoto('ambience_images', index)}
        />
        <PhotoUploader
          id="menuPhotos"
          title="Menu photos *"
          hint="Every page, clear enough to read the prices. Photos only — no need to type the menu out or send a price list."
          files={photos.menu_images}
          onAdd={(files) => addPhotos('menu_images', files)}
          onRemove={(index) => removePhoto('menu_images', index)}
        />
      </fieldset>

      {/* ---------- Booking rules ---------- */}
      <fieldset className="rform-section">
        <legend>6. Booking rules</legend>

        <div className="rform-grid">
          <label className="rfield">
            <span className="rfield-label">Average dining duration (minutes)</span>
            <input
              type="number"
              min="15"
              step="15"
              value={form.avg_duration_minutes}
              onChange={(event) => update('avg_duration_minutes', event.target.value)}
              placeholder="90"
            />
          </label>

          <label className="rfield">
            <span className="rfield-label">Guests can book up to (days in advance)</span>
            <input
              type="number"
              min="1"
              value={form.advance_booking_days}
              onChange={(event) => update('advance_booking_days', event.target.value)}
              placeholder="30"
            />
          </label>

          <label className="rfield">
            <span className="rfield-label">Max bookings per slot</span>
            <input
              type="number"
              min="1"
              value={form.max_bookings_per_slot}
              onChange={(event) => update('max_bookings_per_slot', event.target.value)}
              placeholder="10"
            />
          </label>

          <div className="rfield">
            <span className="rfield-label">Cancellation</span>
            <label className="rtoggle">
              <input
                type="checkbox"
                checked={form.cancellation_available}
                onChange={(event) => update('cancellation_available', event.target.checked)}
              />
              Guests can cancel
            </label>
            {form.cancellation_available && (
              <input
                type="number"
                min="0"
                step="15"
                value={form.cancellation_cutoff_minutes}
                onChange={(event) => update('cancellation_cutoff_minutes', event.target.value)}
                placeholder="Cut-off in minutes before the booking, e.g. 120"
              />
            )}
          </div>

          <div className="rfield">
            <span className="rfield-label">Modification</span>
            <label className="rtoggle">
              <input
                type="checkbox"
                checked={form.modification_available}
                onChange={(event) => update('modification_available', event.target.checked)}
              />
              Guests can modify
            </label>
            {form.modification_available && (
              <input
                type="number"
                min="0"
                step="15"
                value={form.modification_cutoff_minutes}
                onChange={(event) => update('modification_cutoff_minutes', event.target.value)}
                placeholder="Cut-off in minutes before the booking, e.g. 120"
              />
            )}
          </div>

          <div className="rfield">
            <span className="rfield-label">Cover charge</span>
            <label className="rtoggle">
              <input
                type="checkbox"
                checked={form.cover_charge_enabled}
                onChange={(event) => update('cover_charge_enabled', event.target.checked)}
              />
              There is a cover charge
            </label>
            {form.cover_charge_enabled && (
              <input
                type="number"
                min="0"
                value={form.cover_charge_amount}
                onChange={(event) => update('cover_charge_amount', event.target.value)}
                placeholder="Amount per guest"
              />
            )}
          </div>

          <label className="rfield rfield-wide">
            <span className="rfield-label">Terms to show the guest at booking</span>
            <textarea
              rows={3}
              value={form.booking_terms}
              onChange={(event) => update('booking_terms', event.target.value)}
              placeholder="One per line — e.g. Table held for 15 minutes past the booking time"
            />
          </label>
        </div>
      </fieldset>

      {/* ---------- Offers ---------- */}
      <fieldset className="rform-section">
        <legend>7. Offers (optional)</legend>
        <p className="rform-note">Add any offer the restaurant is currently running.</p>

        {offers.map((offer, index) => (
          <div key={index} className="roffer">
            <div className="roffer-head">
              <strong>Offer {index + 1}</strong>
              <button
                type="button"
                className="roffer-remove"
                onClick={() => setOffers((previous) => previous.filter((_, i) => i !== index))}
              >
                <i className="fas fa-xmark" /> Remove
              </button>
            </div>

            <div className="rform-grid">
              <label className="rfield">
                <span className="rfield-label">Title</span>
                <input
                  type="text"
                  value={offer.title}
                  onChange={(event) =>
                    setOffers((previous) =>
                      previous.map((item, i) =>
                        i === index ? { ...item, title: event.target.value } : item
                      )
                    )
                  }
                  placeholder="20% off on weekdays"
                />
              </label>

              <label className="rfield">
                <span className="rfield-label">Type</span>
                <select
                  value={offer.offer_type}
                  onChange={(event) =>
                    setOffers((previous) =>
                      previous.map((item, i) =>
                        i === index ? { ...item, offer_type: event.target.value } : item
                      )
                    )
                  }
                >
                  {OFFER_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="rfield">
                <span className="rfield-label">
                  {offer.offer_type === 'percentage' ? 'Discount %' : 'Amount'}
                </span>
                <input
                  type="number"
                  min="0"
                  value={offer.discount_value}
                  onChange={(event) =>
                    setOffers((previous) =>
                      previous.map((item, i) =>
                        i === index ? { ...item, discount_value: event.target.value } : item
                      )
                    )
                  }
                />
              </label>

              <label className="rfield">
                <span className="rfield-label">Minimum spend</span>
                <input
                  type="number"
                  min="0"
                  value={offer.min_spend}
                  onChange={(event) =>
                    setOffers((previous) =>
                      previous.map((item, i) =>
                        i === index ? { ...item, min_spend: event.target.value } : item
                      )
                    )
                  }
                />
              </label>

              <label className="rfield">
                <span className="rfield-label">Starts</span>
                <input
                  type="date"
                  value={offer.start_at}
                  onChange={(event) =>
                    setOffers((previous) =>
                      previous.map((item, i) =>
                        i === index ? { ...item, start_at: event.target.value } : item
                      )
                    )
                  }
                />
              </label>

              <label className="rfield">
                <span className="rfield-label">Ends</span>
                <input
                  type="date"
                  value={offer.end_at}
                  onChange={(event) =>
                    setOffers((previous) =>
                      previous.map((item, i) =>
                        i === index ? { ...item, end_at: event.target.value } : item
                      )
                    )
                  }
                />
              </label>

              <label className="rfield rfield-wide">
                <span className="rfield-label">Details</span>
                <input
                  type="text"
                  value={offer.description}
                  onChange={(event) =>
                    setOffers((previous) =>
                      previous.map((item, i) =>
                        i === index ? { ...item, description: event.target.value } : item
                      )
                    )
                  }
                  placeholder="Anything the guest should know about this offer"
                />
              </label>
            </div>
          </div>
        ))}

        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => setOffers((previous) => [...previous, emptyOffer()])}
        >
          <i className="fas fa-plus" /> Add an offer
        </button>
      </fieldset>

      <div className="rform-footer" ref={errorRef}>
        {error && (
          <div className="form-success form-error">
            <i className="fas fa-circle-exclamation" /> {error}
          </div>
        )}
        <button type="submit" className="btn btn-primary btn-full" disabled={submitting}>
          {submitting ? 'Submitting…' : 'Submit for Review →'}
        </button>
        <p className="launch-fineprint">
          Fields marked * are required. The restaurant stays pending until approved.
        </p>
      </div>
    </form>
  );
}

type UploaderProps = {
  id: string;
  title: string;
  hint: string;
  files: File[];
  onAdd: (files: FileList | null) => void;
  onRemove: (index: number) => void;
};

function PhotoUploader({ id, title, hint, files, onAdd, onRemove }: UploaderProps) {
  // Object URLs are created per render pass of the file list and revoked on change.
  const previews = useMemo(() => files.map((file) => URL.createObjectURL(file)), [files]);

  useEffect(() => {
    return () => previews.forEach((url) => URL.revokeObjectURL(url));
  }, [previews]);

  return (
    <div className="rupload">
      <div className="rupload-head">
        <span className="rfield-label">{title}</span>
        <span className="rfield-hint">{hint}</span>
      </div>

      {/* The input sits outside the label — nesting it while also setting
          htmlFor makes some browsers fire the activation twice. */}
      <input
        id={id}
        className="rupload-input"
        type="file"
        accept="image/*"
        multiple
        onChange={(event) => {
          onAdd(event.target.files);
          // Reset so picking the same file again still fires onChange.
          event.target.value = '';
        }}
      />
      <label className="rupload-drop" htmlFor={id}>
        <i className="fas fa-cloud-arrow-up" />
        <span>{files.length ? `${files.length} selected — add more` : 'Choose photos'}</span>
      </label>

      {previews.length > 0 && (
        <div className="rupload-grid">
          {previews.map((src, index) => (
            <div key={src} className="rupload-thumb">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`${title} ${index + 1}`} />
              <button
                type="button"
                aria-label={`Remove photo ${index + 1}`}
                onClick={() => onRemove(index)}
              >
                <i className="fas fa-xmark" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
