import AboutSection from "../components/AboutSection";
import BrandSection from "../components/BrandSection";
import CategorySection from "../components/CategorySection";
import FeatureSection from "../components/FeatureSection";
import Hero from "../components/Hero";
import NewsletterSection from "../components/NewsletterSection";
import ProductSection from "../components/ProductSection";
import TestimonialSection from "../components/TestimonialSection";

function Home() {
  return (
    <>
      <Hero />
      <ProductSection />
      <CategorySection />
      <BrandSection />
      <AboutSection />
      <FeatureSection />
      <TestimonialSection />
      <NewsletterSection />
    </>
  );
}

export default Home;
