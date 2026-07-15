import CategorySection from "./components/CategorySection";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductSection from "./components/ProductSection";
import BrandSection from "./components/BrandSection";
import AboutSection from "./components/AboutSection";
import FeatureSection from "./components/FeatureSection";
import TestimonialSection from "./components/TestimonialSection";

function App() {
  
  return (
    < >
      < Header />
      <main>
        <Hero/>
        <ProductSection/>
        <CategorySection/>
        <BrandSection />
        <AboutSection />
        <FeatureSection />
        <TestimonialSection />
      </main>

      <Footer />
    </>
  );
}

export default App;