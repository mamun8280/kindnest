
"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Send,
  Mail,
  HeartHandshake,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    toast.info("Newsletter service is not connected yet.");
  };

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-[#ecfdf5] via-[#f0fdfa] to-[#d1fae5] px-5 py-24">

      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-emerald-300/30 blur-[100px]" />

      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-teal-300/30 blur-[100px]" />

      <div className="relative mx-auto max-w-5xl">

        <Card className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-linear-to-br from-white/95 via-[#f0fdfa] to-[#d1fae5] shadow-xl shadow-emerald-900/5">

          {/* Decorative Circles */}
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border-35 border-emerald-200/30" />

          <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full border-40 border-teal-200/20" />

          <CardContent className="relative z-10 px-5 py-16 text-center sm:px-12 md:px-20 md:py-20">

            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[2px] text-emerald-800 shadow-sm">
              <Sparkles size={15} className="text-teal-600" />
              Stay Connected
            </div>

            {/* Heading */}
            <h2 className="mx-auto max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              Subscribe to

              <span className="block bg-linear-to-r from-emerald-700 via-teal-600 to-green-500 bg-clip-text text-transparent">
                Local Cause Alerts
              </span>
            </h2>

            {/* Description */}
            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
              Stay informed about winter drives, food donations,
              blanket distributions and meaningful community
              initiatives happening around your neighborhood.
            </p>

            {/* Subscribe Form */}
            <form
              onSubmit={handleSubscribe}
              className="mx-auto mt-9 flex max-w-xl flex-col gap-3 sm:flex-row"
            >
              <div className="relative flex-1">

                <Mail
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-700"
                />

                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-13 rounded-xl border-emerald-100 bg-white/90 pl-11 text-sm shadow-sm placeholder:text-gray-400 focus-visible:border-emerald-500 focus-visible:ring-emerald-500"
                />

              </div>

              <Button
                type="submit"
                className="h-13 rounded-xl bg-linear-to-r from-emerald-800 to-teal-700 px-8 font-semibold text-white shadow-lg shadow-emerald-900/20 transition-all duration-300 hover:-translate-y-1 hover:from-emerald-900 hover:to-teal-800"
              >
                Subscribe
                <Send size={16} className="ml-2" />
              </Button>
            </form>

            {/* Privacy Text */}
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
              <HeartHandshake size={16} className="text-emerald-700" />

              No spam. Just kindness delivered to your inbox.
            </div>

            {/* Bottom Text */}
            <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white/80 px-5 py-3 text-sm font-semibold text-emerald-800 shadow-sm">
              Be the reason someone smiles today.
              <ArrowRight size={16} />
            </div>

          </CardContent>
        </Card>
      </div>
    </section>
  );
}
