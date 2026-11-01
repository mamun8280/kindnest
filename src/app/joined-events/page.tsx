
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays, MapPin, ArrowRight, Loader2, HeartHandshake } from "lucide-react";
import { authClient } from "@/lib/auth-client";

interface EventData {
  _id: string;
  eventTitle: string;
  eventType: string;
  eventDate: string;
  location: string;
  imageUrl: string;
  description: string;
  joinedAt: string;
}

export default function JoinedEventsPage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isPending) return;

    if (!session?.user) {
      router.replace("/login?callbackURL=/joined-events");
      return;
    }

    let cancelled = false;

    const fetchJoinedEvents = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:8000/joined-events",
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
          }
        );

        const contentType = response.headers.get("content-type");

        if (!contentType?.includes("application/json")) {
          throw new Error(
            "Server JSON response dicche na. Backend server check koro."
          );
        }

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Failed to load joined events."
          );
        }

        if (!cancelled) {
          setEvents(Array.isArray(result) ? result : []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Something went wrong."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchJoinedEvents();

    return () => {
      cancelled = true;
    };
  }, [session, isPending, router]);

  if (isPending || loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#34765a]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-red-600">
          Failed to load Joined Events
        </h2>
        <p className="mt-3 text-gray-600">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-5 rounded-lg bg-[#34765a] px-6 py-3 text-white hover:bg-[#285c45]"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8faf7] px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#eaf3ec] px-4 py-2 text-sm font-medium text-[#34765a]">
            <HeartHandshake size={18} />
            Community Participation
          </div>

          <h1 className="text-3xl font-bold text-[#263b30] md:text-4xl">
            My Joined Events
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-gray-600">
            Explore the community events you have joined and get ready to make a difference.
          </p>
        </div>

        {events.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#cbdccf] bg-white px-6 py-16 text-center">
            <HeartHandshake
              size={48}
              className="mx-auto text-[#34765a]"
            />

            <h2 className="mt-5 text-xl font-bold text-[#263b30]">
              No Joined Events Yet
            </h2>

            <p className="mt-2 text-gray-600">
              You have not joined any community events yet.
            </p>

            <Link
              href="/upcoming-events"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#34765a] px-6 py-3 font-medium text-white transition hover:bg-[#285c45]"
            >
              Explore Events
              <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {[...events]
              .sort(
                (a, b) =>
                  new Date(a.eventDate).getTime() -
                  new Date(b.eventDate).getTime()
              )
              .map((event) => (
                <div
                  key={event._id}
                  className="overflow-hidden rounded-2xl border border-[#e4ece5] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative h-52 w-full bg-[#eaf3ec]">
                    {event.imageUrl ? (
                      <Image
                        src={event.imageUrl}
                        alt={event.eventTitle}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <HeartHandshake
                          size={48}
                          className="text-[#34765a]"
                        />
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <span className="inline-block rounded-full bg-[#eaf3ec] px-3 py-1 text-xs font-semibold text-[#34765a]">
                      {event.eventType}
                    </span>

                    <h2 className="mt-3 line-clamp-2 text-xl font-bold text-[#263b30]">
                      {event.eventTitle}
                    </h2>

                    <div className="mt-4 space-y-3 text-sm text-gray-600">
                      <p className="flex items-center gap-2">
                        <CalendarDays
                          size={17}
                          className="shrink-0 text-[#34765a]"
                        />
                        {new Date(event.eventDate).toLocaleDateString(
                          "en-GB",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </p>

                      <p className="flex items-center gap-2">
                        <MapPin
                          size={17}
                          className="shrink-0 text-[#34765a]"
                        />
                        {event.location}
                      </p>
                    </div>

                    <Link
                      href={`/events/${event._id}`}
                      className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#34765a] px-4 py-3 font-medium text-white transition hover:bg-[#285c45]"
                    >
                      View Details
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </main>
  );
}
