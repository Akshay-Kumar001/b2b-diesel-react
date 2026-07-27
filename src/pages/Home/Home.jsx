import AboutSection from "./component/AboutSection";
import BrandSection from "./component/BrandSection";
import CategorySection from "./component/CategorySection";
import FeatureSection from "./component/FeatureSection";
import Hero from "./component/Hero";
import NewsletterSection from "../../components/NewsletterSection";
import ProductSection from "./component/ProductSection";
import TestimonialSection from "./component/TestimonialSection";

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
