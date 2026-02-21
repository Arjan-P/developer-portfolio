import { matchPath, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const isBlog = matchPath("/blog", location.pathname);
  const isPost = matchPath("/blog/:id", location.pathname);

  // Disable fade for blog <-> post
  const disableFade = isBlog || isPost;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="container main-content"
        key={location.pathname}
        initial={disableFade ? false : { opacity: 0, y: 12 }}
        animate={disableFade ? {} : { opacity: 1, y: 0 }}
        exit={disableFade ? {} : { opacity: 0, y: -12 }}
        transition={{ duration: 0.4 }}
        style={{ height: "100%" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
