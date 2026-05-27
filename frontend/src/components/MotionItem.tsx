import { motion } from "motion/react";
import type { ReactNode } from "react";

import { cardVariants } from "@/lib/motion";

interface MotionItemProps {
  children: ReactNode;
  className?: string;
}

export function MotionItem({ children, className }: MotionItemProps) {
  return (
    <motion.div
      variants={cardVariants}
      transition={{ duration: 0.5 }}
      viewport={{ margin: "-100px", amount: 0.3, once: false }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
