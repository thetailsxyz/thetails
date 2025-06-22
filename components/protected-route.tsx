"use client"

import * as React from "react"
import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { AuthPage } from "./auth/auth-page"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useAuth()
  const [showAuth, setShowAuth] = useState(false)
  const [authDismissed, setAuthDismissed] = useState(false)

  // If user is authenticated, show the app
  if (user) {
    return <>{children}</>
  }

  // If auth was dismissed, show the app without authentication
  if (authDismissed && !showAuth) {
    return <>{children}</>
  }

  // If showAuth is true or auth hasn't been dismissed yet, show auth page
  if (showAuth || !authDismissed) {
    return (
      <AuthPage 
        onClose={() => {
          setShowAuth(false)
          setAuthDismissed(true)
        }} 
      />
    )
  }

  return <>{children}</>
}