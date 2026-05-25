"use client"

import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function NovoProjetoPage() {
  const [nome, setNome] = useState("")
  const [orcamento, setOrcamento] = useState("")
  const [data, setData] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/painel")
  }

  const isValid = nome && orcamento && data

  return (
    <div className="min-h-screen bg-[#0E0E0E] flex flex-col px-6 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 mb-8"
      >
        <Link href="/projetos/selecionar">
          <button className="p-2 rounded-full hover:bg-[#1C1B1B] transition-colors">
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </button>
        </Link>
        <div>
          <h1 className="font-[var(--font-bebas-neue)] text-2xl tracking-[0.15em] text-white">
            NOVO PROJETO
          </h1>
          <p className="text-xs text-muted-foreground">
            Cadastre uma nova produção
          </p>
        </div>
      </motion.div>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleSubmit}
        className="flex-1 flex flex-col gap-6"
      >
        {/* Nome do Projeto */}
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground uppercase tracking-wider">
            Nome do Projeto
          </label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex: A Última Fronteira"
            className="w-full px-4 py-4 bg-[#131313] border border-[#1C1B1B] rounded-lg text-white placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
          />
        </div>

        {/* Orçamento Estimado */}
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground uppercase tracking-wider">
            Orçamento Estimado
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">
              R$
            </span>
            <input
              type="text"
              value={orcamento}
              onChange={(e) => setOrcamento(e.target.value)}
              placeholder="0,00"
              className="w-full pl-12 pr-4 py-4 bg-[#131313] border border-[#1C1B1B] rounded-lg text-white placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-mono"
            />
          </div>
        </div>

        {/* Data de Início */}
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground uppercase tracking-wider">
            Data de Início
          </label>
          <div className="relative">
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="w-full px-4 py-4 pr-12 bg-[#131313] border border-[#1C1B1B] rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors [color-scheme:dark]"
            />
            <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {/* Info Card */}
        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <p className="text-sm text-muted-foreground">
            Você poderá adicionar mais detalhes como equipe, departamentos e breakdown após a criação do projeto.
          </p>
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: isValid ? 1.02 : 1 }}
          whileTap={{ scale: isValid ? 0.98 : 1 }}
          type="submit"
          disabled={!isValid}
          className={`mt-auto w-full py-4 px-6 font-semibold rounded-lg text-lg tracking-wide flex items-center justify-center gap-2 transition-all ${
            isValid
              ? "bg-primary text-primary-foreground"
              : "bg-[#1C1B1B] text-muted-foreground cursor-not-allowed"
          }`}
        >
          CRIAR PROJETO
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.form>
    </div>
  )
}
