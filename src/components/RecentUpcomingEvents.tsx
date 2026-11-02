
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  CalendarDays,
  MapPin,
  ArrowRight,
  Sparkles,
  Heart,
  CalendarCheck,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

interface EventData {
  _id: string;
  eventTitle: string;
  eventType: string;
  eventDate: string;
  location: string;
  imageUrl: string;
}

export default function RecentUpcomingEvents() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);

  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  // Fetch Upcoming Events
  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const response = await fetch(
          "https://kind-nest-server-j7a2.vercel.app/upcoming-events",
          { cache: "no-store" }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch upcoming events");
        }

        const result = await response.json();

        const eventList = Array.isArray(result)
          ? result
          : result.events || [];

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const upcomingEvents = eventList
          .filter((event: EventData) => {
            const eventDate = new Date(event.eventDate);

            return (
              !isNaN(eventDate.getTime()) &&
              eventDate >= today
            );
          })
          .sort(
            (a: EventData, b: EventData) =>
              new Date(a.eventDate).getTime() -
              new Date(b.eventDate).getTime()
          )
          .slice(0, 6);

        setEvents(upcomingEvents);
      } catch (error) {
        console.error("Upcoming Events Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingEvents();
  }, []);

  // Handle Event Click
  const handleEventClick = (eventId: string) => {
    if (isPending) return;

    if (!session?.user) {
      router.push(
        `/login?callbackURL=${encodeURIComponent(`/events/${eventId}`)}`
      );
      return;
    }

    router.push(`/events/${eventId}`);
  };

  // Format Date
  const formatDate = (date: string) => {
    return new Date(`${date.slice(0, 10)}T00:00:00`).toLocaleDateString(
      "en-US",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  return (
    <section className="relative overflow-hidden bg-[#F1F7F1] py-20 md:py-24">

      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-emerald-200/30 blur-[100px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-lime-200/30 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">

        {/* Section Heading */}
        <div className="mb-12 flex flex-col justify-between gap-7 lg:flex-row lg:items-end">

          <div className="max-w-2xl">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#34765A]/15 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[2px] text-[#34765A] shadow-sm">
              <Sparkles size={15} />
              Make a Difference Together
            </div>

            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-[#263B30] sm:text-4xl md:text-5xl">
              Discover Our
              <span className="block text-[#34765A]">
                Upcoming Events
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-[#718579] sm:text-base">
              Every small act of kindness creates a bigger impact.
              Explore local initiatives and become part of something meaningful.
            </p>

          </div>

          <Link href="/upcoming-events" className="w-fit">
            <Button className="group h-12 rounded-full bg-[#34765A] px-7 text-sm font-bold text-white shadow-lg shadow-green-900/10 transition-all duration-300 hover:-translate-y-1 hover:bg-[#285C45]">
              Explore All Events
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>

        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-3xl border border-[#34765A]/10 bg-white p-3 shadow-sm"
              >
                <div className="h-56 animate-pulse rounded-2xl bg-[#E5F0E6]" />
                <div className="space-y-4 p-3 pt-5">
                  <div className="h-5 w-3/4 animate-pulse rounded bg-[#E5F0E6]" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-[#E5F0E6]" />
                  <div className="h-10 animate-pulse rounded-xl bg-[#E5F0E6]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && events.length === 0 && (
          <div className="rounded-3xl border border-dashed border-[#34765A]/25 bg-white/70 px-5 py-20 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E5F0E6] text-[#34765A]">
              <CalendarCheck size={30} />
            </div>

            <h3 className="text-xl font-bold text-[#263B30]">
              No Upcoming Events Yet
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#718579]">
              There are no upcoming community events right now.
              Stay connected and check back soon!
            </p>

            <Link href="/upcoming-events">
              <Button className="mt-6 rounded-full bg-[#34765A] px-6 hover:bg-[#285C45]">
                Explore Events
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}

        {/* Event Cards */}
        {!loading && events.length > 0 && (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

            {events.map((event) => (
              <Card
                key={event._id}
                role="link"
                tabIndex={0}
                aria-label={`View event: ${event.eventTitle}`}
                onClick={() => handleEventClick(event._id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleEventClick(event._id);
                  }
                }}
                className="group cursor-pointer overflow-hidden rounded-3xl border border-[#34765A]/10 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#34765A]/20 hover:shadow-xl hover:shadow-green-900/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34765A]"
              >

                {/* Event Image */}
                <div className="relative h-56 overflow-hidden rounded-2xl">

                  <Image
                    src={event.imageUrl}
                    alt={event.eventTitle}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#142D21]/70 via-transparent to-black/10" />

                  {/* Event Type */}
                  <div className="absolute left-4 top-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/90 px-3.5 py-1.5 text-xs font-bold text-[#34765A] shadow-sm backdrop-blur-md">
                      <Heart size={13} />
                      {event.eventType}
                    </span>
                  </div>

                  {/* Date */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-xl border border-white/20 bg-white/15 px-3 py-2 text-white shadow-sm backdrop-blur-md">
                    <CalendarDays size={15} />
                    <span className="text-xs font-semibold">
                      {formatDate(event.eventDate)}
                    </span>
                  </div>

                  {/* Hover Arrow */}
                  <div className="absolute bottom-4 right-4 flex h-10 w-10 translate-y-3 items-center justify-center rounded-full bg-white text-[#34765A] opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowRight size={18} />
                  </div>

                </div>

                {/* Card Content */}
                <CardContent className="px-2 pb-2 pt-5">

                  <h3 className="line-clamp-1 text-xl font-extrabold text-[#263B30] transition-colors duration-300 group-hover:text-[#34765A]">
                    {event.eventTitle}
                  </h3>

                  <div className="mt-4 flex items-center gap-2 text-sm text-[#718579]">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E5F0E6] text-[#34765A]">
                      <MapPin size={16} />
                    </span>

                    <span className="line-clamp-1">
                      {event.location}
                    </span>
                  </div>

                  {/* View Event */}
                  <div className="mt-5 flex items-center justify-between border-t border-[#34765A]/10 pt-4">

                    <span className="text-sm font-bold text-[#34765A]">
                      View Event Details
                    </span>

                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E5F0E6] text-[#34765A] transition-all duration-300 group-hover:bg-[#34765A] group-hover:text-white">
                      <ArrowRight size={17} />
                    </span>

                  </div>

                </CardContent>
              </Card>
            ))}

          </div>
        )}

        {/* Bottom Note */}
        {!loading && events.length > 0 && (
          <div className="mt-12 flex flex-col items-center justify-center gap-2 text-center">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#34765A]">
              <Heart size={16} fill="currentColor" />
              Be the reason someone smiles today.
            </div>
            <p className="text-xs text-[#718579]">
              Discover more opportunities to make a positive impact.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
