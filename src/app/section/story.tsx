"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const GOLD = "#C9A25E";

const Story = () => {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // One reveal when the section scrolls into view
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
        });

        tl.from("[data-eyebrow]", {
          opacity: 0,
          x: -20,
          duration: 0.7,
        })
          .from(
            "[data-line]",
            { opacity: 0, y: 40, duration: 1, stagger: 0.14 },
            "-=0.4"
          )
          .from(
            "[data-image]",
            {
              clipPath: "inset(100% 0% 0% 0%)",
              duration: 1.4,
              ease: "power3.inOut",
            },
            "-=1.1"
          )
          .from(
            "[data-right]",
            { opacity: 0, y: 24, duration: 0.8, stagger: 0.12 },
            "-=0.7"
          )
          .from(
            "[data-ghost]",
            { opacity: 0, duration: 1.4 },
            "-=0.8"
          );

        // Slow drift inside the image frame while scrolling
        gsap.fromTo(
          "[data-image-inner]",
          { yPercent: -6, scale: 1.12 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <section
      id="story"
      ref={rootRef}
      className="font-playfair relative w-full overflow-hidden bg-[#F4F1EA] text-[#14100C]"
    >
      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-6 py-20 sm:px-12 lg:grid-cols-[minmax(0,1fr)_minmax(240px,300px)_minmax(0,1fr)] lg:items-center lg:gap-14 lg:px-[72px] lg:py-24">
        {/* ===== LEFT: HEADLINE ===== */}
        <div className="lg:self-start lg:pt-16">
          <div data-eyebrow className="mb-8 flex items-center gap-4">
            
            <span
              className="text-[12px] font-medium uppercase tracking-[0.25em]"
              style={{ color: GOLD }}
            >
              The WRAPZ story
            </span>
          </div>

          <h2 className="font-normal leading-[0.98] tracking-[-0.02em] text-[clamp(3rem,6vw,4.75rem)]">
            <span data-line className="block">
              Rooted in
            </span>
            <span
              data-line
              className="block italic"
              style={{ color: GOLD }}
            >
              flavor.
            </span>
            <span data-line className="block">
              Wrapped by fire.
            </span>
          </h2>
        </div>

        {/* ===== CENTER: TALL IMAGE ===== */}
        <div
          data-image
          className="relative mx-auto h-20 md:aspect-[255/525] w-full max-w-[300px] overflow-hidden bg-[#1a1511] lg:max-w-none"
        >
          <div data-image-inner className="absolute inset-0">
            <Image
              src="/image/story/img.jpg"
              alt="Freshly prepared shawarma served with flavorful sides"
              fill
              sizes="(max-width: 1024px) 300px, 300px"
              className="object-cover object-center"
            />
          </div>
        </div>

        {/* ===== RIGHT: COPY ===== */}
        <div className="relative lg:pr-10">
          {/* Large ghost word running down the right edge */}
          <span
            data-ghost
            aria-hidden="true"
            className="font-playfair pointer-events-none absolute -top-24 right-[-0.5rem] hidden select-none text-[clamp(4.5rem,7.5vw,7.5rem)] uppercase leading-none tracking-[0.12em] text-[#14100C]/[0.07] lg:block"
            style={{ writingMode: "vertical-rl" }}
          >
            Flavor
          </span>

         

          <p
            data-right
            className="relative max-w-[17rem] text-[1.35rem] leading-[1.5] tracking-[0.01em]"
          >
            Inspired by the rich tradition of Middle Eastern street food,
            WRAPZ brings bold flavors and freshly made shawarma to every bite.
          </p>

          <p
            data-right
            className="relative mt-8 max-w-[19rem] text-[13px] font-light leading-[1.9] text-[#14100C]/60"
          >
            From perfectly seasoned meat and slow-roasted goodness to fresh
            ingredients and signature sauces, every wrap is made to satisfy
            every craving.
          </p>

          <Link
            data-right
            href="/menu"
            className="group relative mt-10 inline-flex w-[160px] items-center justify-between border-b pb-2 text-[10px] font-medium uppercase tracking-[0.18em] text-[#14100C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A25E]"
            style={{ borderColor: GOLD }}
          >
            Discover our menu
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Story;