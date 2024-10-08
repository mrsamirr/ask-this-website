'use client';

import AnimationContainer from "../Animations/animation-container";
import TypingAnimation from "../Animations/typing-animation";


export default function HeroSection() {
  return (
    <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
      <div className="sm:flex sm:flex-col sm:align-center sm:justify-center">
        <AnimationContainer delay={0.1}>
          <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl md:text-center md:text-5xl sm:justify-center ">
            Aurora Ai
          </h1>
        </AnimationContainer>
        <AnimationContainer delay={0.1}>
          <TypingAnimation
            className=" max-w-2xl m-auto mt-5 text-xl text-blue-300 sm:text-center sm:text-2xl font-semibold md:text-center md:text-3xl"
            text="Your One-Stop Gateway to the Ultimate Unified AI Assistant for All Your Needs."
          />
        </AnimationContainer>
        <div className="mt-12"></div>
        <AnimationContainer delay={0.1}>
          <p className="max-w-2xl mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl text-nowrap items-center justify-center flex">
            &apos;Built a smart chatbot application using Retrieval-Augmented Generation (RAG)            </p>
          <p className="max-w-2xl mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl text-nowrap items-center justify-center flex">
            that dynamically processes any provided URL as input, leveraging advanced natural language
          </p>
          <p className="max-w-2xl mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl text-nowrap items-center justify-center flex">
            understanding to extract relevant information and deliver accurate, context-aware responses
          </p>
          <p className="max-w-2xl mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl text-nowrap items-center justify-center flex">
            through an intuitive conversational interface.&apos;
          </p>
        </AnimationContainer>
      </div>
    </div>
  );
}
