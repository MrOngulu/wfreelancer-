import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import ScrollBackground from "./components/ScrollBackground";
import StickySection   from "./components/StickySection";
import Navbar          from "./components/Navbar";
import Hero            from "./components/Hero";
import Narrative       from "./components/Narrative";
import FeaturedProducts from "./components/FeaturedProducts";
import Store           from "./components/Store";
import Spotlights      from "./components/Spotlights";
import { Services, Testimonials, Process } from "./components/Sections";
import Contact         from "./components/Contact";
import Footer          from "./components/Footer";
import BuyModal        from "./components/BuyModal";
import ProductPage     from "./pages/ProductPage";

// How long each sticky section "holds" while scrolling through it.
// Larger = more scroll travel per section = more cinematic feel.
const HEIGHTS = [
  '220vh',  // 0 Hero       — extra long, first impression
  '180vh',  // 1 Narrative
  '200vh',  // 2 Products
  '200vh',  // 3 Spotlights (two sub-sections)
  '180vh',  // 4 Store
  '180vh',  // 5 Services
  '160vh',  // 6 Testimonials
  '160vh',  // 7 Process
  '180vh',  // 8 Contact
];

function HomePage() {
  const [modal, setModal] = useState(null);
  const openBuy = (product, desc, price) => setModal({ product, desc, price });
  const closeBuy = () => setModal(null);

  return (
    <>
      {/* ── Fixed WebGL background — morphs as you scroll ── */}
      <ScrollBackground />

      {/* ── Fixed Navbar — always on top ── */}
      <Navbar />

      {/* ── Stacked sticky sections ── */}
      <StickySection index={0} total={9} scrollHeight={HEIGHTS[0]} id="home-wrap">
        <Hero onBuy={openBuy} />
      </StickySection>

      <StickySection index={1} total={9} scrollHeight={HEIGHTS[1]}>
        <Narrative />
      </StickySection>

      <StickySection index={2} total={9} scrollHeight={HEIGHTS[2]}>
        <FeaturedProducts onBuy={openBuy} />
      </StickySection>

      {/* Spotlights is two full sections — give it extra height */}
      <StickySection index={3} total={9} scrollHeight={HEIGHTS[3]}>
        <Spotlights onBuy={openBuy} />
      </StickySection>

      <StickySection index={4} total={9} scrollHeight={HEIGHTS[4]}>
        <Store onBuy={openBuy} />
      </StickySection>

      <StickySection index={5} total={9} scrollHeight={HEIGHTS[5]}>
        <Services />
      </StickySection>

      <StickySection index={6} total={9} scrollHeight={HEIGHTS[6]}>
        <Testimonials />
      </StickySection>

      <StickySection index={7} total={9} scrollHeight={HEIGHTS[7]}>
        <Process />
      </StickySection>

      <StickySection index={8} total={9} scrollHeight={HEIGHTS[8]}>
        <Contact />
      </StickySection>

      {/* ── Footer — normal flow after all sticky sections ── */}
      <Footer />

      {/* ── Buy modal ── */}
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
