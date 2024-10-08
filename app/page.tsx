
import { TheDemo } from "@/components/DemoLive/Demolive";
import { Reviews } from "@/components/Reviews/Review";
import Footer from "@/components/ui/Footer";
import HeroSection from "@/components/ui/Hero/HeroSection";
import Navbar from "@/components/ui/Navbar";
import { TheAnimatedShinyText } from "@/components/ui/Animations/TheInterface";
import BentoComponent from "@/components/ui/Bento";
import { TheGridPattern } from "@/components/Home/GridPattern";

export default function Home() {
  return <main className="bg-background">
    <Navbar />
    <div
      className="relative flex h-svh w-full flex-col items-center justify-center overflow-hidden rounded-none  bg-background md:shadow-xl sm:shadow-2xl">
      <TheAnimatedShinyText />
      <HeroSection />
      <TheGridPattern />
    </div>
    <TheDemo />
    <BentoComponent />
    <Reviews />
    <Footer />
  </main>
}
