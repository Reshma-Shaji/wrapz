



"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const GOLD = "#C9A25E";

const STATS = [
  { image: "/image/our-story/hero/img1.jpg", label: "Fresh daily" },
  { image: "/image/our-story/hero/img2.jpg", label: "Signature wraps" },
  { image: "/image/our-story/hero/img3.jpg", label: "Our obsession" },
];

const Hero = () => {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
          })
          .from("[data-intro]", { opacity: 0, y: 36, duration: 1, stagger: 0.14 })
          .from("[data-stat]", { opacity: 0, y: 24, duration: 0.8, stagger: 0.12 }, "-=0.5");

        gsap.to("[data-intro-glow]", {
          y: "+=80",
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <section
      id="introduction"
      ref={rootRef}
      className="font-playfair relative w-full overflow-hidden bg-[#0A0908] py-24 text-[#F6F1E9] sm:py-32"
    >
      <div
        data-intro-glow
        className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(201,162,94,0.12)_0%,rgba(10,9,8,0)_70%)] blur-3xl"
      />

      <div className="relative mx-auto flex max-w-[1100px] flex-col items-center px-6 text-center sm:px-12">
        <span
          data-intro
          className="mb-5 text-[12px] font-medium uppercase tracking-[0.28em]"
          style={{ color: GOLD }}
        >
          Welcome to WRAPZ
        </span>

        <h2 className="font-normal leading-[1.02] tracking-[-0.02em] text-[clamp(2.5rem,6vw,4.75rem)]">
          <span data-intro className="block">
            Not just a shawarma.
          </span>
          <span data-intro className="mt-1 block italic" style={{ color: GOLD }}>
            A wrap worth remembering.
          </span>
        </h2>

        <p
          data-intro
          className="mt-6 max-w-xl text-sm font-light leading-relaxed text-[#F6F1E9]/60 sm:text-[15px]"
        >
          Slow-roasted meat, freshly baked bread, crisp vegetables and our
          signature garlic toum. Simple ingredients, handled with care and
          wrapped to perfection, one order at a time.
        </p>

        <div className="mt-14 grid w-full max-w-3xl grid-cols-3 gap-6 border-t border-[#C9A25E]/20 pt-10">
          {STATS.map((s) => (
            <div key={s.label} data-stat className="flex flex-col items-center">
              <div className="relative h-12 w-12 md:h-40 md:w-40">
                <Image
                  src={s.image}
                  alt={s.label}
                  fill
                  className="object-contain"
                />
              </div>

              <span className="mt-3 text-[10px] font-medium uppercase tracking-[0.22em] text-[#F6F1E9]/55 sm:text-[11px]">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;