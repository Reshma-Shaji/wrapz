// "use client";

// import React, { useRef, useState, useMemo } from "react";
// import Image from "next/image";
// import { Minus, Plus, UtensilsCrossed } from "lucide-react";
// import { Bodoni_Moda, DM_Sans } from "next/font/google";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import { CATEGORIES, MENU, formatPrice, type MenuItem } from "./menuData";
// import { useCart } from "@/component/context/cartContext";

// const display = Bodoni_Moda({
//   subsets: ["latin"],
//   style: ["normal", "italic"],
//   weight: ["400", "500", "600"],
//   display: "swap",
// });

// const sans = DM_Sans({
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "600"],
//   display: "swap",
// });

// const GOLD = "#C9A25E";

// const MenuCard = ({ item }: { item: MenuItem }) => {
//   const { qtyOf, add, remove } = useCart();
//   const qty = qtyOf(item.id);

//   return (
//     <li
//       data-menu-card
//       className="group relative flex flex-col overflow-hidden rounded-xs border border-white/10 bg-[#12100E] opacity-100 transition-all duration-300 hover:border-[#C9A25E]/70 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
//     >
//       {/* 100% Clean Image - NO Black Overlays */}
//       <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#181512]">
//         {item.image ? (
//           <Image
//             src={item.image}
//             alt={item.alt ?? item.name}
//             fill
//             sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//             className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
//           />
//         ) : (
//           <div className="flex h-full w-full items-center justify-center bg-[#181512]">
//             <UtensilsCrossed
//               className="h-10 w-10 opacity-30 transition-transform duration-500 group-hover:scale-110"
//               style={{ color: GOLD }}
//               strokeWidth={1.25}
//             />
//           </div>
//         )}
//       </div>

//       {/* Dish Details */}
//       <div className="flex flex-1 flex-col p-6">
//         {/* Category Tag */}
//         <div className="mb-2">
//           <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C9A25E]">
//             {item.category}
//           </span>
//         </div>

//         {/* Item Name on the Left, Rate on the Right */}
//         <div className="flex items-baseline justify-between gap-3">
//           <h3
//             className={`${display.className} text-[1.25rem] font-medium leading-snug text-[#F6F1E9] transition-colors duration-300 group-hover:text-[#C9A25E]`}
//           >
//             {item.name}
//           </h3>
//           <span
//             className={`${display.className} shrink-0 text-[1.2rem] font-semibold tracking-wide text-[#C9A25E]`}
//           >
//             {formatPrice(item.price)}
//           </span>
//         </div>

//         {/* Description */}
//         <p className="mt-2.5 flex-1 text-[13px] font-light leading-relaxed text-[#F6F1E9]/70">
//           {item.desc}
//         </p>

//         {/* Add to Cart Actions */}
//         <div className="mt-6 pt-4 border-t border-white/8">
//           {qty === 0 ? (
//             <button
//               type="button"
//               onClick={() => add(item.id)}
//               className="inline-flex w-full items-center justify-center gap-2 rounded-xs border border-[#C9A25E]/60 bg-[#C9A25E]/10 px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] transition-all duration-300 hover:text-[#0A0908] active:scale-98 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C9A25E]"
//               style={{ color: GOLD }}
//             >
//               <Plus className="h-3.5 w-3.5" />
//               Add to Order
//             </button>
//           ) : (
//             <div
//               className="flex w-full items-center justify-between rounded-xs border border-[#C9A25E] bg-[#C9A25E]/15 px-1 py-0.5"
//             >
//               <button
//                 type="button"
//                 onClick={() => remove(item.id)}
//                 aria-label={`Remove one ${item.name}`}
//                 className="flex h-9 w-10 items-center justify-center rounded-xs transition-colors hover:bg-[#C9A25E] hover:text-[#0A0908] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C9A25E]"
//                 style={{ color: GOLD }}
//               >
//                 <Minus className="h-3.5 w-3.5" />
//               </button>
//               <span
//                 className="text-[13px] font-semibold text-[#F6F1E9]"
//                 aria-live="polite"
//               >
//                 {qty} added
//               </span>
//               <button
//                 type="button"
//                 onClick={() => add(item.id)}
//                 aria-label={`Add one more ${item.name}`}
//                 className="flex h-9 w-10 items-center justify-center rounded-xs transition-colors hover:bg-[#C9A25E] hover:text-[#0A0908] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C9A25E]"
//                 style={{ color: GOLD }}
//               >
//                 <Plus className="h-3.5 w-3.5" />
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </li>
//   );
// };

// const Menu = () => {
//   const rootRef = useRef<HTMLElement>(null);
//   const [category, setCategory] = useState<"All" | (typeof CATEGORIES)[number]>("All");
//   const [searchQuery, setSearchQuery] = useState("");

//   const filteredItems = useMemo(() => {
//     return MENU.filter((m) => {
//       const matchesCat = category === "All" || m.category === category;
//       const matchesSearch =
//         searchQuery.trim() === "" ||
//         m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         m.desc.toLowerCase().includes(searchQuery.toLowerCase());
//       return matchesCat && matchesSearch;
//     });
//   }, [category, searchQuery]);

//   // Heading reveal (once)
//   useGSAP(
//     () => {
//       const mm = gsap.matchMedia();
//       mm.add("(prefers-reduced-motion: no-preference)", () => {
//         gsap.from("[data-menu-head]", {
//           opacity: 0,
//           y: 28,
//           duration: 0.8,
//           stagger: 0.1,
//           ease: "power3.out",
//         });
//       });
//       return () => mm.revert();
//     },
//     { scope: rootRef }
//   );

//   return (
//     <section
//       id="menu"
//       ref={rootRef}
//       className={`${sans.className} relative w-full overflow-hidden bg-[#0A0908] text-[#F6F1E9]`}
//     >
//       <div className="relative mx-auto max-w-[1400px] px-6 pb-28 pt-36 sm:px-12 sm:pt-44 lg:px-[72px]">
//         {/* Header Section */}
//         <div className="flex flex-col items-center text-center">
//           <div data-menu-head className="mb-4 inline-flex items-center gap-3">
//             <span className="h-px w-6" style={{ backgroundColor: GOLD }} />
//             <span
//               className="text-[10px] font-medium uppercase tracking-[0.28em]"
//               style={{ color: GOLD }}
//             >
//               Artisan Wraps & Specialties
//             </span>
//             <span className="h-px w-6" style={{ backgroundColor: GOLD }} />
//           </div>

//           <h1
//             className={`${display.className} font-normal leading-[1.02] tracking-[-0.02em] text-[clamp(2.75rem,6.5vw,5rem)]`}
//           >
//             <span data-menu-head className="block">
//               Our Curated
//             </span>
//             <span data-menu-head className="mt-1 block italic" style={{ color: GOLD }}>
//               Dining Menu.
//             </span>
//           </h1>

//           <p
//             data-menu-head
//             className="mt-4 max-w-lg text-sm sm:text-[15px] font-light leading-relaxed text-[#F6F1E9]/60"
//           >
//             Slow-roasted rotisserie, fire-charred spices and artisan sauces rolled
//             fresh for you. Add your favorites to place your order.
//           </p>
//         </div>

//         {/* Category Pills & Search */}
//         <div
//           data-menu-head
//           className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-white/10 pb-6"
//         >
//           {/* Categories */}
//           <div
//             role="group"
//             aria-label="Menu categories"
//             className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
//           >
//             {(["All", ...CATEGORIES] as const).map((c) => {
//               const active = c === category;
//               return (
//                 <button
//                   key={c}
//                   type="button"
//                   aria-pressed={active}
//                   onClick={() => setCategory(c)}
//                   className={`rounded-full px-5 py-2 text-[11px] font-medium uppercase tracking-[0.18em] transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C9A25E] ${
//                     active
//                       ? "bg-[#C9A25E] text-[#0A0908]  font-semibold"
//                       : "border border-white/10 text-[#F6F1E9]/70 hover:border-[#C9A25E]/50 hover:text-[#F6F1E9]"
//                   }`}
//                 >
//                   {c}
//                 </button>
//               );
//             })}
//           </div>

//           {/* Quick Search */}
//           <div className="w-full sm:w-64">
//             <input
//               type="text"
//               placeholder="Search dishes..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full rounded-full border border-white/10 bg-[#141210] px-4 py-2 text-xs text-[#F6F1E9] placeholder-[#F6F1E9]/40 transition-colors focus:border-[#C9A25E] focus:outline-none"
//             />
//           </div>
//         </div>

//         {/* Menu Grid - 100% visible, No stuck opacity or fading */}
//         {filteredItems.length === 0 ? (
//           <div className="py-24 text-center">
//             <UtensilsCrossed className="mx-auto h-10 w-10 opacity-30 text-[#C9A25E] mb-3" />
//             <p className={`${display.className} text-xl text-[#F6F1E9]/80`}>No dishes found</p>
//             <p className="mt-1 text-xs text-[#F6F1E9]/50">
//               Try choosing another category or clearing your search.
//             </p>
//             <button
//               onClick={() => {
//                 setCategory("All");
//                 setSearchQuery("");
//               }}
//               className="mt-5 rounded-xs border border-[#C9A25E] px-4 py-2 text-xs uppercase tracking-[0.16em] text-[#C9A25E] hover:bg-[#C9A25E] hover:text-[#0A0908] transition-colors"
//             >
//               Reset Filters
//             </button>
//           </div>
//         ) : (
//           <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//             {filteredItems.map((item) => (
//               <MenuCard key={item.id} item={item} />
//             ))}
//           </ul>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Menu;

"use client";

import React, { useRef, useState, useMemo } from "react";
import Image from "next/image";
import { Minus, Plus, UtensilsCrossed } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CATEGORIES, MENU, formatPrice, type MenuItem } from "./menuData";
import { useCart } from "@/component/context/cartContext";

const GOLD = "#C9A25E";

const MenuCard = ({ item }: { item: MenuItem }) => {
  const { qtyOf, add, remove } = useCart();
  const qty = qtyOf(item.id);

  return (
    <li
      data-menu-card
      className="group relative flex flex-col overflow-hidden rounded-xs border border-white/10 bg-[#12100E] opacity-100 transition-all duration-300 hover:border-[#C9A25E]/70 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
    >
      {/* 100% Clean Image - NO Black Overlays */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#181512]">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.alt ?? item.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#181512]">
            <UtensilsCrossed
              className="h-10 w-10 opacity-30 transition-transform duration-500 group-hover:scale-110"
              style={{ color: GOLD }}
              strokeWidth={1.25}
            />
          </div>
        )}
      </div>

      {/* Dish Details */}
      <div className="flex flex-1 flex-col p-6">
        {/* Category Tag */}
        <div className="mb-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C9A25E]">
            {item.category}
          </span>
        </div>

        {/* Item Name on the Left, Rate on the Right */}
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-[1.25rem] font-medium leading-snug text-[#F6F1E9] transition-colors duration-300 group-hover:text-[#C9A25E]">
            {item.name}
          </h3>

          <span className="shrink-0 text-[1.2rem] font-semibold tracking-wide text-[#C9A25E]">
            {formatPrice(item.price)}
          </span>
        </div>

        {/* Description */}
        <p className="mt-2.5 flex-1 text-[13px] font-light leading-relaxed text-[#F6F1E9]/70">
          {item.desc}
        </p>

        {/* Add to Cart Actions */}
        <div className="mt-6 pt-4 border-t border-white/8">
          {qty === 0 ? (
            <button
              type="button"
              onClick={() => add(item.id)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xs border border-[#C9A25E]/60 bg-[#C9A25E]/10 px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] transition-all duration-300 hover:text-[#0A0908] active:scale-98 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C9A25E]"
              style={{ color: GOLD }}
            >
              <Plus className="h-3.5 w-3.5" />
              Add to Order
            </button>
          ) : (
            <div className="flex w-full items-center justify-between rounded-xs border border-[#C9A25E] bg-[#C9A25E]/15 px-1 py-0.5">
              <button
                type="button"
                onClick={() => remove(item.id)}
                aria-label={`Remove one ${item.name}`}
                className="flex h-9 w-10 items-center justify-center rounded-xs transition-colors hover:bg-[#C9A25E] hover:text-[#0A0908] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C9A25E]"
                style={{ color: GOLD }}
              >
                <Minus className="h-3.5 w-3.5" />
              </button>

              <span
                className="text-[13px] font-semibold text-[#F6F1E9]"
                aria-live="polite"
              >
                {qty} added
              </span>

              <button
                type="button"
                onClick={() => add(item.id)}
                aria-label={`Add one more ${item.name}`}
                className="flex h-9 w-10 items-center justify-center rounded-xs transition-colors hover:bg-[#C9A25E] hover:text-[#0A0908] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C9A25E]"
                style={{ color: GOLD }}
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

const Menu = () => {
  const rootRef = useRef<HTMLElement>(null);

  const [category, setCategory] = useState<
    "All" | (typeof CATEGORIES)[number]
  >("All");

  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    return MENU.filter((m) => {
      const matchesCat = category === "All" || m.category === category;

      const matchesSearch =
        searchQuery.trim() === "" ||
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.desc.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCat && matchesSearch;
    });
  }, [category, searchQuery]);

  // Heading reveal (once)
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-menu-head]", {
          opacity: 0,
          y: 28,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <section
      id="menu"
      ref={rootRef}
      className="font-playfair relative w-full overflow-hidden bg-[#0A0908] text-[#F6F1E9]"
    >
      <div className="relative mx-auto max-w-[1400px] px-6 pb-28 pt-36 sm:px-12 sm:pt-44 lg:px-[72px]">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center">
          <div data-menu-head className="mb-4 inline-flex items-center gap-3">
            <span className="h-px w-6" style={{ backgroundColor: GOLD }} />

            <span
              className="text-[10px] font-medium uppercase tracking-[0.28em]"
              style={{ color: GOLD }}
            >
              Artisan Wraps & Specialties
            </span>

            <span className="h-px w-6" style={{ backgroundColor: GOLD }} />
          </div>

          <h1 className="font-normal leading-[1.02] tracking-[-0.02em] text-[clamp(2.75rem,6.5vw,5rem)]">
            <span data-menu-head className="block">
              Our Curated
            </span>

            <span
              data-menu-head
              className="mt-1 block italic"
              style={{ color: GOLD }}
            >
              Dining Menu.
            </span>
          </h1>

          <p
            data-menu-head
            className="mt-4 max-w-lg text-sm sm:text-[15px] font-light leading-relaxed text-[#F6F1E9]/60"
          >
            Slow-roasted rotisserie, fire-charred spices and artisan sauces rolled
            fresh for you. Add your favorites to place your order.
          </p>
        </div>

        {/* Category Pills & Search */}
        <div
          data-menu-head
          className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-white/10 pb-6"
        >
          {/* Categories */}
          <div
            role="group"
            aria-label="Menu categories"
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
          >
            {(["All", ...CATEGORIES] as const).map((c) => {
              const active = c === category;

              return (
                <button
                  key={c}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setCategory(c)}
                  className={`rounded-full px-5 py-2 text-[11px] font-medium uppercase tracking-[0.18em] transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C9A25E] ${
                    active
                      ? "bg-[#C9A25E] text-[#0A0908] font-semibold"
                      : "border border-white/10 text-[#F6F1E9]/70 hover:border-[#C9A25E]/50 hover:text-[#F6F1E9]"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>

          {/* Quick Search */}
          <div className="w-full sm:w-64">
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-white/10 bg-[#141210] px-4 py-2 text-xs text-[#F6F1E9] placeholder-[#F6F1E9]/40 transition-colors focus:border-[#C9A25E] focus:outline-none"
            />
          </div>
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-24 text-center">
            <UtensilsCrossed className="mx-auto h-10 w-10 opacity-30 text-[#C9A25E] mb-3" />

            <p className="text-xl text-[#F6F1E9]/80">
              No dishes found
            </p>

            <p className="mt-1 text-xs text-[#F6F1E9]/50">
              Try choosing another category or clearing your search.
            </p>

            <button
              onClick={() => {
                setCategory("All");
                setSearchQuery("");
              }}
              className="mt-5 rounded-xs border border-[#C9A25E] px-4 py-2 text-xs uppercase tracking-[0.16em] text-[#C9A25E] hover:bg-[#C9A25E] hover:text-[#0A0908] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Menu;