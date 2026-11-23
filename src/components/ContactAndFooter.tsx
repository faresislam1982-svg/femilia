import { useState, type FormEvent } from 'react';
import { Check, ArrowRight, ExternalLink } from 'lucide-react';
import { LOUNGE_INFO } from '../data/salonData';

interface ContactAndFooterProps {
  onOpenBooking: () => void;
}

interface InquiryFormState {
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
}

export function ContactAndFooter({ onOpenBooking }: ContactAndFooterProps) {
  const [form, setForm] = useState<InquiryFormState>({
    name: '',
    email: '',
    phone: '',
    topic: 'Bridal / Group Spa Booking',
    message: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = form.name.trim();
    const trimmedEmail = form.email.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (trimmedName.length < 2) {
      setError('Please enter your full name.');
      return;
    }
    if (!emailPattern.test(trimmedEmail)) {
      setError('Please enter a valid email address so our reception can reply.');
      return;
    }
    if (form.message.trim().length < 8) {
      setError('Please include a brief note about your preferred date or request.');
      return;
    }

    setError(null);
    const refNumber = `INQ-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedRef(refNumber);
  };

  return (
    <>
      <section id="visit" className="py-20 lg:py-28 border-b border-[#DEDED8]">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left column: Real Al Nahyan Location, Hours, Direct Phone & Instagram */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <p className="text-[13px] font-medium text-[#6B1D2F] mb-3">
                  05. Visit Femelia
                </p>
                <h2 className="font-serif text-[clamp(2rem,3.4vw,3.1rem)] font-medium leading-[1.1] tracking-[-0.015em] text-[#141416] text-balance">
                  Al Nahyan Sanctuary, Abu Dhabi
                </h2>
                <p className="mt-4 text-[15px] leading-[1.65] text-[#55555C]">
                  Visit us on Al Jiwa Street in Al Nahyan – Zone 1. Open daily from 11:00 AM to
                  10:00 PM for nail artistry, botanical rose and citrus jelly spa pedicures,
                  lashes, brows, and henna.
                </p>
              </div>

              <div className="space-y-6 pt-6 border-t border-[#DEDED8] text-[14px]">
                <div>
                  <h3 className="font-sans text-[12px] font-semibold text-[#55555C] mb-1.5">
                    Address
                  </h3>
                  <p className="text-[#141416]">{LOUNGE_INFO.addressLine1}</p>
                  <p className="text-[#141416]">{LOUNGE_INFO.addressLine2}</p>
                  <a
                    href={LOUNGE_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#6B1D2F] hover:text-[#141416] transition-colors"
                  >
                    <span>Open Directions in Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>

                <div>
                  <h3 className="font-sans text-[12px] font-semibold text-[#55555C] mb-2">
                    Opening Hours
                  </h3>
                  <dl className="space-y-1.5">
                    {LOUNGE_INFO.hours.map((row) => (
                      <div key={row.days} className="flex justify-between gap-4 max-w-[320px]">
                        <dt className="text-[#55555C]">{row.days}</dt>
                        <dd className="text-[#141416] font-medium tabular-nums">
                          {row.time}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div>
                  <h3 className="font-sans text-[12px] font-semibold text-[#55555C] mb-1.5">
                    Direct Reception &amp; Social
                  </h3>
                  <p>
                    <a
                      href={`tel:${LOUNGE_INFO.phoneRaw}`}
                      className="text-[#141416] hover:text-[#6B1D2F] transition-colors tabular-nums font-medium"
                    >
                      {LOUNGE_INFO.phone}
                    </a>
                  </p>
                  <p className="mt-1">
                    <a
                      href={LOUNGE_INFO.instagramUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#55555C] hover:text-[#141416] transition-colors"
                    >
                      Instagram {LOUNGE_INFO.instagram}
                    </a>
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={onOpenBooking}
                    className="inline-flex items-center gap-2 px-6 py-3 text-[13px] font-medium text-white bg-[#6B1D2F] hover:bg-[#521422] transition-colors duration-150 whitespace-nowrap min-h-[44px]"
                  >
                    <span>Reserve an Appointment</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>

                  <a
                    href={LOUNGE_INFO.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 text-[13px] font-medium text-[#141416] border border-[#C8C8C0] hover:border-[#141416] transition-colors duration-150 whitespace-nowrap min-h-[44px]"
                  >
                    <span>WhatsApp Desk</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right column: Private Concierge / Bridal / Gift Voucher Inquiry Form */}
            <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#DEDED8] p-7 sm:p-10">
              <div className="pb-6 border-b border-[#EEEEEA]">
                <h3 className="font-serif text-[28px] font-medium text-[#141416]">
                  Concierge &amp; Custom Event Inquiry
                </h3>
                <p className="mt-1.5 text-[14px] text-[#55555C]">
                  Planning bridal henna, a group spa pedicure afternoon, or a bespoke nail design?
                  Send a note directly to our Al Nahyan reception desk.
                </p>
              </div>

              {submittedRef ? (
                <div className="py-10 space-y-5">
                  <div className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#6B1D2F]">
                    <Check className="w-4 h-4" aria-hidden="true" />
                    <span>Inquiry Received · Reference {submittedRef}</span>
                  </div>
                  <h4 className="font-serif text-[26px] font-medium text-[#141416]">
                    Thank you, {form.name.trim()}.
                  </h4>
                  <p className="text-[14px] leading-[1.65] text-[#55555C] max-w-[48ch]">
                    Our reception desk has received your request regarding{' '}
                    <span className="text-[#141416] font-medium">{form.topic}</span> and will
                    respond to <span className="text-[#141416] font-medium">{form.email}</span>{' '}
                    shortly. For immediate confirmation, call or message us on{' '}
                    <span className="text-[#141416] font-medium tabular-nums">
                      {LOUNGE_INFO.phone}
                    </span>
                    .
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedRef(null);
                      setForm({
                        name: '',
                        email: '',
                        phone: '',
                        topic: 'Bridal / Group Spa Booking',
                        message: '',
                      });
                    }}
                    className="px-5 py-2.5 text-[13px] font-medium text-[#141416] border border-[#C8C8C0] hover:border-[#141416] transition-colors whitespace-nowrap min-h-[40px]"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="concierge-name"
                        className="block text-[12px] font-medium text-[#141416] mb-1.5"
                      >
                        Full Name
                      </label>
                      <input
                        id="concierge-name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Sara Al-Mansoori"
                        className="w-full px-3.5 py-2.5 text-[14px] bg-[#F7F7F5] border border-[#D4D4CC] text-[#141416] placeholder:text-[#8A8A90] focus:border-[#6B1D2F] focus:outline-none min-h-[44px]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="concierge-email"
                        className="block text-[12px] font-medium text-[#141416] mb-1.5"
                      >
                        Email Address
                      </label>
                      <input
                        id="concierge-email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="sara@example.com"
                        className="w-full px-3.5 py-2.5 text-[14px] bg-[#F7F7F5] border border-[#D4D4CC] text-[#141416] placeholder:text-[#8A8A90] focus:border-[#6B1D2F] focus:outline-none min-h-[44px]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="concierge-phone"
                        className="block text-[12px] font-medium text-[#141416] mb-1.5"
                      >
                        UAE Mobile / WhatsApp (Optional)
                      </label>
                      <input
                        id="concierge-phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+971 56 304 3400"
                        className="w-full px-3.5 py-2.5 text-[14px] bg-[#F7F7F5] border border-[#D4D4CC] text-[#141416] placeholder:text-[#8A8A90] focus:border-[#6B1D2F] focus:outline-none min-h-[44px]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="concierge-topic"
                        className="block text-[12px] font-medium text-[#141416] mb-1.5"
                      >
                        Inquiry Subject
                      </label>
                      <select
                        id="concierge-topic"
                        value={form.topic}
                        onChange={(e) => setForm({ ...form, topic: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-[14px] bg-[#F7F7F5] border border-[#D4D4CC] text-[#141416] focus:border-[#6B1D2F] focus:outline-none min-h-[44px]"
                      >
                        <option value="Bridal / Group Spa Booking">
                          Bridal / Group Spa Booking
                        </option>
                        <option value="Custom Nail Art / Extensions Quote">
                          Custom Nail Art / Extensions Quote
                        </option>
                        <option value="Bespoke Henna & Occasion Package">
                          Bespoke Henna &amp; Occasion Package
                        </option>
                        <option value="Gift Voucher Inquiry">Gift Voucher Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="concierge-message"
                      className="block text-[12px] font-medium text-[#141416] mb-1.5"
                    >
                      Message
                    </label>
                    <textarea
                      id="concierge-message"
                      rows={4}
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Share your preferred dates, number of guests, or treatment notes..."
                      className="w-full px-3.5 py-2.5 text-[14px] bg-[#F7F7F5] border border-[#D4D4CC] text-[#141416] placeholder:text-[#8A8A90] focus:border-[#6B1D2F] focus:outline-none resize-y"
                    />
                  </div>

                  {error && (
                    <p
                      role="alert"
                      className="text-[13px] font-medium text-[#8B1A2B] bg-[#FDF2F4] border border-[#F3C6CE] px-3.5 py-2.5"
                    >
                      {error}
                    </p>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                    <p className="text-[12px] text-[#55555C]">
                      Replies daily between 11:00 and 22:00 GST.
                    </p>
                    <button
                      type="submit"
                      className="px-6 py-3 text-[13px] font-medium text-white bg-[#141416] hover:bg-[#6B1D2F] transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[44px]"
                    >
                      Send Concierge Inquiry
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quiet Editorial Footer */}
      <footer className="py-12 bg-[#F7F7F5]">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <p className="font-serif text-[22px] font-medium text-[#141416]">
              {LOUNGE_INFO.brandName}
            </p>
            <p className="text-[12px] text-[#55555C]">
              {LOUNGE_INFO.addressLine1} · {LOUNGE_INFO.phone} · {LOUNGE_INFO.instagram}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-[#55555C]">
            <a href="#services" className="hover:text-[#141416] transition-colors whitespace-nowrap">
              Services
            </a>
            <a href="#craft" className="hover:text-[#141416] transition-colors whitespace-nowrap">
              Experience
            </a>
            <a href="#masters" className="hover:text-[#141416] transition-colors whitespace-nowrap">
              Specialists
            </a>
            <a href="#gallery" className="hover:text-[#141416] transition-colors whitespace-nowrap">
              Gallery
            </a>
            <button
              type="button"
              onClick={onOpenBooking}
              className="text-[#6B1D2F] hover:text-[#141416] font-medium transition-colors whitespace-nowrap"
            >
              Book Appointment
            </button>
          </div>
        </div>

        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 mt-8 pt-6 border-t border-[#DEDED8] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[12px] text-[#55555C]">
          <p>© {new Date().getFullYear()} {LOUNGE_INFO.brandName}. Al Nahyan, Abu Dhabi.</p>
          <p>Open daily 11:00 – 22:00 · Rated 5.0★ on Google Maps</p>
        </div>
      </footer>
    </>
  );
}
