
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
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    icon: CalendarCheck,
    title: "One-Click Participation",
    description:
      "Join social initiatives with a single click and coordinate directly with local volunteer leaders.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    icon: ShieldCheck,
    title: "Creator Controls",
    description:
      "Manage, update, and track participation for your own initiatives with built-in creator authorization.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: Compass,
    title: "Upcoming Only Discovery",
    description:
      "Discover upcoming community events and find meaningful opportunities to help people around you.",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    icon: HeartHandshake,
    title: "Community Support",
    description:
      "Bring people together to support families and individuals who need a helping hand.",
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
  {
    icon: HandHeart,
    title: "Food & Clothes Donation",
    description:
      "Organize food distribution and winter clothing campaigns for people in need.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: TreePine,
    title: "Environmental Care",
    description:
      "Create tree plantation and neighborhood cleaning initiatives for a greener community.",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: Stethoscope,
    title: "Health Support",
    description:
      "Arrange free medical camps and health awareness programs for local communities.",
    color: "text-sky-600",
    bg: "bg-sky-50",
  },
];

export default function Features() {
  return (
    <section className="bg-[#f7f9fc] px-5 py-20">
      <div className="mx-auto max-w-6xl">

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="mx-auto w-full"
        >

          {/* Section Heading + Navigation */}
          <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

            {/* Heading */}
            <div className="text-center sm:text-left">
              <p className="mb-2 text-xs font-bold uppercase tracking-[3px] text-teal-600">
                Platform Features
              </p>

              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
                Built for Community Action
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-500 md:mx-0 md:text-base">
                A frictionless platform connecting compassionate citizens
                with direct local community initiatives.
              </p>
            </div>
            

            {/* Carousel Buttons - Right Side */}
            <div className="flex items-center justify-center gap-3 sm:justify-end">

              <CarouselPrevious className="static translate-y-0 border-gray-300 bg-white text-gray-700 shadow-sm transition hover:border-teal-500 hover:bg-teal-50 hover:text-teal-700" />

              <CarouselNext className="static translate-y-0 border-gray-300 bg-white text-gray-700 shadow-sm transition hover:border-teal-500 hover:bg-teal-50 hover:text-teal-700" />

            </div>
          </div>

          {/* Feature Cards Carousel */}
          <CarouselContent className="-ml-4">

            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <CarouselItem
                  key={index}
                  className="basis-full pl-4 sm:basis-1/2 lg:basis-1/4"
                >
                  <Card className="h-full rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg">

                    <CardContent className="flex h-full min-h-47.5 flex-col p-5">

                      {/* Icon */}
                      <div
                        className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${feature.bg}`}
                      >
                        <Icon
                          size={21}
                          className={feature.color}
                        />
                      </div>

                      {/* Title */}
                      <h3 className="mb-2 text-base font-bold text-gray-900">
                        {feature.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm leading-6 text-gray-500">
                        {feature.description}
                      </p>

                    </CardContent>
                  </Card>
                </CarouselItem>
              );
            })}

          </CarouselContent>

        </Carousel>
      </div>
    </section>
  );
}
