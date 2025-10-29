"use client"

import { usePathname } from "next/navigation"
import { Header } from "@/components/header"

export function ConditionalHeader() {
    const pathname = usePathname()

    // Don't show header on admin routes
    if (pathname?.startsWith("/admin")) {
        return null
    }

    return <Header />
}