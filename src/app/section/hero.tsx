"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ArrowDown } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const GOLD = "#C9A25E";

const Hero = () => {
  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Respect reduced-motion: show the poster frame instead of playing the video
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduce) {
      v.pause();
      v.removeAttribute("autoplay");
    } else {
      v.play().catch(() => {
        /* autoplay blocked, poster stays visible */
      });
    }
  }, []);

  // One orchestrated entrance, nothing else moves on its own
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        return;

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.from("[data-bg]", {
        opacity: 0,
        scale: 1.06,
        duration: 2,
        ease: "power2.out",
      })
        .from(
          "[data-eyebrow]",
          { opacity: 0, x: -24, duration: 0.8 },
          "-=1.2"
        )
        .from(
          "[data-line]",
          { opacity: 0, y: 50, duration: 1.2, stagger: 0.18 },
          "-=0.6"
        )
        .from(
          "[data-fade]",
          { opacity: 0, y: 20, duration: 0.8, stagger: 0.12 },
          "-=0.6"
        )
        .from("[data-side]", { opacity: 0, duration: 1 }, "-=0.4");
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      className="font-playfair relative isolate min-h-screen w-full overflow-hidden bg-[#0d0c0b] text-[#F6F1E9]"
    >
      {/* ===== BACKGROUND VIDEO ===== */}
      <div data-bg className="absolute inset-0 -z-10">
        <video
          ref={videoRef}
          className="h-full w-full object-cover brightness-50"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/videos/mandi-poster.jpg"
          aria-hidden="true"
        >
          {/* Put your files in /public/videos/ */}
          <source src="video/hero.mp4" type="video/webm" />
          <source src="video/hero.mp4" type="video/mp4" />
        </video>

        {/* Dark grade over the footage */}
      </div>

      {/* ===== CONTENT ===== */}
      <div className="relative mx-auto flex min-h-screen max-w-[1400px] flex-col justify-center px-6 sm:px-12 lg:px-[100px]">

        {/* Headline */}
        <h1 className="font-normal leading-[0.88] tracking-[-0.03em] text-[clamp(3.75rem,11vw,9.75rem)]">
          <span data-line className="block">
            Unwrap the
          </span>

          <span
            data-line
            className="block"
            style={{ color: GOLD }}
          >
            Extraordinary.
          </span>
        </h1>

        {/* Supporting copy + CTAs */}
        <div className="">
          <p
            data-fade
            className="max-w-3xl text-sm font-light leading-[1.9] text-[#F6F1E9]/75 md:text-2xl"
          >
            Freshly prepared shawarma, perfectly seasoned and wrapped
            with bold flavors. Every bite is a taste worth craving.
          </p>

          <div
            data-fade
            className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-5"
          >
            <Link
              href="/reserve"
              className="group flex h-[54px] w-[188px] items-center justify-between px-6 text-[11px] font-medium uppercase tracking-[0.2em] text-[#14110d] transition-colors duration-300 hover:bg-[#DDB872] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A25E]"
              style={{ backgroundColor: GOLD }}
            >
              Order now

              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/menu"
              className="group flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[#F6F1E9] transition-colors hover:text-[#C9A25E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A25E]"
            >
              Explore the menu

              <ArrowDown
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5"
                style={{ color: GOLD }}
              />
            </Link>
          </div>
        </div>
      </div>

      
    </section>
  );
};

export default Hero;