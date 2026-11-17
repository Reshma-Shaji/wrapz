"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  MapPin,
  Sparkles,
  Phone,
  Mail,
  User,
  FileText,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import { Bodoni_Moda, DM_Sans } from "next/font/google";


const display = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const GOLD = "#C9A25E";

const TIME_SLOTS = {
  Lunch: ["12:30 PM", "01:15 PM", "02:00 PM", "02:45 PM"],
  Dinner: ["07:00 PM", "07:45 PM", "08:30 PM", "09:15 PM", "10:00 PM"],
};

const SEATING_OPTIONS = [
  {
    id: "main",
    title: "Main Dining Hall",
    desc: "Warm ambiance near the live open rotisserie grill",
  },
  {
    id: "terrace",
    title: "Courtyard Terrace",
    desc: "Breezy open-air seating under ambient fairy lights",
  },
  {
    id: "majlis",
    title: "VIP Majlis Lounge",
    desc: "Private Arabian lounge seating for groups & celebrations",
  },
];

type ReservationData = {
  id: string;
  date: string;
  time: string;
  guests: string;
  seating: string;
  name: string;
  phone: string;
  email: string;
  note: string;
};

export default function Reserve() {
  const [date, setDate] = useState("2026-11-10");

  React.useEffect(() => {
    try {
      const today = new Date().toISOString().split("T")[0];
      setDate(today);
    } catch {
      /* ignore */
    }
  }, []);
  const [time, setTime] = useState("08:30 PM");
  const [guests, setGuests] = useState("2 People");
  const [seating, setSeating] = useState("Main Dining Hall");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  const [confirmedReservation, setConfirmedReservation] = useState<ReservationData | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, "").length < 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    const bookingId = `#RES-${Math.floor(1000 + Math.random() * 9000)}`;

    setConfirmedReservation({
      id: bookingId,
      date,
      time,
      guests,
      seating,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      note: note.trim(),
    });

    setError("");
  };

  const handleReset = () => {
    setConfirmedReservation(null);
    setName("");
    setPhone("");
    setEmail("");
    setNote("");
  };

  return (
    <main className={`${sans.className} relative flex min-h-screen w-full flex-col overflow-x-clip bg-[#0A0908] text-[#F6F1E9]`}>
    

      <section className="relative w-full px-6 pb-24 pt-36 sm:px-12 sm:pt-44 lg:px-[72px]">
        {/* Ambient Top Glow */}
        <div className="pointer-events-none absolute left-1/2 top-24 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(201,162,94,0.1)_0%,rgba(10,9,8,0)_70%)] blur-3xl" />

        <div className="relative mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-3">
              <span className="h-px w-6" style={{ backgroundColor: GOLD }} />
              <span
                className="text-[10px] font-semibold uppercase tracking-[0.28em]"
                style={{ color: GOLD }}
              >
                Table Reservations · Arabian Dining
              </span>
              <span className="h-px w-6" style={{ backgroundColor: GOLD }} />
            </div>

            <h1
              className={`${display.className} text-[clamp(2.75rem,6.5vw,4.75rem)] font-normal leading-[1.02] tracking-[-0.02em]`}
            >
              <span>Book Your Table.</span>{" "}
              <span className="block sm:inline italic" style={{ color: GOLD }}>
                An Unforgettable Evening.
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-lg text-sm sm:text-[15px] font-light leading-relaxed text-[#F6F1E9]/65">
              Experience slow-roasted rotisserie, warm freshly baked wraps and Arabian hospitality. Reserve your table in seconds.
            </p>
          </div>

          {/* Highlights Row */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-white/8 py-6 text-center text-xs tracking-wider uppercase text-[#F6F1E9]/75">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="h-3.5 w-3.5" style={{ color: GOLD }} />
              <span>Live Wood-Fire Grill</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="h-3.5 w-3.5" style={{ color: GOLD }} />
              <span>Courtyard & Lounge Seating</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="h-3.5 w-3.5" style={{ color: GOLD }} />
              <span>No Pre-Payment Required</span>
            </div>
          </div>

          {/* Form or Confirmation Card */}
          <div className="mt-12 rounded-xs border border-white/10 bg-[#12100E] p-6 sm:p-10 shadow-2xl">
            {confirmedReservation ? (
              /* ================= CONFIRMATION SUCCESS VIEW ================= */
              <div className="flex flex-col items-center text-center py-6">
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-6">
                  <CheckCircle2 className="h-10 w-10" />
                  <span className="absolute inset-0 rounded-full animate-ping bg-emerald-500/10" />
                </div>

                <span className="inline-block rounded-full bg-[#C9A25E]/15 border border-[#C9A25E]/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A25E]">
                  Reservation Confirmed · {confirmedReservation.id}
                </span>

                <h2 className={`${display.className} text-3xl sm:text-4xl font-normal mt-4`}>
                  We look forward to welcoming you!
                </h2>

                <p className="mt-2 text-sm text-[#F6F1E9]/65 max-w-md leading-relaxed">
                  Thank you, <strong className="text-[#F6F1E9]">{confirmedReservation.name}</strong>. Your
                  table has been reserved. A confirmation SMS will be sent to{" "}
                  <strong className="text-[#F6F1E9]">{confirmedReservation.phone}</strong>.
                </p>

                {/* Reservation Summary Card */}
                <div className="mt-8 w-full max-w-md rounded-xs border border-white/10 bg-[#181512] p-6 text-left space-y-4">
                  <div className="flex justify-between items-center border-b border-white/8 pb-3 text-xs">
                    <span className="text-[#F6F1E9]/50 uppercase tracking-wider">Date</span>
                    <span className="font-semibold text-[#F6F1E9]">
                      {confirmedReservation.date}
                    </span>
                  </div>

                  <div className="flex justify-between items-center border-b border-white/8 pb-3 text-xs">
                    <span className="text-[#F6F1E9]/50 uppercase tracking-wider">Time</span>
                    <span className="font-semibold text-[#C9A25E]">{confirmedReservation.time}</span>
                  </div>

                  <div className="flex justify-between items-center border-b border-white/8 pb-3 text-xs">
                    <span className="text-[#F6F1E9]/50 uppercase tracking-wider">Party Size</span>
                    <span className="font-semibold text-[#F6F1E9]">{confirmedReservation.guests}</span>
                  </div>

                  <div className="flex justify-between items-center border-b border-white/8 pb-3 text-xs">
                    <span className="text-[#F6F1E9]/50 uppercase tracking-wider">Seating Area</span>
                    <span className="font-semibold text-[#F6F1E9]">{confirmedReservation.seating}</span>
                  </div>

                  {confirmedReservation.note && (
                    <div className="pt-1 text-xs">
                      <span className="text-[#F6F1E9]/50 uppercase tracking-wider block mb-1">
                        Special Request
                      </span>
                      <p className="text-[#F6F1E9]/80 italic">&ldquo;{confirmedReservation.note}&rdquo;</p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 rounded-xs border border-white/20 px-6 py-3 text-xs uppercase tracking-[0.16em] text-[#F6F1E9] hover:border-[#C9A25E] hover:text-[#C9A25E] transition-colors"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Book Another Table
                  </button>

                  <Link
                    href="/menu"
                    className="inline-flex items-center gap-2 rounded-xs bg-[#C9A25E] px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#0A0908] hover:bg-[#E5BE78] transition-colors"
                  >
                    <span>Browse Our Menu</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ) : (
              /* ================= RESERVATION FORM ================= */
              <form onSubmit={handleSubmit} className="space-y-8">
                {error && (
                  <div className="rounded-xs border border-red-500/40 bg-red-500/10 px-4 py-3 text-xs text-red-300">
                    {error}
                  </div>
                )}

                {/* Part 1: Date, Guests, Seating */}
                <div className="space-y-6">
                  <h3 className={`${display.className} text-xl border-b border-white/8 pb-3 text-[#F6F1E9]`}>
                    1. Choose Date & Party Size
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Date Picker */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#F6F1E9]/80">
                        <Calendar className="h-3.5 w-3.5" style={{ color: GOLD }} />
                        <span>Date *</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full rounded-xs border border-white/10 bg-[#181512] px-4 py-3 text-sm text-[#F6F1E9] transition-colors focus:border-[#C9A25E] focus:outline-none"
                      />
                    </div>

                    {/* Guests Selector */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#F6F1E9]/80">
                        <Users className="h-3.5 w-3.5" style={{ color: GOLD }} />
                        <span>Number of Guests *</span>
                      </label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full rounded-xs border border-white/10 bg-[#181512] px-4 py-3 text-sm text-[#F6F1E9] transition-colors focus:border-[#C9A25E] focus:outline-none"
                      >
                        <option value="1 Person">1 Person</option>
                        <option value="2 People">2 People (Couple / Pair)</option>
                        <option value="3-4 People">3 - 4 People</option>
                        <option value="5-6 People">5 - 6 People</option>
                        <option value="7-10 People">7 - 10 People</option>
                        <option value="10+ Large Gathering">10+ Guests (Large Group)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Part 2: Time Slot */}
                <div className="space-y-4">
                  <h3 className={`${display.className} text-xl border-b border-white/8 pb-3 text-[#F6F1E9]`}>
                    2. Select Time Slot
                  </h3>

                  <div className="space-y-3">
                    {/* Lunch */}
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C9A25E] mb-2 flex items-center gap-2">
                        <Clock className="h-3 w-3" /> Lunch Hours
                      </p>
                      <div className="flex flex-wrap gap-2.5">
                        {TIME_SLOTS.Lunch.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setTime(slot)}
                            className={`rounded-xs px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] transition-all ${
                              time === slot
                                ? "bg-[#C9A25E] text-[#0A0908] font-semibold shadow-[0_2px_12px_rgba(201,162,94,0.3)]"
                                : "border border-white/10 bg-[#181512] text-[#F6F1E9]/75 hover:border-[#C9A25E]/50"
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Dinner */}
                    <div className="pt-2">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C9A25E] mb-2 flex items-center gap-2">
                        <Clock className="h-3 w-3" /> Dinner Hours
                      </p>
                      <div className="flex flex-wrap gap-2.5">
                        {TIME_SLOTS.Dinner.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setTime(slot)}
                            className={`rounded-xs px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] transition-all ${
                              time === slot
                                ? "bg-[#C9A25E] text-[#0A0908] font-semibold shadow-[0_2px_12px_rgba(201,162,94,0.3)]"
                                : "border border-white/10 bg-[#181512] text-[#F6F1E9]/75 hover:border-[#C9A25E]/50"
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Part 3: Seating Preferences */}
                <div className="space-y-4">
                  <h3 className={`${display.className} text-xl border-b border-white/8 pb-3 text-[#F6F1E9]`}>
                    3. Seating Preference
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {SEATING_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSeating(opt.title)}
                        className={`flex flex-col items-start p-4 text-left rounded-xs transition-all ${
                          seating === opt.title
                            ? "border border-[#C9A25E] bg-[#C9A25E]/10"
                            : "border border-white/10 bg-[#181512] hover:border-white/30"
                        }`}
                      >
                        <div className="flex items-center justify-between w-full mb-1">
                          <span className="text-sm font-medium text-[#F6F1E9]">{opt.title}</span>
                          {seating === opt.title && (
                            <span className="h-2 w-2 rounded-full bg-[#C9A25E]" />
                          )}
                        </div>
                        <p className="text-[11px] text-[#F6F1E9]/50 leading-relaxed">{opt.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Part 4: Guest Contact Details */}
                <div className="space-y-4">
                  <h3 className={`${display.className} text-xl border-b border-white/8 pb-3 text-[#F6F1E9]`}>
                    4. Contact Details
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="flex items-center gap-1.5 text-xs text-[#F6F1E9]/80">
                        <User className="h-3 w-3" style={{ color: GOLD }} />
                        <span>Full Name *</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-xs border border-white/10 bg-[#181512] px-4 py-2.5 text-xs text-[#F6F1E9] placeholder-[#F6F1E9]/30 transition-colors focus:border-[#C9A25E] focus:outline-none"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className="flex items-center gap-1.5 text-xs text-[#F6F1E9]/80">
                        <Phone className="h-3 w-3" style={{ color: GOLD }} />
                        <span>Phone Number *</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 9876543210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-xs border border-white/10 bg-[#181512] px-4 py-2.5 text-xs text-[#F6F1E9] placeholder-[#F6F1E9]/30 transition-colors focus:border-[#C9A25E] focus:outline-none"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="flex items-center gap-1.5 text-xs text-[#F6F1E9]/80">
                        <Mail className="h-3 w-3" style={{ color: GOLD }} />
                        <span>Email Address (Optional)</span>
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. rahul@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xs border border-white/10 bg-[#181512] px-4 py-2.5 text-xs text-[#F6F1E9] placeholder-[#F6F1E9]/30 transition-colors focus:border-[#C9A25E] focus:outline-none"
                      />
                    </div>

                    {/* Special Instructions */}
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="flex items-center gap-1.5 text-xs text-[#F6F1E9]/80">
                        <FileText className="h-3 w-3 text-[#F6F1E9]/50" />
                        <span>Special Requests / Notes (Optional)</span>
                      </label>
                      <textarea
                        rows={2}
                        placeholder="e.g. Anniversary celebration, need high chair for child, window seat..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="w-full resize-none rounded-xs border border-white/10 bg-[#181512] px-4 py-2.5 text-xs text-[#F6F1E9] placeholder-[#F6F1E9]/30 transition-colors focus:border-[#C9A25E] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4 border-t border-white/10">
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xs bg-[#C9A25E] py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#0A0908] transition-all duration-300 hover:bg-[#E5BE78] hover:shadow-[0_4px_24px_rgba(201,162,94,0.35)] active:scale-99"
                  >
                    <span>Confirm Table Reservation</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <p className="mt-3 text-center text-[11px] text-[#F6F1E9]/45">
                    No cancellation fee. Reservations are held for up to 15 minutes past the booking time.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

   
    </main>
  );
}
