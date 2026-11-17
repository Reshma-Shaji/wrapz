


"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const GOLD = "#C9A25E";

type Part = {
  no: string;
  title: string;
  note: string;
  indicatorPos: string;
};

const PARTS: Part[] = [
  {
    no: "01",
    title: "Tender marinated meat",
    note: "Slow-roasted & seasoned with our signature spice blend",
    indicatorPos: "top-[32%] left-[42%]",
  },
  {
    no: "02",
    title: "Freshly baked wrap",
    note: "Soft, warm artisan flatbread wrapped to perfection",
    indicatorPos: "top-[28%] right-[38%]",
  },
  {
    no: "03",
    title: "Crisp vegetables",
    note: "Pickled gherkins, fresh parsley & crisp greens",
    indicatorPos: "bottom-[34%] left-[40%]",
  },
  {
    no: "04",
    title: "Signature garlic toum",
    note: "Velvety, rich creamy sauce made to elevate every bite",
    indicatorPos: "bottom-[28%] right-[38%]",
  },
];

const Anatomy = () => {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  const leftParts = [PARTS[0], PARTS[2]];
  const rightParts = [PARTS[1], PARTS[3]];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // 1. Heading reveal
        gsap.from("[data-head]", {
          opacity: 0,
          y: 35,
          stagger: 0.14,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 80%",
          },
        });

        // 2. Center image reveal
        gsap.fromTo(
          "[data-plate-wrap]",
          {
            scale: 0.9,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 1.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: stageRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // 3. Warm halo reveal
        gsap.fromTo(
          "[data-ring-glow]",
          { scale: 0.75, opacity: 0 },
          {
            scale: 1.1,
            opacity: 0.85,
            duration: 1.5,
            ease: "sine.out",
            scrollTrigger: {
              trigger: stageRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // 4. Ingredient pins reveal
        gsap.fromTo(
          "[data-pin-dot]",
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            stagger: 0.15,
            duration: 0.7,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: stageRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // 5. Description cards - smooth fade and slide up
        gsap.utils
          .toArray<HTMLElement>("[data-part-card]")
          .forEach((card, i) => {
            gsap.fromTo(
              card,
              {
                opacity: 0,
                y: 35,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.9,
                delay: i * 0.08,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 88%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          });

        // 6. Closing statement
        gsap.from("[data-closing]", {
          opacity: 0,
          y: 16,
          duration: 0.8,
          scrollTrigger: {
            trigger: "[data-closing]",
            start: "top 90%",
          },
        });

        // 7. Image subtle scroll zoom
        gsap.fromTo(
          "[data-plate-img]",
          { scale: 1.08 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: stageRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );

        // 8. Glowing ingredient pins
        gsap.to("[data-pin-pulse]", {
          scale: 1.6,
          opacity: 0,
          duration: 1.8,
          repeat: -1,
          ease: "power1.out",
        });

        // 9. Background glow parallax
        gsap.to("[data-bg-glow]", {
          y: "+=90",
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        // 10. Horizontal marquee
        gsap.fromTo(
          "[data-marquee-row-1]",
          { x: 0 },
          {
            x: "-18%",
            ease: "none",
            scrollTrigger: {
              trigger: marqueeRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          }
        );

        gsap.fromTo(
          "[data-marquee-row-2]",
          { x: "-18%" },
          {
            x: "0%",
            ease: "none",
            scrollTrigger: {
              trigger: marqueeRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          }
        );
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  // Ingredient description card
  const renderCard = (p: Part, side: "left" | "right") => (
    <div
      key={p.no}
      data-part-card
      className={`group relative w-full py-5 ${
        side === "left"
          ? "text-left lg:text-right"
          : "text-left"
      }`}
    >
      {/* Connecting line */}
      <div
        className={`absolute top-[34px] hidden lg:flex items-center ${
          side === "left"
            ? "right-[-32px] flex-row-reverse"
            : "left-[-32px] flex-row"
        }`}
      >
        <span className="h-px w-8 bg-[#C9A25E]/50 transition-all duration-500 group-hover:bg-[#C9A25E]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#C9A25E] shadow-[0_0_10px_#C9A25E]" />
      </div>

      {/* Number and accent */}
      <div
        className={`flex items-center gap-3 mb-3 ${
          side === "left" ? "lg:justify-end" : ""
        }`}
      >
        <span
          className="text-xs font-semibold tracking-[0.25em]"
          style={{ color: GOLD }}
        >
          {p.no}
        </span>

        <span className="h-px w-8 bg-[#C9A25E]/40 transition-all duration-300 group-hover:w-12 group-hover:bg-[#C9A25E]" />
      </div>

      {/* Title */}
      <p className="text-[1.25rem] sm:text-[1.4rem] leading-snug text-[#F6F1E9] transition-colors duration-300 group-hover:text-[#C9A25E]">
        {p.title}
      </p>

      {/* Description */}
      <p className="mt-2 text-xs sm:text-[13px] font-light leading-relaxed text-[#F6F1E9]/60 max-w-[280px] ml-0 lg:ml-auto">
        {side === "left" ? (
          <span className="lg:block">{p.note}</span>
        ) : (
          p.note
        )}
      </p>
    </div>
  );

  return (
    <section
      id="signature"
      ref={rootRef}
      className="font-playfair relative w-full overflow-hidden bg-[#0A0908] text-[#F6F1E9] py-24 sm:py-32 select-none"
    >
      {/* Background glow */}
      <div
        data-bg-glow
        className="pointer-events-none absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(201,162,94,0.12)_0%,rgba(10,9,8,0)_70%)] blur-3xl"
      />

      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-12 lg:px-[72px]">

        {/* HEADING (centered) */}
        <div className="text-center flex flex-col items-center">
          <div data-head className="mb-4 inline-flex items-center gap-3">
            <span
              className="text-[12px] font-medium uppercase tracking-[0.28em]"
              style={{ color: GOLD }}
            >
              The WRAPZ signature
            </span>
          </div>

          <h2 className="font-normal leading-[1.02] tracking-[-0.02em] text-[clamp(2.5rem,6vw,4.5rem)]">
            <span data-head className="block">
              Anatomy of
            </span>

            <span
              data-head
              className="block italic mt-1"
              style={{ color: GOLD }}
            >
              the perfect Shawarma.
            </span>
          </h2>

          <p
            data-head
            className="mt-4 mx-auto max-w-lg text-sm sm:text-[15px] font-light leading-relaxed text-[#F6F1E9]/60"
          >
            Deconstructed layer by layer. Explore how tender roasted cutlets,
            charred spices, and velvety garlic toum come together in perfect
            unison.
          </p>
        </div>

        {/* ANATOMY STAGE */}
        <div
          ref={stageRef}
          data-stage
          className="relative mt-16 grid grid-cols-2 gap-x-5 gap-y-8 items-center lg:grid-cols-[minmax(0,1fr)_minmax(320px,520px)_minmax(0,1fr)] lg:gap-x-8 lg:gap-y-0"
        >
          {/* CENTER IMAGE */}
          <div
            data-plate-wrap
            className="relative col-span-2 mx-auto aspect-square w-full max-w-[480px] lg:col-start-2 lg:col-span-1 lg:row-start-1 lg:max-w-[520px] flex items-center justify-center z-10"
          >
            {/* Warm halo */}
            <div
              data-ring-glow
              className="pointer-events-none absolute inset-[-8%] rounded-full opacity-60 blur-2xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(201,162,94,0.2) 0%, transparent 65%)",
              }}
            />

            {/* Image */}
            <div className="relative w-[85%] h-[85%] overflow-hidden rounded-full shadow-[0_30px_90px_rgba(0,0,0,0.95)]">
              <div
                data-plate-img
                className="absolute inset-0"
              >
                <Image
                  src="/image/anatomy/img1.jpg"
                  alt="Signature Shawarma with tender marinated meat and sauces"
                  fill
                  priority
                  sizes="(max-width: 1024px) 75vw, 480px"
                  className="object-cover object-center filter contrast-105"
                />
              </div>

              {/* Soft edge blend */}
              <div className="absolute inset-0 bg-radial-[circle_at_center] from-transparent via-transparent to-[#0A0908]/75 pointer-events-none" />

              {/* Ingredient pins */}
              <div className="absolute inset-0 pointer-events-none">
                {PARTS.map((p) => (
                  <div
                    key={`pin-${p.no}`}
                    data-pin-dot
                    className={`absolute ${p.indicatorPos} -translate-x-1/2 -translate-y-1/2 flex items-center justify-center`}
                  >
                    <span
                      data-pin-pulse
                      className="absolute h-5 w-5 rounded-full"
                      style={{ backgroundColor: GOLD }}
                    />

                    <span
                      className="relative h-2.5 w-2.5 rounded-full border border-black shadow-[0_0_8px_#C9A25E]"
                      style={{ backgroundColor: GOLD }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* LEFT DESCRIPTIONS: 01 & 03 */}
          <div className="col-start-1 row-start-2 flex flex-col justify-center lg:col-start-1 lg:row-start-1 lg:pr-8">
            {leftParts.map((p) => renderCard(p, "left"))}
          </div>

          {/* RIGHT DESCRIPTIONS: 02 & 04 */}
          <div className="col-start-2 row-start-2 flex flex-col justify-center lg:col-start-3 lg:row-start-1 lg:pl-8">
            {rightParts.map((p) => renderCard(p, "right"))}
          </div>
        </div>

       
      </div>

      {/* SCROLL MARQUEE */}
      <div
        ref={marqueeRef}
        className="mt-16 sm:mt-20 overflow-hidden select-none pointer-events-none"
        aria-hidden="true"
      >
        {/* Row 1 */}
        <div
          data-marquee-row-1
          className="font-playfair flex items-center gap-10 whitespace-nowrap mb-3"
          style={{ willChange: "transform" }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="flex items-center gap-10">
              <span className="text-[clamp(2rem,5vw,3.5rem)] font-normal italic text-[#F6F1E9]/08 leading-none">
                Tender Marinated Meat
              </span>

              <span
                className="text-[clamp(2rem,5vw,3.5rem)] font-normal italic leading-none"
                style={{ color: `${GOLD}18` }}
              >
                ✦
              </span>

              <span className="text-[clamp(2rem,5vw,3.5rem)] font-normal italic text-[#F6F1E9]/08 leading-none">
                Signature Garlic Toum
              </span>

              <span
                className="text-[clamp(2rem,5vw,3.5rem)] font-normal italic leading-none"
                style={{ color: `${GOLD}18` }}
              >
                ✦
              </span>
            </span>
          ))}
        </div>

        {/* Row 2 */}
        <div
          data-marquee-row-2
          className="font-playfair flex items-center gap-10 whitespace-nowrap"
          style={{ willChange: "transform" }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="flex items-center gap-10">
              <span className="text-[clamp(2rem,5vw,3.5rem)] font-normal text-[#F6F1E9]/06 leading-none">
                Freshly Baked Wrap
              </span>

              <span
                className="text-[clamp(2rem,5vw,3.5rem)] font-normal leading-none"
                style={{ color: `${GOLD}14` }}
              >
                ✦
              </span>

              <span className="text-[clamp(2rem,5vw,3.5rem)] font-normal text-[#F6F1E9]/06 leading-none">
                Crisp Vegetables
              </span>

              <span
                className="text-[clamp(2rem,5vw,3.5rem)] font-normal leading-none"
                style={{ color: `${GOLD}14` }}
              >
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Anatomy;
