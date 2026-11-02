
import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import EventDetailsContent from "./EventDetailsContent";

type Props = {
  params: Promise<{ id: string }>;
};

// Authentication and token fetching
const EventDetailsData = async ({ params }: Props) => {
  const { id } = await params;

  const jwtToken = await auth.api.getToken({
    headers: await headers(),
  });

  return (
    <EventDetailsContent
      id={id}
      jwtToken={jwtToken?.token ?? null}
    />
  );
};

const EventDetailsPage = (props: Props) => {
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
      <EventDetailsData {...props} />
    </Suspense>
  );
};

export default EventDetailsPage;
