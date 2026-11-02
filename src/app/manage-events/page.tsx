"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

import {
  CalendarDays,
  MapPin,
  Plus,
  Eye,
  Loader2,
  HeartHandshake,
  CalendarCheck,
  CalendarClock,
  History,
  ArrowUpRight,
  Sparkles,
  Settings2,
  FolderOpen,
  Heart,
} from "lucide-react";

import { Card } from "@/components/ui/card";

type Event = {
  _id: string;
  eventTitle: string;
  eventType: string;
  eventDate: string;
  location: string;
  imageUrl: string;
  description: string;
  creatorEmail: string;
  createdAt: string;
};

export default function ManageEventsPage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch My Events
  useEffect(() => {
    if (isPending) return;

    if (!session?.user?.email) {
      router.replace("/login?callbackURL=/manage-events");
      return;
    }

    const fetchEvents = async () => {
      try {
        setLoading(true);
        const { data, error } = await authClient.token()
          if (error) {
           throw new Error("Failed to retrieve token. Please login again.");
          }
         const token = data?.token

        const response = await fetch(
          "https://kind-nest-server-j7a2.vercel.app/ManageEvents",
          {
            method: "GET",
            credentials: "include",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to load events!");
        }

        const result = await response.json();
        setEvents(result);
      } catch (error) {
        console.error("Fetch Events Error:", error);
        toast.error("Failed to load events!");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [session, isPending, router]);

  // Loading State
  if (isPending || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F1F7F1]">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E5F0E6]">
            <Loader2 className="h-8 w-8 animate-spin text-[#34765A]" />
          </div>

          <p className="text-sm font-medium text-[#64756B]">
            Preparing your dashboard...
          </p>
        </div>
      </div>
    );
  }

  // Event Statistics
  const today = new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Dhaka",
  });

  const upcomingEvents = events.filter(
    (event) => event.eventDate >= today
  );

  const pastEvents = events.filter(
    (event) => event.eventDate < today
  );

  // Date Formatter
  const formatDate = (date: string) => {
    return new Date(`${date.slice(0, 10)}T00:00:00`).toLocaleDateString(
      "en-GB",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F1F7F1] px-4 py-12 sm:py-16">

      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-40 top-40 h-80 w-80 rounded-full bg-emerald-200/30 blur-[100px]" />

      <div className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-lime-200/30 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Dashboard Header */}
        <section className="relative mb-10 overflow-hidden rounded-3xl bg-[#245C40] px-6 py-9 text-white shadow-lg shadow-green-950/10 sm:px-10 sm:py-12">

          <div className="absolute -right-20 -top-28 h-80 w-80 rounded-full border border-white/10" />

          <div className="absolute -bottom-40 right-40 h-80 w-80 rounded-full bg-white/5 blur-3xl" />

          <div className="relative z-10 flex flex-col justify-between gap-8 md:flex-row md:items-center">

            <div className="max-w-2xl">

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-green-100">
                <Sparkles size={14} />
                ORGANIZER DASHBOARD
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                Manage Your Events
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-green-100 sm:text-base">
                Every event creates an opportunity to make a
                difference. Manage your initiatives and inspire
                your community to take action.
              </p>

            </div>

            <Link
              href="/create-event"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-[#245C40] shadow-md transition hover:-translate-y-1 hover:bg-green-50"
            >
              <Plus size={19} />
              Create New Event
              <ArrowUpRight size={16} />
            </Link>

          </div>
        </section>

        {/* Statistics */}
        <section className="mb-12 grid grid-cols-1 gap-5 sm:grid-cols-3">

          {/* Total Events */}
          <div className="rounded-3xl border border-[#34765A]/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

            <div className="flex items-center justify-between">
              <div className="rounded-2xl bg-[#E5F0E6] p-3">
                <FolderOpen className="h-6 w-6 text-[#34765A]" />
              </div>

              <span className="text-xs font-bold tracking-wider text-[#91A096]">
                ALL TIME
              </span>
            </div>

            <p className="mt-5 text-sm font-medium text-[#718579]">
              Total Published Events
            </p>

            <h2 className="mt-1 text-3xl font-extrabold text-[#263B30]">
              {events.length}
            </h2>

          </div>

          {/* Upcoming Events */}
          <div className="rounded-3xl border border-[#34765A]/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

            <div className="flex items-center justify-between">
              <div className="rounded-2xl bg-blue-50 p-3">
                <CalendarClock className="h-6 w-6 text-blue-600" />
              </div>

              <span className="text-xs font-bold tracking-wider text-blue-500">
                ACTIVE
              </span>
            </div>

            <p className="mt-5 text-sm font-medium text-[#718579]">
              Upcoming Events
            </p>

            <h2 className="mt-1 text-3xl font-extrabold text-[#263B30]">
              {upcomingEvents.length}
            </h2>

          </div>

          {/* Past Events */}
          <div className="rounded-3xl border border-[#34765A]/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

            <div className="flex items-center justify-between">
              <div className="rounded-2xl bg-orange-50 p-3">
                <History className="h-6 w-6 text-orange-500" />
              </div>

              <span className="text-xs font-bold tracking-wider text-orange-500">
                COMPLETED
              </span>
            </div>

            <p className="mt-5 text-sm font-medium text-[#718579]">
              Past Events
            </p>

            <h2 className="mt-1 text-3xl font-extrabold text-[#263B30]">
              {pastEvents.length}
            </h2>

          </div>

        </section>

        {/* Events Section Header */}
        <section>

          <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#34765A]">
                <Settings2 size={16} />
                EVENT MANAGEMENT
              </div>

              <h2 className="text-2xl font-extrabold text-[#263B30] sm:text-3xl">
                My Published Events
              </h2>

              <p className="mt-2 text-sm text-[#718579]">
                Manage and track all the events you have created.
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

              <h3 className="mt-5 text-xl font-bold text-[#263B30]">
                Your journey starts here!
              </h3>

              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#718579]">
                You haven&apos;t published any events yet. Create
                your first community initiative and invite others
                to make a positive difference.
              </p>

              <Link
                href="/create-event"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#34765A] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#285C45]"
              >
                <Plus size={18} />
                Create Your First Event
              </Link>

            </div>

          ) : (

            /* Modern Event Cards */
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">

              {events.map((event) => (

                <Card
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

                    {/* Event Date Badge */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-xl border border-white/20 bg-white/15 px-3 py-2 text-white shadow-sm backdrop-blur-md">
                      <CalendarDays size={15} />
                      <span className="text-xs font-semibold">
                        {formatDate(event.eventDate)}
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

                    {/* Organizer */}
                    <div className="mt-4 border-t border-[#34765A]/10 pt-4">

                      <p className="mb-4 truncate text-xs text-[#91A096]">
                        Organizer: {event.creatorEmail}
                      </p>

                      {/* View Details */}
                      <Link
                        href={`/events/${event._id}`}
                        className="block"
                      >
                        <button
                          type="button"
                          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#34765A] px-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#285C45]"
                        >
                          <Eye size={17} />
                          View Details
                          <ArrowUpRight
                            size={16}
                            className="ml-auto transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                          />
                        </button>
                      </Link>

                    </div>

                  </div>

                </Card>

              ))}

            </div>

          )}

        </section>

        {/* Bottom Message */}
        {events.length > 0 && (
          <div className="mt-12 flex flex-col items-center justify-center gap-2 text-center">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#34765A]">
              <Heart size={16} fill="currentColor" />
              Every event makes a difference.
            </div>

            <p className="text-xs text-[#718579]">
              Keep inspiring your community through meaningful actions.
            </p>
          </div>
        )}

      </div>
    </main>
  );
}
