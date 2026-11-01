
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
  PlusCircle,
  Settings,
  Eye,
  Loader2,
  HeartHandshake,
  CalendarCheck,
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

        const response = await fetch(
          `http://localhost:8000/ManageEvents?email=${encodeURIComponent(
            session.user.email
          )}`
        );

        if (!response.ok) {
          throw new Error("Failed to load events!");
        }

        const data = await response.json();

        setEvents(data);
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
      <div className="flex min-h-screen items-center justify-center bg-[#f5f8fa]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-10 w-10 animate-spin text-teal-600" />
          <p className="text-sm font-medium text-gray-500">
            Loading your events...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f8fa] px-4 py-12">
      <div className="mx-auto max-w-6xl">

        {/* Page Header */}
        <div className="mb-8 flex flex-col justify-between gap-6 border-b border-gray-200 pb-6 sm:flex-row sm:items-center">

          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
              <Settings size={14} />
              Organizer Dashboard
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
              Manage My Events
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
              View and manage the social initiatives you have published.
              Track your events and make a difference in your community.
            </p>
          </div>

          {/* Create Event Button */}
          <Link
            href="/create-event"
            className="inline-flex shrink-0 items-center justify-center rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Event
          </Link>
        </div>

        {/* Event Statistics */}
        <div className="mb-8 flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">

          <div className="rounded-xl bg-teal-50 p-3">
            <CalendarCheck className="h-7 w-7 text-teal-600" />
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">
              Total Published Events
            </p>

            <h2 className="text-2xl font-extrabold text-gray-800">
              {events.length}
            </h2>
          </div>
        </div>

        {/* Events Heading */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              My Published Events
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              All events created by you
            </p>
          </div>
        </div>

        {/* Empty State */}
        {events.length === 0 ? (
          <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-5 text-center">

            <div className="mb-5 rounded-full bg-teal-50 p-5">
              <HeartHandshake className="h-12 w-12 text-teal-600" />
            </div>

            <h2 className="text-xl font-bold text-gray-800">
              No Events Created Yet
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
              You haven&apos;t published any events yet. Start your first
              community initiative and inspire others to make a difference.
            </p>

            <Link
              href="/create-event"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Your First Event
            </Link>
          </div>
        ) : (

          /* Event Cards */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {events.map((event) => (
              <Card
                key={event._id}
                className="group overflow-hidden rounded-xl border border-gray-200 bg-white p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >

                {/* Event Image */}
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">

                  {event.imageUrl ? (
                    <Image
                      src={event.imageUrl}
                      alt={event.eventTitle}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <HeartHandshake className="h-14 w-14 text-gray-300" />
                    </div>
                  )}

                  {/* Event Type */}
                  <span className="absolute left-3 top-3 rounded-full bg-emerald-50/95 px-3 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm">
                    {event.eventType}
                  </span>

                  {/* Event Date */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-lg bg-gray-900/75 px-3 py-2 text-xs font-medium text-white backdrop-blur-sm">
                    <CalendarDays size={14} />

                    {new Date(
                      `${event.eventDate}T00:00:00`
                    ).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>

                {/* Event Information */}
                <div className="p-5">

                  <h3 className="line-clamp-1 text-lg font-bold text-teal-700">
                    {event.eventTitle}
                  </h3>

                  {/* Location */}
                  <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                    <MapPin
                      size={15}
                      className="shrink-0 text-teal-600"
                    />

                    <span className="line-clamp-1">
                      {event.location}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mt-3 line-clamp-2 min-h-10 text-sm leading-6 text-gray-500">
                    {event.description}
                  </p>

                  {/* Organizer */}
                  <div className="mt-4 border-t border-gray-100 pt-4">
                    <p className="mb-4 truncate text-xs text-gray-400">
                      Organizer: {event.creatorEmail}
                    </p>

                    {/* Only View Details Button */}
                    <Link
                      href={`/events/${event._id}`}
                      className="inline-flex w-full items-center justify-center rounded-lg border border-teal-100 bg-teal-50 px-4 py-2.5 text-sm font-semibold text-teal-700 transition hover:border-teal-600 hover:bg-teal-600 hover:text-white"
                    >
                      <Eye size={16} className="mr-2" />
                      View Details
                    </Link>
                  </div>
                </div>
              </Card>
            ))}

          </div>
        )}
      </div>
    </main>
  );
}
