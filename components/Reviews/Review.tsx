"use client"
import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/Reviews/review";
import { reviews } from "@/data/review";
import AnimationContainer from "../ui/Animations/animation-container";


const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
    img,
    name,
    username,
    body,
    live
}: {
    img: string;
    name: string;
    username: string;
    body: string;
    live: string;
}) => {
    return (
        <figure
            className={cn(
                "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
                // light styles
                "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                // dark styles
                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
            )}
        >
            <div className="flex flex-row items-center gap-2">
                <img className="rounded-full" width="32" height="32" alt="" src={img} />
                <div className="flex flex-col">
                    <figcaption className="text-sm font-medium dark:text-white">
                        <a href={live} target="_blank" rel="noopener noreferrer">
                            {name}
                        </a>
                    </figcaption>
                    <p className="text-xs font-medium dark:text-white/40 p-2">{username}</p>
                </div>
            </div>
            <blockquote className="mt-2 text-sm">{body}</blockquote>
        </figure>
    );
};

export function Reviews() {
    return (
        <div className="mt-10">
            <AnimationContainer delay={0.1}>
                <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
                    Our Reviews
                </h1>
            </AnimationContainer>
            <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden bg-background md:shadow-xl">
                <AnimationContainer delay={0.1}>
                    <Marquee pauseOnHover className="[--duration:20s]">
                        {firstRow.map((review) => (
                            <ReviewCard key={review.username} {...review} />
                        ))}
                    </Marquee>
                </AnimationContainer>
                <AnimationContainer delay={0.1}>
                    <Marquee reverse pauseOnHover className="[--duration:20s]">
                        {secondRow.map((review) => (
                            <ReviewCard key={review.username} {...review} />
                        ))}
                    </Marquee>
                </AnimationContainer>
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
            </div>
        </div>
    );
}
