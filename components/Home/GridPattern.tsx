import { cn } from "@/lib/utils";
import GridPattern from "../ui/GridBackground/grid-pattern";

export function TheGridPattern() {
    return <GridPattern
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

}