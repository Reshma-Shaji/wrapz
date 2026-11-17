"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  User,
  Phone,
  MapPin,
  FileText,
} from "lucide-react";
import { Bodoni_Moda, DM_Sans } from "next/font/google";
import { useCart } from "@/component/context/cartContext";
import { formatPrice } from "@/app/menu/section/menuData";

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

type Step = "cart" | "details" | "success";

type OrderInfo = {
  orderId: string;
  name: string;
  phone: string;
  type: "Dine-in" | "Takeaway" | "Delivery";
  address: string;
  note: string;
  items: { name: string; qty: number; price: number }[];
  total: number;
  time: string;
};

export default function CartDrawer() {
  const { lines, count, subtotal, add, remove, removeAll, clear, isOpen, openCart, closeCart } =
    useCart();

  const [step, setStep] = useState<Step>("cart");

  // Customer Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [orderType, setOrderType] = useState<"Dine-in" | "Takeaway" | "Delivery">("Dine-in");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [formError, setFormError] = useState("");

  // Placed Order Details for Success Screen
  const [placedOrder, setPlacedOrder] = useState<OrderInfo | null>(null);

  const handleClose = () => {
    if (step === "success") {
      clear();
      setStep("cart");
      setName("");
      setPhone("");
      setAddress("");
      setNote("");
      setPlacedOrder(null);
    }
    closeCart();
  };

  const handleProceedToDetails = () => {
    if (lines.length === 0) return;
    setFormError("");
    setStep("details");
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setFormError("Please enter your name.");
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, "").length < 10) {
      setFormError("Please enter a valid 10-digit phone number.");
      return;
    }
    if (orderType === "Delivery" && !address.trim()) {
      setFormError("Please provide your delivery address.");
      return;
    }

    const orderId = `#WZ-${Math.floor(1000 + Math.random() * 9000)}`;
    const currentTime = new Date().toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });

    setPlacedOrder({
      orderId,
      name: name.trim(),
      phone: phone.trim(),
      type: orderType,
      address: address.trim(),
      note: note.trim(),
      items: lines.map((l) => ({
        name: l.item.name,
        qty: l.qty,
        price: l.item.price * l.qty,
      })),
      total: subtotal,
      time: currentTime,
    });

    // Clear cart & switch to success
    clear();
    setStep("success");
  };

  const handleFinish = () => {
    setStep("cart");
    setName("");
    setPhone("");
    setAddress("");
    setNote("");
    setPlacedOrder(null);
    closeCart();
  };

  return (
    <>
      {/* Floating Cart Button Pill (Visible when cart has items and not open) */}
      {count > 0 && !isOpen && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce-subtle">
          <button
            type="button"
            onClick={openCart}
            aria-label={`View order, ${count} items, ${formatPrice(subtotal)}`}
            className="group flex items-center gap-3.5 rounded-full border border-[#C9A25E]/40 bg-[#14100C]/95 px-5 py-3.5 text-[#F6F1E9] shadow-[0_12px_36px_rgba(0,0,0,0.65)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-[#C9A25E] hover:bg-[#1A1612]"
          >
            <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#C9A25E] text-[#0A0908]">
              <ShoppingBag className="h-4 w-4" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                {count}
              </span>
            </div>
            <div className="text-left">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#C9A25E]">
                Your Order
              </p>
              <p className="text-[13px] font-semibold text-[#F6F1E9]">
                {formatPrice(subtotal)}
              </p>
            </div>
            <div className="ml-1 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 transition-colors group-hover:border-[#C9A25E]">
              <ArrowRight className="h-3.5 w-3.5 text-[#C9A25E]" />
            </div>
          </button>
        </div>
      )}

      {/* Slide-over Backdrop */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm transition-opacity duration-300"
          onClick={handleClose}
        >
          {/* Drawer Container */}
          <div
            className={`${sans.className} relative flex h-full w-full max-w-md flex-col bg-[#0F0D0B] text-[#F6F1E9] shadow-2xl border-l border-white/10`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ===================== HEADER ===================== */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div className="flex items-center gap-3">
                {step === "details" ? (
                  <button
                    type="button"
                    onClick={() => setStep("cart")}
                    aria-label="Back to order items"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-[#F6F1E9]/70 hover:text-[#C9A25E] hover:border-[#C9A25E] transition-colors mr-1"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                ) : (
                  <ShoppingBag className="h-5 w-5" style={{ color: GOLD }} />
                )}

                <h2 className={`${display.className} text-xl tracking-wide`}>
                  {step === "cart" && (
                    <>
                      Your Order{" "}
                      <span className="text-sm font-normal text-[#C9A25E]">({count})</span>
                    </>
                  )}
                  {step === "details" && "Customer Details"}
                  {step === "success" && "Order Confirmed"}
                </h2>
              </div>

              <button
                type="button"
                onClick={handleClose}
                aria-label="Close cart"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[#F6F1E9]/70 hover:text-white hover:border-[#C9A25E] transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* ===================== STEP 1: CART ITEMS ===================== */}
            {step === "cart" && (
              <>
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {lines.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center text-center py-16">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 text-[#C9A25E]/40 mb-4">
                        <ShoppingBag className="h-8 w-8" />
                      </div>
                      <p className={`${display.className} text-xl text-[#F6F1E9]/80`}>
                        Your bag is empty
                      </p>
                      <p className="mt-2 text-xs text-[#F6F1E9]/50 max-w-xs">
                        Explore our freshly rolled shawarmas and sides to start your order.
                      </p>
                    </div>
                  ) : (
                    lines.map(({ item, qty }) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 border border-white/8 bg-[#141210] p-3.5 rounded-xs transition-colors hover:border-[#C9A25E]/30"
                      >
                        {item.image && (
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xs bg-[#1A1612]">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium truncate text-[#F6F1E9]">
                            {item.name}
                          </h4>
                          <p className="text-xs text-[#C9A25E] mt-0.5">
                            {formatPrice(item.price)}
                          </p>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2.5 mt-2">
                            <div className="flex items-center border border-white/15 rounded-xs">
                              <button
                                type="button"
                                onClick={() => remove(item.id)}
                                aria-label="Decrease quantity"
                                className="flex h-6 w-6 items-center justify-center hover:bg-[#C9A25E] hover:text-[#0A0908] transition-colors"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-7 text-center text-xs font-semibold">{qty}</span>
                              <button
                                type="button"
                                onClick={() => add(item.id)}
                                aria-label="Increase quantity"
                                className="flex h-6 w-6 items-center justify-center hover:bg-[#C9A25E] hover:text-[#0A0908] transition-colors"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeAll(item.id)}
                              aria-label={`Remove all ${item.name}`}
                              className="text-[#F6F1E9]/40 hover:text-red-400 p-1 transition-colors"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-sm font-medium" style={{ color: GOLD }}>
                            {formatPrice(item.price * qty)}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {lines.length > 0 && (
                  <div className="border-t border-white/10 bg-[#12100E] p-6 space-y-4">
                    <div className="space-y-1.5 text-xs">
                      <div className="flex justify-between text-[#F6F1E9]/70">
                        <span>Items Subtotal</span>
                        <span>{formatPrice(subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-base font-semibold pt-2 border-t border-white/10 text-[#F6F1E9]">
                        <span>Total Amount</span>
                        <span style={{ color: GOLD }}>{formatPrice(subtotal)}</span>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <button
                        type="button"
                        onClick={handleProceedToDetails}
                        className="flex w-full items-center justify-center gap-2 rounded-xs bg-[#C9A25E] py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#0A0908] transition-all duration-300 hover:bg-[#E5BE78] hover:shadow-[0_4px_20px_rgba(201,162,94,0.3)] active:scale-98"
                      >
                        <span>Place Order</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={clear}
                        className="w-full text-center text-[11px] uppercase tracking-[0.18em] text-[#F6F1E9]/40 hover:text-red-400 py-1 transition-colors"
                      >
                        Clear Bag
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* ===================== STEP 2: CUSTOMER DETAILS FORM ===================== */}
            {step === "details" && (
              <form onSubmit={handlePlaceOrder} className="flex flex-1 flex-col justify-between">
                <div className="flex-1 overflow-y-auto p-6 space-y-5">
                  {/* Order summary pill */}
                  <div className="flex items-center justify-between rounded-xs border border-[#C9A25E]/30 bg-[#C9A25E]/5 px-4 py-3">
                    <span className="text-xs text-[#F6F1E9]/80">
                      Total for {count} {count === 1 ? "item" : "items"}
                    </span>
                    <span className="text-sm font-semibold" style={{ color: GOLD }}>
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  {formError && (
                    <div className="rounded-xs border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-xs text-red-300">
                      {formError}
                    </div>
                  )}

                  {/* Dining / Order Type Options */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium uppercase tracking-[0.16em] text-[#F6F1E9]/70">
                      Order Option
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["Dine-in", "Takeaway", "Delivery"] as const).map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setOrderType(t)}
                          className={`rounded-xs py-2 text-xs font-medium uppercase tracking-[0.14em] transition-all ${
                            orderType === t
                              ? "bg-[#C9A25E] text-[#0A0908] font-semibold shadow-[0_2px_10px_rgba(201,162,94,0.3)]"
                              : "border border-white/10 bg-[#141210] text-[#F6F1E9]/70 hover:border-white/30"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Customer Name */}
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-xs font-medium text-[#F6F1E9]/80">
                      <User className="h-3.5 w-3.5" style={{ color: GOLD }} />
                      <span>Full Name *</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xs border border-white/10 bg-[#141210] px-4 py-2.5 text-xs text-[#F6F1E9] placeholder-[#F6F1E9]/30 transition-colors focus:border-[#C9A25E] focus:outline-none"
                    />
                  </div>

                  {/* Customer Phone */}
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-xs font-medium text-[#F6F1E9]/80">
                      <Phone className="h-3.5 w-3.5" style={{ color: GOLD }} />
                      <span>Phone Number *</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-xs border border-white/10 bg-[#141210] px-4 py-2.5 text-xs text-[#F6F1E9] placeholder-[#F6F1E9]/30 transition-colors focus:border-[#C9A25E] focus:outline-none"
                    />
                  </div>

                  {/* Table / Delivery Address */}
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-xs font-medium text-[#F6F1E9]/80">
                      <MapPin className="h-3.5 w-3.5" style={{ color: GOLD }} />
                      <span>
                        {orderType === "Dine-in"
                          ? "Table Number / Area (Optional)"
                          : orderType === "Delivery"
                          ? "Delivery Address *"
                          : "Pickup Time / Note (Optional)"}
                      </span>
                    </label>
                    <input
                      type="text"
                      required={orderType === "Delivery"}
                      placeholder={
                        orderType === "Dine-in"
                          ? "e.g. Table 4"
                          : orderType === "Delivery"
                          ? "Full address & landmark"
                          : "e.g. Pickup in 20 mins"
                      }
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full rounded-xs border border-white/10 bg-[#141210] px-4 py-2.5 text-xs text-[#F6F1E9] placeholder-[#F6F1E9]/30 transition-colors focus:border-[#C9A25E] focus:outline-none"
                    />
                  </div>

                  {/* Special Cooking Note */}
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-xs font-medium text-[#F6F1E9]/80">
                      <FileText className="h-3.5 w-3.5 text-[#F6F1E9]/50" />
                      <span>Special Instructions (Optional)</span>
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Extra spicy, less toum, sauce on the side..."
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="w-full resize-none rounded-xs border border-white/10 bg-[#141210] px-4 py-2.5 text-xs text-[#F6F1E9] placeholder-[#F6F1E9]/30 transition-colors focus:border-[#C9A25E] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <div className="border-t border-white/10 bg-[#12100E] p-6 space-y-3">
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xs bg-[#C9A25E] py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#0A0908] transition-all duration-300 hover:bg-[#E5BE78] hover:shadow-[0_4px_20px_rgba(201,162,94,0.3)] active:scale-98"
                  >
                    <span>Confirm & Complete Order</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep("cart")}
                    className="w-full text-center text-xs uppercase tracking-[0.16em] text-[#F6F1E9]/50 hover:text-[#F6F1E9] transition-colors py-1"
                  >
                    Back to Items
                  </button>
                </div>
              </form>
            )}

            {/* ===================== STEP 3: ORDER SUCCESS ===================== */}
            {step === "success" && placedOrder && (
              <div className="flex flex-1 flex-col justify-between p-6 overflow-y-auto">
                <div className="flex flex-col items-center text-center pt-6 space-y-4">
                  {/* Glowing Animated Success Badge */}
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    <CheckCircle2 className="h-10 w-10 animate-scale-in" />
                    <span className="absolute inset-0 rounded-full animate-ping bg-emerald-500/10" />
                  </div>

                  <div>
                    <span className="inline-block rounded-full bg-[#C9A25E]/10 border border-[#C9A25E]/30 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C9A25E]">
                      {placedOrder.orderId}
                    </span>
                    <h3 className={`${display.className} text-2xl font-normal text-[#F6F1E9] mt-3`}>
                      Order Placed Successfully!
                    </h3>
                    <p className="mt-2 text-xs text-[#F6F1E9]/60 max-w-xs leading-relaxed">
                      Thank you, <strong className="text-[#F6F1E9]">{placedOrder.name}</strong>! Your
                      order has been received and is being prepared fresh in our kitchen.
                    </p>
                  </div>

                  {/* Estimated Time Badge */}
                  <div className="flex items-center gap-2 rounded-xs border border-white/10 bg-[#141210] px-4 py-2.5 text-xs text-[#F6F1E9]/80">
                    <Clock className="h-4 w-4" style={{ color: GOLD }} />
                    <span>Estimated prep time: <strong>15 - 20 mins</strong></span>
                  </div>

                  {/* Order Summary Receipt Box */}
                  <div className="w-full rounded-xs border border-white/10 bg-[#141210] p-4 text-left space-y-3 mt-2">
                    <div className="flex justify-between items-center border-b border-white/8 pb-2 text-xs">
                      <span className="text-[#F6F1E9]/50 uppercase tracking-wider">Type</span>
                      <span className="font-medium text-[#C9A25E]">{placedOrder.type}</span>
                    </div>

                    <div className="flex justify-between items-center border-b border-white/8 pb-2 text-xs">
                      <span className="text-[#F6F1E9]/50 uppercase tracking-wider">Contact</span>
                      <span className="font-medium text-[#F6F1E9]">{placedOrder.phone}</span>
                    </div>

                    {placedOrder.address && (
                      <div className="flex justify-between items-start border-b border-white/8 pb-2 text-xs">
                        <span className="text-[#F6F1E9]/50 uppercase tracking-wider">Location</span>
                        <span className="font-medium text-[#F6F1E9] text-right max-w-[180px]">
                          {placedOrder.address}
                        </span>
                      </div>
                    )}

                    <div className="space-y-1.5 pt-1">
                      <span className="text-[11px] font-medium uppercase tracking-wider text-[#F6F1E9]/50 block">
                        Ordered Items
                      </span>
                      {placedOrder.items.map((it, idx) => (
                        <div key={idx} className="flex justify-between text-xs text-[#F6F1E9]/80">
                          <span>
                            {it.qty}x {it.name}
                          </span>
                          <span className="font-medium text-[#F6F1E9]">{formatPrice(it.price)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-white/10 text-sm font-semibold">
                      <span>Total Paid</span>
                      <span style={{ color: GOLD }}>{formatPrice(placedOrder.total)}</span>
                    </div>
                  </div>
                </div>

                {/* Finish Button */}
                <div className="pt-6">
                  <button
                    type="button"
                    onClick={handleFinish}
                    className="flex w-full items-center justify-center gap-2 rounded-xs bg-[#C9A25E] py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#0A0908] transition-all duration-300 hover:bg-[#E5BE78]"
                  >
                    <span>Done & Continue Browsing</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
