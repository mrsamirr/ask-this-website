import AnimationContainer from "../ui/Animations/animation-container";
import Safari from "../ui/ChatDemo/safari";

export function TheDemo() {
  return (
    <div className="bg-background">
      <AnimationContainer delay={0.1}>
        <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
          Chat Demo
        </h1>
      </AnimationContainer>
      <div className="relative my-10">
        <AnimationContainer delay={0.1}>
          <Safari className=" bg-background  h-65 w-full" />
        </AnimationContainer>

      </div>
    </div>
  );
}
