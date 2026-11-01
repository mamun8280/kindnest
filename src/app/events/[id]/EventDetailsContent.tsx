
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Tag,
  Loader2,
  HeartHandshake,
  Trash2,
  Pencil,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import EditEventPage, {
  type EventData,
} from "@/components/events/EditEventsPage";

const EventDetailsContent = () => {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const { data: session, isPending } = authClient.useSession();

  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);

  // Authentication Check
  useEffect(() => {
    if (!isPending && !session) {
      router.replace(
        `/login?callbackURL=${encodeURIComponent(`/events/${id}`)}`
      );
    }
  }, [isPending, session, router, id]);

  // Fetch Event
  useEffect(() => {
    if (isPending || !session || !id) return;

    let cancelled = false;

    const fetchEvent = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `http://localhost:8000/ManageEvents/${id}`,
          { cache: "no-store" }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to load event");
        }

        if (!cancelled) {
          setEvent(result as EventData);
        }
      } catch (error) {
        console.error("Event Details Error:", error);

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

    fetchEvent();

    return () => {
      cancelled = true;
    };
  }, [id, session, isPending]);

  // Loading
  if (isPending || !session || loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8faf7]">
        <div className="flex items-center gap-2 text-[#34765a]">
          <Loader2 className="animate-spin" size={20} />
          <span className="text-sm font-medium">
            Loading event details...
          </span>
        </div>
      </main>
    );
  }

  // Event Not Found
  if (!event) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#f8faf7] px-4">
        <h2 className="text-2xl font-bold text-[#263b30]">
          Event Not Found
        </h2>

        <p className="mt-2 text-sm text-[#718077]">
          This event may have been deleted or does not exist.
        </p>

        <Button
          onClick={() => router.push("/manage-events")}
          className="mt-5 bg-[#34765a] hover:bg-[#285c45]"
        >
          Back to Manage Events
        </Button>
      </main>
    );
  }

  // Event Owner Check
  const isOwner = event.creatorEmail === session.user.email;

  // Format Date
  const formattedDate = new Date(
    `${event.eventDate.slice(0, 10)}T00:00:00`
  ).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="min-h-screen bg-[#f8faf7] px-4 py-10">
      <div className="mx-auto max-w-4xl">

        <Link
          href="/manage-events"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#718077] transition hover:text-[#34765a]"
        >
          <ArrowLeft size={17} />
          Back to Manage Events
        </Link>

        <Card className="overflow-hidden rounded-3xl border border-[#e5ece6] bg-white shadow-sm">

          {/* Edit and Delete Buttons */}
          {isOwner && (
            <div className="flex justify-end gap-3 border-b border-[#e5ece6] bg-white px-6 py-4 sm:px-8">

              <Button
                onClick={() => setEditOpen(true)}
                className="rounded-xl bg-[#34765a] text-white hover:bg-[#285c45]"
              >
                <Pencil size={16} className="mr-2" />
                Edit
              </Button>

              <Button
                variant="destructive"
                className="rounded-xl"
              >
                <Trash2 size={16} className="mr-2" />
                Delete
              </Button>

            </div>
          )}

          {/* Event Image */}
          <div className="relative h-64 w-full sm:h-96">
            <Image
              src={event.imageUrl}
              alt={event.eventTitle}
              fill
              priority
              sizes="(max-width: 640px) 100vw, 896px"
              className="object-cover"
            />

            <div className="absolute bottom-4 left-4">
              <span className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#34765a] shadow-sm">
                {event.eventType}
              </span>
            </div>
          </div>

          <CardContent className="p-6 sm:p-8">

            <div className="mb-6">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-[#34765a]">
                <HeartHandshake size={18} />
                KindNest Community Event
              </div>

              <h1 className="text-2xl font-bold leading-tight text-[#263b30] sm:text-3xl">
                {event.eventTitle}
              </h1>

              <p className="mt-3 text-sm leading-7 text-[#718077]">
                {event.description}
              </p>
            </div>

            {/* Event Information */}
            <div className="grid grid-cols-1 gap-4 rounded-2xl bg-[#f8faf7] p-5 sm:grid-cols-2">

              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-[#eaf3ec] p-3 text-[#34765a]">
                  <CalendarDays size={20} />
                </div>

                <div>
                  <p className="text-xs text-[#91a096]">Event Date</p>
                  <p className="mt-1 text-sm font-semibold text-[#263b30]">
                    {formattedDate}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-[#eaf3ec] p-3 text-[#34765a]">
                  <MapPin size={20} />
                </div>

                <div>
                  <p className="text-xs text-[#91a096]">Location</p>
                  <p className="mt-1 text-sm font-semibold text-[#263b30]">
                    {event.location}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-[#eaf3ec] p-3 text-[#34765a]">
                  <Tag size={20} />
                </div>

                <div>
                  <p className="text-xs text-[#91a096]">Event Type</p>
                  <p className="mt-1 text-sm font-semibold text-[#263b30]">
                    {event.eventType}
                  </p>
                </div>
              </div>

            </div>

            {/* Creator Information */}
            <div className="mt-6 border-t border-[#e5ece6] pt-5">
              <p className="text-xs text-[#91a096]">Organized By</p>

              <p className="mt-1 text-sm font-semibold text-[#263b30]">
                {event.creatorEmail}
              </p>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button
                variant="outline"
                onClick={() => router.push("/manage-events")}
                className="rounded-xl border-[#dce8de] text-[#34765a] hover:bg-[#eaf3ec]"
              >
                <ArrowLeft size={16} className="mr-2" />
                Back
              </Button>
            </div>

          </CardContent>
        </Card>

        {/* Edit Event Dialog */}
        {isOwner && (
          <EditEventPage
            event={event}
            open={editOpen}
            onOpenChange={setEditOpen}
            onUpdated={(updatedEvent: EventData) => {
              setEvent(updatedEvent);
            }}
          />
        )}

      </div>
    </main>
  );
};

export default EventDetailsContent;
