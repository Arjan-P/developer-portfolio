import { useState } from "react";
import { Outlet } from "react-router-dom";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Navbar } from "@/components/Navbar";
import WebGPUBackground from "@/components/WebGPUBackground";
import { PageTransition } from "@/components/PageTransition";

export function PublicLayout() {
  const { scrollY } = useScroll();
  const [shrunk, setShrunk] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const shouldShrink = latest > 50;
    setShrunk(prev => (prev !== shouldShrink ? shouldShrink : prev));
  });

  return (
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

        <PageTransition>
          <Outlet />
        </PageTransition>

        <footer className="footer">
          © 2026
        </footer>
      </div>
  )
}
