import CategorySection from "./components/CategorySection";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductSection from "./components/ProductSection";

function App() {
  
  return (
    < >
      < Header />
      <main>
        <Hero/>
        <ProductSection/>
        <CategorySection/>
      </main>

      <Footer />
    </>
  );
}

export default App;