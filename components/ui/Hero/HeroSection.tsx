'use client';


export default function HeroSection() {
       return (
        <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
              Aurora Ai
            </h1>
            <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl">
             Your One-Stop Gateway to the Ultimate Unified AI Assistant for All Your Needs.
            </p>
            <div className="mt-12"></div>
            <p className="max-w-2xl mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl text-nowrap items-center justify-center flex">
            "Built a smart chatbot application using Retrieval-Augmented Generation (RAG)            </p>
            <p className="max-w-2xl mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl text-nowrap items-center justify-center flex"> 
            that dynamically processes any provided URL as input, leveraging advanced natural language 
            </p>
            <p className="max-w-2xl mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl text-nowrap items-center justify-center flex">
            understanding to extract relevant information and deliver accurate, context-aware responses 
            </p>
            <p className="max-w-2xl mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl text-nowrap">
            through an intuitive conversational interface."   
              </p>
          </div>
        </div>
    );
  }
