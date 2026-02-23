import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";

export function PageTransition({children}: {children: ReactNode}) {
  
  const location = useLocation();
  return (
    
        <AnimatePresence mode="wait">
          <motion.div
            className="container main-content"
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{ height: "100%" }}
          >
          {children}
          </motion.div>
        </AnimatePresence>
  )
}
