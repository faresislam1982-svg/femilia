import {
  CRAFT_PILLARS,
  CLIENT_TESTIMONIALS,
  SALON_IMAGES,
  LOUNGE_INFO,
} from '../data/salonData';
import { ResilientImage } from './ResilientImage';

export function CraftAndProofSection() {
  return (
    <section id="craft" className="py-20 lg:py-28 bg-[#EEEEEA]/65 border-b border-[#DEDED8]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        {/* Top editorial header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-[#DEDED8]">
          <div className="lg:col-span-6">
            <p className="text-[13px] font-medium text-[#6B1D2F] mb-3">
              02. The Femelia Experience
            </p>
            <h2 className="font-serif text-[clamp(2rem,3.4vw,3.1rem)] font-medium leading-[1.1] tracking-[-0.015em] text-[#141416] text-balance max-w-[20ch]">
              Craftsmanship, Warmth &amp; Spotless Care
            </h2>
          </div>
          <div className="lg:col-span-6 flex items-end">
            <p className="text-[15px] leading-[1.65] text-[#55555C] max-w-[54ch]">
              Every visit at Femelia Beauty Lounge is designed to be a calm, personal ritual—combining
              precise nail artistry, botanical rose and citrus jelly spa pedicures, weightless lashes,
              and welcoming Abu Dhabi hospitality.
            </p>
          </div>
        </div>

        {/* Asymmetric editorial grid: authentic Femelia imagery + numbered craft pillars */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left visual column: two authentic Femelia Beauty Lounge photos */}
          <div className="lg:col-span-6 space-y-6">
            <figure className="space-y-2.5">
              <div className="aspect-[4/4] w-full overflow-hidden bg-[#E5E5DF]">
                <ResilientImage
                  src={SALON_IMAGES.femeliaRingFloral}
                  alt="Signature floral almond nail extensions photographed with the gold Femelia ring inside Femelia Beauty Lounge"
                  fallbackLabel="Femelia Signature Nail Art"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <figcaption className="flex flex-wrap items-center justify-between gap-2 text-[12px] text-[#55555C]">
                <span>Signature Floral Almond Extensions · Femelia Beauty Lounge</span>
                <span className="tabular-nums">120 min · AED 280</span>
              </figcaption>
            </figure>

            <figure className="space-y-2.5">
              <div className="aspect-[4/4] w-full overflow-hidden bg-[#E5E5DF]">
                <ResilientImage
                  src={SALON_IMAGES.rosePedicureExperience}
                  alt="Guest relaxing in Femelia Beauty Lounge velvet armchair enjoying a steaming rose-infused botanical spa pedicure"
                  fallbackLabel="Rose Botanical Spa Pedicure"
                  className="w-full h-full object-cover object-[50%_65%]"
                />
              </div>
              <figcaption className="flex flex-wrap items-center justify-between gap-2 text-[12px] text-[#55555C]">
                <span>Rose Botanical Spa Pedicure &amp; Six-Bowl Ritual Tray</span>
                <span className="tabular-nums">75 min · AED 210</span>
              </figcaption>
            </figure>
          </div>

          {/* Right column: 3 numbered craft pillars */}
          <div className="lg:col-span-6 divide-y divide-[#DEDED8] border-t border-b border-[#DEDED8]">
            {CRAFT_PILLARS.map((pillar) => (
              <article key={pillar.index} className="py-8 first:pt-7 last:pb-7 space-y-3">
                <div className="flex items-baseline gap-3">
                  <span className="text-[13px] font-semibold text-[#6B1D2F] tabular-nums">
                    {pillar.index}.
                  </span>
                  <h3 className="font-serif text-[26px] font-medium leading-[1.15] text-[#141416]">
                    {pillar.title}
                  </h3>
                </div>
                <p className="text-[15px] leading-[1.65] text-[#55555C] pl-8">
                  {pillar.summary}
                </p>
                <p className="text-[13px] font-medium text-[#141416] pl-8 pt-1">
                  {pillar.metric}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* Claim-to-Proof Adjacency: Verified 5.0★ Google Maps Reviews */}
        <div className="mt-16 pt-12 border-t border-[#DEDED8]">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-8">
            <h3 className="font-serif text-[28px] font-medium text-[#141416]">
              Verified Google Guest Reviews
            </h3>
            <p className="text-[13px] text-[#55555C] tabular-nums">
              {LOUNGE_INFO.ratingScore}★ average across {LOUNGE_INFO.reviewCount} reviews on Google Maps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CLIENT_TESTIMONIALS.map((item) => (
              <blockquote
                key={item.id}
                className="bg-[#FFFFFF] border border-[#DEDED8] p-7 flex flex-col justify-between gap-6"
              >
                <div className="space-y-4">
                  <p className="text-[12px] font-medium text-[#6B1D2F]">
                    <span>{item.servicePerformed}</span>
                    <span aria-hidden="true" className="mx-1.5 text-[#B8B8B0]">
                      ·
                    </span>
                    <span className="text-[#55555C]">{item.outcome}</span>
                  </p>
                  <p className="text-[14px] leading-[1.65] text-[#141416]">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                <footer className="pt-4 border-t border-[#EEEEEA]">
                  <p className="text-[14px] font-semibold text-[#141416]">
                    {item.author}
                  </p>
                  <p className="text-[12px] text-[#55555C]">{item.context}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
