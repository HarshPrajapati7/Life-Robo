"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import LoadingWave from "../ui/LoadingWave";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = '0';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    }

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [isLoading]);

  useEffect(() => {
    let windowLoaded = false;
    let sceneReady = false;

    const tryFinish = () => {
      if (windowLoaded && sceneReady) {
        setTimeout(() => setIsLoading(false), 200);
      }
    };

    const handleWindowLoad = () => {
      windowLoaded = true;
      // If no 3D scene fires within 500ms after load, proceed anyway
      setTimeout(() => {
        sceneReady = true;
        tryFinish();
      }, 500);
      tryFinish();
    };

    const handleSceneReady = () => {
      sceneReady = true;
      tryFinish();
    };

    if (document.readyState === 'complete') {
      handleWindowLoad();
    }

    window.addEventListener('load', handleWindowLoad);
    window.addEventListener('3d-ready', handleSceneReady);

    // Hard fallback
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

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
