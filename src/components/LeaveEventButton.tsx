
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Loader2, LogOut } from "lucide-react";

interface Props {
  eventId: string;
  onLeaveSuccess: () => void;
}

export default function LeaveEventButton({
  eventId,
  onLeaveSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleLeave = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to leave this event?"
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      const { data, error } = await authClient.token();

      if (error || !data?.token) {
        throw new Error("JWT token not found. Please login again.");
      }

      const response = await fetch(
        `http://localhost:8000/leave-event/${eventId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to leave event."
        );
      }

      toast.success("You have successfully left this event!");

      onLeaveSuccess();
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLeave}
      disabled={loading}
      className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 text-sm font-semibold text-red-600 transition-all duration-300 hover:border-red-300 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? (
        <>
          <Loader2 size={17} className="animate-spin" />
          Leaving...
        </>
      ) : (
        <>
          <LogOut size={17} />
          Leave Event
        </>
      )}
    </button>
  );
}
