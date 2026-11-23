import { useState } from 'react';
import { Check, Plus, ArrowRight } from 'lucide-react';
import {
  SALON_SERVICES,
  SERVICE_CATEGORIES,
  formatAed,
  type SalonService,
  type ServiceCategory,
} from '../data/salonData';

interface ServiceMenuSectionProps {
  selectedServiceIds: string[];
  onToggleService: (serviceId: string) => void;
  onBookSingleService: (serviceId: string) => void;
  onOpenBooking: () => void;
}

export function ServiceMenuSection({
  selectedServiceIds,
  onToggleService,
  onBookSingleService,
  onOpenBooking,
}: ServiceMenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('All');

  const filteredServices: SalonService[] =
    activeCategory === 'All'
      ? SALON_SERVICES
      : SALON_SERVICES.filter((s) => s.category === activeCategory);

  const selectedServices = SALON_SERVICES.filter((s) =>
    selectedServiceIds.includes(s.id)
  );
  const totalDuration = selectedServices.reduce((sum, s) => sum + s.durationMin, 0);
  const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);

  return (
    <section id="services" className="py-20 lg:py-28 border-b border-[#DEDED8]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-[#DEDED8]">
          <div>
            <p className="text-[13px] font-medium text-[#6B1D2F] mb-3">
              01. Curated Treatment Menu
            </p>
            <h2 className="font-serif text-[clamp(2rem,3.4vw,3.1rem)] font-medium leading-[1.1] tracking-[-0.015em] text-[#141416] text-balance max-w-[20ch]">
              Services &amp; Transparent Pricing
            </h2>
          </div>
          <p className="text-[15px] leading-[1.6] text-[#55555C] max-w-[44ch]">
            All rates are listed in UAE Dirhams (AED), inclusive of 5% VAT. Every visit includes
            diagnostic consultation, Class-B sterilized tools, and complimentary refreshments.
          </p>
        </div>

        {/* Interactive Category Filter Segmented Control */}
        <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div
            role="tablist"
            aria-label="Filter salon services by category"
            className="flex flex-wrap items-center gap-1.5 p-1 bg-[#EEEEEA] w-fit"
          >
            {SERVICE_CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 text-[13px] font-medium transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[38px] ${
                    isActive
                      ? 'bg-[#FFFFFF] text-[#141416] shadow-[0_1px_2px_rgba(0,0,0,0.06)]'
                      : 'text-[#55555C] hover:text-[#141416]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <p className="text-[13px] text-[#55555C] tabular-nums whitespace-nowrap">
            Showing {filteredServices.length}{' '}
            {filteredServices.length === 1 ? 'treatment' : 'treatments'}
          </p>
        </div>

        {/* Active multi-service selection bar */}
        {selectedServices.length > 0 && (
          <div className="mt-6 px-5 py-4 bg-[#FFFFFF] border border-[#DEDED8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[14px]">
              <span className="font-semibold text-[#141416]">
                Your Selected Session
              </span>
              <span aria-hidden="true" className="text-[#B8B8B0]">
                ·
              </span>
              <span className="text-[#55555C] tabular-nums">
                {selectedServices.length}{' '}
                {selectedServices.length === 1 ? 'treatment' : 'treatments'}
              </span>
              <span aria-hidden="true" className="text-[#B8B8B0]">
                ·
              </span>
              <span className="text-[#55555C] tabular-nums">{totalDuration} min</span>
              <span aria-hidden="true" className="text-[#B8B8B0]">
                ·
              </span>
              <span className="font-semibold text-[#141416] tabular-nums">
                {formatAed(totalPrice)}
              </span>
            </div>

            <button
              type="button"
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-[13px] font-medium text-white bg-[#6B1D2F] hover:bg-[#521422] transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[40px]"
            >
              <span>Continue to Time Selection</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        )}

        {/* Editorial Hairline Service List (Whitespace over Cards-within-Cards) */}
        <div className="mt-8 border-t border-[#DEDED8] divide-y divide-[#DEDED8]">
          {filteredServices.map((service) => {
            const isSelected = selectedServiceIds.includes(service.id);
            return (
              <div
                key={service.id}
                className="py-6 lg:py-7 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start lg:items-center hover:bg-[#FFFFFF]/60 transition-colors duration-150 px-2 -mx-2"
              >
                <div className="lg:col-span-7 space-y-2">
                  {/* Quiet unboxed metadata line */}
                  <div className="flex flex-wrap items-center gap-2 text-[12px] text-[#55555C]">
                    <span className="font-medium text-[#6B1D2F]">{service.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{service.durationMin} min</span>
                    <span aria-hidden="true">·</span>
                    <span>{service.finishNote}</span>
                  </div>

                  <h3 className="font-serif text-[23px] font-medium leading-[1.2] text-[#141416]">
                    {service.name}
                  </h3>

                  <p className="text-[14px] leading-[1.6] text-[#55555C] max-w-[62ch]">
                    {service.description}
                  </p>
                </div>

                <div className="lg:col-span-5 flex flex-wrap items-center justify-between lg:justify-end gap-4 sm:gap-6">
                  <div className="text-left lg:text-right">
                    <span className="block text-[20px] font-semibold text-[#141416] tabular-nums whitespace-nowrap">
                      {formatAed(service.price)}
                    </span>
                    <span className="block text-[12px] text-[#55555C] tabular-nums">
                      {service.durationMin} minutes
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => onToggleService(service.id)}
                      className={`inline-flex items-center gap-1.5 px-4 py-2.5 text-[13px] font-medium border transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[42px] ${
                        isSelected
                          ? 'bg-[#141416] text-white border-[#141416]'
                          : 'bg-transparent text-[#141416] border-[#C8C8C0] hover:border-[#141416]'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Add</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => onBookSingleService(service.id)}
                      className="px-4 py-2.5 text-[13px] font-medium text-[#6B1D2F] hover:text-white bg-transparent hover:bg-[#6B1D2F] border border-[#6B1D2F] transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[42px]"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
