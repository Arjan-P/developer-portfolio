import { motion } from "motion/react";
import type { ReactNode } from "react";
import { containerVariants, containerViewport } from "@/lib/motion";

interface MotionGridProps {
  children: ReactNode;
  className?: string;
}

export function MotionGrid({ children, className }: MotionGridProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={containerViewport}
      className={className}
    >
      {children}
    </motion.div>
  );
}
