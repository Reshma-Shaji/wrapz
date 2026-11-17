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
        gsap
          .timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
          })
          .from("[data-story-img]", { opacity: 0, y: 50, duration: 1.2 })
          .from("[data-story]", { opacity: 0, y: 36, duration: 1, stagger: 0.12 }, "-=0.8");

        gsap.fromTo(
          "[data-story-img-inner]",
          { scale: 1.1 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
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
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-6 py-20 sm:px-12 lg:grid-cols-2 lg:gap-20 lg:px-[72px] lg:py-28">
        {/* Image */}
        <div data-story-img className="relative mx-auto w-full max-w-[560px]">
              <Image
                src="/image/our-story/hero/img.png"
                alt="Fresh shawarma being prepared at WRAPZ"
              width={1000}
              height={1000}
            
               
                className="object-cover object-center"
              />
         
        </div>

        {/* Text */}
        <div className="flex flex-col items-start">
          <Link href="/our-story">
          <span
            data-story
            className="mb-5 text-[12px] font-medium uppercase tracking-[0.25em]"
            style={{ color: GOLD }}
          >
            Our story
          </span>
</Link>
          <h2 className="font-normal leading-[0.98] tracking-[-0.02em] text-[clamp(2.5rem,5.5vw,4.25rem)]">
            <span data-story className="block">
              Rooted in flavour.
            </span>
            <span data-story className="block italic" style={{ color: GOLD }}>
              Raised on the grill.
            </span>
          </h2>

          <p
            data-story
            className="mt-6 max-w-md text-[17px] font-light leading-[1.8] text-[#14100C]/65"
          >
            WRAPZ began with one simple idea: a shawarma should taste like it
            was made just for you. We roast our meat slowly, bake our bread
            fresh and whip our garlic toum in small batches.
          </p>

          <p
            data-story
            className="mt-4 max-w-md text-[17px] font-light leading-[1.8] text-[#14100C]/65"
          >
            No shortcuts, no compromises. Just honest ingredients and a little
            obsession in every wrap.
          </p>

          <Link
            data-story
            href="/about"
            className="group mt-10 inline-flex items-center justify-between gap-6 border-b pb-2 text-[10px] font-medium uppercase tracking-[0.18em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A25E]"
            style={{ borderColor: GOLD }}
          >
            Read our story
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Story;