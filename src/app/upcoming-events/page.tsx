
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import {
  CalendarDays,
  MapPin,
  HeartHandshake,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface EventData {
  _id: string;
  eventTitle: string;
  eventType: string;
  eventDate: string;
  location: string;
  imageUrl: string;
  description: string;
  creatorEmail: string;
}

const UpcomingEventsPage = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/upcoming-events",
          { cache: "no-store" }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Failed to load events"
          );
        }

        if (!cancelled) {
          setEvents(Array.isArray(result) ? result : []);
        }
      } catch (error) {
        console.error("Upcoming Events Error:", error);

        if (!cancelled) {
          toast.error(
            error instanceof Error
              ? error.message
              : "Something went wrong!"
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchEvents();

    return () => {
      cancelled = true;
    };
  }, []);

  const formatDate = (date: string) => {
    return new Date(`${date.slice(0, 10)}T00:00:00`).toLocaleDateString(
      "en-GB",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8faf7]">
        <div className="flex items-center gap-2 text-[#34765a]">
          <Loader2 className="animate-spin" size={22} />
          <span className="text-sm font-medium">
            Loading upcoming events...
          </span>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8faf7] px-4 py-12">
      <div className="mx-auto max-w-6xl">

        {/* Page Heading */}
        <div className="mb-10 text-center">
          <div className="mb-3 flex items-center justify-center gap-2 text-sm font-semibold text-[#34765a]">
            <HeartHandshake size={20} />
            KindNest Community
          </div>

          <h1 className="text-3xl font-bold text-[#263b30] sm:text-4xl">
            Upcoming Events
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#718077]">
            Discover community events and become a part of
            something meaningful.
          </p>
        </div>

        {/* Events */}
        {events.length === 0 ? (
          <div className="rounded-3xl border border-[#e5ece6] bg-white px-5 py-16 text-center">
            <HeartHandshake className="mx-auto h-12 w-12 text-[#b8c9bc]" />

            <h2 className="mt-4 text-xl font-bold text-[#263b30]">
              No Upcoming Events
            </h2>

            <p className="mt-2 text-sm text-[#718077]">
              There are no upcoming events right now.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Card
                key={event._id}
                className="overflow-hidden rounded-2xl border border-[#e5ece6] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Event Image */}
                <div className="relative h-52 w-full bg-[#edf3ed]">
                  {event.imageUrl ? (
                    <Image
                      src={event.imageUrl}
                      alt={event.eventTitle}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <HeartHandshake className="h-14 w-14 text-[#b8c9bc]" />
                    </div>
                  )}

                  <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#34765a] shadow-sm">
                    {event.eventType}
                  </span>
                </div>

                <CardContent className="p-5">
                  <h2 className="line-clamp-2 text-xl font-bold text-[#263b30]">
                    {event.eventTitle}
                  </h2>

                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#718077]">
                    {event.description}
                  </p>

                  <div className="mt-5 space-y-3 border-t border-[#e5ece6] pt-4">
                    <div className="flex items-center gap-2 text-sm text-[#718077]">
                      <CalendarDays
                        size={17}
                        className="text-[#34765a]"
                      />
                      {formatDate(event.eventDate)}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-[#718077]">
                      <MapPin
                        size={17}
                        className="text-[#34765a]"
                      />
                      <span className="line-clamp-1">
                        {event.location}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/events/${event._id}`}
                    className="mt-5 block"
                  >
                    <Button className="w-full rounded-xl bg-[#34765a] text-white hover:bg-[#285c45]">
                      View Event
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

      </div>
    </main>
  );
};

export default UpcomingEventsPage;
