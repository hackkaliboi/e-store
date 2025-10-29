"use client"

import { AuthProvider } from "@/context/auth-context"
import { ReactNode } from "react"

export function ClientAuthProvider({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
}