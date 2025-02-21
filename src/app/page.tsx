import ParallaxComponent from "./components/ParallaxComponent";
import DomainComponent from "./components/DomainComponent";
import PokemonComponent from './components/PokemonTimeline';
import Sponsors from './components/Sponsors';
import Footer from "./components/Footer";

export default function Page() {
  return (
    <div>
      <ParallaxComponent />
      <div className="hidden md:block pt-36 bg-[#121212]"></div>
      <DomainComponent />
      <PokemonComponent />
      <Sponsors />
      <Footer />
    </div>
  );
}