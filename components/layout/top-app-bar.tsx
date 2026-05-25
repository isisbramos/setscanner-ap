"use client"

import { Bell, Settings } from "lucide-react"
import { motion } from "framer-motion"

interface TopAppBarProps {
  showActions?: boolean
  title?: string
}

export function TopAppBar({ showActions = true, title }: TopAppBarProps) {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 h-12 sm:h-14 px-3 sm:px-4 flex items-center justify-between bg-[#0E0E0E]/80 backdrop-blur-md border-b border-[#1C1B1B]"
    >
      <div className="flex items-center gap-2">
        <span className="font-[var(--font-bebas-neue)] text-xl sm:text-2xl tracking-[0.15em] sm:tracking-[0.2em] text-white">
          SETSCANN
        </span>
      </div>
      
      {title && (
        <span className="absolute left-1/2 -translate-x-1/2 text-xs sm:text-sm text-muted-foreground">
          {title}
        </span>
      )}
      
      {showActions && (
        <div className="flex items-center gap-1 sm:gap-2">
          <button className="p-1.5 sm:p-2 rounded-full hover:bg-[#1C1B1B] transition-colors">
            <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
          </button>
          <button className="p-1.5 sm:p-2 rounded-full hover:bg-[#1C1B1B] transition-colors">
            <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
          </button>
        </div>
      )}
    </motion.header>
  )
}
