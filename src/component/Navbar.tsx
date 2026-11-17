"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Menu } from "lucide-react";
import Sidebar from "@/component/Sidebar";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`absolute top-0 left-0 right-0 z-50 transition-all duration-500 px-6 sm:px-12 lg:px-16 ${
          scrolled ? "py-4 bg-[#0A0908]/90 backdrop-blur-md shadow-lg" : "py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left - Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/logo.png"
              alt="WRAPZ Logo"
              width={150}
              height={65}
              priority
              className="w-20 sm:w-24 md:w-28 h-auto object-contain"
            />
          </Link>

          {/* Center - Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-xs tracking-[0.18em] uppercase text-[#F7EFE4]">
            <Link href="/" className="hover:text-[#E5AD58] transition-colors duration-300">
              Home
            </Link>

            <Link href="/our-story" className="hover:text-[#E5AD58] transition-colors duration-300">
              About
            </Link>

            <Link href="/menu" className="hover:text-[#E5AD58] transition-colors duration-300">
              Menu
            </Link>

            <Link href="/reserve" className="hover:text-[#E5AD58] transition-colors duration-300">
              Reserve
            </Link>

            <Link href="/contact" className="hover:text-[#E5AD58] transition-colors duration-300">
              Contact
            </Link>
          </nav>

          {/* Right - CTA Button & Sidebar Toggle */}
          <div className="flex items-center gap-4">
            <Link
              href="/menu"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-[#0B0A08] bg-[#E5AD58] hover:bg-[#FCEFD5] rounded-xs transition-all duration-300"
            >
              <span>Order Now</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            {/* Sidebar Hamburger Button (Desktop & Mobile) */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex items-center justify-center p-2 text-[#F7EFE4] hover:text-[#E5AD58] transition-colors focus:outline-none cursor-pointer"
              aria-label="Open Navigation Sidebar"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-over Luxury Navigation Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};

export default Navbar;