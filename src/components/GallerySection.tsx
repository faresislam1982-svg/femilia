import { useState, useEffect } from 'react';
import { X, ArrowRight, Expand } from 'lucide-react';
import {
  GALLERY_LOOKS,
  SALON_SERVICES,
  SALON_MASTERS,
  formatAed,
  type GalleryLook,
} from '../data/salonData';
import { ResilientImage } from './ResilientImage';

interface GallerySectionProps {
  onBookLook: (serviceId: string, masterId: string) => void;
}

const GALLERY_FILTERS: Array<'All' | GalleryLook['category']> = [
  'All',
  'Nails',
  'Spa Pedicure',
  'Lounge',
];

export function GallerySection({ onBookLook }: GallerySectionProps) {
  const [activeFilter, setActiveFilter] = useState<'All' | GalleryLook['category']>('All');
  const [activeLook, setActiveLook] = useState<GalleryLook | null>(null);

  useEffect(() => {
    if (!activeLook) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveLook(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLook]);

  const filteredLooks =
    activeFilter === 'All'
      ? GALLERY_LOOKS
      : GALLERY_LOOKS.filter((item) => item.category === activeFilter);

  const linkedService = activeLook
    ? SALON_SERVICES.find((s) => s.id === activeLook.serviceId)
    : null;
  const linkedMaster = activeLook
    ? SALON_MASTERS.find((m) => m.id === activeLook.masterId)
    : null;

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-[#EEEEEA]/45 border-b border-[#DEDED8]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-[#DEDED8]">
          <div>
            <p className="text-[13px] font-medium text-[#6B1D2F] mb-3">
              04. Real Salon Portfolio
            </p>
            <h2 className="font-serif text-[clamp(2rem,3.4vw,3.1rem)] font-medium leading-[1.1] tracking-[-0.015em] text-[#141416] text-balance max-w-[20ch]">
              Inside Femelia Beauty Lounge
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter gallery by category"
            className="flex flex-wrap items-center gap-1.5 p-1 bg-[#EEEEEA] w-fit"
          >
            {GALLERY_FILTERS.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3.5 py-2 text-[13px] font-medium transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[38px] ${
                    isActive
                      ? 'bg-[#FFFFFF] text-[#141416] shadow-[0_1px_2px_rgba(0,0,0,0.06)]'
                      : 'text-[#55555C] hover:text-[#141416]'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Clean 2-column (or 4-column on large screens) uniform portfolio grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredLooks.map((look) => {
            const service = SALON_SERVICES.find((s) => s.id === look.serviceId);
            return (
              <div key={look.id} className="group flex flex-col">
                <button
                  type="button"
                  onClick={() => setActiveLook(look)}
                  className="relative w-full aspect-[4/4] overflow-hidden bg-[#E5E5DF] text-left focus-visible:outline-2 focus-visible:outline-[#6B1D2F]"
                  aria-label={`Inspect ${look.title}`}
                >
                  <ResilientImage
                    src={look.image}
                    alt={look.title}
                    fallbackLabel={look.title}
                    className={`w-full h-full object-cover ${look.imagePosition || 'object-center'} transition-transform duration-300 group-hover:scale-[1.03]`}
                  />
                  <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#141416]/80 text-white text-[12px] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                    <Expand className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Inspect Look</span>
                  </span>
                </button>

                <div className="mt-4 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-[12px] text-[#55555C]">
                      <span className="font-medium text-[#6B1D2F]">{look.category}</span>
                      {service && (
                        <>
                          <span aria-hidden="true" className="mx-1.5 text-[#B8B8B0]">
                            ·
                          </span>
                          <span className="tabular-nums">
                            {service.durationMin} min · {formatAed(service.price)}
                          </span>
                        </>
                      )}
                    </p>
                    <h3 className="font-serif text-[23px] font-medium text-[#141416]">
                      {look.title}
                    </h3>
                    <p className="text-[13px] leading-[1.55] text-[#55555C] max-w-[50ch]">
                      {look.caption}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onBookLook(look.serviceId, look.masterId)}
                    className="text-[13px] font-medium text-[#6B1D2F] hover:text-[#141416] border-b border-[#6B1D2F] hover:border-[#141416] pb-0.5 transition-colors duration-150 whitespace-nowrap shrink-0 mt-1"
                  >
                    Book Look
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Lightbox Modal */}
      {activeLook && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          className="fixed inset-0 z-50 bg-[#141416]/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-8"
          onClick={() => setActiveLook(null)}
        >
          <div
            className="bg-[#F7F7F5] border border-[#DEDED8] max-w-4xl w-full overflow-hidden grid grid-cols-1 md:grid-cols-12"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="md:col-span-7 bg-[#E5E5DF] aspect-[4/4] md:aspect-auto max-h-[75vh]">
              <ResilientImage
                src={activeLook.image}
                alt={activeLook.title}
                fallbackLabel={activeLook.title}
                className={`w-full h-full object-cover ${activeLook.imagePosition || 'object-center'}`}
              />
            </div>

            <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between gap-6">
              <div>
                <div className="flex items-start justify-between gap-4">
                  <p className="text-[12px] font-medium text-[#6B1D2F]">
                    {activeLook.category}
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveLook(null)}
                    aria-label="Close lookbook detail"
                    className="w-9 h-9 inline-flex items-center justify-center text-[#55555C] hover:text-[#141416] hover:bg-[#EEEEEA] transition-colors -mt-1.5 -mr-1.5"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <h3
                  id="lightbox-title"
                  className="mt-2 font-serif text-[28px] font-medium leading-[1.15] text-[#141416]"
                >
                  {activeLook.title}
                </h3>

                <p className="mt-3 text-[14px] leading-[1.6] text-[#55555C]">
                  {activeLook.caption}
                </p>

                {linkedService && (
                  <div className="mt-6 pt-5 border-t border-[#DEDED8] space-y-2 text-[13px]">
                    <div className="flex justify-between gap-2">
                      <span className="text-[#55555C]">Treatment</span>
                      <span className="font-medium text-[#141416] text-right">
                        {linkedService.name}
                      </span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-[#55555C]">Duration</span>
                      <span className="text-[#141416] tabular-nums">
                        {linkedService.durationMin} minutes
                      </span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-[#55555C]">Investment</span>
                      <span className="font-semibold text-[#141416] tabular-nums">
                        {formatAed(linkedService.price)}
                      </span>
                    </div>
                    {linkedMaster && (
                      <div className="flex justify-between gap-2">
                        <span className="text-[#55555C]">Recommended Specialist</span>
                        <span className="text-[#141416]">{linkedMaster.name}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  const sId = activeLook.serviceId;
                  const mId = activeLook.masterId;
                  setActiveLook(null);
                  onBookLook(sId, mId);
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-[13px] font-medium text-white bg-[#6B1D2F] hover:bg-[#521422] transition-colors duration-150 whitespace-nowrap min-h-[44px]"
              >
                <span>Book This Look</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
