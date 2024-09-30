import { ChatWrapper } from "@/components/ChatWrapper";
import { ragChat } from "@/lib/rag-chat";
import { redis } from "@/lib/redis";

interface PageProps {
    params: {
        url: string | string[] | undefined;
    }
}

function reconstructUrl({ url }: { url: string[]}) {
    const decodedComponents = url.map((component) => decodeURIComponent(component));

    return decodedComponents.join("/");
}

const Page = async ({ params }: PageProps) => {
    const reconstructedUrl = reconstructUrl({ url: params.url as string[] })

    const isAlreadyIndexed = await redis.sismember("indexed-urls", reconstructedUrl);

    const sessionId = "mock-session"

    console.log('isAlreadyIndexed', isAlreadyIndexed);


  if(!isAlreadyIndexed) {
    await ragChat.context.add({
        type: "html",
        source: reconstructedUrl,
        config: { chunkOverlap: 50, chunkSize: 200 },
    })

    await redis.sadd("indexed-urls", reconstructedUrl);

  }

 
 
    return <ChatWrapper  sessionId={ sessionId }/>
}

export default Page;