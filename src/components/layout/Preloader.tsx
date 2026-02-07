"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import LoadingWave from "../ui/LoadingWave";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  useEffect(() => {
    let isWindowLoaded = false;
    let isSceneReady = false;

    const checkReady = () => {
        if (isWindowLoaded && isSceneReady) {
            setTimeout(() => setIsLoading(false), 800);
        }
    };

    const handleWindowLoad = () => {
      isWindowLoaded = true;
      checkReady();
    };

    const handleSceneReady = () => {
        isSceneReady = true;
        checkReady();
    };

    const timeout = setTimeout(() => {
        isSceneReady = true;
        checkReady();
    }, 5000);

    window.addEventListener('load', handleWindowLoad);
    window.addEventListener('3d-ready', handleSceneReady);

    if (document.readyState === 'complete') {
      handleWindowLoad();
    }

    return () => {
      window.removeEventListener('load', handleWindowLoad);
      window.removeEventListener('3d-ready', handleSceneReady);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: "easeInOut" }
          }}
          className="fixed inset-0 z-[100] bg-[#030305] flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-cyber-grid opacity-5 pointer-events-none" />
          <LoadingWave size="md" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
