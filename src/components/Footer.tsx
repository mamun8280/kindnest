
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
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-emerald-100 bg-linear-to-br from-[#f0fdf9] via-[#f8fffc] to-[#ecfdf5] text-gray-700">

      {/* Background Decorations */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-emerald-200/30 blur-[100px]" />

      <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-teal-200/30 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">

        {/* Top CTA */}
        <div className="flex flex-col gap-6 border-b border-emerald-200/70 py-12 md:flex-row md:items-center md:justify-between">

          <div>
            <div className="mb-3 flex items-center gap-2 text-emerald-700">
              <HeartHandshake size={22} />
              <span className="text-xs font-bold uppercase tracking-[3px]">
                Make a Difference
              </span>
            </div>

            <h2 className="text-2xl font-extrabold leading-tight text-gray-900 sm:text-3xl">
              Small Acts,{" "}
              <span className="text-emerald-700">Big Impact.</span>
            </h2>

            <p className="mt-2 max-w-lg text-sm leading-6 text-gray-500">
              Join hands with your community and help create a kinder,
              stronger and more compassionate society.
            </p>
          </div>

          <Link
            href="/upcoming-events"
            className="inline-flex w-fit items-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-900/10 transition-all hover:-translate-y-1 hover:bg-emerald-800"
          >
            Explore Events
            <ArrowUpRight size={18} />
          </Link>

        </div>

        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">

          {/* Brand */}
          <div>
            <Link href="/" className="mb-5 inline-flex items-center gap-3">
              <Image
                src="/image/kindnest.jpg"
                alt="KindNest Logo"
                width={48}
                height={48}
                className="h-12 w-12 rounded-xl object-cover"
              />

              <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-emerald-950">
                  KindNest<span className="text-emerald-500">.</span>
                </h2>

                <p className="text-[9px] font-semibold tracking-[2px] text-gray-500">
                  SPREAD KINDNESS
                </p>
              </div>
            </Link>

            <p className="max-w-xs text-sm leading-7 text-gray-500">
              A community-driven platform bringing compassionate
              people together to organize events, support those in
              need and make meaningful local changes.
            </p>

            <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-emerald-700">
              <Heart size={16} fill="currentColor" />
              Together, We Can Make a Difference.
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-base font-bold text-gray-900">
              Quick Links
            </h3>

            <ul className="space-y-4 text-sm text-gray-500">
              <li>
                <Link href="/" className="transition hover:pl-1 hover:text-emerald-700">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/upcoming-events" className="transition hover:pl-1 hover:text-emerald-700">
                  Upcoming Events
                </Link>
              </li>

              <li>
                <Link href="/create-event" className="transition hover:pl-1 hover:text-emerald-700">
                  Create Event
                </Link>
              </li>

              <li>
                <Link href="/manage-events" className="transition hover:pl-1 hover:text-emerald-700">
                  Manage Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Initiatives */}
          <div>
            <h3 className="mb-6 text-base font-bold text-gray-900">
              Our Initiatives
            </h3>

            <ul className="space-y-4 text-sm text-gray-500">
              <li className="flex items-center gap-3 transition hover:text-emerald-700">
                <HandHeart size={17} className="text-emerald-600" />
                Winter Clothes Distribution
              </li>

              <li className="flex items-center gap-3 transition hover:text-emerald-700">
                <HeartHandshake size={17} className="text-emerald-600" />
                Food & Blanket Donation
              </li>

              <li className="flex items-center gap-3 transition hover:text-emerald-700">
                <TreePine size={17} className="text-emerald-600" />
                Tree Plantation
              </li>

              <li className="flex items-center gap-3 transition hover:text-emerald-700">
                <Stethoscope size={17} className="text-emerald-600" />
                Free Medical Camps
              </li>

              <li className="flex items-center gap-3 transition hover:text-emerald-700">
                <Users size={17} className="text-emerald-600" />
                Community Support
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="mb-6 text-base font-bold text-gray-900">
              My Account
            </h3>

            <ul className="space-y-4 text-sm text-gray-500">
              <li>
                <Link href="/login" className="transition hover:pl-1 hover:text-emerald-700">
                  Login
                </Link>
              </li>

              <li>
                <Link href="/signUp" className="transition hover:pl-1 hover:text-emerald-700">
                  Create Account
                </Link>
              </li>

              <li>
                <Link href="/joined-events" className="transition hover:pl-1 hover:text-emerald-700">
                  Joined Events
                </Link>
              </li>

              <li className="flex items-center gap-2 pt-2 text-gray-500">
                <MapPin size={17} className="text-emerald-600" />
                Local Community
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-emerald-200/70 py-7 text-center sm:flex-row sm:text-left">

          <p className="text-xs text-gray-500">
          © 2026 KindNest. All rights reserved.
          </p>

          <p className="flex items-center gap-2 text-xs text-gray-500">
            Made with
            <Heart size={14} fill="currentColor" className="text-rose-400" />
            for a kinder community
          </p>

          <Link
            href="/upcoming-events"
            className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 transition hover:text-emerald-900"
          >
            Join Our Community
            <ArrowUpRight size={14} />
          </Link>
        </div>

      </div>
    </footer>
  );
}
