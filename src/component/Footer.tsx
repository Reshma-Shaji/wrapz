


// "use client";

// import React, { useRef, useState } from "react";
// import Link from "next/link";
// import { ArrowRight, ArrowUp, Mail, MapPin, Phone } from "lucide-react";
// import { Bodoni_Moda, DM_Sans } from "next/font/google";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useGSAP } from "@gsap/react";
// import Image from "next/image";

// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// const display = Bodoni_Moda({
//   subsets: ["latin"],
//   style: ["normal", "italic"],
//   weight: ["400"],
//   display: "swap",
// });

// const sans = DM_Sans({
//   subsets: ["latin"],
//   weight: ["300", "400", "500"],
//   display: "swap",
// });

// const GOLD = "#C9A25E";

// type FooterLink = { label: string; href: string; external?: boolean };

// // Edit links here
// const COLUMNS: { title: string; links: FooterLink[] }[] = [
//   {
//     title: "Explore",
//     links: [
//       { label: "About", href: "/our-story" },
//       { label: "Menu", href: "/menu" },
//     ],
//   },
//   {
//     title: "Visit",
//     links: [
//       { label: "Reservation", href: "/reserve" },
//             { label: "Contact", href: "/contact" },
//     ],
//   },
//   {
//     title: "Follow",
//     links: [
//       { label: "Instagram", href: "https://instagram.com/", external: true },
//       { label: "Facebook", href: "https://facebook.com/", external: true },
//     ],
//   },
// ];

// // Edit your real contact details here (shown in the "Find us" column)
// const CONTACT = [
//   {
//     icon: MapPin,
//     label: "24 Oxford Street, Soho, London W1D 1AW, United Kingdom",
//     href: "https://www.google.com/maps/search/?api=1&query=YOUR+ADDRESS+HERE",
//     external: true,
//   },
//   {
//     icon: Phone,
//     label: "+44 20 7946 0958",
//     href: "tel:+44 20 7946 0958",
//     external: false,
//   },
//   {
//     icon: Mail,
//     label: "hello@wrapz.co.uk",
//     href: "mailto:hello@wrapz.co.uk",
//     external: false,
//   },
// ];

// // Connect this to your email provider or API route
// async function subscribe(email: string): Promise<void> {
//   // await fetch("/api/subscribe", { method: "POST", body: JSON.stringify({ email }) });
//   await new Promise((r) => setTimeout(r, 500));
//   void email;
// }

// const linkClass =
//   "text-[1.15rem] leading-none text-[#F6F1E9]/65 transition-colors duration-300 hover:text-[#C9A25E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A25E]";

// const Footer = () => {
//   const rootRef = useRef<HTMLElement>(null);
//   const [email, setEmail] = useState("");
//   const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

//   useGSAP(
//     () => {
//       const mm = gsap.matchMedia();
//       mm.add("(prefers-reduced-motion: no-preference)", () => {
//         gsap
//           .timeline({
//             defaults: { ease: "power3.out" },
//             scrollTrigger: { trigger: rootRef.current, start: "top 80%" },
//           })
//           .from("[data-top]", { opacity: 0, y: 24, duration: 0.9, stagger: 0.12 })
//           .from("[data-col]", { opacity: 0, y: 24, duration: 0.8, stagger: 0.1 }, "-=0.5")
//           .from("[data-bottom]", { opacity: 0, duration: 0.8 }, "-=0.4")
//           .from("[data-ghost]", { opacity: 0, yPercent: 8, duration: 1.6 }, "-=1.2");
//       });
//       return () => mm.revert();
//     },
//     { scope: rootRef }
//   );

//   const backToTop = () => {
//     const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
//     window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
//   };

//   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (status === "sending") return;
//     setStatus("sending");
//     try {
//       await subscribe(email);
//       setStatus("done");
//       setEmail("");
//     } catch {
//       setStatus("error");
//     }
//   };

//   return (
//     <footer
//       ref={rootRef}
//       className={`${sans.className} relative w-full overflow-hidden bg-[#050505] text-[#F6F1E9]`}
//     >
   

//       <div className="relative mx-auto max-w-[1400px] px-6 sm:px-12 lg:px-[95px]">
//         {/* ===== TOP ROW ===== */}
//         <div className="grid grid-cols-1 items-center gap-10 py-14 text-center md:grid-cols-3 md:py-[88px] md:text-left">
//           {/* Logo */}
//           <Link
//             data-top
//             href="/"
//             aria-label="Wrap, home"
//             className="mx-auto flex items-center gap-3 md:mx-0 md:justify-self-start focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A25E]"
//           >
//            <Image
//                        src="/logo.png"
//                        alt="WRAPZ Logo"
//                        width={150}
//                        height={65}
//                        priority
//                        className="w-28 md:w-24 h-auto object-contain"
//                      />
//           </Link>

//           {/* Tagline */}
//           <p
//             data-top
//             className={`${display.className} text-[1.75rem] leading-[1.5] text-[#F6F1E9]/70 md:justify-self-center md:text-[1.85rem]`}
//           >
          
//             Modern fire.
//           </p>

//           {/* Back to top */}
//           <button
//             data-top
//             type="button"
//             onClick={backToTop}
//             className="mx-auto inline-flex items-center gap-2 border-2 border-[#EBD3A2] px-8 py-[18px] text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-300 hover:bg-[#EBD3A2] hover:text-[#050505] md:mx-0 md:justify-self-end focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A25E]"
//           >
//             Back to top
//             <ArrowUp className="h-3.5 w-3.5" />
//           </button>
//         </div>

//         <div className="h-px w-full bg-white/10" />

//         {/* ===== COLUMNS ===== */}
//         <div className="grid grid-cols-2 gap-x-6 gap-y-14 py-14 md:py-[68px] lg:grid-cols-5">
//           {COLUMNS.map((col) => (
//             <nav key={col.title} data-col aria-label={col.title}>
//               <h3
//                 className="mb-7 text-[15px] font-medium uppercase tracking-[0.2em]"
//                 style={{ color: GOLD }}
//               >
//                 {col.title}
//               </h3>
//               <ul className="space-y-[22px]">
//                 {col.links.map((l) => (
//                   <li key={l.label}>
//                     {l.external ? (
//                       <a
//                         href={l.href}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className={`${display.className} ${linkClass}`}
//                       >
//                         {l.label}
//                       </a>
//                     ) : (
//                       <Link href={l.href} className={`${display.className} ${linkClass}`}>
//                         {l.label}
//                       </Link>
//                     )}
//                   </li>
//                 ))}
//               </ul>
//             </nav>
//           ))}

//           {/* Find us: location, phone & email (right of Follow) */}
//           <div data-col>
//             <h3
//               className="mb-7 text-[15px] font-medium uppercase tracking-[0.2em]"
//               style={{ color: GOLD }}
//             >
//               Find us
//             </h3>
//             <ul className="space-y-4">
//               {CONTACT.map(({ icon: Icon, label, href, external }) => (
//                 <li key={label}>
//                   <a
//                     href={href}
//                     {...(external
//                       ? { target: "_blank", rel: "noopener noreferrer" }
//                       : {})}
//                     className="group flex items-start gap-3 text-[14px] font-light leading-[1.6] text-[#F6F1E9]/65 transition-colors duration-300 hover:text-[#C9A25E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A25E]"
//                   >
//                     <Icon
//                       className="mt-[3px] h-4 w-4 shrink-0"
//                       style={{ color: GOLD }}
//                       strokeWidth={1.5}
//                     />
//                     <span className="break-words">{label}</span>
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Newsletter */}
//           <div data-col className="col-span-2 lg:col-span-1">
//             <h3
//               className="mb-7 text-[15px] font-medium uppercase tracking-[0.2em]"
//               style={{ color: GOLD }}
//             >
//               Letters from Wrap
//             </h3>
//             <p className="text-[18px] font-light leading-[1.8] text-[#F6F1E9]">
//               Stories, menus and evenings worth remembering.
//             </p>

//             <form onSubmit={onSubmit} className="mt-8" noValidate={false}>
//               <label htmlFor="footer-email" className="sr-only">
//                 Your email address
//               </label>
//               <div className="flex items-center border-b border-white/25 transition-colors focus-within:border-[#C9A25E]">
//                 <input
//                   id="footer-email"
//                   type="email"
//                   required
//                   autoComplete="email"
//                   value={email}
//                   onChange={(e) => {
//                     setEmail(e.target.value);
//                     if (status !== "idle") setStatus("idle");
//                   }}
//                   placeholder="Your email address"
//                   className="w-full bg-transparent pb-3 pt-1 text-[15px] font-light text-[#F6F1E9] placeholder:text-[#F6F1E9]/50 focus:outline-none"
//                 />
//                 <button
//                   type="submit"
//                   disabled={status === "sending"}
//                   aria-label="Subscribe"
//                   className="pb-3 pl-3 pt-1 text-[#C9A25E] transition-transform duration-300 hover:translate-x-1 disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A25E]"
//                 >
//                   <ArrowRight className="h-4 w-4" />
//                 </button>
//               </div>

//               <p role="status" className="mt-3 min-h-[1.25rem] text-[14px] text-[#F6F1E9]">
//                 {status === "done" && "Thank you. Your first letter is on its way."}
//                 {status === "error" && "Something went wrong. Please try again."}
//               </p>
//             </form>
//           </div>
//         </div>

//         <div className="h-px w-full bg-white/10" />

//         {/* ===== BOTTOM BAR ===== */}
//         <div
//           data-bottom
//           className="relative flex flex-col items-center gap-4 py-8 text-[12px] font-medium uppercase tracking-[0.2em] text-[#F6F1E9] md:flex-row md:justify-between"
//         >
//           <span>© 2026 Wrap</span>
        
//           <span>POWERED BY WRAPZ</span>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const GOLD = "#C9A25E";

type FooterLink = { label: string; href: string; external?: boolean };

// Edit links here
const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Explore",
    links: [
      { label: "About", href: "/our-story" },
      { label: "Menu", href: "/menu" },
    ],
  },
  {
    title: "Visit",
    links: [
      { label: "Reservation", href: "/reserve" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Follow",
    links: [
      { label: "Instagram", href: "https://instagram.com/", external: true },
      { label: "Facebook", href: "https://facebook.com/", external: true },
    ],
  },
];

// Edit your real contact details here
const CONTACT = [
  {
    icon: MapPin,
    label: "24 Oxford Street, Soho, London W1D 1AW, United Kingdom",
    href: "https://www.google.com/maps/search/?api=1&query=YOUR+ADDRESS+HERE",
    external: true,
  },
  {
    icon: Phone,
    label: "+44 20 7946 0958",
    href: "tel:+44 20 7946 0958",
    external: false,
  },
  {
    icon: Mail,
    label: "hello@wrapz.co.uk",
    href: "mailto:hello@wrapz.co.uk",
    external: false,
  },
];

// Connect this to your email provider or API route
async function subscribe(email: string): Promise<void> {
  // await fetch("/api/subscribe", { method: "POST", body: JSON.stringify({ email }) });
  await new Promise((r) => setTimeout(r, 500));
  void email;
}

const linkClass =
  "text-[1.15rem] leading-none text-[#F6F1E9]/65 transition-colors duration-300 hover:text-[#C9A25E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A25E]";

const Footer = () => {
  const rootRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: { trigger: rootRef.current, start: "top 80%" },
          })
          .from("[data-top]", {
            opacity: 0,
            y: 24,
            duration: 0.9,
            stagger: 0.12,
          })
          .from(
            "[data-col]",
            { opacity: 0, y: 24, duration: 0.8, stagger: 0.1 },
            "-=0.5"
          )
          .from("[data-bottom]", { opacity: 0, duration: 0.8 }, "-=0.4")
          .from(
            "[data-ghost]",
            { opacity: 0, yPercent: 8, duration: 1.6 },
            "-=1.2"
          );
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  const backToTop = () => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (status === "sending") return;

    setStatus("sending");

    try {
      await subscribe(email);
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <footer
      ref={rootRef}
      className="font-playfair relative w-full overflow-hidden bg-[#050505] text-[#F6F1E9]"
    >
      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-12 lg:px-[95px]">
        {/* ===== TOP ROW ===== */}
        <div className="grid grid-cols-1 items-center gap-10 py-14 text-center md:grid-cols-3 md:py-[88px] md:text-left">
          {/* Logo */}
          <Link
            data-top
            href="/"
            aria-label="Wrap, home"
            className="mx-auto flex items-center gap-3 md:mx-0 md:justify-self-start focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A25E]"
          >
            <Image
              src="/logo.png"
              alt="WRAPZ Logo"
              width={150}
              height={65}
              priority
              className="w-20 sm:w-24 md:w-28 h-auto object-contain"
            />
          </Link>

          {/* Tagline */}
          <p
            data-top
            className="text-[1.75rem] leading-[1.5] text-[#F6F1E9]/70 md:justify-self-center md:text-[1.85rem]"
          >
            Modern fire.
          </p>

          {/* Back to top */}
          <button
            data-top
            type="button"
            onClick={backToTop}
            className="mx-auto inline-flex items-center gap-2 border-2 border-[#EBD3A2] px-8 py-[18px] text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-300 hover:bg-[#EBD3A2] hover:text-[#050505] md:mx-0 md:justify-self-end focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A25E]"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="h-px w-full bg-white/10" />

        {/* ===== COLUMNS ===== */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-14 py-14 md:py-[68px] lg:grid-cols-5">
          {COLUMNS.map((col) => (
            <nav key={col.title} data-col aria-label={col.title}>
              <h3
                className="mb-7 text-[15px] font-medium uppercase tracking-[0.2em]"
                style={{ color: GOLD }}
              >
                {col.title}
              </h3>

              <ul className="space-y-[22px]">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.external ? (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClass}
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link href={l.href} className={linkClass}>
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Find us */}
          <div data-col>
            <h3
              className="mb-7 text-[15px] font-medium uppercase tracking-[0.2em]"
              style={{ color: GOLD }}
            >
              Find us
            </h3>

            <ul className="space-y-4">
              {CONTACT.map(({ icon: Icon, label, href, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex items-start gap-3 text-[14px] font-light leading-[1.6] text-[#F6F1E9]/65 transition-colors duration-300 hover:text-[#C9A25E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A25E]"
                  >
                    <Icon
                      className="mt-[3px] h-4 w-4 shrink-0"
                      style={{ color: GOLD }}
                      strokeWidth={1.5}
                    />
                    <span className="break-words">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div data-col className="col-span-2 lg:col-span-1">
            <h3
              className="mb-7 text-[15px] font-medium uppercase tracking-[0.2em]"
              style={{ color: GOLD }}
            >
              Letters from Wrap
            </h3>

            <p className="text-[18px] font-light leading-[1.8] text-[#F6F1E9]">
              Stories, menus and evenings worth remembering.
            </p>

            <form onSubmit={onSubmit} className="mt-8" noValidate={false}>
              <label htmlFor="footer-email" className="sr-only">
                Your email address
              </label>

              <div className="flex items-center border-b border-white/25 transition-colors focus-within:border-[#C9A25E]">
                <input
                  id="footer-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status !== "idle") setStatus("idle");
                  }}
                  placeholder="Your email address"
                  className="w-full bg-transparent pb-3 pt-1 text-[15px] font-light text-[#F6F1E9] placeholder:text-[#F6F1E9]/50 focus:outline-none"
                />

                <button
                  type="submit"
                  disabled={status === "sending"}
                  aria-label="Subscribe"
                  className="pb-3 pl-3 pt-1 text-[#C9A25E] transition-transform duration-300 hover:translate-x-1 disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A25E]"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              <p
                role="status"
                className="mt-3 min-h-[1.25rem] text-[14px] text-[#F6F1E9]"
              >
                {status === "done" &&
                  "Thank you. Your first letter is on its way."}
                {status === "error" &&
                  "Something went wrong. Please try again."}
              </p>
            </form>
          </div>
        </div>

        <div className="h-px w-full bg-white/10" />

        {/* ===== BOTTOM BAR ===== */}
        <div
          data-bottom
          className="relative flex flex-col items-center gap-4 py-8 text-[12px] font-medium uppercase tracking-[0.2em] text-[#F6F1E9] md:flex-row md:justify-between"
        >
          <span>© 2026 Wrap</span>
          <span>POWERED BY WRAPZ</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;