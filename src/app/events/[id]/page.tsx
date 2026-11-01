
import { Suspense } from "react";
import EventDetailsContent from "./EventDetailsContent";

const EventDetailsPage = () => {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#f8faf7]">
          <p className="text-sm font-medium text-[#34765a]">
            Loading event details...
          </p>
        </main>
      }
    >
      <EventDetailsContent />
    </Suspense>
  );
};

export default EventDetailsPage;

