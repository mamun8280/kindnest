
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
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

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

  useEffect(() => {
    let cancelled = false;

    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/upcoming-events",
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

  const formatDate = (date: string) => {
    return new Date(
      `${date.slice(0, 10)}T00:00:00`
    ).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
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
    <main className="min-h-screen bg-[#f8faf7] px-4 py-10 sm:py-12">
      <div className="mx-auto max-w-6xl">

        {/* Page Heading */}
        <div className="border-b border-[#e5ece6] pb-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#eaf3ec] px-3 py-1.5 text-xs font-semibold text-[#34765a]">
                <CalendarDays size={14} />
                Future Community Drives
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-[#263b30] sm:text-4xl">
                Upcoming Events
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#718077]">
                Discover verified volunteer initiatives scheduled
                for upcoming dates. Past events are automatically
                excluded so you can focus on active drives that
                need support.
              </p>
            </div>

            <Link href="/create-event">
              <Button className="h-11 w-full rounded-xl bg-[#0d9488] px-5 font-semibold text-white shadow-sm transition hover:bg-[#0f766e] sm:w-auto">
                <PlusCircle size={17} className="mr-2" />
                Create Event
              </Button>
            </Link>

          </div>
        </div>

        {/* Category Tabs and Search */}
        <div className="flex flex-col gap-4 py-7 lg:flex-row lg:items-center lg:justify-between">

          {/* Category Tabs */}
          <Tabs
            value={selectedCategory}
            onValueChange={setSelectedCategory}
            className="w-full lg:w-auto"
          >
            <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 bg-transparent p-0 lg:w-auto">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="rounded-full border border-[#e5ece6] bg-white px-3.5 py-2 text-xs font-semibold text-[#66756c] shadow-none transition data-[state=active]:border-[#0d9488] data-[state=active]:bg-[#0d9488] data-[state=active]:text-white data-[state=active]:shadow-sm"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Search Bar */}
          <div className="relative w-full lg:max-w-64">
            <Search
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#87948b]"
            />

            <Input
              type="search"
              placeholder="Search events or areas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-11 rounded-xl border-[#e1e9e2] bg-white pl-10 text-sm shadow-sm placeholder:text-[#9aa59e] focus-visible:ring-[#34765a]"
            />
          </div>

        </div>

        {/* Results Count */}
        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm text-[#718077]">
            Showing{" "}
            <span className="font-semibold text-[#263b30]">
              {filteredEvents.length}
            </span>{" "}
            {filteredEvents.length === 1 ? "event" : "events"}
          </p>
        </div>

        {/* Events */}
        {filteredEvents.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[#e5ece6] bg-white px-5 py-16 text-center">

            <HeartHandshake className="mx-auto h-12 w-12 text-[#b8c9bc]" />

            <h2 className="mt-4 text-xl font-bold text-[#263b30]">
              {events.length === 0
                ? "No Upcoming Events"
                : "No Events Found"}
            </h2>

            <p className="mt-2 text-sm text-[#718077]">
              {events.length === 0
                ? "There are no upcoming events right now."
                : "Try another category or search with a different keyword."}
            </p>

            {events.length > 0 && (
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchTerm("");
                }}
                className="mt-5 rounded-xl border-[#34765a] text-[#34765a] hover:bg-[#eaf3ec]"
              >
                Clear Filters
              </Button>
            )}

          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {filteredEvents.map((event) => (
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
                        className="shrink-0 text-[#34765a]"
                      />
                      {formatDate(event.eventDate)}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-[#718077]">
                      <MapPin
                        size={17}
                        className="shrink-0 text-[#34765a]"
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
