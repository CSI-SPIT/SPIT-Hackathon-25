
import { motion } from "framer-motion";


export default function Page() {
  return (
    <div>
      < motion.div
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        transition={{ duration: 2 }}
        exit={{ opacity: 0 }}
        style={{
          width: "100px",
          height: "100px",
          backgroundColor: "red",
        }}
       >

      </ motion.div>
      <h1>Home</h1>
    </div>
  );
}
