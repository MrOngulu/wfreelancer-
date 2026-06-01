import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import ScrollBackground  from "./components/ScrollBackground";
import StickySection     from "./components/StickySection";
import Navbar            from "./components/Navbar";
import Hero              from "./components/Hero";
import Narrative         from "./components/Narrative";
import FeaturedProducts  from "./components/FeaturedProducts";
import Store             from "./components/Store";
import Spotlights        from "./components/Spotlights";
import { Services, Testimonials, Process } from "./components/Sections";
import Contact           from "./components/Contact";
import Footer            from "./components/Footer";
import BuyModal          from "./components/BuyModal";
import ProductPage       from "./pages/ProductPage";

// 120vh = very fast transition, section fills screen almost immediately
// 130vh = slightly more breathing room for content-heavy sections
const HEIGHTS = [
  '130vh',  // Hero
  '120vh',  // Narrative
  '130vh',  // Featured Products
  '130vh',  // Spotlights
  '130vh',  // Store
  '125vh',  // Services
  '120vh',  // Testimonials
  '120vh',  // Process
  '125vh',  // Contact
];

function HomePage() {
  const [modal, setModal] = useState(null);
  const openBuy  = (product, desc, price) => setModal({ product, desc, price });
  const closeBuy = () => setModal(null);

  return (
    <>
      <ScrollBackground />
      <Navbar />

      <StickySection index={0} scrollHeight={HEIGHTS[0]} id="home-wrap">
        <Hero onBuy={openBuy} />
      </StickySection>
      <StickySection index={1} scrollHeight={HEIGHTS[1]}>
        <Narrative />
      </StickySection>
      <StickySection index={2} scrollHeight={HEIGHTS[2]}>
        <FeaturedProducts onBuy={openBuy} />
      </StickySection>
      <StickySection index={3} scrollHeight={HEIGHTS[3]}>
        <Spotlights onBuy={openBuy} />
      </StickySection>
      <StickySection index={4} scrollHeight={HEIGHTS[4]}>
        <Store onBuy={openBuy} />
      </StickySection>
      <StickySection index={5} scrollHeight={HEIGHTS[5]}>
        <Services />
      </StickySection>
      <StickySection index={6} scrollHeight={HEIGHTS[6]}>
        <Testimonials />
      </StickySection>
      <StickySection index={7} scrollHeight={HEIGHTS[7]}>
        <Process />
      </StickySection>
      <StickySection index={8} scrollHeight={HEIGHTS[8]}>
        <Contact />
      </StickySection>

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
