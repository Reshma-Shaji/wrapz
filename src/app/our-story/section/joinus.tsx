"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Bike, ShoppingBag, UtensilsCrossed } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const GOLD = "#C9A25E";

const WAYS = [
  {
    no: "01",
    icon: UtensilsCrossed,
    title: "Dine in",
    desc: "Sit down, relax and watch your wrap come together fresh off the grill.",
    cta: "Visit us",
    href: "/contact",
  },
  {
    no: "02",
    icon: ShoppingBag,
    title: "Takeaway",
    desc: "Order ahead and pick up a hot, freshly wrapped shawarma in minutes.",
    cta: "Order now",
    href: "/menu",
  },
  {
    no: "03",
    icon: Bike,
    title: "Delivery",
    desc: "Your favourite wraps, delivered warm and wrapped tight to your door.",
    cta: "Get it delivered",
    href: "/menu",
  },
];

const Joinus = () => {
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
          .from("[data-exp-head]", { opacity: 0, y: 36, duration: 1, stagger: 0.12 })
          .from("[data-exp-card]", { opacity: 0, y: 50, duration: 1, stagger: 0.15 }, "-=0.5");

        gsap.to("[data-exp-glow]", {
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
      id="experience"
      ref={rootRef}
      className="font-playfair relative w-full overflow-hidden bg-[#0A0908] py-24 text-[#F6F1E9] sm:py-32"
    >
      <div
        data-exp-glow
        className="pointer-events-none absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(201,162,94,0.1)_0%,rgba(10,9,8,0)_70%)] blur-3xl"
      />

      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-12 lg:px-[72px]">
        {/* Heading */}
        <div className="flex flex-col items-center text-center">
          <span
            data-exp-head
            className="mb-4 text-[12px] font-medium uppercase tracking-[0.28em]"
            style={{ color: GOLD }}
          >
            Experience us
          </span>

          <h2 className="font-normal leading-[1.02] tracking-[-0.02em] text-[clamp(2.5rem,6vw,4.5rem)]">
            <span data-exp-head className="block">
              Your table, your way.
            </span>
            <span data-exp-head className="mt-1 block italic" style={{ color: GOLD }}>
              Always wrapped fresh.
            </span>
          </h2>

          <p
            data-exp-head
            className="mt-4 max-w-lg text-sm font-light leading-relaxed text-[#F6F1E9]/60 sm:text-[15px]"
          >
            Whether you stay, grab and go, or stay home, every WRAPZ order
            gets the same care.
          </p>
        </div>

        {/* Cards */}
        <ul className="mt-16 grid gap-6 md:grid-cols-3">
          {WAYS.map(({ no, icon: Icon, title, desc, cta, href }) => (
            <li
              key={no}
              data-exp-card
              className="group relative flex flex-col border border-[#C9A25E]/20 p-8 transition-colors duration-500 hover:border-[#C9A25E]/60 sm:p-10"
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-xs font-semibold tracking-[0.25em]"
                  style={{ color: GOLD }}
                >
                  {no}
                </span>
                <Icon
                  className="h-6 w-6 transition-transform duration-500 group-hover:-translate-y-1"
                  style={{ color: GOLD }}
                  strokeWidth={1.5}
                />
              </div>

              <h3 className="mt-10 text-[1.5rem] leading-tight transition-colors duration-300 group-hover:text-[#C9A25E]">
                {title}
              </h3>

              <p className="mt-3 flex-1 text-[13px] font-light leading-relaxed text-[#F6F1E9]/60 sm:text-sm">
                {desc}
              </p>

              <Link
                href={href}
                className="mt-8 inline-flex w-fit items-center gap-3 border-b pb-2 text-[10px] font-medium uppercase tracking-[0.18em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A25E]"
                style={{ borderColor: GOLD }}
              >
                {cta}
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Joinus;