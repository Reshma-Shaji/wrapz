import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Menu | WRAPZ",
    template: "%s | WRAPZ",
  },
  description:
    "Explore our full dining menu: flame-roasted chicken shawarmas, artisan wraps, fresh sides and handcrafted drinks.",
};

export default function MenuLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen w-full bg-[#0A0908] text-[#F6F1E9]">
      {children}
    </div>
  );
}

