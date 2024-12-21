'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Page() {

  //redirect logic because we are not using this page
  const router = useRouter();

  useEffect(()=>{
    router.push('/landing');
  },[router]);

  return (
    <div>
      {/* <motion.div
        initial={{ x: 1200 }}
        animate={{ x: 0 }}
        transition={{ duration: 6 }}
        exit={{ opacity: 0 }}
        style={{
          width: "100px",
          height: "100px",
          backgroundColor: "red",
        }}
      >

      </motion.div> */}
      <h1>Home</h1>
    </div>
  );
}
