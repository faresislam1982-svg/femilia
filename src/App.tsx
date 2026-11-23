/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ServiceMenuSection } from './components/ServiceMenuSection';
import { CraftAndProofSection } from './components/CraftAndProofSection';
import { MastersSection } from './components/MastersSection';
import { GallerySection } from './components/GallerySection';
import { ContactAndFooter } from './components/ContactAndFooter';
import { BookingDrawer } from './components/BookingDrawer';
import { SALON_SERVICES } from './data/salonData';

export default function App() {
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const [preferredMasterId, setPreferredMasterId] = useState<string | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  const handleToggleService = (serviceId: string) => {
    setSelectedServiceIds((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleOpenBooking = () => {
    setBookingOpen(true);
  };

  const handleBookSingleService = (serviceId: string) => {
    setSelectedServiceIds((prev) =>
      prev.includes(serviceId) ? prev : [...prev, serviceId]
    );
    setPreferredMasterId(null);
    setBookingOpen(true);
  };

  const handleBookMaster = (masterId: string) => {
    setPreferredMasterId(masterId);
    // If no services selected yet, pre-select the signature service for that master
    setSelectedServiceIds((prev) => {
      if (prev.length > 0) return prev;
      const defaultService = SALON_SERVICES.find((s) =>
        s.masterIds.includes(masterId)
      );
      return defaultService ? [defaultService.id] : prev;
    });
    setBookingOpen(true);
  };

  const handleBookLook = (serviceId: string, masterId: string) => {
    setSelectedServiceIds((prev) =>
      prev.includes(serviceId) ? prev : [...prev, serviceId]
    );
    setPreferredMasterId(masterId);
    setBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#141416] flex flex-col">
      <Header
        selectedCount={selectedServiceIds.length}
        onOpenBooking={handleOpenBooking}
      />

      <main className="flex-1">
        <HeroSection onOpenBooking={handleOpenBooking} />

        <ServiceMenuSection
          selectedServiceIds={selectedServiceIds}
          onToggleService={handleToggleService}
          onBookSingleService={handleBookSingleService}
          onOpenBooking={handleOpenBooking}
        />

        <CraftAndProofSection />

        <MastersSection onBookMaster={handleBookMaster} />

        <GallerySection onBookLook={handleBookLook} />

        <ContactAndFooter onOpenBooking={handleOpenBooking} />
      </main>

      <BookingDrawer
        isOpen={bookingOpen}
        selectedServiceIds={selectedServiceIds}
        preferredMasterId={preferredMasterId}
        onClose={() => setBookingOpen(false)}
        onToggleService={handleToggleService}
        onClearSelection={() => setSelectedServiceIds([])}
      />
    </div>
  );
}
