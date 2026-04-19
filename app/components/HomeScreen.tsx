"use client";

import React, { useState, useEffect } from "react";
import { AuroraHero } from "./AuroraHero";
import LoadingScreen from "./LoadingScreen";
import MovingBackground from "./MovingBackground";
import { AnimatePresence, motion } from "framer-motion";

const HomeScreen = () => {
  const [loading, setLoading] = useState(true);

  // Prevent scrolling while loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <main className="min-h-screen w-full overflow-x-clip bg-[#06060c] text-white relative">
        <MovingBackground />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: loading ? 0 : 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-10"
        >
          <AuroraHero />
        </motion.div>
      </main>
    </>
  );
};

export default HomeScreen;
