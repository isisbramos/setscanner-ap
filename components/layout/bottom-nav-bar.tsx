"use client"

import { LayoutDashboard, Camera, History, FolderKanban } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { icon: LayoutDashboard, label: "Painel", href: "/painel" },
  { icon: Camera, label: "Capturar", href: "/capturar" },
  { icon: History, label: "Histórico", href: "/historico" },
  { icon: FolderKanban, label: "Projetos", href: "/projetos" },
]

export function BottomNavBar() {
  const pathname = usePathname()
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-14 sm:h-16 px-2 sm:px-4 flex items-center justify-around bg-[#131313] border-t border-[#1C1B1B]">
      {navItems.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
        const Icon = item.icon
        
        return (
          <Link 
            key={item.href}
            href={item.href}
            className="relative flex flex-col items-center gap-0.5 sm:gap-1"
          >
            <motion.div
              whileTap={{ scale: 0.9 }}
              className={`p-1.5 sm:p-2 rounded-full transition-colors ${
                isActive 
                  ? "bg-primary/10" 
                  : "hover:bg-[#1C1B1B]"
              }`}
            >
              <Icon 
                className={`w-4 h-4 sm:w-5 sm:h-5 ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`} 
              />
            </motion.div>
            <span className={`text-[9px] sm:text-[10px] ${
              isActive ? "text-primary" : "text-muted-foreground"
            }`}>
              {item.label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
