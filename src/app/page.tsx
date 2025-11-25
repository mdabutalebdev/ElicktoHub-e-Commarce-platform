import FeaturesBar from "@/components/FeaturesBar";
import FullShowcase from "@/components/FullShowcase";
import HeroSection from "@/components/HeroSection";
import ProductListing from "@/components/ProductListing";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturesBar />
      <FullShowcase />
      <ProductListing />
    </div>
  );
}
