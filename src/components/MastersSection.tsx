import { ArrowRight } from 'lucide-react';
import { SALON_MASTERS } from '../data/salonData';
import { ResilientImage } from './ResilientImage';

interface MastersSectionProps {
  onBookMaster: (masterId: string) => void;
}

export function MastersSection({ onBookMaster }: MastersSectionProps) {
  return (
    <section id="masters" className="py-20 lg:py-28 border-b border-[#DEDED8]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-[#DEDED8]">
          <div>
            <p className="text-[13px] font-medium text-[#6B1D2F] mb-3">
              03. Our Specialists
            </p>
            <h2 className="font-serif text-[clamp(2rem,3.4vw,3.1rem)] font-medium leading-[1.1] tracking-[-0.015em] text-[#141416] text-balance max-w-[20ch]">
              Meet the Team Behind the Craft
            </h2>
          </div>
          <p className="text-[15px] leading-[1.6] text-[#55555C] max-w-[46ch]">
            Recognized by Abu Dhabi guests for gentle precision, creative nail artistry, and warm
            personal care—each featured alongside authentic work from our Al Nahyan lounge.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {SALON_MASTERS.map((master) => (
            <article key={master.id} className="flex flex-col justify-between">
              <div>
                <div className="aspect-[4/4] w-full overflow-hidden bg-[#EEEEEA] mb-6">
                  <ResilientImage
                    src={master.image}
                    alt={`${master.specialty} — ${master.name} at Femelia Beauty Lounge`}
                    fallbackLabel={master.name}
                    className={`w-full h-full object-cover ${master.imagePosition || 'object-center'} transition-transform duration-300 hover:scale-[1.02]`}
                  />
                </div>

                {/* Unboxed metadata line */}
                <p className="text-[12px] text-[#55555C] mb-2">
                  <span className="font-medium text-[#6B1D2F]">{master.role}</span>
                  <span aria-hidden="true" className="mx-1.5 text-[#B8B8B0]">
                    ·
                  </span>
                  <span>{master.focusTag}</span>
                </p>

                <h3 className="font-serif text-[28px] font-medium leading-[1.15] text-[#141416]">
                  {master.name}
                </h3>

                <p className="mt-3 text-[14px] leading-[1.65] text-[#55555C]">
                  {master.bio}
                </p>

                <p className="mt-3 text-[13px] text-[#141416]">
                  <span className="text-[#55555C]">Signature Focus: </span>
                  {master.specialty}
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-[#DEDED8]">
                <button
                  type="button"
                  onClick={() => onBookMaster(master.id)}
                  className="inline-flex items-center gap-2 text-[13px] font-medium text-[#141416] hover:text-[#6B1D2F] transition-colors duration-150 whitespace-nowrap min-h-[40px]"
                >
                  <span>Book with {master.firstName}</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
