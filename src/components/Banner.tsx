"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  HeartHandshake,
  Users,
  HandHeart,
} from "lucide-react";

export default function Banner() {
  return (
    <section className="relative overflow-hidden bg-[#f2f8ef]">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:py-24">

        {/* Left Content */}
        <div className="relative z-10">

          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-4 py-2 text-sm font-semibold text-green-800 shadow-sm">
            <HeartHandshake size={18} />
            Together for a Better Community
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-extrabold leading-tight text-green-950 sm:text-5xl lg:text-6xl">
            Together We
            <span className="block text-green-700">
              Make a Difference.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-xl text-base leading-8 text-gray-600 sm:text-lg">
            Small acts of kindness can create a big impact.
            Join KindNest to support your community, help people
            in need, and make the world a better place.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">

            <Link
              href="/upcoming-events"
              className="inline-flex items-center gap-2 rounded-full bg-green-800 px-7 py-3.5 font-semibold text-white shadow-lg shadow-green-900/20 transition hover:-translate-y-1 hover:bg-green-900"
            >
             Explore Upcoming Events
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/create-event"
              className="inline-flex items-center gap-2 rounded-full border-2 border-green-800 px-7 py-3.5 font-semibold text-green-800 transition hover:bg-green-800 hover:text-white"
            >
              <HandHeart size={19} />
              Create Event
            </Link>

          </div>

          {/* Community Stats */}
          <div className="mt-12 flex flex-wrap gap-8">

            <div>
              <div className="flex items-center gap-2 text-green-800">
                <Users size={21} />
                <span className="text-2xl font-extrabold">
                  Community
                </span>
              </div>

              <p className="mt-1 text-sm text-gray-500">
                United by kindness
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-green-800">
                <HeartHandshake size={21} />
                <span className="text-2xl font-extrabold">
                  Together
                </span>
              </div>

              <p className="mt-1 text-sm text-gray-500">
                Stronger through helping
              </p>
            </div>

          </div>
        </div>

        {/* Right Image */}
        <div className="relative">

          {/* Background Decorations */}
          <div className="absolute -right-5 -top-5 h-40 w-40 rounded-full bg-lime-200/60 blur-3xl" />

          <div className="absolute -bottom-5 -left-5 h-40 w-40 rounded-full bg-green-200/70 blur-3xl" />

          {/* Main Banner Image */}
          <div className="relative overflow-hidden rounded-[2rem] border-8 border-white shadow-2xl">
            <Image
              src="/image/Banner.jpg"
              alt="KindNest Community Service"
              width={700}
              height={600}
              priority
              className="h-87.5 w-full object-cover sm:h-112.5"
            />
          </div>

          {/* Floating Card */}
          <div className="absolute -bottom-6 -left-3 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-xl sm:-left-8">
            <div className="rounded-xl bg-green-100 p-3 text-green-800">
              <HeartHandshake size={28} />
            </div>

            <div>
              <p className="font-bold text-green-950">
                Spread Kindness
              </p>

              <p className="text-xs text-gray-500">
                Every little help matters.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}