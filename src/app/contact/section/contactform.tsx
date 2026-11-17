"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

const GOLD = "#C9A25E";

const fieldClass =
  "w-full border-0 border-b border-[#C9A25E]/30 bg-transparent px-0 py-3 text-base font-light text-[#F6F1E9] placeholder:text-[#F6F1E9]/40 outline-none transition-colors duration-300 focus:border-[#C9A25E]";

const ContactForm = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    console.log(data); // TODO: send to your API route / email service
    form.reset();
    setSent(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      onChange={() => sent && setSent(false)}
      className="flex w-full flex-col gap-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="ct-name" className="sr-only">
            Your name
          </label>
          <input
            id="ct-name"
            type="text"
            name="name"
            placeholder="Your name"
            autoComplete="name"
            required
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="ct-phone" className="sr-only">
            Phone number
          </label>
          <input
            id="ct-phone"
            type="tel"
            name="phone"
            placeholder="Phone number"
            autoComplete="tel"
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="ct-email" className="sr-only">
          Email address
        </label>
        <input
          id="ct-email"
          type="email"
          name="email"
          placeholder="Email address"
          autoComplete="email"
          required
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="ct-message" className="sr-only">
          Your message
        </label>
        <textarea
          id="ct-message"
          name="message"
          placeholder="Your message"
          rows={5}
          required
          className={`${fieldClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        className="group mt-4 inline-flex w-fit items-center gap-3 border px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-300 hover:bg-[#C9A25E] hover:text-[#0A0908] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A25E]"
        style={{ borderColor: GOLD, color: GOLD }}
      >
        Send message
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      </button>

      <p
        role="status"
        aria-live="polite"
        className="min-h-[1.5rem] text-sm font-light italic"
        style={{ color: GOLD }}
      >
        {sent ? "Thank you! We will get back to you soon." : ""}
      </p>
    </form>
  );
};

export default ContactForm;