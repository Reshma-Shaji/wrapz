"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const GOLD = "#C9A25E";

export default function NotFound() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from("[data-nf]", { opacity: 0, y: 30, duration: 1, stagger: 0.12 })
          .from("[data-nf-code]", { scale: 0.92, opacity: 0, duration: 1.2 }, 0);
      });
      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <main
      ref={rootRef}
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-[#0A0908] px-6 py-24 text-[#F6F1E9]"
    >
      <div className="relative flex max-w-2xl flex-col items-center text-center">
        <span
          data-nf
          className="mb-4 text-[12px] font-medium uppercase tracking-[0.28em]"
          style={{ color: GOLD }}
        >
          Page not found
        </span>

        <h1
          data-nf-code
          className="select-none text-[clamp(6rem,22vw,13rem)] font-normal italic leading-none tracking-[-0.03em]"
          style={{ color: GOLD }}
        >
          404
        </h1>

        <h2
          data-nf
          className="mt-2 text-[clamp(1.75rem,4vw,2.75rem)] font-normal leading-[1.1] tracking-[-0.02em]"
        >
          This wrap seems to have{" "}
          <span className="italic" style={{ color: GOLD }}>
            gone missing.
          </span>
        </h2>

        <p
          data-nf
          className="mt-4 max-w-md text-sm font-light leading-relaxed text-[#F6F1E9]/60 sm:text-[15px]"
        >
          The page you are looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back to something delicious.
        </p>

        <div data-nf className="mt-10 flex flex-wrap items-center justify-center gap-6">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 border px-7 py-3 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-300 hover:bg-[#C9A25E] hover:text-[#0A0908] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A25E]"
            style={{ borderColor: GOLD }}
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to home
          </Link>

          <Link
            href="/menu"
            className="group inline-flex items-center gap-3 border-b pb-2 text-[11px] font-medium uppercase tracking-[0.18em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A25E]"
            style={{ borderColor: GOLD }}
          >
            View full menu
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </main>
  );
}

