
"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ArrowRight, Phone, Clock } from "lucide-react";

const GOLD = "#C9A25E";

const NAV_LINKS = [
  {  label: "Home", href: "/" },
  {  label: "About", href: "/our-story" },
  {  label: "Menu", href: "/menu" },
  { label: "Reserve", href: "/reserve" },
  {  label: "Contact", href: "/contact" },
];

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  // Prevent background scrolling when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex justify-end bg-black/80 backdrop-blur-md transition-opacity duration-300"
      onClick={onClose}
    >
      {/* Sidebar Panel */}
      <aside
        className="font-playfair relative flex h-full w-full max-w-md flex-col justify-between overflow-y-auto bg-[#0C0A08] border-l border-white/10 px-8 py-8 text-[#F6F1E9] shadow-2xl transition-transform duration-500"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar: Brand Logo & Close Button */}
        <div>
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <Link href="/" onClick={onClose} className="flex items-center">
              <Image
                src="/logo.png"
                alt="WRAPZ Logo"
                width={130}
                height={55}
                priority
                className="h-auto w-20 sm:w-24 object-contain"
              />
            </Link>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-[#F6F1E9]/70 transition-all duration-300 hover:border-[#C9A25E] hover:text-[#C9A25E] hover:rotate-90"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Tagline */}
          <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.25em] text-[#C9A25E]">
            Artisan Arabian Dining
          </p>

          {/* Navigation Links */}
          <nav className="mt-8 space-y-2" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="group flex items-center justify-between border-b border-white/5 py-4 transition-all duration-300 hover:border-[#C9A25E]/40"
              >
                <div className="flex items-baseline gap-4">
                 

                  <span className="text-2xl font-normal tracking-wide text-[#F6F1E9] transition-colors duration-300 group-hover:text-[#C9A25E]">
                    {link.label}
                  </span>
                </div>

                <ArrowRight className="h-4 w-4 text-white/20 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#C9A25E]" />
              </Link>
            ))}
          </nav>
        </div>

        {/* CTA Buttons */}
        <div className="my-8 space-y-3">
          <Link
            href="/reserve"
            onClick={onClose}
            className="flex w-full items-center justify-center gap-2 rounded-xs bg-[#C9A25E] py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#0A0908] transition-all duration-300 hover:bg-[#E5BE78] hover:shadow-[0_4px_20px_rgba(201,162,94,0.3)]"
          >
            <span>Book a Table</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>

          <Link
            href="/menu"
            onClick={onClose}
            className="flex w-full items-center justify-center gap-2 rounded-xs border border-white/15 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#F6F1E9] transition-colors hover:border-[#C9A25E] hover:text-[#C9A25E]"
          >
            <span>Explore Menu</span>
          </Link>
        </div>

        {/* Bottom Details: Hours & Contact */}
        <div className="border-t border-white/10 pt-6 space-y-4 text-xs text-[#F6F1E9]/65">
          <div className="flex items-start gap-3">
            <Clock className="h-3.5 w-3.5 shrink-0 text-[#C9A25E] mt-0.5" />

            <div>
              <p className="font-medium text-[#F6F1E9]">
                Operating Hours
              </p>

              <p className="text-[11px] text-[#F6F1E9]/50">
                Everyday: 12:00 PM – 11:30 PM
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="h-3.5 w-3.5 shrink-0 text-[#C9A25E] mt-0.5" />

            <div>
              <p className="font-medium text-[#F6F1E9]">
                Phone & Reservations
              </p>

              <a
                href="tel:+919876543210"
                className="text-[11px] text-[#F6F1E9]/50 hover:text-[#C9A25E] transition-colors"
              >
                +91 98765 43210
              </a>
            </div>
          </div>

          {/* Bottom Branding */}
          <div className="flex items-center justify-between pt-2 border-t border-white/5">
            <span className="text-[10px] uppercase tracking-wider text-[#F6F1E9]/40">
              © 2026 WRAPZ
            </span>

            <span className="text-[10px] uppercase tracking-widest text-[#C9A25E]">
              Freshly Wrapped
            </span>
          </div>
        </div>
      </aside>
    </div>
  );
}