
"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import { toast } from "sonner";
import {
  CalendarDays,
  Image as ImageIcon,
  MapPin,
  Tag,
  Type,
  Sparkles,
  Pencil,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const eventTypes = [
  "Donation",
  "Cleanup",
  "Plantation",
  "Winter Relief",
  "Food Driver",
  "Health Camp",
  "Education",
];

export interface EventData {
  _id: string;
  eventTitle: string;
  eventType: string;
  eventDate: string;
  location: string;
  imageUrl: string;
  description: string;
  creatorEmail: string;
  createdAt: string;
}

type EventFormData = Pick<
  EventData,
  | "eventTitle"
  | "eventType"
  | "eventDate"
  | "location"
  | "imageUrl"
  | "description"
>;

interface EditEventPageProps {
  event: EventData;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdated: (updatedEvent: EventData) => void;
  jwtToken: string | null;
}

const EditEventPage = ({
  event,
  open,
  onOpenChange,
  onUpdated,
  jwtToken,
}: EditEventPageProps) => {
  const getInitialFormData = (): EventFormData => ({
    eventTitle: event.eventTitle || "",
    eventType: event.eventType || "",
    eventDate: event.eventDate
      ? event.eventDate.slice(0, 10)
      : "",
    location: event.location || "",
    imageUrl: event.imageUrl || "",
    description: event.description || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<EventFormData>(
    getInitialFormData
  );

  const [originalEventDate, setOriginalEventDate] = useState(
    event.eventDate ? event.eventDate.slice(0, 10) : ""
  );

  // Dialog Open / Close
  const handleDialogChange = (isOpen: boolean) => {
    if (isOpen) {
      const initialData = getInitialFormData();

      setFormData(initialData);
      setOriginalEventDate(initialData.eventDate);
    }

    onOpenChange(isOpen);
  };

  // Input Change
  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update Event
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // JWT Validation
    if (!jwtToken) {
      toast.error("Authentication required. Please login again.");
      return;
    }

    // Date Validation
    if (formData.eventDate !== originalEventDate) {
      const tomorrowDate = new Date();
      tomorrowDate.setDate(tomorrowDate.getDate() + 1);

      const year = tomorrowDate.getFullYear();
      const month = String(tomorrowDate.getMonth() + 1).padStart(2, "0");
      const day = String(tomorrowDate.getDate()).padStart(2, "0");

      const tomorrow = `${year}-${month}-${day}`;

      if (formData.eventDate < tomorrow) {
        toast.error("Please select a future date!");
        return;
      }
    }

    try {
      setIsSubmitting(true);

      const response = await fetch(
        `https://kind-nest-server-j7a2.vercel.app/ManageEvents/${event._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update event");
      }

      // Updated Event Data
      const updatedEvent: EventData = {
        ...event,
        ...formData,
      };

      // Update Details Page Data
      onUpdated(updatedEvent);

      // Success Toast
      toast.success("Event updated successfully!");

      // Close Edit Dialog
      onOpenChange(false);

    } catch (error) {
      console.error("Update Event Error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong!"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl border-[#e2eae3] bg-[#f8faf7] sm:max-w-xl">

        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold text-[#263b30]">
            <Pencil className="h-5 w-5 text-[#34765a]" />
            Edit Your Event
          </DialogTitle>

          <DialogDescription className="text-[#78877d]">
            Update your event information and save your changes.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 pt-3">

          {/* Event Title */}
          <div className="space-y-2">
            <label className="flex items-center gap-1 text-sm font-semibold text-[#263b30]">
              <Type size={15} />
              Event Title <span className="text-red-500">*</span>
            </label>

            <Input
              name="eventTitle"
              placeholder="Enter your event title"
              value={formData.eventTitle}
              onChange={handleChange}
              required
              className="h-11 rounded-xl border-[#e2eae3] bg-white"
            />
          </div>

          {/* Event Type & Date */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            <div className="space-y-2">
              <label className="flex items-center gap-1 text-sm font-semibold text-[#263b30]">
                <Tag size={15} />
                Event Type <span className="text-red-500">*</span>
              </label>

              <select
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                required
                className="h-11 w-full rounded-xl border border-[#e2eae3] bg-white px-3 text-sm outline-none focus:border-[#34765a] focus:ring-2 focus:ring-[#eaf3ec]"
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
              <label className="flex items-center gap-1 text-sm font-semibold text-[#263b30]">
                <CalendarDays size={15} />
                Event Date <span className="text-red-500">*</span>
              </label>

              <Input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                required
                className="h-11 rounded-xl border-[#e2eae3] bg-white"
              />

              <p className="text-[11px] text-[#91a096]">
                If you change the date, select a future date.
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label className="flex items-center gap-1 text-sm font-semibold text-[#263b30]">
              <MapPin size={15} />
              Location / Venue <span className="text-red-500">*</span>
            </label>

            <Input
              name="location"
              placeholder="Enter event location"
              value={formData.location}
              onChange={handleChange}
              required
              className="h-11 rounded-xl border-[#e2eae3] bg-white"
            />
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <label className="flex items-center gap-1 text-sm font-semibold text-[#263b30]">
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
              className="h-11 rounded-xl border-[#e2eae3] bg-white"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#263b30]">
              Event Description <span className="text-red-500">*</span>
            </label>

            <Textarea
              name="description"
              placeholder="Describe your community event..."
              value={formData.description}
              onChange={handleChange}
              required
              className="min-h-32 resize-y rounded-xl border-[#e2eae3] bg-white"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full rounded-xl bg-[#34765a] text-base font-semibold text-white shadow-sm transition hover:bg-[#285c45]"
          >
            <Sparkles size={17} className="mr-2" />

            {isSubmitting ? "Updating Event..." : "Update Event"}
          </Button>

          <p className="text-center text-xs text-[#91a096]">
            Make a difference in your community with KindNest.
          </p>

        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditEventPage;
