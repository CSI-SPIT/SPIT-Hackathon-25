import { motion, useScroll, useTransform } from "framer-motion";

interface CardProps {
  src: string;
  alt: string;
  scrollY: any;
  inputRange: [number, number];
  outputRange: [number, number];
  left: string;
}

export default function Card({ src, alt, scrollY, inputRange, outputRange, left }: CardProps) {
  const y = useTransform(scrollY, inputRange, outputRange);

  return (
    <motion.div
      initial={{ y: 100 }}
      style={{
        y,
        width: "200.56px",
        height: "278.52px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        left,
        bottom: -300,
        zIndex: 10,
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
    </motion.div>
  );
}