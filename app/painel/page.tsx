"use client"

import { motion } from "framer-motion"
import { 
  Plus, 
  Receipt, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  TrendingUp,
  Wallet,
  RefreshCw
} from "lucide-react"
import Link from "next/link"
import { AppShell } from "@/components/layout/app-shell"

const recentTransactions = [
  {
    id: "1",
    vendor: "Casa do Artista",
    amount: "R$ 2.450,00",
    date: "Hoje, 14:32",
    department: "Arte",
    status: "approved"
  },
  {
    id: "2",
    vendor: "Locadora Equipamentos SP",
    amount: "R$ 8.900,00",
    date: "Hoje, 11:15",
    department: "Fotografia",
    status: "pending"
  },
  {
    id: "3",
    vendor: "Figurinos Maria Helena",
    amount: "R$ 1.280,00",
    date: "Ontem, 18:45",
    department: "Figurino",
    status: "approved"
  },
  {
    id: "4",
    vendor: "Alimentação Set Ltda",
    amount: "R$ 3.200,00",
    date: "Ontem, 12:00",
    department: "Produção",
    status: "error"
  }
]

const statusConfig = {
  approved: { icon: CheckCircle2, color: "text-success", bg: "bg-success/10" },
  pending: { icon: Clock, color: "text-yellow-500", bg: "bg-yellow-500/10" },
  error: { icon: AlertCircle, color: "text-destructive", bg: "bg-destructive/10" }
}

export default function PainelPage() {
  return (
    <AppShell>
      <div className="px-3 py-4 space-y-4 sm:px-4 sm:py-6 sm:space-y-6">
        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mb-0.5">
            Projeto Ativo
          </p>
          <h1 className="text-base sm:text-xl font-semibold text-white">
            A Última Fronteira
          </h1>
        </motion.div>

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-2 sm:gap-3"
        >
          {/* Fundo Fixo */}
          <div className="p-3 sm:p-4 bg-[#131313] border border-[#1C1B1B] rounded-lg">
            <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
              <div className="p-1 sm:p-1.5 rounded-md bg-primary/10">
                <Wallet className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
              </div>
              <span className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">
                Fundo Fixo
              </span>
            </div>
            <p className="text-lg sm:text-2xl font-mono font-semibold text-white">
              R$ 15.420
            </p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-success" />
              <span className="text-[10px] sm:text-xs text-success">Dentro do orçamento</span>
            </div>
          </div>

          {/* Reembolsos */}
          <div className="p-3 sm:p-4 bg-[#131313] border border-[#1C1B1B] rounded-lg">
            <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
              <div className="p-1 sm:p-1.5 rounded-md bg-yellow-500/10">
                <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
              </div>
              <span className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">
                Reembolsos
              </span>
            </div>
            <p className="text-lg sm:text-2xl font-mono font-semibold text-white">
              R$ 4.850
            </p>
            <div className="flex items-center gap-1 mt-1">
              <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-yellow-500" />
              <span className="text-[10px] sm:text-xs text-yellow-500">3 pendentes</span>
            </div>
          </div>
        </motion.div>

        {/* Main CTA - Scan Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Link href="/capturar">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 px-4 sm:py-6 sm:px-6 bg-primary text-primary-foreground font-semibold rounded-xl text-base sm:text-xl tracking-wide flex items-center justify-center gap-2 sm:gap-3 shadow-lg shadow-primary/20"
            >
              <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
              LER NOTA FISCAL
            </motion.button>
          </Link>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider">
              Histórico Recente
            </h2>
            <Link href="/historico" className="text-[10px] sm:text-xs text-primary hover:underline">
              Ver tudo
            </Link>
          </div>

          <div className="space-y-2 sm:space-y-3">
            {recentTransactions.map((transaction, index) => {
              const status = statusConfig[transaction.status as keyof typeof statusConfig]
              const StatusIcon = status.icon

              return (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <Link href={`/transacao/${transaction.id}`}>
                    <div className="p-2.5 sm:p-3 bg-[#131313] border border-[#1C1B1B] rounded-lg hover:border-primary/30 transition-colors">
                      <div className="flex items-start gap-2 sm:gap-3">
                        <div className={`p-1.5 sm:p-2 rounded-lg ${status.bg}`}>
                          <Receipt className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${status.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1.5 sm:gap-2">
                            <h3 className="font-medium text-white text-xs sm:text-sm truncate">
                              {transaction.vendor}
                            </h3>
                            <span className="text-xs sm:text-sm font-mono text-white shrink-0">
                              {transaction.amount}
                            </span>
                          </div>
                          <div className="flex items-center justify-between mt-0.5 sm:mt-1">
                            <span className="text-[10px] sm:text-xs text-muted-foreground">
                              {transaction.department} • {transaction.date}
                            </span>
                            <StatusIcon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${status.color}`} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </AppShell>
  )
}
