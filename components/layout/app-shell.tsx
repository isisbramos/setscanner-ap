"use client"

import { TopAppBar } from "./top-app-bar"
import { BottomNavBar } from "./bottom-nav-bar"
import { ReactNode } from "react"

interface AppShellProps {
  children: ReactNode
  showTopBar?: boolean
  showBottomNav?: boolean
  topBarTitle?: string
}

export function AppShell({ 
  children, 
  showTopBar = true, 
  showBottomNav = true,
  topBarTitle
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#0E0E0E]">
      {showTopBar && <TopAppBar title={topBarTitle} />}
      <main className={`${showTopBar ? "pt-12 sm:pt-14" : ""} ${showBottomNav ? "pb-16 sm:pb-20" : ""}`}>
        {children}
      </main>
      {showBottomNav && <BottomNavBar />}
    </div>
  )
}
