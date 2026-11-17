import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Our Story | WRAPZ",
    template: "%s | WRAPZ",
  },
  description:
    "The story behind WRAPZ: slow-roasted meat, fresh bread and a little obsession in every wrap.",
};

export default function OurStoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="font-playfair min-h-screen w-full bg-[#0A0908] text-[#F6F1E9]">
      {children}
    </div>
  );
}