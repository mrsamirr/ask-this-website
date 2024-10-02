
import Footer from "@/components/ui/Footer";
import GridPattern from "@/components/ui/GridBackground/grid-pattern";
import HeroSection from "@/components/ui/Hero/HeroSection";
import Navbar from "@/components/ui/Navbar";
import { cn } from "@/lib/utils";

export default function Home() {
  return <main >
    <Navbar />
    <div
      className="relative flex h-svh w-full flex-col items-center justify-center overflow-hidden rounded-none  bg-background md:shadow-xl">
      <HeroSection />
      <GridPattern
        squares={[
          [5, 5],
          [5, 1],
          [8, 2],
          [5, 3],
          [5, 5],
          [10, 10],
          [12, 15],
          [15, 10],
          [10, 15],
          [15, 10],
          [10, 15],
          [15, 10],
        ]}
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-50%] h-[200%] skew-y-12",
        )}
      />
    </div>
    <Footer />
  </main>
}
