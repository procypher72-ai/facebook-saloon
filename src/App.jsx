import { useState, useCallback } from 'react';
import OpeningPreloader from './components/OpeningPreloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LuxuryMarquee from './components/LuxuryMarquee';
import BrandFilmSection from './components/BrandFilmSection';
import ServicesSection from './components/ServicesSection';
import SalonCraftScrollStage from './components/SalonCraftScrollStage';
import TransformationShowcase from './components/TransformationShowcase';
import WhyChooseUs from './components/WhyChooseUs';
import SalonScrollDivider from './components/SalonScrollDivider';
import GallerySection from './components/GallerySection';
import SocialCommunitySection from './components/SocialCommunitySection';
import LocationBookingSection from './components/LocationBookingSection';
import Footer from './components/Footer';
import SalonScrollRail from './components/SalonScrollRail';
import ServiceComboEstimator from './components/ServiceComboEstimator';
import LuxuryCursor from './components/LuxuryCursor';
import { FloatingBackToTop } from './components/MotionPrimitives';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [introComplete, setIntroComplete] = useState(false);
  const [bookingPreset, setBookingPreset] = useState({
    id: 0,
    service: '',
    notes: '',
  });
  const [visitCombo, setVisitCombo] = useState([]);

  const handleFinishIntro = useCallback(() => {
    setShowIntro(false);
    setIntroComplete(true);
  }, []);

  const handleReplayIntro = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setShowIntro(true);
  }, []);

  const scrollToBooking = useCallback(() => {
    const bookEl = document.getElementById('book');
    if (bookEl) {
      bookEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleSelectService = useCallback(
    (serviceTitle, notes = '') => {
      setBookingPreset((prev) => ({
        id: prev.id + 1,
        service: serviceTitle,
        notes,
      }));
      scrollToBooking();
    },
    [scrollToBooking]
  );

  const handleToggleComboService = useCallback((service) => {
    setVisitCombo((prev) =>
      prev.some((item) => item.id === service.id)
        ? prev.filter((item) => item.id !== service.id)
        : [...prev, service]
    );
  }, []);

  const handleRemoveComboService = useCallback((serviceId) => {
    setVisitCombo((prev) => prev.filter((item) => item.id !== serviceId));
  }, []);

  const handleClearCombo = useCallback(() => {
    setVisitCombo([]);
  }, []);

  const handleReserveCombo = useCallback(() => {
    if (visitCombo.length === 0) return;
    if (visitCombo.length === 1) {
      handleSelectService(visitCombo[0].title);
    } else {
      const titles = visitCombo.map((s) => s.title).join(' + ');
      handleSelectService(
        'Family Combo / Multiple Services',
        `Selected Visit Combo: ${titles}`
      );
    }
  }, [visitCombo, handleSelectService]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1817]">
      {/* Subtle Desktop Luxury Cursor Halo */}
      <LuxuryCursor />

      {/* First-Impression Custom Hair-Cutting Preloader */}
      <OpeningPreloader
        isVisible={showIntro}
        onComplete={handleFinishIntro}
        onSkip={handleFinishIntro}
      />

      {/* Sticky Luxury Navigation with Scroll-Spy & Gold Progress Line */}
      <Navbar />

      <main>
        <Hero onReplayIntro={handleReplayIntro} introComplete={introComplete} />
        <LuxuryMarquee />
        <BrandFilmSection />
        <ServicesSection
          onSelectService={handleSelectService}
          visitCombo={visitCombo}
          onToggleComboService={handleToggleComboService}
        />
        <SalonCraftScrollStage />
        <TransformationShowcase onSelectService={handleSelectService} />
        <SalonScrollDivider label="Why Families Trust Fb3" bgClass="bg-[#FAF8F5]" />
        <WhyChooseUs />
        <SalonScrollDivider label="Style & Lookbook" reverse bgClass="bg-[#F2EDE6]/55" />
        <GallerySection onSelectService={handleSelectService} />
        <SalonScrollDivider label="Community & Reels" bgClass="bg-[#FAF8F5]" />
        <SocialCommunitySection />
        <SalonScrollDivider label="Reserve Your Chair" reverse bgClass="bg-[#F2EDE6]/75" />
        <LocationBookingSection bookingPreset={bookingPreset} />
      </main>

      <Footer />
      <SalonScrollRail />
      <ServiceComboEstimator
        selectedServices={visitCombo}
        onRemoveService={handleRemoveComboService}
        onClearAll={handleClearCombo}
        onReserveCombo={handleReserveCombo}
      />
      <FloatingBackToTop hasEstimatorBar={visitCombo.length > 0} />
    </div>
  );
}
