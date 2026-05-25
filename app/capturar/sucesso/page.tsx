"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Home, Plus } from "lucide-react"
import Link from "next/link"

export default function SucessoPage() {
  return (
    <div className="min-h-screen bg-[#0E0E0E] flex flex-col items-center justify-center px-6">
      {/* Success Animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="mb-8"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="relative"
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-success/20 rounded-full blur-3xl scale-150" />
          
          {/* Icon Container */}
          <motion.div
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="relative w-24 h-24 rounded-full bg-success/10 border-2 border-success flex items-center justify-center"
          >
            <CheckCircle2 className="w-12 h-12 text-success" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Success Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-center mb-12"
      >
        <h1 className="text-2xl font-semibold text-white mb-2">
          Nota Registrada!
        </h1>
        <p className="text-muted-foreground text-sm">
          A transação foi adicionada ao histórico com sucesso.
        </p>
      </motion.div>

      {/* Transaction Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-sm mb-8"
      >
        <div className="p-4 bg-[#131313] border border-[#1C1B1B] rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              Valor
            </span>
            <span className="text-lg font-mono font-semibold text-white">
              R$ 2.450,00
            </span>
          </div>
          <div className="h-px bg-[#1C1B1B]" />
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              Fornecedor
            </span>
            <span className="text-sm text-white">
              Casa do Artista
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              Departamento
            </span>
            <span className="text-sm text-white">
              Arte
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              ID
            </span>
            <span className="text-xs font-mono text-primary">
              #TRX-2024-0847
            </span>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="w-full max-w-sm space-y-3"
      >
        <Link href="/capturar" className="block">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 px-6 bg-primary text-primary-foreground font-semibold rounded-lg flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            NOVA LEITURA
          </motion.button>
        </Link>

        <Link href="/painel" className="block">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 px-6 bg-[#131313] border border-[#1C1B1B] text-white font-semibold rounded-lg flex items-center justify-center gap-2 hover:border-primary/50 transition-colors"
          >
            <Home className="w-5 h-5" />
            VOLTAR AO PAINEL
          </motion.button>
        </Link>
      </motion.div>
    </div>
  )
}
