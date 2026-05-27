export const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

export const containerViewport = { once: false } as const;
