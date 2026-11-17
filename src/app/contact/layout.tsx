import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Contact | WRAPZ",
    template: "%s | WRAPZ",
  },
  description:
    "Get in touch with WRAPZ for reservations, questions or just to say hello.",
};

export default function ContactLayout({
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