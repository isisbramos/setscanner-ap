"use client"

import { motion } from "framer-motion"
import { 
  Receipt, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Search,
  Filter,
  ChevronRight
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { AppShell } from "@/components/layout/app-shell"

const transactions = [
  {
    id: "1",
    vendor: "Casa do Artista",
    amount: "R$ 2.450,00",
    date: "25/05/2026",
    department: "Arte",
    status: "approved"
  },
  {
    id: "2",
    vendor: "Locadora Equipamentos SP",
    amount: "R$ 8.900,00",
    date: "25/05/2026",
    department: "Fotografia",
    status: "pending"
  },
  {
    id: "3",
    vendor: "Figurinos Maria Helena",
    amount: "R$ 1.280,00",
    date: "24/05/2026",
    department: "Figurino",
    status: "approved"
  },
  {
    id: "4",
    vendor: "Alimentação Set Ltda",
    amount: "R$ 3.200,00",
    date: "24/05/2026",
    department: "Produção",
    status: "error"
  },
  {
    id: "5",
    vendor: "Tecidos Premium",
    amount: "R$ 890,00",
    date: "23/05/2026",
    department: "Figurino",
    status: "approved"
  },
  {
    id: "6",
    vendor: "Ferragens Central",
    amount: "R$ 1.560,00",
    date: "23/05/2026",
    department: "Arte",
    status: "approved"
  },
  {
    id: "7",
    vendor: "Transporte Rápido",
    amount: "R$ 2.100,00",
    date: "22/05/2026",
    department: "Produção",
    status: "pending"
  }
]

const statusConfig = {
  approved: { icon: CheckCircle2, color: "text-success", bg: "bg-success/10", label: "Aprovado" },
  pending: { icon: Clock, color: "text-yellow-500", bg: "bg-yellow-500/10", label: "Pendente" },
  error: { icon: AlertCircle, color: "text-destructive", bg: "bg-destructive/10", label: "Erro" }
}

const filters = ["Todos", "Aprovados", "Pendentes", "Erros"]

export default function HistoricoPage() {
  const [activeFilter, setActiveFilter] = useState("Todos")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch = t.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.department.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (activeFilter === "Todos") return matchesSearch
    if (activeFilter === "Aprovados") return matchesSearch && t.status === "approved"
    if (activeFilter === "Pendentes") return matchesSearch && t.status === "pending"
    if (activeFilter === "Erros") return matchesSearch && t.status === "error"
    return matchesSearch
  })

  return (
    <AppShell topBarTitle="Histórico">
      <div className="px-4 py-4 space-y-4">
        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar transações..."
              className="w-full pl-10 pr-10 py-3 bg-[#131313] border border-[#1C1B1B] rounded-lg text-white text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-[#1C1B1B] rounded transition-colors">
              <Filter className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </motion.div>

        {/* Filter Chips */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                activeFilter === filter
                  ? "bg-primary text-primary-foreground"
                  : "bg-[#131313] border border-[#1C1B1B] text-muted-foreground hover:text-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-3 bg-[#131313] border border-[#1C1B1B] rounded-lg"
        >
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <p className="text-lg font-mono font-semibold text-white">{filteredTransactions.length}</p>
              <p className="text-[10px] text-muted-foreground uppercase">Transações</p>
            </div>
            <div className="w-px h-8 bg-[#1C1B1B]" />
            <div className="text-center flex-1">
              <p className="text-lg font-mono font-semibold text-success">
                {transactions.filter(t => t.status === "approved").length}
              </p>
              <p className="text-[10px] text-muted-foreground uppercase">Aprovadas</p>
            </div>
            <div className="w-px h-8 bg-[#1C1B1B]" />
            <div className="text-center flex-1">
              <p className="text-lg font-mono font-semibold text-yellow-500">
                {transactions.filter(t => t.status === "pending").length}
              </p>
              <p className="text-[10px] text-muted-foreground uppercase">Pendentes</p>
            </div>
          </div>
        </motion.div>

        {/* Transaction List */}
        <div className="space-y-2">
          {filteredTransactions.map((transaction, index) => {
            const status = statusConfig[transaction.status as keyof typeof statusConfig]
            const StatusIcon = status.icon

            return (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.03 }}
              >
                <Link href={`/transacao/${transaction.id}`}>
                  <div className="p-3 bg-[#131313] border border-[#1C1B1B] rounded-lg hover:border-primary/30 transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${status.bg}`}>
                        <Receipt className={`w-4 h-4 ${status.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-medium text-white text-sm truncate">
                            {transaction.vendor}
                          </h3>
                          <span className="text-sm font-mono text-white shrink-0">
                            {transaction.amount}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-muted-foreground">
                            {transaction.department} • {transaction.date}
                          </span>
                          <div className="flex items-center gap-1">
                            <StatusIcon className={`w-3 h-3 ${status.color}`} />
                            <span className={`text-[10px] ${status.color}`}>{status.label}</span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {filteredTransactions.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Receipt className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">
              Nenhuma transação encontrada
            </p>
          </motion.div>
        )}
      </div>
    </AppShell>
  )
}
