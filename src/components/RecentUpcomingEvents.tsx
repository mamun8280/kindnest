
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";

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
          "http://localhost:8000/upcoming-events",
          { cache: "no-store" }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch upcoming events");
        }

        const result = await response.json();

        const eventList = Array.isArray(result)
          ? result
          : result.events || [];

        // Filter future events and sort by nearest date
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

  return (
    <section className="bg-[#f8faf7] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">

        {/* Section Heading */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#34765a]">
              Make a Difference
            </p>

            <h2 className="text-3xl font-bold text-[#263b30] md:text-4xl">
              Recent Upcoming Events
            </h2>

            <p className="mt-3 max-w-xl text-gray-600">
              Join hands with your community and be part of something meaningful.
            </p>
          </div>

          <Link href="/upcoming-events">
            <Button className="w-fit bg-[#34765a] hover:bg-[#285c45]">
              View All Events
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="py-16 text-center text-gray-500">
            Loading upcoming events...
          </div>
        )}

        {/* Empty State */}
        {!loading && events.length === 0 && (
          <div className="rounded-2xl border border-dashed border-gray-300 py-16 text-center">
            <p className="text-lg font-semibold text-[#263b30]">
              No upcoming events available.
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Please check back later for new community events.
            </p>
          </div>
        )}

        {/* Event Cards */}
        {!loading && events.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Card
                key={event._id}
                role="link"
                tabIndex={0}
                onClick={() => handleEventClick(event._id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleEventClick(event._id);
                  }
                }}
                className="group cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-white p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34765a]"
              >
                {/* Event Image */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={event.imageUrl}
                    alt={event.eventTitle}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#34765a] shadow-sm">
                    {event.eventType}
                  </span>
                </div>

                <CardContent className="p-5">
                  <h3 className="line-clamp-1 text-xl font-bold text-[#263b30] transition-colors group-hover:text-[#34765a]">
                    {event.eventTitle}
                  </h3>

                  {/* Event Date & Location */}
                  <div className="mt-5 space-y-3 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 shrink-0 text-[#34765a]" />

                      <span>
                        {new Date(event.eventDate).toLocaleDateString(
                          "en-US",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 shrink-0 text-[#34765a]" />

                      <span className="line-clamp-1">
                        {event.location}
                      </span>
                    </div>
                  </div>

                  {/* View Event Design */}
                  <div className="mt-6 flex items-center justify-center rounded-xl bg-[#34765a] py-2.5 text-sm font-semibold text-white transition-colors group-hover:bg-[#285c45]">
                    View Event
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
