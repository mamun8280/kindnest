import Banner from "@/components/Banner";
import Features from "@/components/Features";
import Newsletter from "@/components/Newsletter";
import UpcomingEventsPage from "./upcoming-events/page";

export default function Home() {
  return (
    <>
      <Banner />

      <Features />
      <UpcomingEventsPage/>

      <Newsletter />
    </>
  );
}
