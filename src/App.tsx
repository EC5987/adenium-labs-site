import React from "react";

export default function Site() {
  const [showPrivacy, setShowPrivacy] = React.useState(false);
  const [showWordmarkImg, setShowWordmarkImg] = React.useState(true);
  

  return (
    <div className="min-h-screen bg-white text-neutral-900 antialiased">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/90 border-b border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2">
            <AdeniumMark className="h-8 w-8" />
            {/* Wordmark image with text fallback */}
            {showWordmarkImg ? (
              <img
                src="/adenium-wordmark-600.png"
                srcSet="/adenium-wordmark-300.png 300w, /adenium-wordmark-600.png 600w, /adenium-wordmark-1200.png 1200w"
                sizes="(min-width: 768px) 120px, 90px"
                alt="Adenium Labs"
                className="h-2 md:h-3 w-auto"
                onError={() => setShowWordmarkImg(false)}
              />
            ) : (
              <span className="text-sm md:text-base font-medium text-neutral-900 tracking-tight">Adenium Labs</span>
            )}
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {/* Removed Apps & About & Privacy from top nav per request */}
            <a href="#contact" className="hover:opacity-70">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero with large brand logo placeholder */}
      <section id="home" className="relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,_#f7f7f7,_transparent_40%),_radial-gradient(circle_at_80%_20%,_#f2f2f2,_transparent_35%),_radial-gradient(circle_at_50%_90%,_#f5f5f5,_transparent_40%)]" />
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16 md:py-24">
          <div className="grid md:grid-cols-[520px,1fr] items-center gap-8 md:gap-10">
            {/* Left: title + copy (logo removed for simplicity) */}
            <div className="max-w-2xl md:order-2 text-center md:text-left">
              <h1 className="text-3xl/tight sm:text-4xl/tight md:text-5xl/tight lg:text-6xl/tight font-semibold">Mindful apps for sleep, focus, and creativity</h1>
              <p className="mt-4 text-neutral-600 text-base sm:text-lg">We craft thoughtful digital experiences designed to improve everyday life – relax, meditate, breathe, get in the zone, or drift to sleep.</p>
              <div className="mt-6 sm:mt-8 flex justify-center md:justify-start">
                <a href="#sound-asleep" className={
                  "inline-flex items-center gap-2 rounded-xl px-5 py-3 text-white btn-gradient-animated shadow-[0_8px_24px_rgba(0,85,121,0.35)] hover:shadow-[0_12px_28px_rgba(0,85,121,0.45)] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-[#005579] text-sm sm:text-base"
                }>
                  Explore Sound Asleep
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right: large framed wordmark with soft halo + fade-in */}
            <div className="relative mx-auto md:mx-0 md:order-1">
              <a href="/adenium-logo-1000.png" target="_blank" rel="noreferrer" className="block animate-fade-in-up">
                {/* Circle badge variant: minimal, premium, non-repetitive */}
                <div className="relative aspect-square w-full max-w-[280px] sm:max-w-[340px] md:max-w-[420px] lg:max-w-[520px] rounded-full border border-neutral-200 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] grid place-items-center">
                  <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/60 before:content-[''] before:absolute before:inset-[6%] before:rounded-full before:ring-1 before:ring-inset before:ring-neutral-100"></div>
                  <AdeniumLogo className="w-2/3 max-w-[360px]" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured App: Sound Asleep */}
      <section id="sound-asleep" className="border-t border-neutral-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20 grid md:grid-cols-2 gap-10 items-start">
          {/* LEFT: App card */}
          <div>
            <div data-testid="sound-card" className="rounded-3xl p-[3px] bg-gradient-to-br from-[#5BB1C1] via-[#79B8D3] to-[#C89AD9] shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
              <div className="rounded-3xl bg-white/95 backdrop-blur-sm p-6 sm:p-8">
                <div className="flex items-center gap-4 mb-4">
                  <SoundAsleepIcon className="h-12 w-12" />
                  <div>
                    <h2 className="text-2xl font-semibold">Sound Asleep</h2>
                    <span className="text-teal-600 text-lg font-semibold tracking-tight">Now in Beta</span>
                  </div>
                </div>
                <p className="text-neutral-700 leading-relaxed mb-5">
                  Create customizable soundscapes for sleep, meditation, relaxation, focus, massage sessions, and gentle wake‑ups. Layer nature sounds, ambient textures, and healing tones to craft your perfect audio environment.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="#beta" className="inline-flex items-center justify-center rounded-xl px-4 py-3 text-white bg-[#12A4A6] hover:bg-[#0F8F91] transition shadow-sm font-semibold text-base">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                    Join Beta (TestFlight)
                  </a>
                  <a href="#beta" className="inline-flex items-center justify-center rounded-xl px-4 py-3 border border-[#12A4A6] text-[#117E7F] hover:bg-[#E6F7F7] transition font-semibold text-base">
                    Get Notified
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div data-testid="features-card" className="mt-6 rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#D8EFE8] via-[#EBF6E9] to-[#F8ECEF] shadow-md">
              <h3 className="text-xl font-semibold mb-6">Key Features</h3>
              <ul className="space-y-4 text-neutral-800">
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 h-5 w-5 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0">
                    <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                  </div>
                  Layered sound mixing with intuitive controls
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 h-5 w-5 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0">
                    <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  </div>
                  Curated presets for every mood and moment
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 h-5 w-5 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0">
                    <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" /></svg>
                  </div>
                  Categories: Nature, Water & Wind, Urban Ambience, Healing Tones
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 h-5 w-5 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0">
                    <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
                  </div>
                  Smart wake‑up options with gentle transitions
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 h-5 w-5 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0">
                    <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
                  </div>
                  Minimalist, distraction‑free design
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 h-5 w-5 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0">
                    <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" /></svg>
                  </div>
                  Perfect for sleep, meditation, focus, and relaxation
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT: phone mockup (with iPhone silhouette) */}
          <div className="relative">
            <PhoneFrame src="/screens/screen-main.jpg" alt="Sound Asleep app main" />
          </div>
        </div>
    </section>

      {/* Screenshots section */}
      <section id="screens" className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16 md:py-20">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h3 className="text-2xl sm:text-3xl font-semibold">See Sound Asleep in Action</h3>
            <p className="mt-2 sm:mt-3 text-neutral-600 text-sm sm:text-base max-w-2xl mx-auto">Explore the beautiful, intuitive interface designed for your wellness journey</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            <div className="text-center space-y-3 sm:space-y-4 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              <PhoneFrame src="/screens/screen-1.jpg" alt="Sound Asleep filter page showing active sounds" />
              <div className="px-2">
                <h4 className="font-semibold text-neutral-900 text-sm sm:text-base">Filter Page (Active Sounds)</h4>
                <p className="text-xs sm:text-sm text-neutral-600 mt-1">Adjust volumes and fine-tune your active sounds without distraction.</p>
              </div>
            </div>
            <div className="text-center space-y-3 sm:space-y-4 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <PhoneFrame src="/screens/screen-2.jpg" alt="Sound Asleep sound library" />
              <div className="px-2">
                <h4 className="font-semibold text-neutral-900 text-sm sm:text-base">Sound Library</h4>
                <p className="text-xs sm:text-sm text-neutral-600 mt-1">Browse sounds by category and discover what fits your mood.</p>
              </div>
            </div>
            <div className="text-center space-y-3 sm:space-y-4 animate-fade-in-up sm:col-span-2 lg:col-span-1 sm:max-w-xs sm:mx-auto lg:max-w-none" style={{animationDelay: '0.3s'}}>
              <PhoneFrame src="/screens/screen-3.jpg" alt="Sound Asleep wake alarm and sleep timer" />
              <div className="px-2">
                <h4 className="font-semibold text-neutral-900 text-sm sm:text-base">Wake Alarm & Sleep Timer</h4>
                <p className="text-xs sm:text-sm text-neutral-600 mt-1">Wake gently or drift off with timers that fade calmly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beta CTA + Guidance (unchanged logic, tuned colors earlier) */}
      <BetaSection />

      {/* Contact */}
      <ContactSection />

      {/* Privacy Dialog (only accessed from footer link) */}
      <PrivacyDialog open={showPrivacy} onClose={() => setShowPrivacy(false)} />

      {/* Footer (dark grey with logo + punch line) */}
      <footer className="bg-[#23272B] text-gray-300">
        <div className="mx-auto max-w-6xl px-4 py-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-center gap-3">
            <AdeniumMark className="h-8 w-auto" />
            <div>
              <div className="font-semibold">Adenium Labs</div>
              <div className="text-sm text-gray-400">Mindful apps for everyday life</div>
            </div>
          </div>
          <div className="flex flex-col items-end text-sm gap-1">
            <span className="text-gray-500">© {new Date().getFullYear()} Adenium Labs. All rights reserved.</span>
            <button onClick={() => setShowPrivacy(true)} className="hover:text-white/90">Privacy Policy</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ---------------- Sections split into components for clarity ---------------- */

function BetaSection() {
  return (
    <section id="beta" className="bg-[#F6FAFA]">
      <div className="mx-auto max-w-6xl px-4 py-16">
        {/* Heading */}
        <div className="text-center mb-10">
          <h3 className="text-3xl font-semibold">Join the Sound Asleep Beta</h3>
          <p className="mt-3 text-neutral-600">Be among the first to experience our mindful soundscape app. Help us shape the future of digital wellness.</p>
        </div>

        {/* Two-card grid */}
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          {/* Card 1: Beta Testing */}
          <div className="rounded-2xl bg-white shadow-md p-6 flex flex-col justify-between">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-lg bg-[#12A4A6] flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 3v2m6-2v2M5 11h14M7 5h10l-1 2-2 4v3a3 3 0 1 1-6 0V11L8 7 7 5z"/></svg>
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold">Beta Testing</h4>
                <p className="text-sm text-neutral-500 -mt-1 mb-3">Available now on TestFlight</p>
                <p className="text-neutral-700 mb-5">Download the beta version and start creating your perfect soundscapes today. Your feedback helps us improve the experience for everyone.</p>
              </div>
            </div>
            <a data-testid="beta-join-button" href="https://testflight.apple.com/join/XXXXXXXX" target="_blank" rel="noreferrer" className="mt-6 block w-full text-center rounded-xl bg-[#12A4A6] hover:bg-[#0F8F91] text-white font-semibold text-base py-3">Join Beta on TestFlight</a>
          </div>

          {/* Card 2: Stay Updated */}
          <div className="rounded-2xl bg-white shadow-md p-6 flex flex-col justify-between">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-lg bg-[#D6A3A9] flex items-center justify-center text-black">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16v12H4z"/><path d="m22 6-10 7L2 6"/></svg>
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold">Stay Updated</h4>
                <p className="text-sm text-neutral-500 -mt-1 mb-3">Get notified when we launch</p>
                <p className="text-neutral-700 mb-4">Not ready for beta testing? Join our mailing list to be notified when Sound Asleep launches publicly in the App Store.</p>
              </div>
            </div>
            <form action="/api/subscribe" method="POST" className="mt-6 space-y-3">
              <input type="email" name="email" required placeholder="Enter your email address" className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-neutral-400" />
              <button data-testid="beta-email-button" type="submit" className="block w-full text-center rounded-xl bg-[#D6A3A9] hover:bg-[#C98E95] text-black font-semibold text-base py-3">Notify Me at Launch</button>
            </form>
          </div>
        </div>

        {/* For Beta Testers banner */}
        <div className="mt-8 rounded-2xl p-6 md:p-8 bg-gradient-to-br from-[#F8ECEF] via-[#EECED4] to-[#D6A3A9] text-neutral-900">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-[#12A4A6] flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8z"/></svg>
            </div>
            <h4 className="text-lg font-semibold">For Beta Testers</h4>
          </div>
          <div className="grid md:grid-cols-3 gap-6 text-neutral-900">
            <div>
              <h5 className="font-semibold mb-1">Send Feedback</h5>
              <p className="text-sm">Use the built‑in feedback feature or email us directly with your thoughts and suggestions.</p>
            </div>
            <div>
              <h5 className="font-semibold mb-1">Report Issues</h5>
              <p className="text-sm">Found a bug? Let us know! Include your device model and steps to reproduce the issue.</p>
            </div>
            <div>
              <h5 className="font-semibold mb-1">Share Ideas</h5>
              <p className="text-sm">Have ideas for new features or sound categories? We’d love to hear your creative input!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="border-t border-neutral-200 bg-[#EEF4F6]">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center">
          <h3 className="text-3xl font-semibold">Get in Touch</h3>
          <p className="mt-2 text-neutral-600 max-w-2xl mx-auto">Have questions, feedback, or partnership ideas? We'd love to hear from you. Let's build something mindful together.</p>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {/* Support */}
          <div className="rounded-2xl bg-white shadow-md p-6">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-lg bg-[#12A4A6] text-white grid place-items-center">
                {/* mail icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16v12H4z"/><path d="m22 6-10 7L2 6"/></svg>
              </div>
              <div className="flex-1">
                <div className="font-semibold">General Support</div>
                <p className="text-sm text-neutral-500">Questions about our apps, account issues, or general support.</p>
                <a href="mailto:support@adeniumlabs.com" className="text-[#12A4A6]">support@adeniumlabs.com</a>
              </div>
            </div>
          </div>

          {/* Press */}
          <div className="rounded-2xl bg-white shadow-md p-6">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-lg bg-[#D6A3A9] text-black grid place-items-center">
                {/* chat icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8z"/></svg>
              </div>
              <div className="flex-1">
                <div className="font-semibold">Press & Media</div>
                <p className="text-sm text-neutral-500">Media inquiries, press releases, and interview requests.</p>
                <a href="mailto:press@adeniumlabs.com" className="text-[#12A4A6]">press@adeniumlabs.com</a>
              </div>
            </div>
          </div>

          {/* Partnerships */}
          <div className="rounded-2xl bg-white shadow-md p-6 md:col-span-2 md:mx-auto md:w-1/2">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#5BB1C1] via-[#79B8D3] to-[#C89AD9] text-white grid place-items-center">
                {/* users icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <div className="flex-1">
                <div className="font-semibold">Partnerships</div>
                <p className="text-sm text-neutral-500">Business partnerships, collaborations, and integration opportunities.</p>
                <a href="mailto:partnerships@adeniumlabs.com" className="text-[#12A4A6]">partnerships@adeniumlabs.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PrivacyDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-black/50 p-4" role="dialog" aria-modal="true">
      <div className="max-w-2xl w-full rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Privacy Policy</h3>
          <button onClick={onClose} className="px-3 py-1 rounded-md bg-neutral-100 hover:bg-neutral-200">Close</button>
        </div>
        <div className="mt-4 space-y-3 text-neutral-700">
          <p>We respect your privacy. Sound Asleep does not sell personal data. Any information you share (such as beta feedback or an email address for updates) is used only to improve the app and communicate with you about the product.</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Data we collect:</strong> optional email for updates; optional crash and analytics data to improve performance.</li>
            <li><strong>How it’s used:</strong> to provide features, fix bugs, and communicate important updates.</li>
            <li><strong>Controls:</strong> you can request deletion of your data at any time by emailing <a className="underline" href="mailto:support@adeniumlabs.com">support@adeniumlabs.com</a>.</li>
          </ul>
          <p className="text-sm text-neutral-500">This is a simple placeholder. We can expand it with platform‑specific details (TestFlight, App Store analytics, etc.) before public launch.</p>
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
      src="/adenium-logo-1000.png"
      srcSet="/adenium-logo-256.png 256w, /adenium-logo-1000.png 1000w"
      sizes="(min-width:1024px) 540px, (min-width:640px) 420px, 320px"
      alt="Adenium Labs"
    />
  );
}

function AdeniumMark({ className = "" }: { className?: string }) {
  return <img className={className} src="/adenium-mark-256.png" alt="Adenium Labs Mark" />;
}

function SoundAsleepIcon({ className = "" }: { className?: string }) {
  return <img className={className} src="/soundasleep-icon.png" alt="Sound Asleep" />;
}

/* --------------------------- UI helper components -------------------------- */

function PhoneFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative mx-auto aspect-[9/19.5] w-full max-w-[240px] sm:max-w-xs transform transition-transform duration-300 hover:scale-105">
      {/* Shadow layers for depth */}
      <div className="absolute inset-0 rounded-[2.5rem] sm:rounded-[3rem] bg-black/20 blur-xl translate-y-6 sm:translate-y-8 scale-110" />
      <div className="absolute inset-0 rounded-[2.5rem] sm:rounded-[3rem] bg-black/10 blur-lg translate-y-3 sm:translate-y-4 scale-105" />

      {/* iPhone-style frame: black silhouette with rounded corners */}
      <div className="absolute inset-0 rounded-[2.5rem] sm:rounded-[3rem] bg-black shadow-2xl" />
      <img
        src={src}
        alt={alt}
        className="absolute inset-[3px] sm:inset-[4px] h-[calc(100%-6px)] sm:h-[calc(100%-8px)] w-[calc(100%-6px)] sm:w-[calc(100%-8px)] rounded-[2.2rem] sm:rounded-[2.8rem] object-cover"
      />
      <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] sm:rounded-[3rem] ring-1 ring-white/20" />

      {/* Subtle highlight for premium look */}
      <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] sm:rounded-[3rem] bg-gradient-to-br from-white/10 via-transparent to-transparent" />
    </div>
  );
}
