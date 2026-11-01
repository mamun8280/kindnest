
"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import {
  ArrowLeft,
  CalendarDays,
  Image as ImageIcon,
  MapPin,
  Tag,
  Type,
  Sparkles,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const eventTypes = [
  "Donation",
  "Cleanup",
  "Plantation",
  "Winter Relief",
  "Food Driver",
  "Health Camp",
  "Education",
];

const CreateEventPage = () => {
  const router = useRouter();
  const dateInputRef = useRef<HTMLInputElement>(null);

  const { data: session, isPending } = authClient.useSession();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    eventTitle: "",
    eventType: "",
    eventDate: "",
    location: "",
    imageUrl: "",
    description: "",
  });

  // Protect this page: login required
  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login?callbackURL=/create-event");
    }
  }, [isPending, session, router]);

  // Only future dates are allowed (tomorrow onwards)
  useEffect(() => {
    const date = new Date();

    date.setDate(date.getDate() + 1);

    const tomorrow = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split("T")[0];

    if (dateInputRef.current) {
      dateInputRef.current.min = tomorrow;
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!session?.user?.email) {
      toast.error("Please login before creating an event!");
      router.replace("/login?callbackURL=/create-event");
      return;
    }

    // Validate future date again before submitting
    const date = new Date();
    date.setDate(date.getDate() + 1);

    const tomorrow = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split("T")[0];

    if (formData.eventDate < tomorrow) {
      toast.error("Please select a future date!");
      return;
    }

    const eventData = {
      ...formData,
      creatorEmail: session.user.email,
      createdAt: new Date().toISOString(),
    };

    try {
      setIsSubmitting(true);

      const response = await fetch("http://localhost:8000/create-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to create event");
      }
      toast.success("Event created successfully!");

      setFormData({
        eventTitle: "",
        eventType: "",
        eventDate: "",
        location: "",
        imageUrl: "",
        description: "",
      });

      router.push("/upcoming-events");
      router.refresh();
    } catch (error) {
      console.error("Create Event Error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong!"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isPending || !session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f8fa]">
        <p className="text-sm font-medium text-emerald-700">
          Checking authentication...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f8fa] px-4 py-10">
      <div className="mx-auto max-w-130">

        <Link
          href="/upcoming-events"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-emerald-700"
        >
          <ArrowLeft size={16} />
          Back to Upcoming Events
        </Link>

        <Card className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
          <CardContent className="p-6 sm:p-8">

            <div className="mb-7">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                <Sparkles size={13} />
                Social Service Drive
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Create a Community Event
              </h1>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Organize a local relief effort, environmental cleanup, or
                community support drive.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Event Title */}
              <div className="space-y-2">
                <label className="flex items-center gap-1 text-sm font-semibold text-gray-800">
                  <Type size={15} />
                  Event Title <span className="text-red-500">*</span>
                </label>

                <Input
                  name="eventTitle"
                  placeholder="Enter your event title"
                  value={formData.eventTitle}
                  onChange={handleChange}
                  required
                  className="h-11 rounded-xl bg-gray-50"
                />
              </div>

              {/* Event Type and Date */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div className="space-y-2">
                  <label className="flex items-center gap-1 text-sm font-semibold text-gray-800">
                    <Tag size={15} />
                    Event Type <span className="text-red-500">*</span>
                  </label>

                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    required
                    className="h-11 w-full rounded-xl border border-input bg-gray-50 px-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  >
                    <option value="">Select Event Type</option>

                    {eventTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-1 text-sm font-semibold text-gray-800">
                    <CalendarDays size={15} />
                    Event Date <span className="text-red-500">*</span>
                  </label>

                  <Input
                    ref={dateInputRef}
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    required
                    className="h-11 rounded-xl bg-gray-50"
                  />

                  <p className="text-[11px] text-gray-400">
                    Select a future date.
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="flex items-center gap-1 text-sm font-semibold text-gray-800">
                  <MapPin size={15} />
                  Location / Venue <span className="text-red-500">*</span>
                </label>

                <Input
                  name="location"
                  placeholder="Enter event location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="h-11 rounded-xl bg-gray-50"
                />
              </div>

              {/* Image URL */}
              <div className="space-y-2">
                <label className="flex items-center gap-1 text-sm font-semibold text-gray-800">
                  <ImageIcon size={15} />
                  Thumbnail Image URL <span className="text-red-500">*</span>
                </label>

                <Input
                  type="url"
                  name="imageUrl"
                  placeholder="https://example.com/image.jpg"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  required
                  className="h-11 rounded-xl bg-gray-50"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800">
                  Event Description <span className="text-red-500">*</span>
                </label>

                <Textarea
                  name="description"
                  placeholder="Describe your community event, its purpose and activities..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="min-h-32 resize-y rounded-xl bg-gray-50"
                />
              </div>

              {/* Publish Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-12 w-full rounded-xl bg-emerald-600 text-base font-semibold text-white shadow-sm transition hover:bg-emerald-700"
              >
                <Sparkles size={17} className="mr-2" />
                {isSubmitting ? "Publishing Event..." : "Publish Event"}
              </Button>

              <p className="text-center text-xs text-gray-400">
                Make a difference in your community with KindNest.
              </p>

            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default CreateEventPage;
