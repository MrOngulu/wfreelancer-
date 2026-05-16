import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedProducts from "./components/FeaturedProducts";
import Store from "./components/Store";
import Spotlights from "./components/Spotlights";
import { Services, Testimonials, Process } from "./components/Sections";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BuyModal from "./components/BuyModal";

function App() {
  const [modal, setModal] = useState(null);
  const openBuy = (product, desc, price) => setModal({ product, desc, price });
  const closeBuy = () => setModal(null);

  return (
    <>
      <Navbar />
      <Hero onBuy={openBuy} />
      <FeaturedProducts onBuy={openBuy} />
      <Store onBuy={openBuy} />
      <Spotlights onBuy={openBuy} />
      <Services />
      <Testimonials />
      <Process />
      <Contact />
      <Footer />
      {modal && (
        <BuyModal
          product={modal.product}
          desc={modal.desc}
          price={modal.price}
          onClose={closeBuy}
        />
      )}
    </>
  );
}

export default App;
