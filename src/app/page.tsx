import dynamic from "next/dynamic";

// Dynamically import the ParallaxComponent to ensure it only runs on the client side
const ParallaxComponent = dynamic(() => import("./components/ParallaxComponent"));
const DomainComponent = dynamic(() => import("./components/DomainComponent"));
const PokemonComponent = dynamic(()=>import('./components/PokemonTimeline'));
const Sponsors = dynamic(()=>import('./components/Sponsors'));
const Footer = dynamic(()=>import("./components/Footer"));

export default function Page() {
  return (
    <div>
      <ParallaxComponent />
      <div className="hidden md:block pt-36 bg-[#121212]"></div>
      <DomainComponent/>
      <PokemonComponent/>
      <Sponsors/>
      <Footer/>
    </div>
  );
}