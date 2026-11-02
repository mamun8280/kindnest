
import Link from "next/link";
import Image from "next/image";

import {
  Heart,
  HeartHandshake,
  MapPin,
  ArrowUpRight,
  Users,
  HandHeart,
  TreePine,
  Stethoscope,
  CalendarDays,
  Sparkles,
} from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Upcoming Events", href: "/upcoming-events" },
  { label: "Create Event", href: "/create-event" },
  { label: "Manage Events", href: "/manage-events" },
];

const accountLinks = [
  { label: "Login", href: "/login" },
  { label: "Create Account", href: "/signUp" },
  { label: "Joined Events", href: "/joined-events" },
];

const initiatives = [
  { label: "Winter Clothes Distribution", icon: HandHeart },
  { label: "Food & Blanket Donation", icon: HeartHandshake },
  { label: "Tree Plantation", icon: TreePine },
  { label: "Free Medical Camps", icon: Stethoscope },
  { label: "Community Support", icon: Users },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#F1F7F1] text-[#263B30]">

      {/* Background Decorations */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-125 w-125 rounded-full bg-emerald-200/40 blur-[120px]" />

      <div className="pointer-events-none absolute -bottom-40 -left-40 h-112.5 w-112.5 rounded-full bg-lime-200/40 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">

        {/* Top CTA */}
        <div className="relative overflow-hidden border-b border-[#34765A]/15 py-14 sm:py-16">

          <div className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 rounded-full border border-[#34765A]/10" />

          <div className="pointer-events-none absolute -right-2 -top-8 h-48 w-48 rounded-full border border-[#34765A]/10" />

          <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

            <div className="max-w-2xl">

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#34765A]/15 bg-[#E5F0E6] px-4 py-2 text-xs font-bold uppercase tracking-[2px] text-[#34765A]">
                <Sparkles size={15} />
                Be Part of Something Good
              </div>

              <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-[#263B30] sm:text-4xl lg:text-5xl">
                Small Acts.
                <span className="block text-[#34765A]">
                  Big Impact.
                </span>
              </h2>

              <p className="mt-4 max-w-lg text-sm leading-7 text-[#607568] sm:text-base">
                Your kindness can change lives. Connect with your
                community, join meaningful initiatives and make
                every little action count.
              </p>

            </div>

            <Link
              href="/upcoming-events"
              className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-[#34765A] px-7 py-4 text-sm font-bold text-white shadow-lg shadow-green-900/10 transition-all duration-300 hover:-translate-y-1 hover:bg-[#285C45]"
            >
              <CalendarDays size={19} />
              Explore Events

              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform group-hover:translate-x-1">
                <ArrowUpRight size={17} />
              </span>
            </Link>

          </div>
        </div>

        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">

          {/* Brand */}
          <div>

            <Link href="/" className="mb-6 inline-flex items-center gap-3">
              <Image
                src="/image/kindnest.jpg"
                alt="KindNest Logo"
                width={50}
                height={50}
                className="h-12 w-12 rounded-xl object-cover"
              />

              <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-[#263B30]">
                  KindNest<span className="text-[#34765A]">.</span>
                </h2>

                <p className="mt-0.5 text-[9px] font-bold tracking-[2.5px] text-[#6B947A]">
                  SPREAD KINDNESS
                </p>
              </div>
            </Link>

            <p className="max-w-xs text-sm leading-7 text-[#607568]">
              A community-driven platform bringing compassionate
              people together to organize events, support those
              in need and create meaningful local change.
            </p>

            <div className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#34765A]">
              <Heart size={16} fill="currentColor" />
              Together, We Make a Difference.
            </div>

          </div>

          {/* Quick Links */}
          <div>

            <h3 className="mb-7 text-sm font-extrabold uppercase tracking-[2px] text-[#263B30]">
              Quick Links
            </h3>

            <ul className="space-y-4">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-sm text-[#607568] transition-all duration-300 hover:translate-x-1 hover:text-[#34765A]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#83AD8D] transition-colors group-hover:bg-[#34765A]" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

          </div>

          {/* Initiatives */}
          <div>

            <h3 className="mb-7 text-sm font-extrabold uppercase tracking-[2px] text-[#263B30]">
              Our Initiatives
            </h3>

            <ul className="space-y-4">
              {initiatives.map((item) => {
                const Icon = item.icon;

                return (
                  <li
                    key={item.label}
                    className="group flex items-center gap-3 text-sm text-[#607568] transition-colors hover:text-[#34765A]"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#34765A]/10 bg-[#E5F0E6] text-[#34765A] transition-all group-hover:border-[#34765A]/30 group-hover:bg-[#D8EADD]">
                      <Icon size={16} />
                    </span>

                    {item.label}
                  </li>
                );
              })}
            </ul>

          </div>

          {/* Account */}
          <div>

            <h3 className="mb-7 text-sm font-extrabold uppercase tracking-[2px] text-[#263B30]">
              My Account
            </h3>

            <ul className="space-y-4">
              {accountLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-sm text-[#607568] transition-all duration-300 hover:translate-x-1 hover:text-[#34765A]"
                  >
                    <ArrowUpRight
                      size={14}
                      className="text-[#6B947A] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl border border-[#34765A]/10 bg-white/70 p-4 shadow-sm shadow-green-900/5">
              <div className="flex items-center gap-2 text-[#34765A]">
                <MapPin size={17} />
                <span className="text-sm font-bold">
                  Local Community
                </span>
              </div>

              <p className="mt-2 text-xs leading-6 text-[#718579]">
                Making a difference, one neighborhood at a time.
              </p>
            </div>

          </div>

        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-5 border-t border-[#34765A]/15 py-7 text-center sm:flex-row sm:text-left">

          <p className="text-xs text-[#718579]">
            © 2026 KindNest. All rights reserved.
          </p>

          <p className="flex items-center gap-2 text-xs text-[#607568]">
            Made with
            <Heart
              size={14}
              fill="currentColor"
              className="text-rose-400"
            />
            for a kinder community.
          </p>

          <Link
            href="/upcoming-events"
            className="group inline-flex items-center gap-2 text-xs font-bold text-[#34765A] transition hover:text-[#263B30]"
          >
            Join Our Community
            <ArrowUpRight
              size={15}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>

        </div>

      </div>
    </footer>
  );
}
