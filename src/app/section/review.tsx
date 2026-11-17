"use client";

import React, { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Bodoni_Moda, DM_Sans } from "next/font/google";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const display = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400"],
  display: "swap",
});

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const GOLD = "#C9A25E";

type Testimonial = { quote: string; name: string; city: string };

// Replace with your real guest reviews
const REVIEWS: Testimonial[] = [
  {
    quote:
      "Zaya reframes Mandi without losing its soul. The lamb is impossibly tender and the room feels genuinely transportive.",
    name: "Omar Farouq",
    city: "Abu Dhabi",
  },
  {
    quote:
      "The rice alone is worth the trip. Smoky, fragrant, and served the way my grandmother would have wanted it.",
    name: "Layla Haddad",
    city: "Dubai",
  },
  {
    quote:
      "We came for dinner and stayed for hours. Everything arrives on one platter, and the whole table goes quiet.",
    name: "Daniel Mercer",
    city: "Sharjah",
  },
];

const Review = () => {
  const rootRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const total = REVIEWS.length;
  const current = REVIEWS[index];

  const go = (next: number) => setIndex((next + total) % total);

  // Fade the quote in whenever the slide changes
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-slide]",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.08 }
        );
      });
      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [index] }
  );

  const arrowBtn =
    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 text-[#F6F1E9] transition-colors hover:border-[#C9A25E] hover:text-[#C9A25E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A25E] sm:h-11 sm:w-11";

  return (
    <section
      id="reviews"
      ref={rootRef}
      className={`${sans.className} relative w-full overflow-hidden bg-[#0A0908] px-6 py-24 text-[#F6F1E9] sm:px-12 lg:py-28`}
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 items-center gap-y-10 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-x-10">
        {/* ===== QUOTE ===== */}
        <div className="col-span-2 flex flex-col items-center text-center lg:order-2 lg:col-span-1">
          <span
            aria-hidden="true"
            className={`${display.className} select-none text-[7rem] leading-[0.7] sm:text-[8.5rem]`}
            style={{ color: GOLD, opacity: 0.28 }}
          >
            ”
          </span>

          <p
            className="mt-6 text-[13px] font-medium uppercase tracking-[0.25em]"
            style={{ color: GOLD }}
          >
            At our table
          </p>

          {/* Slide (min-height stops the layout jumping between quotes) */}
          <div
            aria-live="polite"
            className="mt-10 flex min-h-[17rem] w-full max-w-[52rem] flex-col items-center sm:min-h-[15rem] lg:min-h-[14rem]"
          >
            <blockquote
              data-slide
              className={`${display.className} text-[clamp(1.6rem,3.6vw,2.9rem)] font-normal leading-[1.2] tracking-[0.005em]`}
            >
              {current.quote}
            </blockquote>

            <figcaption data-slide className="mt-9">
              <p
                className="text-[10px] font-medium uppercase tracking-[0.2em]"
                style={{ color: GOLD }}
              >
                {current.name}
              </p>
              <p className="mt-2 text-[9px] font-medium uppercase tracking-[0.2em] text-[#F6F1E9]/45">
                {current.city}
              </p>
            </figcaption>
          </div>

          {/* Indicators */}
          <div className="mt-2 flex items-center" role="group" aria-label="Choose a review">
            {REVIEWS.map((r, i) => (
              <button
                key={r.name}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show review ${i + 1} of ${total}`}
                aria-current={i === index}
                className="group flex h-8 items-center px-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A25E]"
              >
                <span
                  className="block h-[2px] w-7 transition-colors duration-500"
                  style={{
                    backgroundColor: i === index ? GOLD : "rgba(246,241,233,0.2)",
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* ===== ARROWS ===== */}
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous review"
          className={`${arrowBtn} justify-self-start lg:order-1`}
        >
          <ArrowLeft className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next review"
          className={`${arrowBtn} justify-self-end lg:order-3`}
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
};

export default Review;