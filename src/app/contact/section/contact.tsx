"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ContactForm from "./contactform";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const GOLD = "#C9A25E";

// Edit your real details here
const INFO = [
  {
    icon: Clock,
    title: "Opening hours",
    lines: ["Monday – Friday: 11:00 AM – 11:00 PM", "Saturday – Sunday: 11:00 AM – 12:00 AM"],
  },
  {
    icon: MapPin,
    title: "Visit us",
    lines: ["24 Oxford Street, Soho, London W1D 1AW, United Kingdom"],
    href: "https://www.google.com/maps/search/?api=1&query=YOUR+ADDRESS+HERE",
  },
  {
    icon: Phone,
    title: "Call us",
    lines: ["+44 20 7946 0958"],
    href: "tel:+44 20 7946 0958",
  },
  {
    icon: Mail,
    title: "Email us",
    lines: ["hello@wrapz.com"],
    href: "mailto:hello@wrapz.com",
  },
];

const Contact = () => {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from("[data-ct-head]", { opacity: 0, y: 36, duration: 1, stagger: 0.12 });

        gsap.from("[data-ct-info]", {
          opacity: 0,
          x: -50,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-ct-grid]", start: "top 80%" },
        });

        gsap.from("[data-ct-form]", {
          opacity: 0,
          x: 50,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-ct-grid]", start: "top 80%" },
        });

        gsap.from("[data-ct-map]", {
          opacity: 0,
          y: 50,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-ct-map]", start: "top 88%" },
        });

        gsap.to("[data-ct-glow]", {
          y: "+=90",
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
      id="contact"
      ref={rootRef}
      className="font-playfair relative w-full overflow-hidden bg-[#0A0908] text-[#F6F1E9]"
    >
      <div
        data-ct-glow
        className="pointer-events-none absolute left-1/2 top-[30%] h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(201,162,94,0.12)_0%,rgba(10,9,8,0)_70%)] blur-3xl"
      />

      <div className="relative mx-auto max-w-[1400px] px-6 pb-24 pt-32 sm:px-12 sm:pb-32 sm:pt-40 lg:px-[72px]">
        {/* ===== HEADING ===== */}
        <div className="flex flex-col items-center text-center">
          <span
            data-ct-head
            className="mb-4 text-[12px] font-medium uppercase tracking-[0.28em]"
            style={{ color: GOLD }}
          >
            Contact WRAPZ
          </span>

          <h1 className="font-normal leading-[1.02] tracking-[-0.02em] text-[clamp(2.5rem,6vw,4.5rem)]">
            <span data-ct-head className="block">
              Let&apos;s talk,
            </span>
            <span data-ct-head className="mt-1 block italic" style={{ color: GOLD }}>
              over something delicious.
            </span>
          </h1>

          <p
            data-ct-head
            className="mt-4 max-w-lg text-sm font-light leading-relaxed text-[#F6F1E9]/60 sm:text-[15px]"
          >
            A question, a booking, or just a hello. Leave your details and we
            will reply as soon as we can.
          </p>
        </div>

        {/* ===== INFO + FORM ===== */}
        <div
          data-ct-grid
          className="mt-16 grid items-start gap-12 lg:mt-20 lg:grid-cols-2 lg:gap-20"
        >
          {/* Info */}
          <ul className="flex flex-col">
            {INFO.map(({ icon: Icon, title, lines, href }) => {
              const body = lines.map((l, i) => (
                <span key={i} className="block">
                  {l}
                </span>
              ));
              return (
                <li
                  key={title}
                  data-ct-info
                  className="group flex items-start gap-5 border-b border-[#C9A25E]/20 py-7 first:pt-0"
                >
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 group-hover:bg-[#C9A25E] group-hover:text-[#0A0908]"
                    style={{ borderColor: `${GOLD}66`, color: GOLD }}
                  >
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} />
                  </span>

                  <div>
                    <h2 className="text-[1.25rem] leading-snug transition-colors duration-300 group-hover:text-[#C9A25E]">
                      {title}
                    </h2>
                    <div className="mt-2 text-[13px] font-light leading-relaxed text-[#F6F1E9]/60 sm:text-sm">
                      {href ? (
                        <Link
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="transition-colors hover:text-[#C9A25E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A25E]"
                        >
                          {body}
                        </Link>
                      ) : (
                        body
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Form */}
          <div data-ct-form className="w-full">
            <ContactForm />
          </div>
        </div>

        {/* ===== MAP ===== */}
        <div data-ct-map className="mt-20 w-full sm:mt-24">
          <iframe
            title="WRAPZ location"
            src="https://www.google.com/maps?q=YOUR+ADDRESS+HERE&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="h-[38vh] w-full border border-[#C9A25E]/20 [filter:grayscale(1)_invert(0.92)_contrast(0.9)] sm:h-[42vh] md:h-[48vh]"
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;