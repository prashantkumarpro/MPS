import { useState, useEffect } from "react";

export default function ResultBanner() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // scrolling down → hide
        setShow(false);
      } else {
        // scrolling up → show
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <section
      className={`w-full bg-gradient-to-r from-primary-blue via-secondary-blue to-accent-purple
        text-white font-montserrat shadow-md sticky top-20 z-10 transition-transform duration-500
        ${show ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="max-w-6xl mx-auto py-6 px-4 flex flex-col md:flex-row items-center justify-between">

        {/* Left: Title */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide animate-pulse">
            📢 2nd Term Exam Result 2025-26
          </h1>
          <p className="text-sm md:text-base opacity-90 mt-1">
            Results are being verified and will be available shortly. Stay tuned!
          </p>
        </div>

        {/* Right: Loading / Curiosity Section */}
        <div className="flex flex-col items-center md:items-end">
          {/* 🔒 Lock icon */}
          <div className="w-12 h-12 mb-2 flex items-center justify-center bg-white/20 rounded-full animate-pulse">
            🔒
          </div>

          {/* Loading bar */}
          <div className="w-48 h-2 bg-white/30 rounded-full overflow-hidden">
            <div className="h-full bg-green-300 rounded-full animate-[load_2s_ease-in-out_infinite]"></div>
          </div>

          {/* Curiosity Text */}
          <span className="text-xs mt-2 italic opacity-90">
            Keep checking… Smart students see first 😉
          </span>
        </div>
      </div>

      {/* Keyframes for loading animation */}
      <style>
        {`@keyframes load {
          0% { width: 15%; }
          50% { width: 85%; }
          100% { width: 40%; }
        }`}
      </style>
    </section>
  );
}
