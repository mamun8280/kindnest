import Banner from "@/components/Banner";
import Features from "@/components/Features";
import GallerySection from "@/components/GallerySection";
import Newsletter from "@/components/Newsletter";
import RecentUpcomingEvents from "@/components/RecentUpcomingEvents";


export default function Home() {
  return (
    <>
      <Banner />

      <Features />
      <RecentUpcomingEvents />
      <GallerySection />
      <Newsletter />
    </>
  );
}
