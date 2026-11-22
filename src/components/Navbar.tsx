"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MenuIcon, XIcon } from "@/components/icons/LandingIcons";

const NAV_LINKS = [
  { label: "Fitur", href: "/#features" },
  { label: "Tampilan", href: "/#showcase" },
  { label: "FAQ", href: "/#faq" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "bg-[#030712]/90 backdrop-blur-md border-b border-white/10 shadow-md shadow-black/30"
          : "bg-[#030712]/60 backdrop-blur-sm border-b border-white/5"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="py-3 flex items-center justify-between">
          {/* Logo & Brand */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded-lg p-1"
            aria-label="ChatYol AI Beranda"
          >
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 p-0.5 shadow-sm">
              <div className="h-full w-full bg-[#030712] rounded-[10px] flex items-center justify-center p-1">
                <Image
                  src="/Chatyol.svg"
                  alt="Logo ChatYol"
                  width={28}
                  height={28}
                  className="h-full w-full object-contain"
                  priority
                />
              </div>
            </div>
            <span className="font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">
              ChatYol <span className="text-cyan-400">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Navigasi Utama" className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/chat"
              prefetch={true}
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              Coba Chatbot →
            </Link>
          </nav>

          {/* Mobile Toggle Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Tutup menu" : "Buka menu"}
            className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-lg border border-white/15 bg-white/5 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
          >
            {isOpen ? (
              <XIcon className="h-5 w-5 text-white" aria-hidden="true" />
            ) : (
              <MenuIcon className="h-5 w-5 text-white" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div
          className="md:hidden border-b border-white/10 bg-[#030712]/95 backdrop-blur-xl px-4 py-4 space-y-2"
          role="dialog"
          aria-modal="true"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <Link
              href="/chat"
              prefetch={true}
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-lg shadow-sm"
            >
              Coba Chatbot →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
