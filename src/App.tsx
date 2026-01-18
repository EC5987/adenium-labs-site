import React from "react";

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
const APP_STORE_URL = "https://apps.apple.com/app/id0000000000";
const HERO_SCREENSHOT = "screens/hero.png";
const HERO_SCREENSHOT_ALT = "Sound Asleep home screen preview";
const FEATURED_SCREENSHOT = "screens/featured-presets.png";
const FEATURED_SCREENSHOT_ALT = "Sound Asleep featured presets screen";
const REVIEW_URL = "https://apps.apple.com/app/id0000000000?action=write-review";
const APP_STORE_LIVE = false;
const SCREENSHOTS = [
  {
    src: HERO_SCREENSHOT,
    title: "Craft Your Perfect Mix",
    description: "Blend sounds and fine-tune levels to create your ideal soundscape.",
    alt: HERO_SCREENSHOT_ALT,
  },
  {
    src: FEATURED_SCREENSHOT,
    title: "Featured Presets",
    description: "Featured picks alongside your custom presets, ready to play.",
    alt: FEATURED_SCREENSHOT_ALT,
  },
  {
    src: "screens/active-sounds.png",
    title: "Active Sounds Filter",
    description: "Tune layers and balance volumes in one view.",
    alt: "Sound Asleep active sounds filter screen",
  },
  {
    src: "screens/sleep-meditation.png",
    title: "Sleep & Meditation Timer",
    description: "Choose your duration and a soft fade-out for a deeply relaxing finish.",
    alt: "Sound Asleep sleep and meditation screen",
  },
  {
    src: "screens/gentle-wake.png",
    title: "Gentle Wake",
    description: "Fade-in alarms designed to wake softly.",
    alt: "Sound Asleep gentle wake screen",
  },
  {
    src: "screens/dim-mode.png",
    title: "Dim Mode",
    description: "Low light controls for late-night sessions.",
    alt: "Sound Asleep dim mode screen",
  },
];

export default function Site() {
  const [showPrivacy, setShowPrivacy] = React.useState(false);
  const [showTerms, setShowTerms] = React.useState(false);
  const [showComingSoon, setShowComingSoon] = React.useState(false);
  const [showWordmarkImg, setShowWordmarkImg] = React.useState(true);
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);

  const scrollToTargetId = React.useCallback((targetId: string, behavior: ScrollBehavior = 'smooth') => {
    if (typeof window === 'undefined') return;
    const element = document.getElementById(targetId);
    if (!element) return;

    const header = document.querySelector('header');
    const headerHeight = header instanceof HTMLElement ? header.offsetHeight : 0;
    const { top } = element.getBoundingClientRect();
    const offsetTop = top + window.pageYOffset - headerHeight - 8;

    window.scrollTo({
      top: Math.max(0, offsetTop),
      behavior
    });
  }, []);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const applyHash = (behavior: ScrollBehavior = 'smooth') => {
      const hash = window.location.hash;
      const targetId = hash.startsWith('#') ? hash.slice(1) : hash;

      setShowPrivacy(hash === '#privacy-policy');
      setShowTerms(hash === '#terms-of-service');

      if (targetId && !['privacy-policy', 'terms-of-service'].includes(targetId)) {
        scrollToTargetId(targetId, behavior);
      }
    };

    const handleHashChange = () => applyHash();
    applyHash('auto');

    const rafId = window.requestAnimationFrame(() => applyHash('auto'));
    const timeoutId = window.setTimeout(() => applyHash('auto'), 150);

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
    };
  }, [scrollToTargetId]);

  const openPrivacy = React.useCallback(() => {
    setShowPrivacy(true);
    if (typeof window !== 'undefined' && window.location.hash !== '#privacy-policy') {
      window.location.hash = 'privacy-policy';
    }
  }, []);

  const closePrivacy = React.useCallback(() => {
    setShowPrivacy(false);
    if (typeof window !== 'undefined' && window.location.hash === '#privacy-policy') {
      const { pathname, search } = window.location;
      window.history.replaceState(null, '', `${pathname}${search}`);
    }
  }, []);

  const openTerms = React.useCallback(() => {
    setShowTerms(true);
    if (typeof window !== 'undefined' && window.location.hash !== '#terms-of-service') {
      window.location.hash = 'terms-of-service';
    }
  }, []);

  const openComingSoon = React.useCallback((event?: React.MouseEvent<HTMLAnchorElement>) => {
    if (event) event.preventDefault();
    setShowMobileMenu(false);
    setShowComingSoon(true);
  }, []);

  const closeComingSoon = React.useCallback(() => {
    setShowComingSoon(false);
  }, []);

  const closeTerms = React.useCallback(() => {
    setShowTerms(false);
    if (typeof window !== 'undefined' && window.location.hash === '#terms-of-service') {
      const { pathname, search } = window.location;
      window.history.replaceState(null, '', `${pathname}${search}`);
    }
  }, []);

  // Handle smooth scrolling with header offset
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setShowMobileMenu(false);

    scrollToTargetId(targetId);

    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#${targetId}`);
    }
  };

  const handleAppStoreClick = React.useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    if (APP_STORE_LIVE) return;
    openComingSoon(event);
  }, [openComingSoon]);

  return (
    <div className="min-h-screen bg-white text-neutral-900 antialiased">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/90">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2">
            <AdeniumMark className="h-8 w-8" />
            {/* Wordmark image with text fallback */}
            {showWordmarkImg ? (
              <img
                src={asset('adenium-wordmark-600.png')}
                srcSet={`${asset('adenium-wordmark-300.png')} 300w, ${asset('adenium-wordmark-600.png')} 600w, ${asset('adenium-wordmark-1200.png')} 1200w`}
                sizes="(min-width: 768px) 120px, 90px"
                alt="Adenium Labs"
                className="h-2 md:h-3 w-auto"
                onError={() => setShowWordmarkImg(false)}
              />
            ) : (
              <span className="text-sm md:text-base font-medium text-neutral-900 tracking-tight">Adenium Labs</span>
            )}
          </a>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#sound-asleep" onClick={(e) => handleNavClick(e, 'sound-asleep')} className="flex items-center gap-2 text-neutral-700 hover:text-[#005579] transition-colors">
              <div className="w-5 h-5 rounded overflow-hidden">
                <img src={asset('soundasleep-icon-new.png')} alt="Sound Asleep" className="w-full h-full object-cover" />
              </div>
              Sound Asleep
            </a>
            <a href={APP_STORE_URL} target="_blank" rel="noreferrer" onClick={handleAppStoreClick} className="text-neutral-700 hover:text-[#005579] transition-colors">Get the App</a>
            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="text-neutral-700 hover:text-[#005579] transition-colors">Contact</a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {showMobileMenu ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        {/* Design Divider */}
        <div className="h-1 bg-gradient-to-r from-[#005579] via-[#6B7C8F] to-[#D6A3A9]"></div>
      </header>

      {/* Mobile Navigation Dropdown */}
      {showMobileMenu && (
        <>
          {/* Backdrop */}
          <div
            className="md:hidden fixed inset-0 z-30 bg-black/20 backdrop-blur-sm"
            onClick={() => setShowMobileMenu(false)}
          />

          {/* Menu Panel */}
          <div className="md:hidden fixed top-[73px] left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-xl">
            <div className="mx-auto max-w-6xl px-4 py-6">
              <nav className="flex flex-col space-y-2">
                {/* Primary App Section */}
                <div className="pb-3 mb-3 border-b border-neutral-200/30">
                  <a
                    href="#sound-asleep"
                    onClick={(e) => handleNavClick(e, 'sound-asleep')}
                    className="flex items-center gap-3 text-base font-medium text-neutral-900 py-3 px-4 rounded-xl hover:bg-white/80 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg overflow-hidden shadow-sm">
                      <img
                        src={asset('soundasleep-icon-new.png')}
                        alt="Sound Asleep"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div>Sound Asleep</div>
                      <div className="text-sm text-neutral-500 font-normal">Live on the App Store</div>
                    </div>
                  </a>
                </div>

                {/* Secondary Navigation */}
                <a
                  href="#screens"
                  onClick={(e) => handleNavClick(e, 'screens')}
                  className="flex items-center gap-3 text-base font-medium text-neutral-900 py-3 px-4 rounded-xl hover:bg-white/80 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg overflow-hidden shadow-[0_4px_12px_rgba(0,85,121,0.15)] bg-gradient-to-br from-[#005579] to-[#004760]">
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <div>Features</div>
                    <div className="text-sm text-neutral-500 font-normal">See Sound Asleep in Action</div>
                  </div>
                </a>

                {/* Divider */}
                <div className="mx-4 border-t border-neutral-200/50"></div>

                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, 'contact')}
                  className="flex items-center gap-3 text-base font-medium text-neutral-900 py-3 px-4 rounded-xl hover:bg-white/80 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg overflow-hidden shadow-[0_4px_12px_rgba(214,163,169,0.25)] bg-gradient-to-br from-[#D6A3A9] to-[#C89BA0]">
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <div>Contact</div>
                  <div className="text-sm text-neutral-500 font-normal">Get in Touch</div>
                </div>
              </a>

              <a
                href="#privacy-policy"
                onClick={(e) => {
                  e.preventDefault();
                  setShowMobileMenu(false);
                  openPrivacy();
                }}
                className="flex items-center gap-3 text-base font-medium text-neutral-900 py-3 px-4 rounded-xl hover:bg-white/80 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg overflow-hidden shadow-[0_4px_12px_rgba(107,124,143,0.25)] bg-gradient-to-br from-[#6B7C8F] to-[#8DA0B3]">
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12c2.21 0 4-1.79 4-4V6a4 4 0 1 0-8 0v2c0 2.21 1.79 4 4 4z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 10v6a6 6 0 0 0 12 0v-6" />
                    </svg>
                  </div>
                </div>
                <div>
                  <div>Privacy</div>
                  <div className="text-sm text-neutral-500 font-normal">How we handle data</div>
                </div>
              </a>

                {/* Single Primary CTA */}
                <div className="pt-4 mt-2">
                  <a
                    href={APP_STORE_URL}
                    target="_blank"
                    rel="noreferrer"
                    onClick={handleAppStoreClick}
                    className="flex items-center justify-center gap-2 w-full rounded-xl px-6 py-4 text-white bg-[#005579] hover:bg-[#004760] transition font-cta shadow-md"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Download
                  </a>
                </div>
              </nav>
            </div>
          </div>
        </>
      )}

      {/* Brand hero */}
      <section id="home" className="relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,_#f7f7f7,_transparent_40%),_radial-gradient(circle_at_80%_20%,_#f2f2f2,_transparent_35%),_radial-gradient(circle_at_50%_90%,_#f5f5f5,_transparent_40%)]" />
        <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14 md:py-20">
          <div className="grid md:grid-cols-[440px,1fr] items-center gap-6 md:gap-6">
            <div className="max-w-2xl md:order-2 text-center md:text-left">
              <h1 className="text-2xl/tight sm:text-3xl/tight md:text-4xl/tight lg:text-5xl/tight font-title">Mindful apps for sleep, focus, and creativity</h1>
              <p className="mt-4 text-neutral-600 text-sm sm:text-base">We craft thoughtful digital experiences designed to improve everyday life – relax, meditate, breathe, get in the zone, drift to sleep, and wake up peacefully.</p>
              <div className="mt-6 sm:mt-8 flex justify-center md:justify-start">
                <a
                  href="#sound-asleep"
                  onClick={(e) => handleNavClick(e, 'sound-asleep')}
                  className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-white btn-gradient-animated shadow-[0_8px_24px_rgba(0,85,121,0.35)] hover:shadow-[0_12px_28px_rgba(0,85,121,0.45)] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-[#005579] text-sm sm:text-base"
                >
                  Explore Sound Asleep
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="relative mx-auto order-first md:mx-0 md:order-1">
              <div className="block animate-fade-in-up">
                <div className="brand-halo relative aspect-square w-full max-w-[220px] sm:max-w-[270px] md:max-w-[340px] lg:max-w-[420px] rounded-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] grid place-items-center">
                  <span className="brand-halo__inner" aria-hidden="true" />
                  <AdeniumLogo className="relative z-10 w-2/3 max-w-[360px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App hero */}
      <section id="sound-asleep" className="border-t border-neutral-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-16 md:py-20">
          <div className="grid md:grid-cols-[minmax(0,1fr),minmax(0,460px)] items-center gap-8 md:gap-12">
            <div className="max-w-2xl">
              <div className="text-center md:text-center">
                <div className="flex justify-center">
                  <a
                    href={APP_STORE_URL}
                    target="_blank"
                    rel="noreferrer"
                    onClick={handleAppStoreClick}
                    className="h-14 w-14 rounded-[1.1rem] shadow-[0_12px_24px_rgba(0,85,121,0.2)] overflow-hidden"
                  >
                    <img src={asset('soundasleep-icon-new.png')} alt="Sound Asleep app icon" className="h-full w-full object-cover" />
                  </a>
                </div>
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noreferrer"
                  onClick={handleAppStoreClick}
                  className="mt-3 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/80 px-4 py-1.5 text-xs font-title uppercase tracking-[0.2em] text-[#005579]"
                >
                  Now live on the App Store
                </a>
                <div className="md:hidden">
                  <h2 className="mt-4 text-3xl/tight sm:text-4xl/tight font-title">Sound Asleep</h2>
                  <div className="relative mx-auto mt-5 flex justify-center">
                    <div className="pointer-events-none absolute -inset-6 rounded-[2.75rem] bg-gradient-to-br from-[#0b6a8e]/30 via-transparent to-[#D6A3A9]/45 blur-3xl" />
                    <AppScreenshot
                      src={asset(HERO_SCREENSHOT)}
                      alt={HERO_SCREENSHOT_ALT}
                      loading="eager"
                      className="relative mx-auto w-full max-w-[260px] sm:max-w-[320px]"
                    />
                  </div>
                  <div className="mt-5 text-3xl/tight sm:text-4xl/tight font-title sm:whitespace-nowrap">Build your calm in minutes</div>
                </div>
                <h2 className="mt-4 hidden text-3xl/tight sm:text-4xl/tight md:text-5xl/tight font-title md:block">
                  Sound Asleep
                  <span className="block sm:whitespace-nowrap">Build your calm in minutes</span>
                </h2>
                <p className="mt-4 text-neutral-600 text-base sm:text-lg">
                  Layer nature sounds, ambient textures, and healing tones for sleep, focus, and gentle wake-ups. Crafted by Adenium Labs for nightly
                  rituals that feel effortless.
                </p>
                <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={APP_STORE_URL}
                    target="_blank"
                    rel="noreferrer"
                    onClick={handleAppStoreClick}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-white btn-gradient-animated shadow-[0_8px_24px_rgba(0,85,121,0.35)] hover:shadow-[0_12px_28px_rgba(0,85,121,0.45)] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-[#005579] text-sm sm:text-base whitespace-nowrap"
                  >
                    Download on the App Store
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>
                  <a
                    href="#screens"
                    onClick={(e) => handleNavClick(e, 'screens')}
                    className="group inline-flex w-full rounded-xl bg-gradient-to-r from-[#0b6a8e]/70 via-[#6B7C8F]/60 to-[#D6A3A9]/70 p-[2px] transition"
                  >
                    <span className="inline-flex w-full items-center justify-center gap-2 rounded-[0.7rem] bg-white px-5 py-3 text-neutral-700 transition group-hover:bg-white/90 text-sm sm:text-base whitespace-nowrap">
                      Preview the app
                    </span>
                  </a>
                </div>
              </div>

              <div data-testid="features-card" className="mt-8 rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-[#B8DCEA] via-[#CCD5DC] to-[#E0B7C5] shadow-md text-left">
                <h3 className="text-xl font-title mb-6">Key Features</h3>
                <ul className="space-y-4 text-neutral-800">
                  <li className="flex items-start gap-3">
                    <div className="mt-0.5 h-5 w-5 rounded-full bg-[#005579] flex items-center justify-center flex-shrink-0">
                      <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                    </div>
                    Layered sound mixing with intuitive controls
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-0.5 h-5 w-5 rounded-full bg-[#005579] flex items-center justify-center flex-shrink-0">
                      <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    </div>
                    Curated presets for every mood and moment
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-0.5 h-5 w-5 rounded-full bg-[#005579] flex items-center justify-center flex-shrink-0">
                      <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" /></svg>
                    </div>
                    Categories: Nature, Water & Wind, Urban Ambience, Healing Tones
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-0.5 h-5 w-5 rounded-full bg-[#005579] flex items-center justify-center flex-shrink-0">
                      <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
                    </div>
                    Smart wake‑up options with customizable fade-ins
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-0.5 h-5 w-5 rounded-full bg-[#005579] flex items-center justify-center flex-shrink-0">
                      <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
                    </div>
                    Minimalist, distraction‑free design
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-0.5 h-5 w-5 rounded-full bg-[#005579] flex items-center justify-center flex-shrink-0">
                      <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" /></svg>
                    </div>
                    Perfect for sleep, meditation, focus, and relaxation
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative mx-auto hidden md:block md:mx-0 animate-fade-in-up">
              <div className="pointer-events-none absolute -inset-6 rounded-[2.75rem] bg-gradient-to-br from-[#0b6a8e]/30 via-transparent to-[#D6A3A9]/45 blur-3xl" />
              <AppScreenshot
                src={asset(HERO_SCREENSHOT)}
                alt={HERO_SCREENSHOT_ALT}
                loading="eager"
                className="relative w-full max-w-[320px] sm:max-w-[360px] md:max-w-[420px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Screenshots section */}
      <section id="screens" className="border-t border-neutral-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16 md:py-20">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h3 className="text-2xl sm:text-3xl font-title">Live App Preview</h3>
            <p className="mt-4 text-xs uppercase tracking-[0.3em] text-neutral-400 sm:hidden">Swipe to explore</p>
            <p className="mt-4 hidden text-xs uppercase tracking-[0.3em] text-neutral-400 sm:block">Scroll to explore</p>
          </div>
          <div className="flex flex-nowrap gap-6 sm:gap-8 lg:gap-10 overflow-x-auto snap-x snap-mandatory pb-6 -mx-4 px-4 md:mx-0 md:px-0">
            {SCREENSHOTS.map((screen, index) => (
              <div
                key={screen.title}
                className="flex-none w-[220px] sm:w-[260px] md:w-[280px] lg:w-[300px] snap-center text-center animate-fade-in-up"
                style={{ animationDelay: `${0.08 * index + 0.05}s` }}
              >
                <AppScreenshot src={asset(screen.src)} alt={screen.alt} className="w-full" />
                <div className="mt-4 sm:mt-5 px-2">
                  <h4 className="font-title text-neutral-900 text-sm sm:text-base">{screen.title}</h4>
                  <p className="text-xs sm:text-sm text-neutral-600 mt-1">{screen.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Adaptive Design */}
      <section className="border-t border-neutral-200 bg-gradient-to-br from-[#F7F8F9] to-[#F2F6F7]">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-title">Optimized for iOS 26</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 rounded-2xl shadow-[0_8px_24px_rgba(0,85,121,0.25),_0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden">
                <img src={asset('icons/soundasleep-icon-default.png')} alt="Default Icon" className="w-full h-full object-cover" />
              </div>
              <h4 className="text-sm font-medium text-neutral-900">Default</h4>
              <p className="text-xs text-neutral-600">Standard design</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 rounded-2xl shadow-[0_8px_24px_rgba(0,85,121,0.25),_0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden">
                <img src={asset('icons/soundasleep-icon-dark.png')} alt="Dark Icon" className="w-full h-full object-cover" />
              </div>
              <h4 className="text-sm font-medium text-neutral-900">Dark</h4>
              <p className="text-xs text-neutral-600">Dark mode</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 rounded-2xl shadow-[0_8px_24px_rgba(0,85,121,0.25),_0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden bg-black">
                <img src={asset('icons/soundasleep-icon-mono-light.png')} alt="Mono Light Icon" className="w-full h-full object-cover" />
              </div>
              <h4 className="text-sm font-medium text-neutral-900">Mono Light</h4>
              <p className="text-xs text-neutral-600">Monochrome</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 rounded-2xl shadow-[0_8px_24px_rgba(0,85,121,0.25),_0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden bg-white">
                <img src={asset('icons/soundasleep-icon-mono-dark.png')} alt="Mono Dark Icon" className="w-full h-full object-cover" />
              </div>
              <h4 className="text-sm font-medium text-neutral-900">Mono Dark</h4>
              <p className="text-xs text-neutral-600">Monochrome</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 rounded-2xl shadow-[0_8px_24px_rgba(0,85,121,0.25),_0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden">
                <img src={asset('icons/soundasleep-icon-tinted-light.png')} alt="Tinted Light Icon" className="w-full h-full object-cover" />
              </div>
              <h4 className="text-sm font-medium text-neutral-900">Tinted Light</h4>
              <p className="text-xs text-neutral-600">Tinted style</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 rounded-2xl shadow-[0_8px_24px_rgba(0,85,121,0.25),_0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden">
                <img src={asset('icons/soundasleep-icon-tinted-dark.png')} alt="Tinted Dark Icon" className="w-full h-full object-cover" />
              </div>
              <h4 className="text-sm font-medium text-neutral-900">Tinted Dark</h4>
              <p className="text-xs text-neutral-600">Tinted style</p>
            </div>
          </div>
        </div>
      </section>

      {/* Download CTA + Updates */}
      <div className="h-px bg-neutral-200"></div>
      <DownloadSection onAppStoreClick={handleAppStoreClick} />

      {/* Contact */}
      <ContactSection />

      <PrivacyPolicyDialog open={showPrivacy} onClose={closePrivacy} />
      <TermsOfServiceDialog open={showTerms} onClose={closeTerms} />
      <ComingSoonDialog open={showComingSoon} onClose={closeComingSoon} />

      {/* Footer (dark grey with logo + punch line) */}
      <footer className="bg-[#23272B] text-gray-300">
        <div className="mx-auto max-w-6xl px-4 py-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-center gap-3">
            <img className="h-8 w-auto" src={asset('adenium-mark-white-256.png')} alt="Adenium Labs Mark" />
            <div>
              <div className="font-title">Adenium Labs</div>
              <div className="text-sm text-gray-400">Mindful apps for everyday life</div>
            </div>
          </div>
          <div className="flex flex-col items-end text-sm gap-1">
            <span className="text-gray-500">© {new Date().getFullYear()} Adenium Labs. All rights reserved.</span>
            <div className="flex gap-4">
              <a
                href="#privacy-policy"
                onClick={(e) => {
                  e.preventDefault();
                  openPrivacy();
                }}
                className="hover:text-white/90"
              >
                Privacy Policy
              </a>
              <a
                href="#terms-of-service"
                onClick={(e) => {
                  e.preventDefault();
                  openTerms();
                }}
                className="hover:text-white/90"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ---------------- Sections split into components for clarity ---------------- */

function DownloadSection({ onAppStoreClick }: { onAppStoreClick: (event: React.MouseEvent<HTMLAnchorElement>) => void }) {
  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = React.useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim() || status === 'loading') return;

    setStatus('loading');
    setFeedback('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        const code = typeof data?.error === 'string' ? data.error : 'unknown';
        throw new Error(code === 'invalid_email' ? 'Please enter a valid email address.' : 'Something went wrong. Please try again.');
      }

      setStatus('success');
      setFeedback("Thanks! We'll keep you posted with new sound packs and updates.");
      setEmail('');
    } catch (error) {
      setStatus('error');
      setFeedback(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <section id="download" className="bg-[#F7F8F9]">
      <div className="mx-auto max-w-6xl px-4 py-16">
        {/* Two-card grid */}
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          {/* Card 1: Review */}
          <div className="rounded-2xl bg-white shadow-md p-4 sm:p-5 flex flex-col">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-lg bg-[#005579] flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3l2.2 4.5 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5L4.8 8.2l5-.7L12 3z" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-title">Leave a Review</h4>
                <p className="text-sm text-neutral-500 -mt-1 mb-3">Help others discover Sound Asleep</p>
                <p className="text-neutral-700">If the app has helped you rest better, a quick review makes a big difference.</p>
              </div>
            </div>
            <div className="mt-auto pt-4">
              <a data-testid="review-app-button" href={REVIEW_URL} target="_blank" rel="noreferrer" onClick={onAppStoreClick} className="block w-full text-center rounded-xl bg-[#005579] hover:bg-[#004760] text-white font-cta text-base py-2.5">Leave an App Store Review</a>
            </div>
          </div>

          {/* Card 2: Updates */}
          <div className="rounded-2xl bg-white shadow-md p-4 sm:p-5 flex flex-col">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-lg bg-[#D6A3A9] flex items-center justify-center text-black">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16v12H4z"/><path d="m22 6-10 7L2 6"/></svg>
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-title">Stay in the Loop</h4>
                <p className="text-sm text-neutral-500 -mt-1 mb-3">New sounds and updates</p>
                <p className="text-neutral-700 mb-4">Join our mailing list for occasional product updates and announcements.</p>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="mt-3 flex flex-col flex-1" noValidate>
              <div className="pb-2">
                <input
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your email address"
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 pt-2 pb-3 outline-none focus:border-neutral-400"
                  aria-label="Email address"
                />
              </div>
              <div className="mt-auto space-y-2">
                <button
                  data-testid="updates-email-button"
                  type="submit"
                  disabled={status === 'loading'}
                  className="block w-full text-center rounded-xl bg-[#D6A3A9] hover:bg-[#C89BA0] disabled:opacity-70 disabled:cursor-not-allowed text-black font-cta text-base py-2.5 transition-colors"
                >
                  {status === 'loading' ? 'Sending...' : 'Send Me Updates'}
                </button>
                {feedback && (
                  <p
                    role="status"
                    aria-live="polite"
                    className={`text-sm ${status === 'success' ? 'text-emerald-600' : 'text-red-600'}`}
                  >
                    {feedback}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Feedback banner */}
        <div className="mt-8 rounded-2xl p-6 md:p-8 bg-gradient-to-br from-[#F8ECEF] via-[#EECED4] to-[#D6A3A9] text-neutral-900">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-10 w-10 rounded-lg bg-[#005579] flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8z"/></svg>
            </div>
            <h4 className="text-lg font-title">We would love your feedback</h4>
          </div>
          <div className="grid md:grid-cols-3 text-neutral-900 divide-y md:divide-y-0 md:divide-x divide-neutral-900/15">
            <div className="py-4 md:py-0 md:px-6 md:first:pl-0 md:last:pr-0">
              <h5 className="font-title mb-1">Send Feedback</h5>
              <p className="text-sm text-neutral-700 leading-relaxed">
                Email us at{' '}
                <a href="mailto:support@adeniumlabs.com" className="underline text-[#005579]">
                  support@adeniumlabs.com
                </a>
                .
              </p>
            </div>
            <div className="py-4 md:py-0 md:px-6 md:first:pl-0 md:last:pr-0">
              <h5 className="font-title mb-1">Report Issues</h5>
              <p className="text-sm text-neutral-700 leading-relaxed">Include your device model, iOS version, and steps to reproduce.</p>
            </div>
            <div className="py-4 md:py-0 md:px-6 md:first:pl-0 md:last:pr-0">
              <h5 className="font-title mb-1">Request Sounds & Features</h5>
              <p className="text-sm text-neutral-700 leading-relaxed">Wish we had a sound or feature? Let us know.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:py-20 md:py-16">
        <div className="rounded-3xl p-[4px] bg-gradient-to-br from-[#0b6a8e] via-[#005579] to-[#D6A3A9] shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
          <div className="rounded-3xl bg-white/95 backdrop-blur-sm p-4 sm:p-12 md:p-10">
            <div className="flex items-center gap-4 mb-6 sm:flex-col sm:text-center sm:mb-8 md:mb-4">
              <div className="w-28 h-28 sm:w-40 sm:h-40 rounded-3xl bg-gradient-to-br from-[#D0E8F3] via-[#E0E6EA] to-[#E9D6DC] shadow-lg flex items-center justify-center flex-shrink-0 sm:mb-6 md:mb-4">
                <img src={asset('adenium-mark-256.png')} alt="Adenium Labs" className="w-20 h-20 sm:w-28 sm:h-28" />
              </div>
              <div className="text-center sm:text-center">
                <h2 className="text-[1.95rem] sm:text-3xl font-title text-neutral-900 leading-tight mb-0 sm:mb-2">Get in Touch</h2>
                <p className="text-[#005579] text-xl sm:text-2xl font-title tracking-tight leading-tight mt-0 sm:mt-1">We're here to help</p>
              </div>
            </div>

            <p className="text-neutral-700 leading-relaxed mb-6 sm:mb-8 md:mb-4 text-center text-base sm:text-lg">
              Have questions, feedback, or partnership ideas? We'd love to hear from you. Let's build something mindful together.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-3 text-base sm:text-base">
              <div className="flex items-center gap-3 sm:gap-3 md:gap-2 p-3 sm:flex-col sm:items-center sm:p-6 md:p-4 rounded-xl bg-neutral-50 h-full md:flex-col">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#005579] flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex flex-col text-left sm:text-center md:text-center items-start sm:items-center md:items-center h-full">
                  <div className="space-y-1 sm:space-y-2 md:space-y-1 md:flex-1">
                    <div className="font-title text-neutral-900 text-lg sm:text-lg">General Support</div>
                    <div className="text-sm sm:text-base text-neutral-600 leading-tight">Questions about our apps and services</div>
                  </div>
                  <a
                    href="mailto:support@adeniumlabs.com"
                    className="text-[#005579] text-sm sm:text-base font-medium mt-0.5 sm:mt-3 md:mt-auto"
                  >
                    support@adeniumlabs.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-3 md:gap-2 p-3 sm:flex-col sm:items-center sm:p-6 md:p-4 rounded-xl bg-neutral-50 h-full md:flex-col">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#D6A3A9] flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <div className="flex flex-col text-left sm:text-center md:text-center items-start sm:items-center md:items-center h-full">
                  <div className="space-y-1 sm:space-y-2 md:space-y-1 md:flex-1">
                    <div className="font-title text-neutral-900 text-lg sm:text-lg">Press & Media</div>
                    <div className="text-sm sm:text-base text-neutral-600 leading-tight">Media inquiries and press releases</div>
                  </div>
                  <a
                    href="mailto:press@adeniumlabs.com"
                    className="text-[#005579] text-sm sm:text-base font-medium mt-0.5 sm:mt-3 md:mt-auto"
                  >
                    press@adeniumlabs.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-3 md:gap-2 p-3 sm:flex-col sm:items-center sm:p-6 md:p-4 rounded-xl bg-neutral-50 h-full md:flex-col">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-[#0b6a8e] to-[#005579] flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="flex flex-col text-left sm:text-center md:text-center items-start sm:items-center md:items-center h-full">
                  <div className="space-y-1 sm:space-y-2 md:space-y-1 md:flex-1">
                    <div className="font-title text-neutral-900 text-lg sm:text-lg">Partnerships</div>
                    <div className="text-sm sm:text-base text-neutral-600 leading-tight">Business collaborations and integrations</div>
                  </div>
                  <a
                    href="mailto:partnerships@adeniumlabs.com"
                    className="text-[#005579] text-sm sm:text-base font-medium mt-0.5 sm:mt-3 md:mt-auto"
                  >
                    partnerships@adeniumlabs.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PrivacyPolicyDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  React.useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      id="privacy-policy"
      className="fixed inset-0 z-[60] grid place-items-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-policy-title"
      onMouseDown={handleBackdropClick}
    >
      <div className="max-w-3xl w-full rounded-2xl bg-white p-6 sm:p-10 shadow-xl space-y-6 overflow-y-auto max-h-[90svh]">
        <div>
          <h3 id="privacy-policy-title" className="text-2xl font-title text-neutral-900">
            Privacy Policy
          </h3>
          <p className="mt-2 text-neutral-700">
            We respect your privacy. Sound Asleep does not sell or share personal data with third-party advertisers or data brokers.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-title text-neutral-900">Data we collect</h4>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-neutral-700">
            <li>Optional email address when you sign up for updates or feedback requests.</li>
            <li>Crash and performance diagnostics from the app (Firebase Crashlytics &amp; Firebase Performance).</li>
            <li>Product interaction analytics (e.g., which sounds or presets are used) collected through Firebase Analytics and PostHog.</li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-title text-neutral-900">How we use the data</h4>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-neutral-700">
            <li>Provide core app functionality and improve performance and stability.</li>
            <li>Understand which features are most helpful so we can prioritize future improvements.</li>
            <li>Communicate important updates or respond to support requests when you voluntarily share contact info.</li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-title text-neutral-900">Your controls</h4>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-neutral-700">
            <li>Analytics and diagnostics automatically disable in debug builds; release builds collect only aggregated data.</li>
            <li>You can opt out of marketing emails at any time using the unsubscribe link.</li>
            <li>
              To delete stored data (analytics identifiers, crash reports, or email subscriptions), email{' '}
              <a href="mailto:support@adeniumlabs.com" className="underline text-[#005579]">
                support@adeniumlabs.com
              </a>{' '}
              and we will remove it.
            </li>
          </ul>
        </div>

        <p className="text-sm text-neutral-500">Last updated: October 7, 2025</p>

        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="rounded-lg bg-neutral-100 px-5 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-200 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function TermsOfServiceDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  React.useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      id="terms-of-service"
      className="fixed inset-0 z-[60] grid place-items-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="terms-of-service-title"
      onMouseDown={handleBackdropClick}
    >
      <div className="max-w-3xl w-full rounded-2xl bg-white p-6 sm:p-10 shadow-xl space-y-6 overflow-y-auto max-h-[90svh]">
        <div>
          <h3 id="terms-of-service-title" className="text-2xl font-title text-neutral-900">
            Terms of Service
          </h3>
          <p className="mt-2 text-sm italic text-neutral-500">Last updated: November 8, 2025</p>
          <p className="mt-4 text-neutral-700">
            Welcome to Adenium Labs. Adenium Labs is the brand name under which Esteban Calderon ("Adenium Labs," "we," "our," or "us") offers
            mobile applications, websites, and related services, including Sound Asleep and any future applications we release (collectively, the
            "Services").
          </p>
          <p className="mt-3 text-neutral-700">
            By accessing or using the Services, you agree to be bound by these Terms of Service ("Terms"). If you do not agree, do not use the
            Services.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-title text-neutral-900">1. Eligibility</h4>
          <p className="mt-3 text-neutral-700">
            You must be at least 13 years old (or the minimum age required in your jurisdiction) to use the Services. If you are under the age of
            majority, you must have permission from a parent or legal guardian who agrees to these Terms on your behalf.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-title text-neutral-900">2. Account Registration</h4>
          <p className="mt-3 text-neutral-700">
            Certain features may require you to create an account. You agree to provide accurate, current information and to update it as needed.
            You are responsible for keeping your login credentials secure and for all activity that occurs under your account.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-title text-neutral-900">3. Subscriptions &amp; Purchases</h4>
          <p className="mt-3 text-neutral-700">
            We may offer both free and paid features, including premium subscriptions for Sound Asleep. Prices, billing cycles, and free-trial periods
            are described in the app and may vary by platform or region. Subscriptions automatically renew until canceled through your platform account
            settings (e.g., Apple App Store). All purchases are subject to the App Store's terms, including its refund policies.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-title text-neutral-900">4. License &amp; Acceptable Use</h4>
          <p className="mt-3 text-neutral-700">
            We grant you a personal, limited, non-transferable license to use the Services for their intended purpose. You agree not to:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-neutral-700">
            <li>Modify, reverse engineer, or attempt to access the source code of the Services.</li>
            <li>Use the Services for unlawful, abusive, or infringing purposes.</li>
            <li>Interfere with or disrupt any part of the Services or associated networks.</li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-title text-neutral-900">5. Content &amp; Intellectual Property</h4>
          <p className="mt-3 text-neutral-700">
            All content, trademarks, and intellectual property within the Services are owned by or licensed to Esteban Calderon / Adenium Labs. You may
            not use our branding or assets without prior written consent.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-title text-neutral-900">6. Privacy</h4>
          <p className="mt-3 text-neutral-700">
            Your privacy matters. Our collection and use of personal data is described in the Adenium Labs Privacy Policy, which is incorporated into
            these Terms. Please review it to understand how we handle your information.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-title text-neutral-900">7. Third-Party Services</h4>
          <p className="mt-3 text-neutral-700">
            Some features may rely on third-party services (for example, analytics providers or payment processors). Your use of those features may be
            subject to additional third-party terms, and we are not responsible for their content or practices.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-title text-neutral-900">8. Disclaimer of Warranties</h4>
          <p className="mt-3 text-neutral-700">
            The Services are provided "as is" and "as available." We do not make any warranties, express or implied, regarding reliability, accuracy, or
            fitness for a particular purpose. We do not guarantee that the Services will improve your sleep, focus, or overall health. You use the
            Services at your own risk.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-title text-neutral-900">9. Limitation of Liability</h4>
          <p className="mt-3 text-neutral-700">
            To the fullest extent permitted by law, Esteban Calderon / Adenium Labs will not be liable for any indirect, incidental, special, or
            consequential damages arising from your use or inability to use the Services. Our total liability for any claim will not exceed the amount
            you paid, if any, to use the Services in the twelve months preceding the claim.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-title text-neutral-900">10. Termination</h4>
          <p className="mt-3 text-neutral-700">
            We may suspend or terminate your access to the Services at any time, with or without notice, for conduct that we believe violates these
            Terms or is otherwise harmful. Sections that by their nature should survive termination (including ownership provisions, disclaimers, and
            limitations of liability) will remain in effect.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-title text-neutral-900">11. Changes to These Terms</h4>
          <p className="mt-3 text-neutral-700">
            We may update these Terms from time to time. If the changes are material, we will notify you via the Services or another channel. Your
            continued use of the Services after the effective date of any changes constitutes acceptance of the revised Terms.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-title text-neutral-900">12. Contact</h4>
          <p className="mt-3 text-neutral-700">If you have questions about these Terms or the Services, please contact:</p>
          <div className="mt-3 space-y-1 text-neutral-700">
            <strong>Adenium Labs Support</strong>
            <div>
              <a href="mailto:support@adeniumlabs.com" className="underline text-[#005579]">
                support@adeniumlabs.com
              </a>
            </div>
            <div>Los Angeles, CA, USA</div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="rounded-lg bg-neutral-100 px-5 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-200 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function ComingSoonDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  React.useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[60] grid place-items-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="coming-soon-title"
      onMouseDown={handleBackdropClick}
    >
      <div className="max-w-lg w-full rounded-2xl bg-white p-6 sm:p-8 shadow-xl space-y-4">
        <div>
          <h3 id="coming-soon-title" className="text-2xl font-title text-neutral-900">
            Coming Soon
          </h3>
          <p className="mt-2 text-neutral-700">
            Sound Asleep launches next week. App Store links will go live at release.
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="rounded-lg bg-neutral-100 px-5 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-200 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* --------------------- Simple brand marks (placeholders) -------------------- */

function AdeniumLogo({ className = "" }: { className?: string }) {
  return (
    <img
      className={className}
      src={asset('adenium-logo-1000.png')}
      srcSet={`${asset('adenium-logo-256.png')} 256w, ${asset('adenium-logo-1000.png')} 1000w`}
      sizes="(min-width:1024px) 540px, (min-width:640px) 420px, 320px"
      alt="Adenium Labs"
    />
  );
}

function AdeniumMark({ className = "" }: { className?: string }) {
  return <img className={className} src={asset('adenium-mark-256.png')} alt="Adenium Labs Mark" />;
}

/* --------------------------- UI helper components -------------------------- */

function AppScreenshot({
  src,
  alt,
  className = "",
  loading = "lazy",
}: {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
}) {
  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      className={`h-auto w-full drop-shadow-[0_6px_6px_rgba(0,0,0,0.35)] ${className}`}
    />
  );
}
