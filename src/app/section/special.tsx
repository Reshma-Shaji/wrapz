"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Flame, Sparkles, Clock } from "lucide-react";

interface MandiItem {
  id: string;
  name: string;
  subtitle: string;
  tag: string;
  ingredients: string[];
  weight: string;
  price: string;
  cookingTime: string;
  image: string;
}

const ITEMS: MandiItem[] = [
  {
    id: "classic-yemeni",
    name: "YEMENI CHICKEN MANDI",
    subtitle: "Sacred Clay-Pit Recipe",
    tag: "SIGNATURE DISH",
    ingredients: [
      "14 Hand-ground Yemeni Hawayej spices",
      "Wood-charcoal smoke infusion",
      "Sun-dried black loomi limes",
      "Toasted cashew & golden sultanas",
    ],
    weight: "Full Platter (1.2 kg)",
    price: "₹799",
    cookingTime: "Slow-roasted 3.5 hrs in clay pit",
    image: "/mandi-hero.jpg",
  },
  {
    id: "royal-mutton",
    name: "ROYAL MUTTON MADHBI",
    subtitle: "Stone-Seared Prime Ribs",
    tag: "CHEF'S PRIDE",
    ingredients: [
      "Grass-fed mountain lamb cuts",
      "Crushed green cardamom & cloves",
      "Natural river-stone conduction",
      "Served with spicy Maraq broth",
    ],
    weight: "Royal Platter (1.4 kg)",
    price: "₹1,199",
    cookingTime: "Rock-seared 4.5 hrs on pebble bed",
    image: "/mandi-mutton.jpg",
  },
  {
    id: "alfaham-pepper",
    name: "AL-FAHAM CHARCOAL MANDI",
    subtitle: "Smoky Acacia Grille Platter",
    tag: "POPULAR CHOICE",
    ingredients: [
      "Cracked Malabar black pepper marinade",
      "Creamy Lebanese garlic toum sauce",
      "Smoked bay leaf basmati",
      "Fresh fiery Sahawiq salsa",
    ],
    weight: "Full Platter (1.1 kg)",
    price: "₹849",
    cookingTime: "Flame-grilled on acacia hardwood",
    image: "/mandi-alfaham.jpg",
  },
  {
    id: "peri-peri",
    name: "PERI-PERI SPICED MANDI",
    subtitle: "Bold African-Arabian Glaze",
    tag: "FIERY SPECIAL",
    ingredients: [
      "Fermented bird's eye chilies",
      "Smoked citrus & paprika glaze",
      "Cumin-scented long basmati",
      "Chilled mint cucumber raita",
    ],
    weight: "Full Platter (1.2 kg)",
    price: "₹879",
    cookingTime: "Tandoor roasted with glaze reduction",
    image: "/mandi-periperi.jpg",
  },
];

export default function Specials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const active = ITEMS[index];

  const next = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % ITEMS.length);
  };

  const prev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + ITEMS.length) % ITEMS.length);
  };

  return (
    <section
      id="specials"
      className="relative w-full min-h-screen py-24 px-4 sm:px-6 lg:px-12 bg-[#0B0A08] flex flex-col justify-center items-center overflow-hidden border-t border-[#E5AD58]/15 select-none"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(229,173,88,0.08)_0%,#0B0A08_70%)] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center max-w-2xl mx-auto mb-12 space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#161410] border border-[#E5AD58]/30">
          <Sparkles className="w-3.5 h-3.5 text-[#E5AD58]" />
          <span className="text-[10px] sm:text-[11px] font-cinzel font-semibold tracking-[0.3em] uppercase text-[#E5AD58]">
            SIGNATURE FLAVOURS HUD
          </span>
        </div>
        <h2 className="font-cinzel text-3xl sm:text-5xl font-black text-[#F7EFE4] uppercase tracking-wide">
          DISCOVER OUR <span className="text-[#E5AD58]">SPECIALS</span>
        </h2>
      </div>

      {/* Center Layout: Left Glass HUD + Right Dish with Pointer Dot */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
        
        {/* Left: Floating Glassmorphic HUD Card (Exact copy of video 1) */}
        <div className="w-full lg:w-5/12 max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: -40, filter: "blur(6px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: 30, filter: "blur(6px)" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative p-6 sm:p-8 rounded-2xl bg-[#161410]/75 backdrop-blur-xl border border-[#E5AD58]/35 shadow-[0_25px_60px_rgba(0,0,0,0.9)]"
            >
              {/* Corner Tag */}
              <div className="absolute -top-3.5 right-6 px-3.5 py-1 rounded-xs bg-[#E5AD58] text-[#0B0A08] font-cinzel font-black text-[10px] tracking-[0.2em] uppercase shadow-lg shadow-[#E5AD58]/30">
                {active.tag}
              </div>

              {/* Title */}
              <div className="space-y-1 mb-4 border-b border-[#E5AD58]/20 pb-4">
                <span className="text-[10px] font-cinzel text-[#E5AD58] tracking-[0.25em] uppercase font-bold">
                  {active.subtitle}
                </span>
                <h3 className="font-cinzel text-2xl sm:text-3xl font-black text-[#F7EFE4] leading-tight tracking-wider">
                  {active.name}
                </h3>
              </div>

              {/* Ingredients / Flavor Notes (Bulleted list like reel) */}
              <div className="space-y-2 mb-6">
                <span className="text-[10px] font-cinzel uppercase tracking-[0.2em] text-[#E5AD58] font-bold">
                  Crafted Ingredients
                </span>
                <ul className="space-y-1.5">
                  {active.ingredients.map((item, i) => (
                    <li
                      key={i}
                      className="text-xs font-sans text-[#F7EFE4]/80 flex items-start gap-2 font-light"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E5AD58] mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cooking method badge */}
              <div className="flex items-center gap-2 text-[11px] font-sans text-[#E5AD58] mb-6 px-3 py-1.5 rounded-xs bg-[#0B0A08]/60 border border-[#E5AD58]/20">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span>{active.cookingTime}</span>
              </div>

              {/* Bottom Price & Weight */}
              <div className="flex items-center justify-between pt-4 border-t border-[#E5AD58]/25">
                <div className="flex flex-col">
                  <span className="text-[10px] font-cinzel uppercase tracking-widest text-[#F7EFE4]/50">
                    Portion
                  </span>
                  <span className="text-sm font-sans font-semibold text-[#F7EFE4]">
                    {active.weight}
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-cinzel uppercase tracking-widest text-[#E5AD58]">
                    Price
                  </span>
                  <span className="font-cinzel text-2xl sm:text-3xl font-bold text-[#E5AD58]">
                    {active.price}
                  </span>
                </div>
              </div>

              {/* Pointer Line into Dish on Desktop */}
              <div className="hidden lg:block absolute -right-14 top-1/2 -translate-y-1/2 w-14 h-[1px] bg-gradient-to-r from-[#E5AD58]/80 to-[#E5AD58]" />
              <div className="hidden lg:block absolute -right-14 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#E5AD58] shadow-[0_0_12px_#E5AD58]" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: The Platter with 3D Rotate Transition */}
        <div className="w-full lg:w-6/12 flex flex-col items-center justify-center relative">
          <div className="relative w-full max-w-sm sm:max-w-md aspect-square flex items-center justify-center">
            
            {/* Concentric rotating outer rings */}
            <div className="absolute inset-0 m-auto w-[94%] h-[94%] rounded-full border border-[#E5AD58]/25 pointer-events-none" />
            <div className="absolute inset-0 m-auto w-[84%] h-[84%] rounded-full border border-dashed border-[#E5AD58]/20 pointer-events-none animate-[spin_60s_linear_infinite]" />

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 0.82, rotate: direction * 18 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.82, rotate: -direction * 18 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-[85%] h-[85%] rounded-full overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.98)] border-2 border-[#E5AD58]/50"
              >
                <Image
                  src={active.image}
                  alt={active.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 90vw, 500px"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-radial-[circle_at_center] from-transparent via-black/10 to-[#0B0A08]/70 pointer-events-none" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-6 mt-8 z-20">
            <button
              onClick={prev}
              aria-label="Previous"
              className="p-3.5 rounded-full bg-[#161410] border border-[#E5AD58]/35 text-[#F7EFE4] hover:bg-[#E5AD58] hover:text-[#0B0A08] transition-all duration-300 shadow-xl active:scale-90"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              {ITEMS.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  className={`transition-all duration-300 rounded-full ${
                    i === index ? "w-8 h-2 bg-[#E5AD58]" : "w-2 h-2 bg-[#F7EFE4]/30"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next"
              className="p-3.5 rounded-full bg-[#161410] border border-[#E5AD58]/35 text-[#F7EFE4] hover:bg-[#E5AD58] hover:text-[#0B0A08] transition-all duration-300 shadow-xl active:scale-90"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
