



"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const GOLD = "#C9A25E";

type Dish = {
  name: string;
  
  desc: string;
  image: string;
  alt: string;
};

// Edit your dishes here. Images go in /public/images/menu/
const DISHES: Dish[] = [
  {
    name: "Classic Chicken Shawarma",
   
    desc: "Juicy marinated chicken, fresh vegetables and our signature garlic sauce, wrapped to perfection.",
    image: "/image/sig/img1.jpg",
    alt: "Classic chicken shawarma wrap filled with juicy chicken and fresh vegetables",
  },
  {
    name: "Spicy Peri Peri Shawarma",
   
    desc: "Flame-grilled chicken tossed in bold peri peri spices with creamy sauce and crunchy vegetables.",
    image: "/image/sig/img2.jpg",
    alt: "Spicy peri peri chicken shawarma with sauce",
  },
  {
    name: "WRAPZ Special Shawarma",
   
    desc: "Our signature creation loaded with seasoned chicken, special sauces and irresistible flavors.",
    image: "/image/sig/img3.jpg",
    alt: "Special loaded shawarma wrap with signature sauces",
  },
  {
    name: "Cheesy Chicken Shawarma",
  
    desc: "Tender chicken, melted cheese, fresh vegetables and a rich creamy sauce in every bite.",
    image: "/image/sig/img4.jpg",
    alt: "Cheesy chicken shawarma filled with melted cheese",
  },
];

const Signatures = () => {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateEdges();
    window.addEventListener("resize", updateEdges);
    return () => window.removeEventListener("resize", updateEdges);
  }, [updateEdges]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap || "0") || 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({
      left: dir * (card.getBoundingClientRect().width + gap),
      behavior: reduce ? "auto" : "smooth",
    });
  };

  // One reveal when the section enters the viewport
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
        });
        tl.from("[data-head]", { opacity: 0, y: 36, duration: 1, stagger: 0.12 })
          .from("[data-controls]", { opacity: 0, duration: 0.8 }, "-=0.6")
          .from("[data-card]", { opacity: 0, y: 50, duration: 1, stagger: 0.15 }, "-=0.6")
          .from("[data-foot]", { opacity: 0, y: 16, duration: 0.7 }, "-=0.4");
      });
      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <section
      id="menu"
      ref={rootRef}
      className="font-playfair relative w-full overflow-hidden bg-[#F4F1EA] text-[#14100C]"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-20 sm:px-12 lg:px-[72px] lg:py-24">
        {/* ===== HEADER ===== */}
        <div className="flex items-end justify-between gap-6">
          <div>
            <div data-head className="mb-5 flex items-center gap-4">
              <span
                className="text-[12px] font-medium uppercase tracking-[0.25em]"
                style={{ color: GOLD }}
              >
                Fresh from the grill
              </span>
            </div>
            <h2 className="font-normal leading-[0.98] tracking-[-0.02em] text-[clamp(2.5rem,5.5vw,4.25rem)]">
              <span data-head className="block">
                Our signatures,
              </span>
              <span data-head className="block italic" style={{ color: GOLD }}>
                wrapped with love.
              </span>
            </h2>
          </div>

          {/* Prev / next */}
          <div data-controls className="mb-2 flex shrink-0">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              disabled={!canPrev}
              aria-label="Previous dishes"
              className="flex h-11 w-11 items-center justify-center border border-[#14100C]/20 transition-colors hover:bg-[#14100C] hover:text-[#F4F1EA] disabled:cursor-default disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-inherit focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A25E]"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              disabled={!canNext}
              aria-label="Next dishes"
              className="-ml-px flex h-11 w-11 items-center justify-center border border-[#14100C]/20 transition-colors hover:bg-[#14100C] hover:text-[#F4F1EA] disabled:cursor-default disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-inherit focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A25E]"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* ===== CAROUSEL ===== */}
        <ul
          ref={trackRef}
          onScroll={updateEdges}
          aria-label="Signature shawarma dishes"
          className="-mr-6 mt-12 flex snap-x snap-mandatory gap-[18px] overflow-x-auto pb-2 pr-6 [scrollbar-width:none] sm:-mr-12 sm:pr-12 lg:-mr-[72px] lg:mt-16 lg:pr-[72px] [&::-webkit-scrollbar]:hidden"
        >
          {DISHES.map((d, i) => (
            <li
              key={d.name}
              data-card
              className="group w-[82%] shrink-0 snap-start sm:w-[46%] lg:w-[calc(46%-9px)]"
            >
              <div className="relative aspect-[304/330] overflow-hidden">
                <Image
                  src={d.image}
                  alt={d.alt}
                  fill
                  sizes="(max-width: 640px) 82vw, 46vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                />

              </div>

              <div className="mt-6 flex items-baseline justify-between gap-4">
                <h3 className="text-[1.35rem] leading-tight">
                  {d.name}
                </h3>
              
              </div>
              <p className="mt-3 max-w-[20rem] text-[18px] font-light leading-[1.8] text-[#14100C]/60">
                {d.desc}
              </p>
            </li>
          ))}
        </ul>

        {/* ===== FOOTER LINK ===== */}
        <Link
          data-foot
          href="/menu"
          className="group mt-12 inline-flex w-[136px] items-center justify-between border-b pb-2 text-[10px] font-medium uppercase tracking-[0.18em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A25E]"
          style={{ borderColor: GOLD }}
        >
          View full menu
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
};

export default Signatures;

