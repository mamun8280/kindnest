
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Tag,
  Loader2,
  HeartHandshake,
  Pencil,
  CheckCircle2,
  Sparkles,
  Users,
  ShieldCheck,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import EditEventPage, {
  type EventData,
} from "@/components/events/EditEventsPage";

import DeleteEventsPage from "@/components/events/DeleteEventsPage";

type EventDetailsProps = {
  id: string;
  jwtToken: string | null;
};

const EventDetailsContent = ({ id, jwtToken }: EventDetailsProps) => {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);

  // Join Event States
  const [hasJoined, setHasJoined] = useState(false);
  const [joining, setJoining] = useState(false);

  // Fetch Event
  useEffect(() => {
    if (isPending || !id) return;

    let cancelled = false;

    const fetchEvent = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://kind-nest-server-j7a2.vercel.app/ManageEvents/${id}`,
          {
            method: "GET",
            headers: jwtToken
              ? {
                  Authorization: `Bearer ${jwtToken}`,
                }
              : {},
            cache: "no-store",
          },
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
            error instanceof Error ? error.message : "Something went wrong!",
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
  }, [id, isPending, jwtToken]);

  // Check Join Status
  useEffect(() => {
    if (isPending || !id || !session?.user?.email) return;

    let cancelled = false;

    const checkJoinedStatus = async () => {
      try {
        const response = await fetch(
          `https://kind-nest-server-j7a2.vercel.app/joined-events/${id}`,
          {
            method: "GET",
            headers: jwtToken
              ? {
                  Authorization: `Bearer ${jwtToken}`,
                }
              : {},
            credentials: "include",
          },
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to check joined status");
        }

        if (!cancelled) {
          setHasJoined(result.joined === true);
        }
      } catch (error) {
        console.error("Join Status Error:", error);
      }
    };

    checkJoinedStatus();

    return () => {
      cancelled = true;
    };
  }, [id, isPending, session?.user?.email, jwtToken]);

  // Loading State
  if (isPending || loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8faf7]">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eaf3ec]">
            <Loader2 className="h-8 w-8 animate-spin text-[#34765a]" />
          </div>

          <p className="text-sm font-medium text-[#64756b]">
            Loading event details...
          </p>
        </div>
      </main>
    );
  }

  // Event Not Found
  if (!event) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#f8faf7] px-4 text-center">
        <div className="mb-5 rounded-3xl bg-[#eaf3ec] p-6">
          <HeartHandshake className="h-12 w-12 text-[#34765a]" />
        </div>

        <h2 className="text-2xl font-bold text-[#263b30]">
          Event Not Found
        </h2>

        <p className="mt-2 max-w-md text-sm leading-6 text-[#718077]">
          This event may have been deleted or does not exist.
        </p>

        <Button
          onClick={() => router.push("/upcoming-events")}
          className="mt-6 rounded-xl bg-[#34765a] hover:bg-[#285c45]"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Upcoming Events
        </Button>
      </main>
    );
  }

  // Event Owner Check
  const isOwner =
    !!session?.user?.email && event.creatorEmail === session.user.email;

  // Join Event Handler
  const handleJoinEvent = async () => {
    if (!session?.user?.email) {
      router.push(`/login?callbackURL=${encodeURIComponent(`/events/${id}`)}`);
      return;
    }

    if (hasJoined || joining || isOwner) return;

    try {
      setJoining(true);

      const response = await fetch(`https://kind-nest-server-j7a2.vercel.app/join-event/${id}`, {
        method: "POST",
        headers: jwtToken
          ? {
              Authorization: `Bearer ${jwtToken}`,
            }
          : {},
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          setHasJoined(true);
          toast.info("You have already joined this event.");
          return;
        }

        throw new Error(result.message || "Failed to join event");
      }

      setHasJoined(true);

      toast.success("You have successfully joined this event!");
    } catch (error) {
      console.error("Join Event Error:", error);

      toast.error(
        error instanceof Error ? error.message : "Something went wrong!",
      );
    } finally {
      setJoining(false);
    }
  };

  // Format Date
  const formattedDate = new Date(
    `${event.eventDate.slice(0, 10)}T00:00:00`,
  ).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="min-h-screen bg-[#f8faf7] px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-6xl">

        {/* Back Navigation */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/upcoming-events"
            className="inline-flex items-center gap-2 rounded-full border border-[#e2ebe3] bg-white px-4 py-2.5 text-sm font-semibold text-[#64756b] shadow-sm transition hover:border-[#34765a] hover:text-[#34765a]"
          >
            <ArrowLeft size={16} />
            Back to Events
          </Link>

          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#718077]">
            <ShieldCheck size={16} className="text-[#34765a]" />
            KindNest Community
          </div>
        </div>

        {/* Main Event Card */}
        <Card className="overflow-hidden rounded-3xl border border-[#e5ece6] bg-white p-0 shadow-sm">

          {/* Owner Actions */}
          {isOwner && (
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e5ece6] bg-[#fbfdfb] px-5 py-4 sm:px-8">
              <div>
                <p className="text-sm font-bold text-[#263b30]">
                  Organizer Controls
                </p>

                <p className="mt-1 text-xs text-[#91a096]">
                  Manage your published event
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => setEditOpen(true)}
                  className="rounded-xl bg-[#34765a] text-white hover:bg-[#285c45]"
                >
                  <Pencil size={15} className="mr-2" />
                  Edit Event
                </Button>

                <DeleteEventsPage
                  id={event._id}
                  jwtToken={jwtToken || ""}
                />
              </div>
            </div>
          )}

          {/* Hero Image */}
          <div className="relative h-70 overflow-hidden bg-[#edf3ed] sm:h-105 lg:h-120">
            {event.imageUrl ? (
              <Image
                src={event.imageUrl}
                alt={event.eventTitle}
                fill
                priority
                unoptimized
                sizes="(max-width: 640px) 100vw, 1152px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <HeartHandshake className="h-20 w-20 text-[#b8c9bc]" />
              </div>
            )}

            {/* Image Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-[#172b20]/90 via-[#172b20]/10 to-transparent" />

            {/* Hero Content */}
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-9">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/95 px-4 py-2 text-xs font-bold text-[#34765a] shadow-sm">
                  <Tag size={14} />
                  {event.eventType}
                </span>

                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/25 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm">
                  <Sparkles size={14} />
                  Community Initiative
                </span>
              </div>

              <h1 className="max-w-3xl text-2xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
                {event.eventTitle}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-medium text-white/90">
                <div className="flex items-center gap-2">
                  <CalendarDays size={17} />
                  {formattedDate}
                </div>

                <div className="flex items-center gap-2">
                  <MapPin size={17} />
                  <span className="line-clamp-1">{event.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Event Content */}
          <CardContent className="p-5 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">

              {/* Left Content */}
              <div>
                <div className="mb-7">
                  <div className="mb-3 flex items-center gap-2 text-sm font-bold text-[#34765a]">
                    <HeartHandshake size={19} />
                    ABOUT THIS EVENT
                  </div>

                  <h2 className="text-2xl font-extrabold text-[#263b30]">
                    Event Overview
                  </h2>

                  <p className="mt-4 whitespace-pre-line text-sm leading-8 text-[#718077] sm:text-base">
                    {event.description}
                  </p>
                </div>

                {/* Event Information */}
                <div className="border-t border-[#e8eee9] pt-7">
                  <h3 className="mb-5 text-lg font-bold text-[#263b30]">
                    Event Information
                  </h3>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                    {/* Date */}
                    <div className="flex items-center gap-4 rounded-2xl border border-[#e6eee7] bg-[#fbfdfb] p-4">
                      <div className="rounded-xl bg-[#eaf3ec] p-3 text-[#34765a]">
                        <CalendarDays size={22} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs font-medium text-[#91a096]">
                          Event Date
                        </p>

                        <p className="mt-1 text-sm font-bold text-[#263b30]">
                          {formattedDate}
                        </p>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-4 rounded-2xl border border-[#e6eee7] bg-[#fbfdfb] p-4">
                      <div className="rounded-xl bg-[#eaf3ec] p-3 text-[#34765a]">
                        <MapPin size={22} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs font-medium text-[#91a096]">
                          Event Location
                        </p>

                        <p className="mt-1 wrap-break-word text-sm font-bold text-[#263b30]">
                          {event.location}
                        </p>
                      </div>
                    </div>

                    {/* Event Type */}
                    <div className="flex items-center gap-4 rounded-2xl border border-[#e6eee7] bg-[#fbfdfb] p-4 sm:col-span-2">
                      <div className="rounded-xl bg-[#eaf3ec] p-3 text-[#34765a]">
                        <Tag size={22} />
                      </div>

                      <div>
                        <p className="text-xs font-medium text-[#91a096]">
                          Event Category
                        </p>

                        <p className="mt-1 text-sm font-bold text-[#263b30]">
                          {event.eventType}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Organizer Information */}
                <div className="mt-7 rounded-2xl border border-[#e6eee7] bg-[#fbfdfb] p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eaf3ec] text-[#34765a]">
                      <Users size={21} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium text-[#91a096]">
                        Organized By
                      </p>

                      <p className="mt-1 break-all text-sm font-bold text-[#263b30]">
                        {event.creatorEmail}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Join Section */}
              <aside>
                <div className="rounded-3xl border border-[#e1ebe2] bg-[#f7faf7] p-5 sm:p-6 lg:sticky lg:top-24">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e4f0e6] text-[#34765a]">
                    <HeartHandshake size={29} />
                  </div>

                  <h3 className="text-xl font-extrabold text-[#263b30]">
                    Be Part of the Change
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#718077]">
                    Your participation can make a real difference. Join this
                    community initiative and help create a positive impact.
                  </p>

                  <div className="my-6 space-y-3 border-y border-[#e2ebe3] py-5">
                    <div className="flex items-center gap-2 text-sm text-[#64756b]">
                      <CheckCircle2 size={17} className="text-[#34765a]" />
                      Support your community
                    </div>

                    <div className="flex items-center gap-2 text-sm text-[#64756b]">
                      <CheckCircle2 size={17} className="text-[#34765a]" />
                      Connect with volunteers
                    </div>

                    <div className="flex items-center gap-2 text-sm text-[#64756b]">
                      <CheckCircle2 size={17} className="text-[#34765a]" />
                      Make a positive impact
                    </div>
                  </div>

                  {!isOwner ? (
                    <>
                      <Button
                        onClick={handleJoinEvent}
                        disabled={joining || hasJoined}
                        className="h-12 w-full rounded-xl bg-[#34765a] text-sm font-bold text-white shadow-sm transition hover:bg-[#285c45] disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {joining ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Joining...
                          </>
                        ) : hasJoined ? (
                          <>
                            <CheckCircle2 className="mr-2 h-5 w-5" />
                            Already Joined
                          </>
                        ) : (
                          <>
                            <HeartHandshake className="mr-2 h-5 w-5" />
                            Join This Event
                            <ArrowUpRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>

                      <p className="mt-3 text-center text-xs leading-5 text-[#91a096]">
                        {hasJoined
                          ? "You are already a participant in this event."
                          : "Join the initiative and become part of the community."}
                      </p>
                    </>
                  ) : (
                    <div className="rounded-xl border border-[#cfe2d2] bg-[#eaf3ec] p-4 text-center">
                      <ShieldCheck className="mx-auto h-6 w-6 text-[#34765a]" />

                      <p className="mt-2 text-sm font-bold text-[#34765a]">
                        You are the Organizer
                      </p>

                      <p className="mt-1 text-xs text-[#718077]">
                        You cannot join your own event.
                      </p>
                    </div>
                  )}
                </div>
              </aside>
            </div>

            {/* Bottom Navigation */}
            <div className="mt-10 flex flex-wrap justify-between gap-3 border-t border-[#e5ece6] pt-6">
              <Button
                variant="outline"
                onClick={() => router.push("/upcoming-events")}
                className="rounded-xl border-[#dce8de] text-[#34765a] hover:bg-[#eaf3ec]"
              >
                <ArrowLeft size={16} className="mr-2" />
                Back to Events
              </Button>

              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-[#718077] transition hover:text-[#34765a]"
              >
                Explore KindNest
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Edit Event Dialog */}
        {isOwner && (
          <EditEventPage
            event={event}
            open={editOpen}
            onOpenChange={setEditOpen}
            jwtToken={jwtToken}
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
