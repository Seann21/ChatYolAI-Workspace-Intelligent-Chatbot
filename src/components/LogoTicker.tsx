"use client";

import acmeLogo from "../assets/images/acme.png";
import quantumLogo from "../assets/images/quantum.png";
import echoLogo from "../assets/images/echo.png";
import celestialLogo from "../assets/images/celestial.png";
import pulseLogo from "../assets/images/pulse.png";
import apexLogo from "../assets/images/apex.png";
import Image from "next/image";
import { motion } from "framer-motion";

const sponsorLogos = [
  { src: acmeLogo, alt: "Acme" },
  { src: quantumLogo, alt: "Quantum" },
  { src: echoLogo, alt: "Echo" },
  { src: celestialLogo, alt: "Celestial" },
  { src: pulseLogo, alt: "Pulse" },
  { src: apexLogo, alt: "Apex" },
];

export const LogoTicker = () => {
  return (
    <section className="bg-[#030712] border-y border-white/5 py-8 sm:py-10 overflow-hidden">
      <div className="container mx-auto px-4">
        <p className="text-center text-xs sm:text-sm font-medium tracking-wide text-gray-400 mb-6">
          Didukung oleh ekosistem dan teknologi terdepan
        </p>
        
        <div className="relative overflow-hidden w-full max-w-4xl mx-auto">
          {/* Efek fade kiri & kanan agar animasi halus */}
          <div
            aria-hidden="true"
            className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-[#030712] to-transparent z-10 pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-[#030712] to-transparent z-10 pointer-events-none"
          />

          {/* Running marquee animation */}
          <motion.div
            transition={{
              duration: 25,
              ease: "linear",
              repeat: Infinity,
            }}
            initial={{ translateX: 0 }}
            animate={{ translateX: "-50%" }}
            className="flex items-center gap-14 sm:gap-16 flex-none pr-14 sm:pr-16"
          >
            {sponsorLogos.map(({ src, alt }, idx) => (
              <div key={`logo-1-${idx}`} className="flex items-center justify-center flex-none opacity-60 hover:opacity-100 transition-opacity">
                <Image
                  src={src}
                  alt={alt}
                  className="h-6 sm:h-7 w-auto object-contain brightness-95"
                />
              </div>
            ))}
            {sponsorLogos.map(({ src, alt }, idx) => (
              <div key={`logo-2-${idx}`} className="flex items-center justify-center flex-none opacity-60 hover:opacity-100 transition-opacity">
                <Image
                  src={src}
                  alt={alt}
                  className="h-6 sm:h-7 w-auto object-contain brightness-95"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
