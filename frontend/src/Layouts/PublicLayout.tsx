import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, LayoutGroup, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Navbar } from "@/components/Navbar";
import WebGPUBackground from "@/components/WebGPUBackground";
import { useState } from "react";

export function PublicLayout() {
  const location = useLocation();
  const { scrollY } = useScroll();
  const [shrunk, setShrunk] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const shouldShrink = latest > 50;
    setShrunk(prev => (prev !== shouldShrink ? shouldShrink : prev));
  });

  return (
    <LayoutGroup>
      <div className="layout">
        <WebGPUBackground />
        <motion.header className="navbar-wrapper">
          <motion.div
            className="glass no-hover w-full p-3"
            animate={{
              maxWidth: shrunk ? "400px" : "1100px"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Navbar />
          </motion.div>
        </motion.header>

        <AnimatePresence mode="wait">
          <motion.div
            className="container main-content"
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{ height: "100%" }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>

        <footer className="footer">
          © 2026
        </footer>
      </div>
    </LayoutGroup>
  )
}
