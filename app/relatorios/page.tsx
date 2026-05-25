"use client"

import { motion } from "framer-motion"
import { 
  ArrowLeft, 
  Download,
  FileSpreadsheet,
  Calendar,
  Filter,
  ChevronDown,
  TrendingUp,
  TrendingDown
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const departments = [
  { name: "Arte", budget: "R$ 450.000", spent: "R$ 382.500", percentage: 85 },
  { name: "Figurino", budget: "R$ 280.000", spent: "R$ 196.000", percentage: 70 },
  { name: "Fotografia", budget: "R$ 520.000", spent: "R$ 442.000", percentage: 85 },
  { name: "Produção", budget: "R$ 380.000", spent: "R$ 285.000", percentage: 75 },
  { name: "Som", budget: "R$ 180.000", spent: "R$ 126.000", percentage: 70 },
  { name: "Alimentação", budget: "R$ 150.000", spent: "R$ 165.000", percentage: 110 },
]

export default function RelatoriosPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("Este Mês")
  const [showPeriodDropdown, setShowPeriodDropdown] = useState(false)

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
          RELATÓRIOS
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

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-3"
        >
          {/* Period Selector */}
          <div className="relative flex-1">
            <button
              onClick={() => setShowPeriodDropdown(!showPeriodDropdown)}
              className="w-full px-4 py-3 bg-[#131313] border border-[#1C1B1B] rounded-lg text-white text-sm flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                {selectedPeriod}
              </div>
              <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${showPeriodDropdown ? "rotate-180" : ""}`} />
            </button>

            {showPeriodDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 right-0 mt-1 bg-[#131313] border border-[#1C1B1B] rounded-lg overflow-hidden z-10"
              >
                {["Hoje", "Esta Semana", "Este Mês", "Trimestre", "Ano"].map((period) => (
                  <button
                    key={period}
                    onClick={() => {
                      setSelectedPeriod(period)
                      setShowPeriodDropdown(false)
                    }}
                    className={`w-full px-4 py-2.5 text-left text-sm hover:bg-[#1C1B1B] transition-colors ${
                      period === selectedPeriod ? "text-primary bg-primary/10" : "text-white"
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          {/* Filter Button */}
          <button className="px-4 py-3 bg-[#131313] border border-[#1C1B1B] rounded-lg hover:border-primary/50 transition-colors">
            <Filter className="w-4 h-4 text-muted-foreground" />
          </button>
        </motion.div>

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-3"
        >
          <div className="p-4 bg-[#131313] border border-[#1C1B1B] rounded-xl">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
              Total Gasto
            </p>
            <p className="text-2xl font-mono font-semibold text-white">
              R$ 1.59M
            </p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3 text-destructive" />
              <span className="text-xs text-destructive">+12% vs mês anterior</span>
            </div>
          </div>

          <div className="p-4 bg-[#131313] border border-[#1C1B1B] rounded-xl">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
              Saldo Restante
            </p>
            <p className="text-2xl font-mono font-semibold text-success">
              R$ 910K
            </p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingDown className="w-3 h-3 text-success" />
              <span className="text-xs text-success">36% do orçamento</span>
            </div>
          </div>
        </motion.div>

        {/* Department Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
            Gastos por Departamento
          </h3>
          <div className="space-y-3">
            {departments.map((dept, index) => (
              <motion.div
                key={dept.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="p-3 bg-[#131313] border border-[#1C1B1B] rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">{dept.name}</span>
                  <span className={`text-xs font-mono ${
                    dept.percentage > 100 ? "text-destructive" : "text-muted-foreground"
                  }`}>
                    {dept.percentage}%
                  </span>
                </div>
                <div className="h-2 bg-[#1C1B1B] rounded-full overflow-hidden mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(dept.percentage, 100)}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    className={`h-full rounded-full ${
                      dept.percentage > 100 
                        ? "bg-destructive" 
                        : dept.percentage > 80 
                        ? "bg-yellow-500" 
                        : "bg-primary"
                    }`}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Gasto: {dept.spent}</span>
                  <span>Orçamento: {dept.budget}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Export Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 px-6 bg-primary text-primary-foreground font-semibold rounded-lg flex items-center justify-center gap-2"
          >
            <FileSpreadsheet className="w-5 h-5" />
            EXPORTAR PARA XLS
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
