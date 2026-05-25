"use client"

import { motion } from "framer-motion"
import { 
  Film, 
  ChevronRight, 
  Plus,
  Users,
  Calendar,
  TrendingUp
} from "lucide-react"
import Link from "next/link"
import { AppShell } from "@/components/layout/app-shell"

const projects = [
  {
    id: "1",
    name: "A Última Fronteira",
    director: "Carlos Mendonça",
    producer: "Globo Filmes",
    budget: "R$ 2.500.000",
    spent: "R$ 1.875.000",
    percentage: 75,
    status: "Em andamento",
    startDate: "15/03/2026"
  },
  {
    id: "2",
    name: "Noites de Verão",
    director: "Ana Beatriz Lima",
    producer: "O2 Filmes",
    budget: "R$ 1.800.000",
    spent: "R$ 360.000",
    percentage: 20,
    status: "Pré-produção",
    startDate: "01/06/2026"
  },
  {
    id: "3",
    name: "O Silêncio das Águas",
    director: "Roberto Farias Jr.",
    producer: "Conspiração Filmes",
    budget: "R$ 3.200.000",
    spent: "R$ 2.880.000",
    percentage: 90,
    status: "Finalização",
    startDate: "10/01/2026"
  }
]

export default function ProjetosPage() {
  return (
    <AppShell topBarTitle="Projetos">
      <div className="px-4 py-4 space-y-4">
        {/* Header Stats */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 gap-3"
        >
          <div className="p-3 bg-[#131313] border border-[#1C1B1B] rounded-lg text-center">
            <p className="text-xl font-mono font-semibold text-white">{projects.length}</p>
            <p className="text-[10px] text-muted-foreground uppercase">Projetos</p>
          </div>
          <div className="p-3 bg-[#131313] border border-[#1C1B1B] rounded-lg text-center">
            <p className="text-xl font-mono font-semibold text-success">1</p>
            <p className="text-[10px] text-muted-foreground uppercase">Ativos</p>
          </div>
          <div className="p-3 bg-[#131313] border border-[#1C1B1B] rounded-lg text-center">
            <p className="text-xl font-mono font-semibold text-primary">7.5M</p>
            <p className="text-[10px] text-muted-foreground uppercase">Orçamento</p>
          </div>
        </motion.div>

        {/* Project List */}
        <div className="space-y-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <Link href={`/projetos/${project.id}`}>
                <div className="p-4 bg-[#131313] border border-[#1C1B1B] rounded-xl hover:border-primary/30 transition-colors group">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-[#1C1B1B] group-hover:bg-primary/20 transition-colors">
                      <Film className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-semibold text-white">
                            {project.name}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {project.director} • {project.producer}
                          </p>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full shrink-0 ${
                          project.status === "Em andamento" 
                            ? "bg-success/10 text-success"
                            : project.status === "Finalização"
                            ? "bg-primary/10 text-primary"
                            : "bg-yellow-500/10 text-yellow-500"
                        }`}>
                          {project.status}
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-muted-foreground">Orçamento utilizado</span>
                          <span className="font-mono text-white">{project.percentage}%</span>
                        </div>
                        <div className="h-1.5 bg-[#1C1B1B] rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${project.percentage}%` }}
                            transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                            className={`h-full rounded-full ${
                              project.percentage > 85 
                                ? "bg-destructive" 
                                : project.percentage > 70 
                                ? "bg-yellow-500" 
                                : "bg-success"
                            }`}
                          />
                        </div>
                      </div>

                      {/* Details */}
                      <div className="flex items-center gap-4 text-xs">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <TrendingUp className="w-3 h-3" />
                          <span className="font-mono">{project.spent}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <span>{project.startDate}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* New Project Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link href="/projetos/novo">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 px-6 bg-[#131313] border border-dashed border-[#1C1B1B] hover:border-primary text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <Plus className="w-5 h-5 text-primary" />
              NOVO PROJETO
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </AppShell>
  )
}
