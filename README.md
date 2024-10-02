
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) with RAGChat.


# RAG Chat with Upstash

This project is a **Retrieval-Augmented Generation (RAG) Chat** application built using **Upstash** and **LlamaIndex**. It combines a powerful language model with real-time retrieval of external data to generate accurate, context-aware responses.

## Features

-   **Real-time Retrieval**: Retrieve relevant documents from external sources (databases, APIs) using Upstash.
-   **Enhanced Response Generation**: The application uses LlamaIndex to augment the base language model’s capabilities, improving the quality of responses.
-   **WebAssembly Support**: Supports WebAssembly modules (like `tiktoken_bg.wasm`) for faster tokenization and response times.
-   **Deployed on Vercel**: Easily deployed to serverless environments like Vercel, enabling seamless scaling.

## Tech Stack

-   **Frontend**: Next.js,, Tailwind CSS
-   **Backend**: Node.js, Upstash Redis, LlamaIndex
-   **Database**: Upstash Redis, Upstash Vector 
-   **Language Model Integration**:
 LlamaIndex 
└─┬ @upstash/rag-chat@1.6.4
 └── llamaindex@0.5.24
-   **Deployment**: Vercel
## Rag-Chat 
[Rag-Chat](https://upstash.com/docs/vector/sdks/rag-chat/gettingstarted)
[@upstash/rag-chat repo](https://github.com/upstash/rag-chat)

## Installation

1.  Clone the repository:
    `git clone https://github.com/mrsamirr/ask-this-website` 
    
2.  Navigate to the project directory:

    `cd ask-this-website` 
    
3.  Install the dependencies:
    `npm install` 
    or 
    `bun install`
    
4.  Set up environment variables:
    
    -   Create a `.env.local` file in the root directory.
    -   Add your Upstash Redis URL and token:
        
        `UPSTASH_REDIS_REST_URL=your-upstash-url`
        `UPSTASH_REDIS_REST_TOKEN=your-upstash-token` 
        
5.  Build the project:
    `npm run build` 
    
6.  Start the development server:
    
    `npm run dev`
    or
    `bun run dev`

Open [http://localhost:3125](http://localhost:3125) with your browser to see the result.
## Usage

Once the application is running, users can input their queries, and the system will retrieve relevant information from the Upstash Redis database to augment the language model’s responses. The response is a blend of generated text and retrieved facts, ensuring more accurate and relevant answers.

## Deployment

1.  Deploy the application on **Vercel** using the Vercel CLI or the Vercel dashboard.
    
2.  Ensure the environment variables are properly set in Vercel’s dashboard:
    
    -   `UPSTASH_REDIS_REST_URL`
    -   `UPSTASH_REDIS_REST_TOKEN`
3.  The application will automatically handle WebAssembly (`.wasm`) files, like `tiktoken_bg.wasm`, for improved performance.
    

## Troubleshooting

-   **Missing WebAssembly Files**: Ensure that `.wasm` files are properly included in the build. If you encounter issues with `tiktoken_bg.wasm`, check your `next.config.js` file and ensure it includes the correct paths.
-   **Upstash Connection Errors**: Verify that your Upstash Redis URL and token are correct and have the necessary permissions.