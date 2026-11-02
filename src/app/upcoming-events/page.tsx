
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import {
  CalendarDays,
  MapPin,
  HeartHandshake,
  Loader2,
  Search,
  PlusCircle,
  Sparkles,
  Heart,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

const categories = [
  "All",
  "Donation",
  "Cleanup",
  "Plantation",
  "Winter Relief",
  "Food Drive",
  "Health Camp",
  "Education",
];

const UpcomingEventsPage = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch Upcoming Events
  useEffect(() => {
    let cancelled = false;

    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "https://kind-nest-server-j7a2.vercel.app/upcoming-events",
          {
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
          throw new Error(result.message || "Failed to load events");
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

  // Search and Category Filter
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesCategory =
        selectedCategory === "All" ||
        (selectedCategory === "Food Drive"
          ? ["Food Drive", "Food Driver"].includes(event.eventType)
          : event.eventType === selectedCategory);

      const search = searchTerm.toLowerCase().trim();

      const matchesSearch =
        event.eventTitle.toLowerCase().includes(search) ||
        event.location.toLowerCase().includes(search);

      return matchesCategory && matchesSearch;
    });
  }, [events, selectedCategory, searchTerm]);

  // Format Date
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

  // Loading State
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F1F7F1]">
        <div className="flex items-center gap-3 text-[#34765A]">
          <Loader2 className="animate-spin" size={24} />
          <span className="text-sm font-semibold">
            Loading upcoming events...
          </span>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F1F7F1] px-4 py-12 sm:py-16">

      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-40 top-40 h-80 w-80 rounded-full bg-emerald-200/30 blur-[100px]" />

      <div className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-lime-200/30 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Page Heading */}
        <div className="flex flex-col justify-between gap-7 border-b border-[#34765A]/15 pb-9 md:flex-row md:items-end">

          <div className="max-w-2xl">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#34765A]/15 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[2px] text-[#34765A] shadow-sm">
              <Sparkles size={15} />
              Future Community Drives
            </div>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-[#263B30] sm:text-4xl md:text-5xl">
              Discover Our
              <span className="block text-[#34765A]">
                Upcoming Events
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-[#718579] sm:text-base">
              Discover meaningful community initiatives, connect with
              compassionate people and become part of something that creates a
              positive impact.
            </p>

          </div>

          <Link href="/create-event" className="w-full sm:w-fit">
            <Button className="h-12 w-full rounded-full bg-[#34765A] px-7 font-bold text-white shadow-lg shadow-green-900/10 transition-all duration-300 hover:-translate-y-1 hover:bg-[#285C45] sm:w-auto">
              <PlusCircle size={18} className="mr-2" />
              Create Event
            </Button>
          </Link>

        </div>

        {/* Search and Category Filter */}
        <div className="flex flex-col gap-5 pt-8 pb-10">

          {/* Search Bar */}
          <div className="relative w-full md:max-w-md">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#83A08C]"
            />

            <Input
              type="search"
              placeholder="Search events or areas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-11 w-full rounded-full border-[#34765A]/15 bg-white pl-11 text-sm shadow-sm placeholder:text-[#9AA99E] focus-visible:ring-[#34765A]"
            />
          </div>

          {/* Category Tabs */}
          <Tabs
            value={selectedCategory}
            onValueChange={setSelectedCategory}
            className="w-full"
          >
            <TabsList
              className="
                flex h-10 w-full flex-nowrap justify-start gap-2
                overflow-x-auto overflow-y-hidden
                bg-transparent p-0 pb-1
                touch-pan-x overscroll-x-contain
                scrollbar-none
                [&::-webkit-scrollbar]:hidden
                lg:grid lg:h-10 lg:grid-cols-8
                lg:overflow-visible lg:pb-0
              "
            >
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="
                    h-10 min-h-10 shrink-0 whitespace-nowrap
                    rounded-full border border-[#34765A]/15
                    bg-white px-5 py-2 text-xs font-semibold
                    text-[#607568] shadow-sm transition-all
                    hover:border-[#34765A]/30
                    data-[state=active]:border-[#34765A]
                    data-[state=active]:bg-[#34765A]
                    data-[state=active]:text-white
                    data-[state=active]:shadow-md
                    lg:min-w-0 lg:w-full lg:px-2
                  "
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

        </div>

        {/* Results Count */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">

          <div>
            <h2 className="text-lg font-bold text-[#263B30]">
              Explore Community Events
            </h2>

            <p className="mt-1 text-sm text-[#718579]">
              Find an opportunity to make a difference.
            </p>
          </div>

          <span className="rounded-full border border-[#34765A]/15 bg-white px-4 py-2 text-xs font-bold text-[#34765A] shadow-sm">
            {filteredEvents.length}{" "}
            {filteredEvents.length === 1 ? "Event" : "Events"} Found
          </span>

        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 ? (

          <div className="rounded-3xl border border-dashed border-[#34765A]/25 bg-white/80 px-5 py-20 text-center shadow-sm">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E5F0E6] text-[#34765A]">
              <HeartHandshake size={30} />
            </div>

            <h2 className="mt-5 text-xl font-bold text-[#263B30]">
              {events.length === 0
                ? "No Upcoming Events"
                : "No Events Found"}
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-[#718579]">
              {events.length === 0
                ? "There are no upcoming events right now. Please check back later."
                : "Try another category or search with a different keyword."}
            </p>

            {events.length > 0 && (
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchTerm("");
                }}
                className="mt-6 rounded-full border-[#34765A] px-6 text-[#34765A] hover:bg-[#E5F0E6]"
              >
                Clear Filters
              </Button>
            )}

          </div>

        ) : (

          /* Event Cards */
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">

            {filteredEvents.map((event) => (

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

                  {/* Date Badge */}
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

                  <h2 className="line-clamp-2 min-h-14 text-xl font-extrabold text-[#263B30] transition-colors duration-300 group-hover:text-[#34765A]">
                    {event.eventTitle}
                  </h2>

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

                  {/* View Event Button */}
                  <Link href={`/events/${event._id}`} className="mt-5 block">
                    <Button className="h-11 w-full rounded-xl bg-[#34765A] font-semibold text-white transition-all duration-300 hover:bg-[#285C45]">
                      View Event
                      <ArrowRight
                        size={17}
                        className="ml-2 transition-transform group-hover:translate-x-1"
                      />
                    </Button>
                  </Link>

                </CardContent>

              </Card>

            ))}

          </div>
        )}

        {/* Bottom Message */}
        {filteredEvents.length > 0 && (
          <div className="mt-12 flex flex-col items-center justify-center gap-2 text-center">

            <div className="flex items-center gap-2 text-sm font-semibold text-[#34765A]">
              <Heart size={16} fill="currentColor" />
              Be the reason someone smiles today.
            </div>

            <p className="text-xs text-[#718579]">
              Every small action can create a meaningful change.
            </p>

          </div>
        )}

      </div>
    </main>
  );
};

export default UpcomingEventsPage;
