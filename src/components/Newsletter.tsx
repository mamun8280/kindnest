
"use client";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import {
  Send,
  Mail,
  HeartHandshake,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Heart,
  Leaf,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    toast.info("Newsletter service is not connected yet.");
  };

  return (
    <section className="relative overflow-hidden bg-[#f5faf6] px-4 py-20 sm:px-6 lg:py-28">

      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-emerald-200/30 blur-[110px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-lime-200/30 blur-[110px]" />

      <div className="relative mx-auto max-w-7xl">

        <Card className="relative overflow-hidden rounded-[2rem] border-0 bg-[#00774a] shadow-2xl shadow-green-950/10">

          {/* Background Shapes */}
          <div className="pointer-events-none absolute -right-20 -top-32 h-96 w-96 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-5 -top-20 h-72 w-72 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />

          <CardContent className="relative z-10 grid items-center gap-12 px-6 py-14 sm:px-10 md:grid-cols-2 md:px-14 md:py-20 lg:gap-20 lg:px-20">

            {/* Left Content */}
            <div className="text-center md:text-left">

              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[2px] text-emerald-200 backdrop-blur-sm">
                <Sparkles size={15} />
                Stay Connected
              </div>

              <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Kindness starts
                <span className="mt-2 block text-emerald-300">
                  with staying connected.
                </span>
              </h2>

              <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-green-100/75 sm:text-base md:mx-0">
                Get updates about winter relief, food donations,
                community events and inspiring opportunities to
                make a difference in your neighborhood.
              </p>

              {/* Benefits */}
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center md:justify-start">

                <div className="flex items-center gap-2 text-sm text-green-50">
                  <CheckCircle2 size={17} className="text-emerald-300" />
                  Local event updates
                </div>

                <div className="flex items-center gap-2 text-sm text-green-50">
                  <CheckCircle2 size={17} className="text-emerald-300" />
                  Meaningful causes
                </div>

              </div>

            </div>

            {/* Right Newsletter Card */}
            <div className="relative">

              {/* Decorative Icon */}
              <div className="absolute -right-3 -top-5 z-20 flex h-14 w-14 rotate-12 items-center justify-center rounded-2xl bg-lime-300 text-green-950 shadow-lg sm:-right-5">
                <Heart size={25} fill="currentColor" />
              </div>

              <div className="rounded-[1.7rem] border border-white/20 bg-white p-6 shadow-2xl sm:p-9">

                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                  <Mail size={27} />
                </div>

                <h3 className="text-2xl font-extrabold text-gray-900">
                  Get the good news.
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  Subscribe to our newsletter and never miss
                  an opportunity to spread kindness.
                </p>

                {/* Form */}
                <form
                  onSubmit={handleSubscribe}
                  className="mt-7 space-y-4"
                >
                  <div>
                    <label
                      htmlFor="newsletter-email"
                      className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                      Your Email Address
                    </label>

                    <Input
                      id="newsletter-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-13 rounded-xl border-gray-200 bg-gray-50 px-4 text-sm transition focus-visible:border-emerald-600 focus-visible:ring-emerald-600"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="h-13 w-full rounded-xl bg-emerald-800 text-sm font-bold text-white shadow-lg shadow-emerald-900/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-900"
                  >
                    Subscribe to Newsletter
                    <Send size={17} className="ml-2" />
                  </Button>
                </form>

                {/* Privacy */}
                <div className="mt-5 flex items-center justify-center gap-2 text-center text-xs text-gray-400">
                  <HeartHandshake size={16} className="shrink-0 text-emerald-700" />
                  Your inbox deserves kindness, not spam.
                </div>

              </div>

              {/* Bottom Decoration */}
              <div className="absolute -bottom-5 -left-5 z-0 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-emerald-400/20 text-emerald-200">
                <Leaf size={26} />
              </div>

            </div>

          </CardContent>

          {/* Bottom Message */}
          <div className="relative z-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 px-6 py-5 text-center sm:flex-row sm:px-14 lg:px-20">
            <p className="text-sm font-medium text-green-100/70">
              Be the reason someone smiles today.
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
              Made with kindness
              <Heart size={14} fill="currentColor" />
              KindNest
              <ArrowUpRight size={14} />
            </div>
          </div>

        </Card>

      </div>
    </section>
  );
}
