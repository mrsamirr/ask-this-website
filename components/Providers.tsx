"use client"

import { NextUIProvider } from "@nextui-org/react"
import { PropsWithChildren } from "react"

export const Providers = ({ children }: PropsWithChildren) => {
    return <NextUIProvider>
        {children}
    </NextUIProvider>
}