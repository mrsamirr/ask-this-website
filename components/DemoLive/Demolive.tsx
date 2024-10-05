import Safari from "../ui/ChatDemo/safari";

export function TheDemo() {
  return (
    <div className="bg-background">
      <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
             Chat Demo
            </h1>
    <div className="relative my-10">
      <Safari  className=" bg-background  h-65 w-full" />
    </div>
    </div>
  );
}
