


// "use client";

// import React, { useRef, useState } from "react";
// import { Play, Volume2, VolumeX, Pause } from "lucide-react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useGSAP } from "@gsap/react";

// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// /* ===================== CONSTANTS ===================== */
// const GOLD = "#C9A25E";

// const BRAND = "WRAPZ";
// const VIDEO_SRC = "/video/film.mp4";
// // #t=0.001 makes the browser (incl. iPhone Safari) show the first frame while paused
// const VIDEO_SRC_WITH_FRAME = `${VIDEO_SRC}#t=0.001`;
// const FILM_LENGTH = "01:24";

// const EYEBROW_TEXT = `The ${BRAND} experience · ${FILM_LENGTH}`;
// const HEADLINE_LINE_1 = "Fresh from the grill.";
// const HEADLINE_LINE_2 = "Wrapped to perfection.";
// const PLAY_BUTTON_TEXT = "Watch with sound";
// const VIDEO_ARIA_LABEL = `The ${BRAND} Cinematic Film`;

// const PLAYING_BADGE_TEXT = "Playing Film";
// const CLOSE_BUTTON_TEXT = "Close Film ✕";
// const PAUSE_TEXT = "Pause";
// const MUTE_TEXT = "Mute";
// const UNMUTE_TEXT = "Unmute";
// const CORNER_TEXT = `${BRAND.toUpperCase()} EXPERIENCE`;
// /* ===================================================== */

// const Film = () => {
//   const rootRef = useRef<HTMLElement>(null);
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [isPlayingWithSound, setIsPlayingWithSound] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);

//   useGSAP(
//     () => {
//       const mm = gsap.matchMedia();
//       mm.add("(prefers-reduced-motion: no-preference)", () => {
//         // Text reveal once
//         gsap
//           .timeline({
//             defaults: { ease: "power3.out" },
//             scrollTrigger: { trigger: rootRef.current, start: "top 60%" },
//           })
//           .from("[data-eyebrow]", { opacity: 0, y: 14, duration: 0.7 })
//           .from("[data-line]", { opacity: 0, y: 36, duration: 1, stagger: 0.16 }, "-=0.3")
//           .from("[data-play]", { opacity: 0, scale: 0.85, duration: 0.8 }, "-=0.5");

//         // Subtle background zoom on scroll
//         gsap.fromTo(
//           "[data-bg-video]",
//           { scale: 1.12 },
//           {
//             scale: 1,
//             ease: "none",
//             scrollTrigger: {
//               trigger: rootRef.current,
//               start: "top bottom",
//               end: "bottom top",
//               scrub: true,
//             },
//           }
//         );
//       });
//       return () => mm.revert();
//     },
//     { scope: rootRef }
//   );

//   // Play in-place covering the section with sound
//   const handleStartInlineFilm = () => {
//     const v = videoRef.current;
//     if (!v) return;

//     v.currentTime = 0;
//     v.muted = false;
//     setIsMuted(false);
//     v.play()
//       .then(() => {
//         setIsPlayingWithSound(true);
//       })
//       .catch(() => {
//         // Fallback if browser blocks sound autoplay
//         v.muted = true;
//         setIsMuted(true);
//         v.play();
//         setIsPlayingWithSound(true);
//       });
//   };

//   const handleTogglePlay = () => {
//     const v = videoRef.current;
//     if (!v) return;

//     if (v.paused) {
//       v.play();
//     } else {
//       v.pause();
//     }
//   };

//   const handleToggleMute = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     const v = videoRef.current;
//     if (!v) return;
//     v.muted = !v.muted;
//     setIsMuted(v.muted);
//   };

//   // Close: pause, go back to the first frame, blurred again
//   const handleStopFilm = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     const v = videoRef.current;
//     if (!v) return;
//     v.pause();
//     v.currentTime = 0;
//     v.muted = true;
//     setIsMuted(true);
//     setIsPlayingWithSound(false);
//   };

//   return (
//     <section
//       id="film"
//       ref={rootRef}
//       className="font-playfair relative isolate flex min-h-[85vh] w-full items-center justify-center overflow-hidden bg-[#0a0605] text-[#F6F1E9] lg:h-full select-none"
//     >
//       {/* ===== FULL-COVER BACKGROUND VIDEO (paused until the play button is clicked) ===== */}
//       <div className="absolute inset-0 -z-10 overflow-hidden">
//         <video
//           ref={videoRef}
//           data-bg-video
//           className="h-full w-full object-cover transition-all duration-700"
//           muted
//           loop
//           playsInline
//           preload="auto"
//           aria-label={VIDEO_ARIA_LABEL}
//         >
//           <source src={VIDEO_SRC_WITH_FRAME} type="video/mp4" />
//         </video>

//         {/* Blur layer: visible while paused, clears when the film plays */}
//         <div
//           className={`absolute inset-0 pointer-events-none transition-[backdrop-filter] duration-700 ${
//             isPlayingWithSound ? "backdrop-blur-none" : "backdrop-blur-md"
//           }`}
//         />

//         {/* Ambient Dark Gradients (Fades out when user clicks Play with Sound) */}
//         <div
//           className={`absolute inset-0 bg-[#0A0908]/50 transition-opacity duration-700 pointer-events-none ${
//             isPlayingWithSound ? "opacity-20" : "opacity-100"
//           }`}
//         />
//         <div
//           className={`absolute inset-0 bg-radial-[ellipse_at_center] from-transparent via-black/40 to-black/80 transition-opacity duration-700 pointer-events-none ${
//             isPlayingWithSound ? "opacity-30" : "opacity-100"
//           }`}
//         />
//       </div>

//       {/* ===== DEFAULT OVERLAY HERO CONTENT (Hidden while video is active with sound) ===== */}
//       <div
//         className={`relative z-10 flex flex-col items-center px-6 py-24 text-center transition-all duration-700 ${
//           isPlayingWithSound ? "opacity-0 pointer-events-none scale-95" : "opacity-100 scale-100"
//         }`}
//       >
//         <p
//           data-eyebrow
//           className="mb-6 text-[12px] font-medium uppercase tracking-[0.28em]"
//           style={{ color: GOLD }}
//         >
//           {EYEBROW_TEXT}
//         </p>

//         <h2 className="font-normal leading-[0.98] tracking-[-0.02em] text-[clamp(2.75rem,7vw,4.75rem)]">
//           <span data-line className="block">
//             {HEADLINE_LINE_1}
//           </span>
//           <span data-line className="block italic mt-1" style={{ color: GOLD }}>
//             {HEADLINE_LINE_2}
//           </span>
//         </h2>

//         {/* Play in section button */}
//         <button
//           data-play
//           type="button"
//           onClick={handleStartInlineFilm}
//           className="group mt-12 flex items-center gap-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#C9A25E] cursor-pointer"
//         >
//           <span className="flex h-[52px] w-[52px] sm:h-[60px] sm:w-[60px] items-center justify-center rounded-full border border-white/40 bg-black/40 backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:border-[#C9A25E] group-hover:bg-[#C9A25E]/20">
//             <Play
//               className="h-4 w-4 translate-x-[1.5px]"
//               style={{ color: GOLD }}
//               fill="currentColor"
//             />
//           </span>
//           <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#F6F1E9] group-hover:text-[#C9A25E] transition-colors">
//             {PLAY_BUTTON_TEXT}
//           </span>
//         </button>
//       </div>

//       {/* ===== IN-PLACE VIDEO CONTROLS (Appears seamlessly inside the section) ===== */}
//       {isPlayingWithSound && (
//         <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 sm:p-10 pointer-events-none">
//           {/* Top Bar: Title & Close Button */}
//           <div className="flex items-center justify-between pointer-events-auto">
//             <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
//               <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
//               <span className="font-cinzel text-xs tracking-widest text-[#F6F1E9] uppercase">
//                 {PLAYING_BADGE_TEXT}
//               </span>
//             </div>

//             <button
//               onClick={handleStopFilm}
//               className="px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-cinzel uppercase tracking-widest text-[#F6F1E9] hover:text-[#C9A25E] hover:border-[#C9A25E]/50 transition-all cursor-pointer"
//             >
//               {CLOSE_BUTTON_TEXT}
//             </button>
//           </div>

//           {/* Bottom Bar: Quick Play / Pause / Mute */}
//           <div className="flex items-center justify-between pointer-events-auto">
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={handleTogglePlay}
//                 className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs text-[#F6F1E9] hover:text-[#C9A25E] transition-colors cursor-pointer"
//               >
//                 <Pause className="w-3.5 h-3.5" />
//                 <span>{PAUSE_TEXT}</span>
//               </button>

//               <button
//                 onClick={handleToggleMute}
//                 className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs text-[#F6F1E9] hover:text-[#C9A25E] transition-colors cursor-pointer"
//               >
//                 {isMuted ? (
//                   <>
//                     <VolumeX className="w-3.5 h-3.5 text-red-400" />
//                     <span>{UNMUTE_TEXT}</span>
//                   </>
//                 ) : (
//                   <>
//                     <Volume2 className="w-3.5 h-3.5 text-[#C9A25E]" />
//                     <span>{MUTE_TEXT}</span>
//                   </>
//                 )}
//               </button>
//             </div>

//             <p className="hidden sm:block text-xs font-light text-white/60 tracking-wider">
//               {CORNER_TEXT}
//             </p>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default Film;



"use client";

import React, { useRef, useState } from "react";
import { Play, Volume2, VolumeX, Pause } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ===================== CONSTANTS ===================== */
const GOLD = "#C9A25E";

const BRAND = "WRAPZ";
const VIDEO_SRC = "/video/film.mp4";
const VIDEO_SRC_WITH_FRAME = `${VIDEO_SRC}#t=0.001`;
const FILM_LENGTH = "01:24";

const EYEBROW_TEXT = `The ${BRAND} experience`;
const HEADLINE_LINE_1 = "Fresh from the grill.";
const HEADLINE_LINE_2 = "Wrapped to perfection.";
const PLAY_BUTTON_TEXT = "Watch with sound";
const VIDEO_ARIA_LABEL = `The ${BRAND} Cinematic Film`;

const PLAYING_BADGE_TEXT = "Playing Film";
const CLOSE_BUTTON_TEXT = "Close Film ✕";
const PAUSE_TEXT = "Pause";
const PLAY_TEXT = "Play";
const MUTE_TEXT = "Mute";
const UNMUTE_TEXT = "Unmute";
const CORNER_TEXT = `${BRAND.toUpperCase()} EXPERIENCE`;
/* ===================================================== */

const Film = () => {
  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlayingWithSound, setIsPlayingWithSound] = useState(false);
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Text reveal once
        gsap
          .timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top 60%",
            },
          })
          .from("[data-eyebrow]", {
            opacity: 0,
            y: 14,
            duration: 0.7,
          })
          .from(
            "[data-line]",
            {
              opacity: 0,
              y: 36,
              duration: 1,
              stagger: 0.16,
            },
            "-=0.3"
          )
          .from(
            "[data-play]",
            {
              opacity: 0,
              scale: 0.85,
              duration: 0.8,
            },
            "-=0.5"
          );

        // Subtle background zoom on scroll
        gsap.fromTo(
          "[data-bg-video]",
          { scale: 1.12 },
          {
            scale: 1,
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

  // Start film
  const handleStartInlineFilm = () => {
    const v = videoRef.current;
    if (!v) return;

    v.currentTime = 0;
    v.muted = false;
    setIsMuted(false);

    v.play()
      .then(() => {
        setIsPlayingWithSound(true);
        setIsVideoPaused(false);
      })
      .catch(() => {
        // Fallback if browser blocks sound autoplay
        v.muted = true;
        setIsMuted(true);

        v.play().then(() => {
          setIsPlayingWithSound(true);
          setIsVideoPaused(false);
        });
      });
  };

  // Toggle play / pause
  const handleTogglePlay = () => {
    const v = videoRef.current;
    if (!v) return;

    if (v.paused) {
      v.play().then(() => {
        setIsVideoPaused(false);
      });
    } else {
      v.pause();
      setIsVideoPaused(true);
    }
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();

    const v = videoRef.current;
    if (!v) return;

    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  // Close: pause, reset to first frame and show blurred initial screen
  const handleStopFilm = (e: React.MouseEvent) => {
    e.stopPropagation();

    const v = videoRef.current;
    if (!v) return;

    v.pause();
    v.currentTime = 0;
    v.muted = true;

    setIsMuted(true);
    setIsVideoPaused(false);
    setIsPlayingWithSound(false);
  };

  return (
    <section
      id="film"
      ref={rootRef}
      className="font-playfair relative isolate flex min-h-[85vh] w-full items-center justify-center overflow-hidden bg-[#0a0605] text-[#F6F1E9] lg:h-full select-none"
    >
      {/* ===== FULL-COVER BACKGROUND VIDEO ===== */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <video
          ref={videoRef}
          data-bg-video
          className="h-full w-full object-cover transition-all duration-700"
          muted
          loop
          playsInline
          preload="auto"
          aria-label={VIDEO_ARIA_LABEL}
        >
          <source src={VIDEO_SRC_WITH_FRAME} type="video/mp4" />
        </video>

        {/* Blur layer */}
        <div
          className={`absolute inset-0 pointer-events-none transition-[backdrop-filter] duration-700 ${
            isPlayingWithSound ? "backdrop-blur-none" : "backdrop-blur-md"
          }`}
        />

        {/* Ambient Dark Gradients */}
        <div
          className={`absolute inset-0 bg-[#0A0908]/50 transition-opacity duration-700 pointer-events-none ${
            isPlayingWithSound ? "opacity-20" : "opacity-100"
          }`}
        />

        <div
          className={`absolute inset-0 bg-radial-[ellipse_at_center] from-transparent via-black/40 to-black/80 transition-opacity duration-700 pointer-events-none ${
            isPlayingWithSound ? "opacity-30" : "opacity-100"
          }`}
        />
      </div>

      {/* ===== DEFAULT OVERLAY HERO CONTENT ===== */}
      <div
        className={`relative z-10 flex flex-col items-center px-6 py-24 text-center transition-all duration-700 ${
          isPlayingWithSound
            ? "opacity-0 pointer-events-none scale-95"
            : "opacity-100 scale-100"
        }`}
      >
        <p
          data-eyebrow
          className="mb-6 text-[12px] font-medium uppercase tracking-[0.28em]"
          style={{ color: GOLD }}
        >
          {EYEBROW_TEXT}
        </p>

        <h2 className="font-normal leading-[0.98] tracking-[-0.02em] text-[clamp(2.75rem,7vw,4.75rem)]">
          <span data-line className="block">
            {HEADLINE_LINE_1}
          </span>

          <span
            data-line
            className="block italic mt-1"
            style={{ color: GOLD }}
          >
            {HEADLINE_LINE_2}
          </span>
        </h2>

        {/* Play in section button */}
        <button
          data-play
          type="button"
          onClick={handleStartInlineFilm}
          className="group mt-12 flex items-center gap-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#C9A25E] cursor-pointer"
        >
          <span className="flex h-[52px] w-[52px] sm:h-[60px] sm:w-[60px] items-center justify-center rounded-full border border-white/40 bg-black/40 backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:border-[#C9A25E] group-hover:bg-[#C9A25E]/20">
            <Play
              className="h-4 w-4 translate-x-[1.5px]"
              style={{ color: GOLD }}
              fill="currentColor"
            />
          </span>

          <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#F6F1E9] group-hover:text-[#C9A25E] transition-colors">
            {PLAY_BUTTON_TEXT}
          </span>
        </button>
      </div>

      {/* ===== IN-PLACE VIDEO CONTROLS ===== */}
      {isPlayingWithSound && (
        <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 sm:p-10 pointer-events-none">
          {/* Top Bar */}
          <div className="flex items-center justify-between pointer-events-auto">
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />

              <span className="font-cinzel text-xs tracking-widest text-[#F6F1E9] uppercase">
                {PLAYING_BADGE_TEXT}
              </span>
            </div>

            <button
              onClick={handleStopFilm}
              className="px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-cinzel uppercase tracking-widest text-[#F6F1E9] hover:text-[#C9A25E] hover:border-[#C9A25E]/50 transition-all cursor-pointer"
            >
              {CLOSE_BUTTON_TEXT}
            </button>
          </div>

          {/* Bottom Bar */}
          <div className="flex items-center justify-between pointer-events-auto">
            <div className="flex items-center gap-3">
              {/* Play / Pause Toggle */}
              <button
                onClick={handleTogglePlay}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs text-[#F6F1E9] hover:text-[#C9A25E] transition-colors cursor-pointer"
              >
                {isVideoPaused ? (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>{PLAY_TEXT}</span>
                  </>
                ) : (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>{PAUSE_TEXT}</span>
                  </>
                )}
              </button>

              {/* Mute Toggle */}
              <button
                onClick={handleToggleMute}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs text-[#F6F1E9] hover:text-[#C9A25E] transition-colors cursor-pointer"
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-red-400" />
                    <span>{UNMUTE_TEXT}</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-[#C9A25E]" />
                    <span>{MUTE_TEXT}</span>
                  </>
                )}
              </button>
            </div>

            <p className="hidden sm:block text-xs font-light text-white/60 tracking-wider">
              {CORNER_TEXT}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Film;
