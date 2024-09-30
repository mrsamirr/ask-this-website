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
    const recunstructedUrl = reconstructUrl({ url: params.url as string[] })

    const isAlreadyIndexed = await redis.sismember("indexed-urls", recunstructedUrl)


  if(!isAlreadyIndexed) {
    await ragChat.context.add({
        type: "html",
        source: recunstructedUrl,
        config: { chunkOverlap: 50, chunkSize: 200 }
    })
  }
 
 
    return <p>Page</p>
}

export default Page;