"use client"

import { motion } from "framer-motion"
import { Plus, ChevronRight, Film } from "lucide-react"
import Link from "next/link"

const projects = [
  {
    id: "1",
    name: "A Última Fronteira",
    director: "Carlos Mendonça",
    producer: "Globo Filmes",
    budget: "R$ 2.500.000",
    status: "Em andamento"
  },
  {
    id: "2",
    name: "Noites de Verão",
    director: "Ana Beatriz Lima",
    producer: "O2 Filmes",
    budget: "R$ 1.800.000",
    status: "Pré-produção"
  },
  {
    id: "3",
    name: "O Silêncio das Águas",
    director: "Roberto Farias Jr.",
    producer: "Conspiração Filmes",
    budget: "R$ 3.200.000",
    status: "Finalização"
  }
]

export default function SelecionarProjetoPage() {
  return (
    <div className="min-h-screen bg-[#0E0E0E] flex flex-col px-6 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="font-[var(--font-bebas-neue)] text-4xl tracking-[0.2em] text-white mb-2">
          SETSCANN
        </h1>
        <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase">
          Projetos
        </p>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex-1"
      >
        <h2 className="text-xl font-medium text-white mb-2">
          Selecione um projeto
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Escolha a produção que deseja gerenciar ou crie um novo projeto.
        </p>

        {/* Project Cards */}
        <div className="space-y-3 mb-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Link href="/painel">
                <div className="p-4 bg-[#131313] border border-[#1C1B1B] rounded-lg hover:border-primary/50 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-[#1C1B1B] group-hover:bg-primary/20 transition-colors">
                      <Film className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white truncate">
                        {project.name}
                      </h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {project.director} • {project.producer}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-mono text-primary">
                          {project.budget}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-[#1C1B1B] text-muted-foreground">
                          {project.status}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* New Project Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Link href="/projetos/novo">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 px-6 bg-[#131313] border border-dashed border-[#1C1B1B] hover:border-primary text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Plus className="w-5 h-5 text-primary" />
            NOVO PROJETO
          </motion.button>
        </Link>
      </motion.div>
    </div>
  )
}
