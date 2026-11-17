import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "WRAPZ | Freshly Wrapped. Boldly Flavored.",
  description:
    "Discover freshly prepared shawarma at WRAPZ. Enjoy juicy fillings, bold spices, fresh ingredients and signature sauces wrapped to perfection.",
  keywords: [
    "WRAPZ",
    "WRAPZ Shawarma",
    "Shawarma Shop",
    "Chicken Shawarma",
    "Fresh Shawarma",
    "Arabian Street Food",
  ],
  openGraph: {
    title: "WRAPZ | Freshly Wrapped. Boldly Flavored.",
    description:
      "Freshly prepared shawarma, bold flavors and signature wraps at WRAPZ.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#100E0B] text-[#F4EBDD] font-[family-name:var(--font-playfair)] antialiased selection:bg-[#D5A65A] selection:text-[#100E0B]">
        {children}
      </body>
    </html>
  );
}