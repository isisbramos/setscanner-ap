"use client"

import { motion } from "framer-motion"
import { 
  ArrowLeft, 
  CheckCircle2,
  Circle,
  ChevronRight,
  Package,
  Shirt,
  Palette
} from "lucide-react"
import Link from "next/link"

const scenes = [
  {
    id: "1",
    name: "Cena 12 - Interior Casa",
    progress: 80,
    items: 24,
    acquired: 19,
    category: "Arte"
  },
  {
    id: "2",
    name: "Cena 15 - Exterior Praia",
    progress: 45,
    items: 18,
    acquired: 8,
    category: "Arte"
  },
  {
    id: "3",
    name: "Cena 23 - Escritório",
    progress: 100,
    items: 32,
    acquired: 32,
    category: "Arte"
  },
  {
    id: "4",
    name: "Figurino - Protagonista",
    progress: 60,
    items: 15,
    acquired: 9,
    category: "Figurino"
  },
  {
    id: "5",
    name: "Figurino - Antagonista",
    progress: 90,
    items: 12,
    acquired: 11,
    category: "Figurino"
  }
]

const categoryIcons = {
  Arte: Palette,
  Figurino: Shirt,
  Props: Package
}

export default function DecupagemPage() {
  return (
    <div className="min-h-screen bg-[#0E0E0E]">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 h-14 px-4 flex items-center gap-4 bg-[#0E0E0E]/80 backdrop-blur-md border-b border-[#1C1B1B]"
      >
        <Link href="/painel">
          <button className="p-2 rounded-full hover:bg-[#1C1B1B] transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        </Link>
        <h1 className="font-[var(--font-bebas-neue)] text-lg tracking-[0.15em] text-white">
          DECUPAGEM
        </h1>
      </motion.header>

      <div className="pt-14 px-4 py-6 space-y-6">
        {/* Project Info */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            Projeto
          </p>
          <h2 className="text-lg font-semibold text-white">A Última Fronteira</h2>
        </motion.div>

        {/* Overall Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-4 bg-[#131313] border border-[#1C1B1B] rounded-xl"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">Progresso Geral</span>
            <span className="text-lg font-mono font-semibold text-white">73%</span>
          </div>
          <div className="h-3 bg-[#1C1B1B] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "73%" }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="h-full bg-primary rounded-full"
            />
          </div>
          <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
            <span>79 de 101 itens adquiridos</span>
            <span>22 pendentes</span>
          </div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-2"
        >
          {["Todos", "Arte", "Figurino"].map((tab, index) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                index === 0
                  ? "bg-primary text-primary-foreground"
                  : "bg-[#131313] border border-[#1C1B1B] text-muted-foreground hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Scene List */}
        <div className="space-y-3">
          {scenes.map((scene, index) => {
            const Icon = categoryIcons[scene.category as keyof typeof categoryIcons] || Package
            const isComplete = scene.progress === 100

            return (
              <motion.div
                key={scene.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
              >
                <Link href={`/decupagem/${scene.id}`}>
                  <div className="p-4 bg-[#131313] border border-[#1C1B1B] rounded-xl hover:border-primary/30 transition-colors group">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${isComplete ? "bg-success/10" : "bg-[#1C1B1B]"}`}>
                        <Icon className={`w-5 h-5 ${isComplete ? "text-success" : "text-primary"}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-white text-sm truncate">
                            {scene.name}
                          </h3>
                          {isComplete && (
                            <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                          )}
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="mb-2">
                          <div className="h-1.5 bg-[#1C1B1B] rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${scene.progress}%` }}
                              transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                              className={`h-full rounded-full ${
                                isComplete ? "bg-success" : "bg-primary"
                              }`}
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="font-mono">{scene.progress}%</span>
                          <span className="flex items-center gap-1">
                            <Circle className="w-2 h-2 fill-current" />
                            {scene.acquired}/{scene.items} itens
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-[#1C1B1B] text-[10px]">
                            {scene.category}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
