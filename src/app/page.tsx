import dynamic from "next/dynamic";

// Dynamically import the ParallaxComponent to ensure it only runs on the client side
const ParallaxComponent = dynamic(() => import("./components/ParallaxComponent"));
const DomainComponent = dynamic(() => import("./components/DomainComponent"));
const PokemonComponent = dynamic(()=>import('./components/PokemonTimeline'));


export default function Page() {
  return (
    <div>
      <ParallaxComponent />
      <div style={{
        paddingTop: "150px",
        background: "#121212"
      }}></div>
      <DomainComponent/>
      <PokemonComponent/>
    </div>
  );
}