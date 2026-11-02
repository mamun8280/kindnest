
"use client";

import {
  Users,
  CalendarCheck,
  ShieldCheck,
  Compass,
  HeartHandshake,
  HandHeart,
  TreePine,
  Stethoscope,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const features = [
  {
    icon: Users,
    title: "Community-Led Drives",
    description:
      "Every citizen can organize cleanups, winter drives, and food distributions in their local area.",
    color: "text-teal-700",
    bg: "from-teal-100 to-emerald-50",
    number: "01",
  },
  {
    icon: CalendarCheck,
    title: "One-Click Participation",
    description:
      "Join social initiatives with a single click and coordinate directly with local volunteer leaders.",
    color: "text-indigo-700",
    bg: "from-indigo-100 to-blue-50",
    number: "02",
  },
  {
    icon: ShieldCheck,
    title: "Creator Controls",
    description:
      "Manage, update, and track participation for your own initiatives with built-in creator authorization.",
    color: "text-emerald-700",
    bg: "from-emerald-100 to-green-50",
    number: "03",
  },
  {
    icon: Compass,
    title: "Upcoming Only Discovery",
    description:
      "Discover upcoming community events and find meaningful opportunities to help people around you.",
    color: "text-orange-700",
    bg: "from-orange-100 to-amber-50",
    number: "04",
  },
  {
    icon: HeartHandshake,
    title: "Community Support",
    description:
      "Bring people together to support families and individuals who need a helping hand.",
    color: "text-rose-700",
    bg: "from-rose-100 to-pink-50",
    number: "05",
  },
  {
    icon: HandHeart,
    title: "Food & Clothes Donation",
    description:
      "Organize food distribution and winter clothing campaigns for people in need.",
    color: "text-amber-700",
    bg: "from-amber-100 to-yellow-50",
    number: "06",
  },
  {
    icon: TreePine,
    title: "Environmental Care",
    description:
      "Create tree plantation and neighborhood cleaning initiatives for a greener community.",
    color: "text-green-700",
    bg: "from-green-100 to-lime-50",
    number: "07",
  },
  {
    icon: Stethoscope,
    title: "Health Support",
    description:
      "Arrange free medical camps and health awareness programs for local communities.",
    color: "text-sky-700",
    bg: "from-sky-100 to-cyan-50",
    number: "08",
  },
];

export default function Features() {
  return (
    <section className="relative overflow-hidden bg-[#f5faf6] px-4 py-20 sm:px-6 lg:py-28">

      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-emerald-200/30 blur-[100px]" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-lime-200/30 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl">

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >

          {/* Section Heading */}
          <div className="mb-12 flex flex-col justify-between gap-7 md:flex-row md:items-end">

            <div className="max-w-2xl text-center md:text-left">

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[2px] text-emerald-800 shadow-sm">
                <Sparkles size={15} className="text-emerald-600" />
                What Makes Us Different
              </div>

              <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                Everything You Need
                <span className="block text-emerald-700">
                  to Make a Difference.
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-500 md:mx-0 md:text-base">
                Discover simple yet powerful tools that bring
                compassionate people together and turn good intentions
                into meaningful community action.
              </p>
            </div>

            {/* Carousel Navigation */}
            <div className="flex items-center justify-center gap-3 md:justify-end">

              <div className="hidden text-right sm:block">
                <p className="text-sm font-bold text-gray-800">
                  Explore Features
                </p>
                <p className="text-xs text-gray-400">
                  Discover what you can do
                </p>
              </div>

              <div className="flex items-center gap-2">
                <CarouselPrevious className="static translate-y-0 border-green-200 bg-white text-green-800 shadow-sm transition-all hover:border-green-700 hover:bg-green-800 hover:text-white" />

                <CarouselNext className="static translate-y-0 border-green-200 bg-white text-green-800 shadow-sm transition-all hover:border-green-700 hover:bg-green-800 hover:text-white" />
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <CarouselContent className="-ml-5">

            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <CarouselItem
                  key={feature.number}
                  className="basis-full pl-5 sm:basis-1/2 lg:basis-1/4"
                >
                  <Card className="group relative h-full overflow-hidden rounded-[1.5rem] border border-green-100/80 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-emerald-200 hover:shadow-xl hover:shadow-green-900/10">

                    {/* Top Accent */}
                    <div className="absolute left-0 top-0 h-1 w-0 bg-linear-to-r from-emerald-600 to-lime-400 transition-all duration-500 group-hover:w-full" />

                    <CardContent className="relative flex min-h-68.75 flex-col p-6">

                      {/* Number */}
                      <div className="absolute right-6 top-6 text-xs font-bold tracking-widest text-gray-200 transition-colors duration-300 group-hover:text-emerald-300">
                        {feature.number}
                      </div>

                      {/* Icon */}
                      <div
                        className={`mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br ${feature.bg} transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:scale-110`}
                      >
                        <Icon
                          size={26}
                          strokeWidth={1.8}
                          className={feature.color}
                        />
                      </div>

                      {/* Title */}
                      <h3 className="mb-3 text-lg font-bold leading-snug text-gray-900 transition-colors group-hover:text-emerald-800">
                        {feature.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm leading-7 text-gray-500">
                        {feature.description}
                      </p>

                      {/* Bottom Decoration */}
                      <div className="mt-auto flex justify-end pt-5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-50 text-green-700 transition-all duration-300 group-hover:bg-green-800 group-hover:text-white">
                          <ArrowUpRight size={17} />
                        </div>
                      </div>

                    </CardContent>
                  </Card>
                </CarouselItem>
              );
            })}

          </CarouselContent>

        </Carousel>

        {/* Bottom Message */}
        <div className="mt-12 flex flex-col items-center justify-center gap-2 border-t border-green-100 pt-8 text-center sm:flex-row">
          <HeartHandshake size={20} className="text-emerald-700" />
          <p className="text-sm font-medium text-gray-500">
            Together, we can turn small acts of kindness into a big impact.
          </p>
        </div>

      </div>
    </section>
  );
}
