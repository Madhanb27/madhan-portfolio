import Navigation from "@/components/ui/Navigation";
import Hero from "@/components/sections/Hero";
import MyStory from "@/components/sections/MyStory";
import SelectedWork from "@/components/sections/SelectedWork";
import HowIThink from "@/components/sections/HowIThink";
import WhatIBring from "@/components/sections/WhatIBring";
import FinalScene from "@/components/sections/FinalScene";

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <MyStory />
      <SelectedWork />
      <HowIThink />
      <WhatIBring />
      <FinalScene />
    </main>
  );
}
