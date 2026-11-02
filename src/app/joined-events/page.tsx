
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import {
  CalendarDays,
  MapPin,
  ArrowRight,
  Loader2,
  HeartHandshake,
  Sparkles,
  CalendarCheck,
  CalendarClock,
  Clock,
  Heart,
  ArrowUpRight,
  PartyPopper,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import LeaveEventButton from "@/components/LeaveEventButton";

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

  // Fetch Joined Events
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

        const { data, error } = await authClient.token();

        if (error || !data?.token) {
          throw new Error("JWT token not found. Please login again.");
        }

        const response = await fetch(
          "http://localhost:8000/joined-events",
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
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

  // Format Date
  const formatDate = (date: string) => {
    return new Date(
      `${date.slice(0, 10)}T00:00:00`
    ).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Loading State
  if (isPending || loading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#F1F7F1]">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E5F0E6]">
            <Loader2 className="h-8 w-8 animate-spin text-[#34765A]" />
          </div>

          <p className="text-sm font-semibold text-[#718579]">
            Loading your joined events...
          </p>
        </div>
      </main>
    );
  }

  // Error State
  if (error) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#F1F7F1] px-4">
        <div className="w-full max-w-lg rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50">
            <HeartHandshake className="h-8 w-8 text-red-500" />
          </div>

          <h2 className="mt-5 text-xl font-bold text-[#263B30]">
            Failed to Load Joined Events
          </h2>

          <p className="mt-3 text-sm leading-7 text-[#718579]">
            {error}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-xl bg-[#34765A] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#285C45]"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  // Sort Events by Date
  const sortedEvents = [...events].sort(
    (a, b) =>
      new Date(a.eventDate).getTime() -
      new Date(b.eventDate).getTime()
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F1F7F1] px-4 py-12 sm:py-16">

      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-40 top-40 h-80 w-80 rounded-full bg-emerald-200/30 blur-[100px]" />

      <div className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-lime-200/30 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Hero Section */}
        <section className="relative mb-10 overflow-hidden rounded-3xl bg-[#245C40] px-6 py-10 text-white shadow-xl shadow-green-950/10 sm:px-10 sm:py-12">

          <div className="absolute -right-20 -top-28 h-80 w-80 rounded-full border border-white/10" />

          <div className="absolute -bottom-40 right-40 h-80 w-80 rounded-full bg-white/5 blur-3xl" />

          <div className="relative z-10 flex flex-col justify-between gap-8 md:flex-row md:items-center">

            <div className="max-w-2xl">

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-green-100">
                <Sparkles size={15} />
                Community Participation
              </div>

              <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                My Joined Events
                <span className="mt-1 block text-green-200">
                  Make Every Moment Count.
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-green-100 sm:text-base">
                Your participation creates real change.
                Explore the community events you have joined
                and get ready to make a difference.
              </p>

            </div>

            <Link
              href="/upcoming-events"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-[#245C40] shadow-md transition hover:-translate-y-1 hover:bg-green-50"
            >
              Explore More Events
              <ArrowUpRight size={17} />
            </Link>

          </div>
        </section>

        {/* Statistics */}
        <section className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-2">

          {/* Total Joined */}
          <div className="rounded-3xl border border-[#34765A]/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

            <div className="flex items-center justify-between">

              <div className="rounded-2xl bg-[#E5F0E6] p-3">
                <HeartHandshake className="h-6 w-6 text-[#34765A]" />
              </div>

              <span className="text-xs font-bold tracking-wider text-[#91A096]">
                YOUR PARTICIPATION
              </span>

            </div>

            <p className="mt-5 text-sm font-medium text-[#718579]">
              Total Joined Events
            </p>

            <h2 className="mt-1 text-3xl font-extrabold text-[#263B30]">
              {events.length}
            </h2>

          </div>

          {/* Upcoming */}
          <div className="rounded-3xl border border-[#34765A]/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

            <div className="flex items-center justify-between">

              <div className="rounded-2xl bg-blue-50 p-3">
                <CalendarClock className="h-6 w-6 text-blue-600" />
              </div>

              <span className="text-xs font-bold tracking-wider text-blue-500">
                COMING UP
              </span>

            </div>

            <p className="mt-5 text-sm font-medium text-[#718579]">
              Upcoming Activities
            </p>

            <h2 className="mt-1 text-3xl font-extrabold text-[#263B30]">
              {events.filter((event) => {
                const today = new Date().toLocaleDateString("en-CA", {
                  timeZone: "Asia/Dhaka",
                });

                return event.eventDate.slice(0, 10) >= today;
              }).length}
            </h2>

          </div>

        </section>

        {/* Events Section Heading */}
        <section>

          <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

            <div>

              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#34765A]">
                <CalendarCheck size={16} />
                YOUR COMMUNITY JOURNEY
              </div>

              <h2 className="text-2xl font-extrabold text-[#263B30] sm:text-3xl">
                Events You Have Joined
              </h2>

              <p className="mt-2 text-sm text-[#718579]">
                Stay connected with your upcoming community activities.
              </p>

            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#34765A]/15 bg-white px-4 py-2 text-xs font-semibold text-[#64756B] shadow-sm">
              <CalendarCheck size={15} className="text-[#34765A]" />
              {events.length} {events.length === 1 ? "Event" : "Events"}
            </div>

          </div>

          {/* Empty State */}
          {events.length === 0 ? (

            <div className="rounded-3xl border border-dashed border-[#34765A]/25 bg-white px-5 py-20 text-center shadow-sm">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#E5F0E6]">
                <HeartHandshake className="h-10 w-10 text-[#34765A]" />
              </div>

              <h2 className="mt-5 text-xl font-bold text-[#263B30]">
                Your Journey Starts Here!
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#718579]">
                You have not joined any community events yet.
                Discover meaningful initiatives and become
                part of something wonderful.
              </p>

              <Link
                href="/upcoming-events"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#34765A] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#285C45]"
              >
                Explore Upcoming Events
                <ArrowRight size={18} />
              </Link>

            </div>

          ) : (

            /* Modern Joined Event Cards */
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">

              {sortedEvents.map((event) => (

                <div
                  key={event._id}
                  className="group overflow-hidden rounded-3xl border border-[#34765A]/10 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#34765A]/20 hover:shadow-xl hover:shadow-green-900/10"
                >

                  {/* Event Image */}
                  <div className="relative h-56 overflow-hidden rounded-2xl bg-[#E5F0E6]">

                    {event.imageUrl ? (

                      <Image
                        src={event.imageUrl}
                        alt={event.eventTitle}
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                    ) : (

                      <div className="flex h-full items-center justify-center text-[#83A08C]">
                        <HeartHandshake size={56} />
                      </div>

                    )}

                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-[#142D21]/65 via-transparent to-black/10" />

                    {/* Event Type Badge */}
                    <div className="absolute left-4 top-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/90 px-3.5 py-1.5 text-xs font-bold text-[#34765A] shadow-sm backdrop-blur-md">
                        <Heart size={13} />
                        {event.eventType}
                      </span>
                    </div>

                    {/* Date Badge */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-xl border border-white/20 bg-white/15 px-3 py-2 text-white shadow-sm backdrop-blur-md">
                      <CalendarDays size={15} />
                      <span className="text-xs font-semibold">
                        {new Date(
                          `${event.eventDate.slice(0, 10)}T00:00:00`
                        ).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    {/* Hover Arrow */}
                    <div className="absolute bottom-4 right-4 flex h-10 w-10 translate-y-3 items-center justify-center rounded-full bg-white text-[#34765A] opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <ArrowUpRight size={18} />
                    </div>

                  </div>

                  {/* Card Content */}
                  <div className="px-2 pb-2 pt-5">

                    <h3 className="line-clamp-2 min-h-14 text-xl font-extrabold text-[#263B30] transition-colors duration-300 group-hover:text-[#34765A]">
                      {event.eventTitle}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 line-clamp-2 min-h-12 text-sm leading-6 text-[#718579]">
                      {event.description}
                    </p>

                    {/* Location */}
                    <div className="mt-4 flex items-center gap-2 text-sm text-[#718579]">

                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E5F0E6] text-[#34765A]">
                        <MapPin size={16} />
                      </span>

                      <span className="line-clamp-1">
                        {event.location}
                      </span>

                    </div>

                    {/* Joined Information */}
                    <div className="mt-4 flex items-center gap-2 border-t border-[#34765A]/10 pt-4 text-xs text-[#91A096]">
                      <Clock size={14} className="text-[#34765A]" />
                      <span>
                        Joined: {new Date(
                          `${event.joinedAt.slice(0, 10)}T00:00:00`
                        ).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    {/* View Details Button */}
                    <Link
                      href={`/events/${event._id}`}
                      className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#34765A] px-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#285C45]"
                    >
                      View Details
                      <ArrowRight
                        size={17}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </Link>

                    {/* Separate Leave Event Component */}
                    <LeaveEventButton
                      eventId={event._id}
                      onLeaveSuccess={() => {
                        setEvents((previousEvents) =>
                          previousEvents.filter(
                            (item) => item._id !== event._id
                          )
                        );
                      }}
                    />

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

        {/* Bottom Message */}
        {events.length > 0 && (
          <div className="mt-12 flex flex-col items-center justify-center gap-2 text-center">

            <div className="flex items-center gap-2 text-sm font-semibold text-[#34765A]">
              <PartyPopper size={17} />
              Your participation makes a difference!
            </div>

            <p className="text-xs text-[#718579]">
              Thank you for being part of a kinder community.
            </p>

          </div>
        )}

      </div>
    </main>
  );
}
