import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { LOUNGE_INFO } from '../data/salonData';

interface HeaderProps {
  selectedCount: number;
  onOpenBooking: () => void;
}

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Craft', href: '#craft' },
  { label: 'Masters', href: '#masters' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Visit', href: '#visit' },
];

export function Header({ selectedCount, onOpenBooking }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#F7F7F5]/95 backdrop-blur-sm border-b border-[#DEDED8]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-element brand wordmark */}
        <a
          href="#top"
          className="font-serif text-[26px] font-medium tracking-[-0.01em] text-[#141416] whitespace-nowrap shrink-0"
        >
          {LOUNGE_INFO.shortWordmark}
        </a>

        {/* Zone 2: Five clean single-line navigation links */}
        <nav aria-label="Primary" className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[14px] font-medium text-[#55555C] hover:text-[#141416] relative py-1 transition-colors duration-150 whitespace-nowrap shrink-0 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1px] after:bg-[#6B1D2F] after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenBooking}
            className="px-5 py-2.5 text-[13px] font-medium text-white bg-[#6B1D2F] hover:bg-[#521422] transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[40px]"
          >
            {selectedCount > 0 ? `Book Appointment (${selectedCount})` : 'Book Appointment'}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 text-[#141416] hover:bg-[#EEEEEA] transition-colors duration-150 shrink-0"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile"
          className="md:hidden border-t border-[#DEDED8] bg-[#F7F7F5] px-6 py-4"
        >
          <div className="flex flex-col divide-y divide-[#DEDED8]">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 text-[15px] font-medium text-[#141416] hover:text-[#6B1D2F] transition-colors whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
