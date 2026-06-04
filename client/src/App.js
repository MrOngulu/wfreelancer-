import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ScrollBackground   from "./components/ScrollBackground";
import Navbar             from "./components/Navbar";
import Hero               from "./components/Hero";
import Narrative          from "./components/Narrative";
import FeaturedProducts   from "./components/FeaturedProducts";
import Store              from "./components/Store";
import Spotlights         from "./components/Spotlights";
import { Services, Testimonials, Process } from "./components/Sections";
import Contact            from "./components/Contact";
import Footer             from "./components/Footer";
import BuyModal           from "./components/BuyModal";
import ProductPage        from "./pages/ProductPage";

const ease = [0.22, 1, 0.36, 1];

function HomePage() {
  const [modal, setModal] = useState(null);
  const openBuy  = (product, desc, price) => setModal({ product, desc, price });
  const closeBuy = () => setModal(null);

  return (
    <>
      {/* Fixed canvas always behind everything */}
      <ScrollBackground />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <Navbar />
        <Hero onBuy={openBuy} />
        <Narrative />
        <FeaturedProducts onBuy={openBuy} />
        <Spotlights onBuy={openBuy} />
        <Store onBuy={openBuy} />
        <Services />
        <Testimonials />
        <Process />
        <Contact />
        <Footer />
        <AnimatePresence>
          {modal && (
            <BuyModal
              product={modal.product}
              desc={modal.desc}
              price={modal.price}
              onClose={closeBuy}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"              element={<HomePage />} />
        <Route path="/product/:slug" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  );
}
