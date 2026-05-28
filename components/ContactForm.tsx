'use client';

import emailjs from '@emailjs/browser';
import { useMemo, useRef, useState } from 'react';

const audiences = [
  { key: 'consumer', label: "I'm a Consumer", icon: '👤', placeholder: "I'd love to learn more about memberships and savings..." },
  { key: 'merchant', label: "I'm a Merchant", icon: '🍽️', placeholder: "I'd love to list my venue and use the booking tools..." },
  { key: 'corporate', label: "I'm a Corporate", icon: '🏢', placeholder: "I'd love to explore staff benefits and rewards..." },
  { key: 'bank', label: "I'm a Bank / Financial Institution", icon: '🏦', placeholder: "I'd like to discuss app integration and loyalty..." },
] as const;

type AudienceKey = (typeof audiences)[number]['key'];

const EMAILJS_CONFIG = {
  publicKey: 'Q1tzdXAu-5wxCLarG',
  serviceId: 'service_zkpw3gm',
  templateId: 'template_k5kth6u',
};

export function ContactForm() {
  const [selectedAudience, setSelectedAudience] = useState<AudienceKey | ''>('merchant');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const selectedPlaceholder = useMemo(
    () => audiences.find((audience) => audience.key === selectedAudience)?.placeholder ?? audiences[1].placeholder,
    [selectedAudience]
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorVisible(false);
    setSubmitted(false);

    if (!formRef.current) {
      return;
    }

    setSubmitting(true);

    try {
      await emailjs.sendForm(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        formRef.current,
        { publicKey: EMAILJS_CONFIG.publicKey }
      );

      formRef.current.reset();
      setSelectedAudience('merchant');
      setSubmitted(true);
    } catch (error) {
      console.error('EmailJS send failed:', error);
      setErrorVisible(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="section-gap section-dark">
      <div className="container">
        <div className="section-label light">Let's Talk</div>
        <h2 className="section-title light">Ready to Build<br /><em>Something Big?</em></h2>
        <p className="section-intro light">
          Whether you're a merchant who wants to fill more tables, a corporate looking for the perfect employee
          benefit, or a financial institution ready to drive daily engagement - we'd love to hear from you.
        </p>

        <div className="contact-layout">
          <div className="contact-options">
            {audiences.map((audience) => (
              <button
                key={audience.key}
                type="button"
                className={`contact-option ${selectedAudience === audience.key ? 'selected' : ''}`}
                onClick={() => setSelectedAudience(audience.key)}
              >
                <div className="co-icon">{audience.icon}</div>
                <div className="co-label">{audience.label}</div>
              </button>
            ))}
          </div>

          <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
            <input type="hidden" id="audienceType" name="audience_type" value={selectedAudience} />
            <input type="hidden" name="submitted_at" id="submittedAt" value={submitted ? new Date().toLocaleString() : ''} />

            <div className="form-row">
              <div className="form-group">
                <label>Your Name</label>
                <input type="text" name="user_name" placeholder="Bruno Martins" required />
              </div>
              <div className="form-group">
                <label>Company / Business</label>
                <input type="text" name="company_name" placeholder="Le Chamarel Restaurant" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="user_email" placeholder="hello@yourcompany.mu" required />
              </div>
              <div className="form-group">
                <label>Phone (optional)</label>
                <input type="tel" name="user_phone" placeholder="+230 xxx xxxx" />
              </div>
            </div>

            <div className="form-group full">
              <label>Tell us a bit about what you're looking for</label>
              <textarea
                name="message"
                rows={4}
                placeholder={selectedPlaceholder}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-full" id="contactSubmitButton" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Send Message →'}
            </button>

            <div id="formSuccess" className={`form-success ${submitted ? '' : 'hidden'}`}>
              <i className="fas fa-check-circle" /> Thank you. Your message has been submitted successfully.
            </div>
            <div id="formError" className={`form-success form-error ${errorVisible ? '' : 'hidden'}`}>
              <i className="fas fa-circle-exclamation" /> We couldn't send your message right now. Please try again.
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
