import "nes.css/css/nes.css";
import dynamic from "next/dynamic";

// Dynamically import the ParallaxComponent to ensure it only runs on the client side
const ParallaxComponent = dynamic(() => import("../components/ParallaxComponent"));

export default function Landing() {
  return (
    <div>
      <ParallaxComponent />
      <div className="h-screen bg-gradient-to-b from-black via-blue-600 to-green-300">
        <p className="nes-text">Green Background Page</p>
      </div>
    </div>
  );
}