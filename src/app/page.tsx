import Banner from "@/components/Banner";
import Features from "@/components/Features";
import Newsletter from "@/components/Newsletter";
import RecentUpcomingEvents from "@/components/RecentUpcomingEvents";


export default function Home() {
  return (
    <>
      <Banner />

      <Features />
      <RecentUpcomingEvents />

      <Newsletter />
    </>
  );
}
