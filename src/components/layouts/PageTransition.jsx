import { motion } from "framer-motion";

const transition = {
  duration: 0.55,
  ease: [0.16, 1, 0.3, 1],
};

export default function PageTransition({ children }) {
  return (
    <motion.main
      initial={{
        opacity: 0,
        y: 35,
        scale: 0.985,
        filter: "blur(10px)",
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      exit={{
        opacity: 0,
        y: -35,
        scale: 0.985,
        filter: "blur(10px)",
      }}
      transition={transition}
      style={{ willChange: "transform, opacity, filter" }}
    >
      {children}
    </motion.main>
  );
}