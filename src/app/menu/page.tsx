"use client";

import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";
import Menu from "./section/menu";
import CartDrawer from "@/component/cartButton";
import { CartProvider } from "@/component/context/cartContext";

export default function MenuPage() {
  return (
    <CartProvider>
      <main className="relative flex flex-col w-full min-h-screen overflow-x-clip bg-[#0A0908]">
        <Navbar />
        <Menu />
        <CartDrawer />
        <Footer />
      </main>
    </CartProvider>
  );
}

