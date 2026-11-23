import { ArrowRight } from 'lucide-react';
import { SALON_IMAGES, LOUNGE_INFO } from '../data/salonData';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  onOpenBooking: () => void;
}

const STUDIO_STANDARDS = [
  {
    index: '01',
    label: 'Rated 5.0 on Google',
    detail: '16 verified five-star reviews from returning Abu Dhabi guests',
  },
  {
    index: '02',
    label: 'Nails, Lashes, Brows & Henna',
    detail: 'Precision nail extensions, rose & jelly pedicures, weightless lashes',
  },
  {
    index: '03',
    label: 'Al Nahyan, Abu Dhabi',
    detail: 'Al Jiwa Street, Zone 1 — spotless, welcoming ladies-only sanctuary',
  },
  {
    index: '04',
    label: 'Open Daily 11:00 – 22:00',
    detail: 'Seven days a week with private velvet wingback spa suites',
  },
];

export function HeroSection({ onOpenBooking }: HeroSectionProps) {
  return (
    <section id="top" className="border-b border-[#DEDED8]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 pt-10 pb-12 lg:pt-16 lg:pb-16">
        {/* Balanced 2-column editorial split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between py-2 lg:py-6">
            <div>
              <p className="text-[13px] font-medium text-[#55555C] tracking-[0.02em] mb-6">
                <span>{LOUNGE_INFO.brandName}</span>
                <span aria-hidden="true" className="mx-2 text-[#B8B8B0]">
                  ·
                </span>
                <span>{LOUNGE_INFO.cityLabel}</span>
                <span aria-hidden="true" className="mx-2 text-[#B8B8B0]">
                  ·
                </span>
                <span className="tabular-nums">
                  {LOUNGE_INFO.ratingScore}★ ({LOUNGE_INFO.reviewCount} Reviews)
                </span>
              </p>

              <h1 className="font-serif text-[clamp(2.6rem,4.4vw,4.1rem)] font-medium leading-[1.06] tracking-[-0.02em] text-[#141416] text-balance max-w-[16ch]">
                Beauty Is All About the Details.
              </h1>

              <p className="mt-6 text-[16px] leading-[1.65] text-[#55555C] max-w-[50ch]">
                Located on Al Jiwa Street in Al Nahyan, Abu Dhabi, Femelia Beauty Lounge offers
                precision nail extensions, Russian gel manicures, rose and citrus jelly spa
                pedicures, weightless lashes, brows, and bespoke henna in a calm, welcoming space.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-6">
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-[14px] font-medium text-white bg-[#6B1D2F] hover:bg-[#521422] transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[46px]"
                >
                  <span>Book Appointment</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>

                <a
                  href="#services"
                  className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#141416] hover:text-[#6B1D2F] border-b border-[#141416] hover:border-[#6B1D2F] pb-1 transition-colors duration-150 whitespace-nowrap shrink-0"
                >
                  Explore AED Menu
                </a>
              </div>
            </div>

            <div className="mt-12 pt-6 border-t border-[#DEDED8] flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-[#55555C]">
              <span>Al Jiwa Street, Al Nahyan</span>
              <span aria-hidden="true" className="text-[#B8B8B0]">
                ·
              </span>
              <a
                href={`tel:${LOUNGE_INFO.phoneRaw}`}
                className="hover:text-[#141416] transition-colors tabular-nums"
              >
                {LOUNGE_INFO.phone}
              </a>
              <span aria-hidden="true" className="text-[#B8B8B0]">
                ·
              </span>
              <span className="tabular-nums">Daily 11:00 – 22:00</span>
            </div>
          </div>

          {/* Right: Real Femelia Beauty Lounge interior photography */}
          <div className="lg:col-span-6">
            <div className="w-full h-full min-h-[400px] sm:min-h-[480px] lg:min-h-[560px] bg-[#EEEEEA] overflow-hidden">
              <ResilientImage
                src={SALON_IMAGES.loungeChairs}
                alt="Velvet wingback pedicure armchairs, brushed brass faucets, stone soaking bowls, and fresh red roses inside Femelia Beauty Lounge in Al Nahyan, Abu Dhabi"
                fallbackLabel="Femelia Beauty Lounge Interior"
                loading="eager"
                className="w-full h-full lg:h-full object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* Full-width 4-column standards bar below hero split */}
        <div className="mt-12 lg:mt-16 pt-8 border-t border-[#DEDED8] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {STUDIO_STANDARDS.map((item) => (
            <div key={item.index} className="space-y-1.5">
              <div className="flex items-baseline gap-2.5">
                <span className="text-[12px] font-medium text-[#6B1D2F] tabular-nums">
                  {item.index}.
                </span>
                <h2 className="font-sans text-[15px] font-semibold text-[#141416]">
                  {item.label}
                </h2>
              </div>
              <p className="text-[13px] leading-[1.55] text-[#55555C] pl-6">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
