import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Reserve a Table | WRAPZ",
    template: "%s | WRAPZ",
  },
  description:
    "Book your table at WRAPZ. Enjoy our authentic wood-fired rotisserie, fresh-baked artisan breads, and luxury Arabian hospitality.",
};

export default function ReserveLayout({
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

