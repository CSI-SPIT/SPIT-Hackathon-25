import { motion, useTransform, MotionValue } from "framer-motion";
import Image from 'next/image';

interface CardProps {
  src: string;
  alt: string;
  scrollY: MotionValue<number>;
  inputRange: [number, number];
  outputRange: [number, number];
  left: string;
}

const Card: React.FC<CardProps> = ({ src, alt, scrollY, inputRange, outputRange, left }) => {
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
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vw"
        style={{
          objectFit: "contain"
        }} />
    </motion.div>
  );
};

export default Card;