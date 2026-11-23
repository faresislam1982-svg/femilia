import { useState, useEffect, useMemo, type FormEvent } from 'react';
import { X, Check, Plus, Trash2, ArrowLeft, ArrowRight } from 'lucide-react';
import {
  SALON_SERVICES,
  SALON_MASTERS,
  TIME_SLOTS,
  LOUNGE_INFO,
  formatAed,
} from '../data/salonData';
import { ResilientImage } from './ResilientImage';

interface BookingDrawerProps {
  isOpen: boolean;
  selectedServiceIds: string[];
  preferredMasterId: string | null;
  onClose: () => void;
  onToggleService: (serviceId: string) => void;
  onClearSelection: () => void;
}

type BookingStep = 1 | 2 | 3 | 4;

interface DateOption {
  iso: string;
  weekday: string;
  dayNum: string;
  month: string;
  fullLabel: string;
}

function getUpcomingDates(count: number): DateOption[] {
  const results: DateOption[] = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const iso = d.toISOString().split('T')[0];
    const weekday =
      i === 0
        ? 'Today'
        : i === 1
          ? 'Tomorrow'
          : d.toLocaleDateString('en-GB', { weekday: 'short' });
    const dayNum = d.toLocaleDateString('en-GB', { day: '2-digit' });
    const month = d.toLocaleDateString('en-GB', { month: 'short' });
    const fullLabel = d.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
    results.push({ iso, weekday, dayNum, month, fullLabel });
  }
  return results;
}

export function BookingDrawer({
  isOpen,
  selectedServiceIds,
  preferredMasterId,
  onClose,
  onToggleService,
  onClearSelection,
}: BookingDrawerProps) {
  const upcomingDates = useMemo(() => getUpcomingDates(10), []);

  const [step, setStep] = useState<BookingStep>(1);
  const [includeRemoval, setIncludeRemoval] = useState(false);
  const [selectedMasterId, setSelectedMasterId] = useState<string>('any');
  const [selectedDateIso, setSelectedDateIso] = useState<string>(
    upcomingDates[1]?.iso ?? upcomingDates[0].iso
  );
  const [selectedTime, setSelectedTime] = useState<string>('12:15');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestNotes, setGuestNotes] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [confirmationCode, setConfirmationCode] = useState<string | null>(null);

  // Sync preferred master when drawer opens from a master card or lookbook item
  useEffect(() => {
    if (isOpen) {
      setSelectedMasterId(preferredMasterId || 'any');
      setFormError(null);
      if (step === 4) {
        setStep(1);
        setConfirmationCode(null);
      }
    }
  }, [isOpen, preferredMasterId]);

  // Escape key & scroll lock
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const selectedServices = SALON_SERVICES.filter((s) =>
    selectedServiceIds.includes(s.id)
  );
  const removalPrice = includeRemoval ? 35 : 0;
  const removalDuration = includeRemoval ? 15 : 0;
  const totalPrice =
    selectedServices.reduce((sum, s) => sum + s.price, 0) + removalPrice;
  const totalDuration =
    selectedServices.reduce((sum, s) => sum + s.durationMin, 0) + removalDuration;

  const selectedDateObj =
    upcomingDates.find((d) => d.iso === selectedDateIso) ?? upcomingDates[0];
  const assignedMaster =
    selectedMasterId === 'any'
      ? null
      : SALON_MASTERS.find((m) => m.id === selectedMasterId) ?? null;

  const handleConfirmBooking = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = guestName.trim();
    const trimmedPhone = guestPhone.trim();
    const trimmedEmail = guestEmail.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (trimmedName.length < 2) {
      setFormError('Please enter your full name.');
      return;
    }
    if (trimmedPhone.length < 7) {
      setFormError('Please enter a valid mobile number for SMS appointment reminders.');
      return;
    }
    if (!emailPattern.test(trimmedEmail)) {
      setFormError('Please enter a valid email address for your booking confirmation.');
      return;
    }

    setFormError(null);
    const code = `FM-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmationCode(code);
    setStep(4);
  };

  const handleResetAndBookAnother = () => {
    onClearSelection();
    setIncludeRemoval(false);
    setGuestNotes('');
    setConfirmationCode(null);
    setStep(1);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-drawer-title"
      className="fixed inset-0 z-50 flex justify-end bg-[#141416]/55 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[540px] h-full bg-[#F7F7F5] border-l border-[#DEDED8] flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top drawer header */}
        <div className="px-6 py-5 border-b border-[#DEDED8] flex items-center justify-between gap-4 bg-[#FFFFFF]">
          <div>
            <p className="text-[12px] font-medium text-[#6B1D2F]">
              {LOUNGE_INFO.brandName}
            </p>
            <h2
              id="booking-drawer-title"
              className="font-serif text-[26px] font-medium leading-[1.15] text-[#141416]"
            >
              {step === 4 ? 'Reservation Confirmed' : 'Reserve Your Visit'}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close booking drawer"
            className="w-10 h-10 inline-flex items-center justify-center text-[#55555C] hover:text-[#141416] hover:bg-[#EEEEEA] transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Clean unboxed step progress bar */}
        {step !== 4 && (
          <div className="px-6 py-3.5 border-b border-[#DEDED8] bg-[#F7F7F5] flex items-center gap-3 text-[12px] overflow-x-auto">
            {[
              { num: 1 as BookingStep, label: '01. Treatments' },
              { num: 2 as BookingStep, label: '02. Master & Time' },
              { num: 3 as BookingStep, label: '03. Guest Details' },
            ].map((item, idx) => (
              <div key={item.num} className="flex items-center gap-3 shrink-0">
                {idx > 0 && (
                  <span aria-hidden="true" className="text-[#B8B8B0]">
                    /
                  </span>
                )}
                <button
                  type="button"
                  disabled={item.num > step && selectedServices.length === 0}
                  onClick={() => {
                    if (item.num < step || selectedServices.length > 0) {
                      setStep(item.num);
                    }
                  }}
                  className={`whitespace-nowrap transition-colors ${
                    step === item.num
                      ? 'font-semibold text-[#6B1D2F]'
                      : item.num < step
                        ? 'text-[#141416] hover:text-[#6B1D2F]'
                        : 'text-[#8A8A90]'
                  }`}
                >
                  {item.label}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* STEP 1: SELECT TREATMENTS */}
          {step === 1 && (
            <div className="space-y-6">
              {selectedServices.length > 0 && (
                <div className="bg-[#FFFFFF] border border-[#DEDED8] p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-sans text-[13px] font-semibold text-[#141416]">
                      Selected Treatments ({selectedServices.length})
                    </h3>
                    <button
                      type="button"
                      onClick={onClearSelection}
                      className="text-[12px] text-[#55555C] hover:text-[#6B1D2F] transition-colors"
                    >
                      Clear all
                    </button>
                  </div>

                  <div className="divide-y divide-[#EEEEEA]">
                    {selectedServices.map((service) => (
                      <div
                        key={service.id}
                        className="py-2.5 flex items-center justify-between gap-3"
                      >
                        <div>
                          <p className="text-[14px] font-medium text-[#141416]">
                            {service.name}
                          </p>
                          <p className="text-[12px] text-[#55555C] tabular-nums">
                            {service.durationMin} min · {formatAed(service.price)}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onToggleService(service.id)}
                          aria-label={`Remove ${service.name}`}
                          className="w-8 h-8 inline-flex items-center justify-center text-[#55555C] hover:text-[#8B1A2B] transition-colors shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <label className="pt-3 border-t border-[#EEEEEA] flex items-center justify-between gap-3 cursor-pointer">
                    <span className="flex items-center gap-2.5 text-[13px] text-[#141416]">
                      <input
                        type="checkbox"
                        checked={includeRemoval}
                        onChange={(e) => setIncludeRemoval(e.target.checked)}
                        className="w-4 h-4 accent-[#6B1D2F]"
                      />
                      <span>Include existing gel removal from another salon</span>
                    </span>
                    <span className="text-[12px] text-[#55555C] tabular-nums whitespace-nowrap">
                      +15 min · AED 35
                    </span>
                  </label>
                </div>
              )}

              <div>
                <h3 className="font-sans text-[13px] font-semibold text-[#141416] mb-3">
                  {selectedServices.length === 0
                    ? 'Choose one or more treatments to begin'
                    : 'Add another ritual to your visit'}
                </h3>

                <div className="border-t border-[#DEDED8] divide-y divide-[#DEDED8]">
                  {SALON_SERVICES.map((service) => {
                    const active = selectedServiceIds.includes(service.id);
                    return (
                      <div
                        key={service.id}
                        className="py-3.5 flex items-center justify-between gap-4"
                      >
                        <div className="min-w-0">
                          <p className="text-[12px] text-[#55555C]">
                            <span>{service.category}</span>
                            <span aria-hidden="true" className="mx-1.5 text-[#B8B8B0]">
                              ·
                            </span>
                            <span className="tabular-nums">{service.durationMin} min</span>
                          </p>
                          <p className="text-[14px] font-medium text-[#141416] truncate">
                            {service.name}
                          </p>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-[14px] font-semibold text-[#141416] tabular-nums whitespace-nowrap">
                            {formatAed(service.price)}
                          </span>
                          <button
                            type="button"
                            onClick={() => onToggleService(service.id)}
                            aria-label={
                              active ? `Remove ${service.name}` : `Add ${service.name}`
                            }
                            className={`inline-flex items-center justify-center w-9 h-9 border transition-colors ${
                              active
                                ? 'bg-[#141416] text-white border-[#141416]'
                                : 'bg-[#FFFFFF] text-[#141416] border-[#C8C8C0] hover:border-[#6B1D2F]'
                            }`}
                          >
                            {active ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <Plus className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: SPECIALIST, DATE & TIME */}
          {step === 2 && (
            <div className="space-y-8">
              {/* Specialist selector */}
              <div>
                <h3 className="font-sans text-[13px] font-semibold text-[#141416] mb-3">
                  Preferred Specialist
                </h3>
                <div className="space-y-2.5">
                  <button
                    type="button"
                    onClick={() => setSelectedMasterId('any')}
                    className={`w-full p-3.5 text-left border transition-colors flex items-center justify-between gap-3 ${
                      selectedMasterId === 'any'
                        ? 'bg-[#FFFFFF] border-[#6B1D2F]'
                        : 'bg-[#FFFFFF]/60 border-[#DEDED8] hover:border-[#141416]'
                    }`}
                  >
                    <div>
                      <p className="text-[14px] font-semibold text-[#141416]">
                        First Available Senior Master
                      </p>
                      <p className="text-[12px] text-[#55555C]">
                        Matched automatically to your selected treatment specialization
                      </p>
                    </div>
                    {selectedMasterId === 'any' && (
                      <Check className="w-4 h-4 text-[#6B1D2F] shrink-0" />
                    )}
                  </button>

                  {SALON_MASTERS.map((master) => {
                    const isSelected = selectedMasterId === master.id;
                    return (
                      <button
                        key={master.id}
                        type="button"
                        onClick={() => setSelectedMasterId(master.id)}
                        className={`w-full p-3 text-left border transition-colors flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'bg-[#FFFFFF] border-[#6B1D2F]'
                            : 'bg-[#FFFFFF]/60 border-[#DEDED8] hover:border-[#141416]'
                        }`}
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className="w-11 h-11 overflow-hidden bg-[#EEEEEA] shrink-0">
                            <ResilientImage
                              src={master.image}
                              alt={master.name}
                              fallbackLabel={master.firstName}
                              className="w-full h-full object-cover object-center"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[14px] font-semibold text-[#141416] truncate">
                              {master.name}
                            </p>
                            <p className="text-[12px] text-[#55555C] truncate">
                              {master.role} · {master.focusTag}
                            </p>
                          </div>
                        </div>
                        {isSelected && (
                          <Check className="w-4 h-4 text-[#6B1D2F] shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Date selector */}
              <div>
                <h3 className="font-sans text-[13px] font-semibold text-[#141416] mb-3">
                  Select Date
                </h3>
                <div className="grid grid-cols-5 gap-2">
                  {upcomingDates.map((date) => {
                    const active = selectedDateIso === date.iso;
                    return (
                      <button
                        key={date.iso}
                        type="button"
                        onClick={() => setSelectedDateIso(date.iso)}
                        className={`py-2.5 px-2 text-center border transition-colors ${
                          active
                            ? 'bg-[#6B1D2F] text-white border-[#6B1D2F]'
                            : 'bg-[#FFFFFF] text-[#141416] border-[#DEDED8] hover:border-[#141416]'
                        }`}
                      >
                        <span
                          className={`block text-[11px] truncate ${
                            active ? 'text-white/85' : 'text-[#55555C]'
                          }`}
                        >
                          {date.weekday}
                        </span>
                        <span className="block text-[16px] font-semibold tabular-nums mt-0.5">
                          {date.dayNum}
                        </span>
                        <span
                          className={`block text-[11px] ${
                            active ? 'text-white/85' : 'text-[#55555C]'
                          }`}
                        >
                          {date.month}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time selector */}
              <div>
                <h3 className="font-sans text-[13px] font-semibold text-[#141416] mb-3">
                  Available Arrival Times ({selectedDateObj.fullLabel})
                </h3>
                <div className="grid grid-cols-3 gap-2.5">
                  {TIME_SLOTS.map((slot) => {
                    const active = selectedTime === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTime(slot)}
                        className={`py-2.5 text-[13px] font-medium tabular-nums border transition-colors whitespace-nowrap min-h-[42px] ${
                          active
                            ? 'bg-[#141416] text-white border-[#141416]'
                            : 'bg-[#FFFFFF] text-[#141416] border-[#DEDED8] hover:border-[#141416]'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: GUEST DETAILS */}
          {step === 3 && (
            <form
              id="booking-confirm-form"
              onSubmit={handleConfirmBooking}
              noValidate
              className="space-y-6"
            >
              {/* Compact Appointment Summary */}
              <div className="bg-[#FFFFFF] border border-[#DEDED8] p-4 space-y-2 text-[13px]">
                <div className="flex justify-between gap-2">
                  <span className="text-[#55555C]">Date &amp; Time</span>
                  <span className="font-medium text-[#141416] tabular-nums">
                    {selectedDateObj.fullLabel} · {selectedTime}
                  </span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-[#55555C]">Specialist</span>
                  <span className="font-medium text-[#141416]">
                    {assignedMaster ? assignedMaster.name : 'First Available Senior Master'}
                  </span>
                </div>
                <div className="flex justify-between gap-2 pt-2 border-t border-[#EEEEEA]">
                  <span className="text-[#55555C]">
                    {selectedServices.length}{' '}
                    {selectedServices.length === 1 ? 'Treatment' : 'Treatments'}
                    {includeRemoval ? ' + Gel Removal' : ''}
                  </span>
                  <span className="font-semibold text-[#141416] tabular-nums">
                    {totalDuration} min · {formatAed(totalPrice)}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="booking-guest-name"
                    className="block text-[12px] font-medium text-[#141416] mb-1.5"
                  >
                    Full Name
                  </label>
                  <input
                    id="booking-guest-name"
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Victoria Smirnova"
                    className="w-full px-3.5 py-2.5 text-[14px] bg-[#FFFFFF] border border-[#D4D4CC] text-[#141416] placeholder:text-[#8A8A90] focus:border-[#6B1D2F] focus:outline-none min-h-[44px]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="booking-guest-phone"
                    className="block text-[12px] font-medium text-[#141416] mb-1.5"
                  >
                    Mobile Number
                  </label>
                  <input
                    id="booking-guest-phone"
                    type="tel"
                    required
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    placeholder="+971 50 123 4567"
                    className="w-full px-3.5 py-2.5 text-[14px] bg-[#FFFFFF] border border-[#D4D4CC] text-[#141416] placeholder:text-[#8A8A90] focus:border-[#6B1D2F] focus:outline-none min-h-[44px]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="booking-guest-email"
                    className="block text-[12px] font-medium text-[#141416] mb-1.5"
                  >
                    Email Address
                  </label>
                  <input
                    id="booking-guest-email"
                    type="email"
                    required
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    placeholder="victoria@example.com"
                    className="w-full px-3.5 py-2.5 text-[14px] bg-[#FFFFFF] border border-[#D4D4CC] text-[#141416] placeholder:text-[#8A8A90] focus:border-[#6B1D2F] focus:outline-none min-h-[44px]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="booking-guest-notes"
                    className="block text-[12px] font-medium text-[#141416] mb-1.5"
                  >
                    Treatment Preferences (Optional)
                  </label>
                  <textarea
                    id="booking-guest-notes"
                    rows={3}
                    value={guestNotes}
                    onChange={(e) => setGuestNotes(e.target.value)}
                    placeholder="Preferred nail shape, sensitivities, or quiet appointment preference..."
                    className="w-full px-3.5 py-2.5 text-[14px] bg-[#FFFFFF] border border-[#D4D4CC] text-[#141416] placeholder:text-[#8A8A90] focus:border-[#6B1D2F] focus:outline-none resize-y"
                  />
                </div>
              </div>

              {formError && (
                <p
                  role="alert"
                  className="text-[13px] font-medium text-[#8B1A2B] bg-[#FDF2F4] border border-[#F3C6CE] px-3.5 py-2.5"
                >
                  {formError}
                </p>
              )}

              <p className="text-[12px] leading-[1.55] text-[#55555C]">
                No upfront deposit required today. Complimentary cancellation or rescheduling up
                to 24 hours before arrival.
              </p>
            </form>
          )}

          {/* STEP 4: CONFIRMATION RECEIPT */}
          {step === 4 && confirmationCode && (
            <div className="space-y-6 py-2">
              <div className="space-y-2">
                <p className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#6B1D2F]">
                  <Check className="w-4 h-4" aria-hidden="true" />
                  <span>Confirmed · Booking Reference {confirmationCode}</span>
                </p>
                <h3 className="font-serif text-[30px] font-medium leading-[1.15] text-[#141416]">
                  We look forward to welcoming you, {guestName.trim()}.
                </h3>
                <p className="text-[14px] text-[#55555C]">
                  A calendar invitation and arrival instructions have been prepared for{' '}
                  <span className="text-[#141416] font-medium">{guestEmail}</span>.
                </p>
              </div>

              <div className="bg-[#FFFFFF] border border-[#DEDED8] p-5 space-y-3 text-[13px]">
                <div className="flex justify-between gap-2">
                  <span className="text-[#55555C]">Date</span>
                  <span className="font-medium text-[#141416]">
                    {selectedDateObj.fullLabel}
                  </span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-[#55555C]">Arrival Time</span>
                  <span className="font-medium text-[#141416] tabular-nums">
                    {selectedTime}
                  </span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-[#55555C]">Specialist</span>
                  <span className="font-medium text-[#141416]">
                    {assignedMaster ? assignedMaster.name : 'First Available Senior Master'}
                  </span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-[#55555C]">Location</span>
                  <span className="text-[#141416] text-right">
                    {LOUNGE_INFO.addressLine1}, {LOUNGE_INFO.addressLine2}
                  </span>
                </div>

                <div className="pt-3 border-t border-[#EEEEEA] space-y-1.5">
                  {selectedServices.map((s) => (
                    <div key={s.id} className="flex justify-between gap-2">
                      <span className="text-[#141416]">{s.name}</span>
                      <span className="text-[#141416] tabular-nums whitespace-nowrap">
                        {formatAed(s.price)}
                      </span>
                    </div>
                  ))}
                  {includeRemoval && (
                    <div className="flex justify-between gap-2">
                      <span className="text-[#141416]">Existing Gel Removal</span>
                      <span className="text-[#141416] tabular-nums whitespace-nowrap">
                        AED 35
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-[#DEDED8] flex justify-between items-baseline">
                  <span className="font-semibold text-[#141416]">
                    Total incl. 5% VAT ({totalDuration} min)
                  </span>
                  <span className="text-[18px] font-semibold text-[#141416] tabular-nums whitespace-nowrap">
                    {formatAed(totalPrice)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleResetAndBookAnother}
                  className="flex-1 px-5 py-3 text-[13px] font-medium text-[#141416] border border-[#C8C8C0] hover:border-[#141416] transition-colors whitespace-nowrap min-h-[44px]"
                >
                  Book Another Visit
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-5 py-3 text-[13px] font-medium text-white bg-[#6B1D2F] hover:bg-[#521422] transition-colors whitespace-nowrap min-h-[44px]"
                >
                  Return to Lounge
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom sticky action footer (Steps 1–3) */}
        {step !== 4 && (
          <div className="px-6 py-4 border-t border-[#DEDED8] bg-[#FFFFFF] flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[12px] text-[#55555C] tabular-nums">
                {selectedServices.length === 0
                  ? 'No treatment selected'
                  : `${selectedServices.length} ${
                      selectedServices.length === 1 ? 'treatment' : 'treatments'
                    } · ${totalDuration} min`}
              </p>
              <p className="text-[18px] font-semibold text-[#141416] tabular-nums whitespace-nowrap">
                {formatAed(totalPrice)}
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep((s) => (s - 1) as BookingStep)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-[13px] font-medium text-[#141416] border border-[#C8C8C0] hover:border-[#141416] transition-colors whitespace-nowrap min-h-[44px]"
                >
                  <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Back</span>
                </button>
              )}

              {step === 1 && (
                <button
                  type="button"
                  disabled={selectedServices.length === 0}
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-medium text-white bg-[#6B1D2F] hover:bg-[#521422] disabled:bg-[#C8C8C0] disabled:cursor-not-allowed transition-colors whitespace-nowrap min-h-[44px]"
                >
                  <span>Choose Time</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              )}

              {step === 2 && (
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-medium text-white bg-[#6B1D2F] hover:bg-[#521422] transition-colors whitespace-nowrap min-h-[44px]"
                >
                  <span>Guest Details</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              )}

              {step === 3 && (
                <button
                  type="submit"
                  form="booking-confirm-form"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-medium text-white bg-[#6B1D2F] hover:bg-[#521422] transition-colors whitespace-nowrap min-h-[44px]"
                >
                  <span>Confirm Reservation</span>
                  <Check className="w-4 h-4" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
