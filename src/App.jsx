import CategorySection from "./components/CategorySection";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductSection from "./components/ProductSection";
import BrandSection from "./components/BrandSection";

function App() {
  
  return (
    < >
      < Header />
      <main>
        <Hero/>
        <ProductSection/>
        <CategorySection/>
        <BrandSection />
      </main>

      <Footer />
    </>
  );
}

export default App;