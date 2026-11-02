"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, X } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";

type DeleteEventsPageProps = {
  id: string;
  jwtToken: string;
};

const DeleteEventsPage = ({
  id,
  jwtToken,
}: DeleteEventsPageProps) => {
  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteEvents = async () => {
    if (!jwtToken) {
      toast.error("Authentication token not found. Please login again.");
      return;
    }

    try {
      setIsDeleting(true);

      const res = await fetch(
        `http://localhost:8000/ManageEvents/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(
          result.message || "Failed to delete event!"
        );
      }

      toast.success("Event deleted successfully!");

      router.push("/manage-events");
      router.refresh();

    } catch (error) {
      console.error("Delete Event Error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong!"
      );

    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      {/* DELETE BUTTON */}
      <AlertDialogTrigger
        render={
          <Button
            type="button"
            variant="destructive"
            disabled={isDeleting}
            className="rounded-lg border border-red-600 bg-red-600 text-white hover:border-red-700 hover:bg-red-700 hover:text-white dark:border-red-600 dark:bg-red-600 dark:text-white dark:hover:border-red-700 dark:hover:bg-red-700 dark:hover:text-white"
          >
            <X data-icon="inline-start" />
            Delete
          </Button>
        }
      />

      {/* CONFIRMATION DIALOG */}
      <AlertDialogContent className="border-gray-200 bg-white dark:border-slate-700 dark:bg-slate-900">

        <AlertDialogHeader>
          <AlertDialogTitle className="text-gray-900 dark:text-white">
            Are you absolutely sure?
          </AlertDialogTitle>

          <AlertDialogDescription className="text-gray-600 dark:text-slate-400">
            This action cannot be undone. This will permanently
            delete the event from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          {/* CANCEL BUTTON */}
          <AlertDialogCancel
            disabled={isDeleting}
            className="border-gray-300 bg-white text-gray-700 hover:bg-gray-100 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
          >
            Cancel
          </AlertDialogCancel>

          {/* CONFIRM DELETE BUTTON */}
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDeleteEvents();
            }}
            disabled={isDeleting}
            className="border border-red-500 bg-red-400 text-white hover:border-red-500 hover:bg-red-700 dark:border-red-600 dark:bg-red-600 dark:text-white dark:hover:border-red-600 dark:hover:bg-red-700"
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Continue"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>

      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteEventsPage;