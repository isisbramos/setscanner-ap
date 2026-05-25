"use client"

import { motion } from "framer-motion"
import { 
  ArrowLeft, 
  Check, 
  CreditCard, 
  Banknote,
  ChevronDown,
  Loader2
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

const departments = [
  "Arte",
  "Figurino",
  "Fotografia",
  "Produção",
  "Som",
  "Elétrica",
  "Maquinária",
  "Alimentação"
]

export default function ValidacaoPage() {
  const [valor, setValor] = useState("2.450,00")
  const [data, setData] = useState("25/05/2026")
  const [fornecedor, setFornecedor] = useState("Casa do Artista")
  const [departamento, setDepartamento] = useState("Arte")
  const [pagamento, setPagamento] = useState<"cartao" | "dinheiro">("cartao")
  const [showDeptDropdown, setShowDeptDropdown] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleConfirm = async () => {
    setIsLoading(true)
    setError(null)

    try {
      console.log("[v0] Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL)
      
      // Converter valor de string BR para número
      const valorNumerico = parseFloat(valor.replace(/\./g, '').replace(',', '.'))

      // Converter data de DD/MM/YYYY para YYYY-MM-DD
      const [dia, mes, ano] = data.split('/')
      const dataFormatada = `${ano}-${mes}-${dia}`

      // Inserir na tabela notas_fiscais
      const { error: insertError } = await supabase
        .from('notas_fiscais')
        .insert([{
          valor: valorNumerico,
          data_emissao: dataFormatada,
          fornecedor: fornecedor,
          departamento: departamento,
          forma_pagamento: pagamento,
          status: 'pendente'
        }])

      if (insertError) {
        setError(`Erro ao salvar: ${insertError.message}`)
        setIsLoading(false)
        return
      }

      router.push("/capturar/sucesso")
    } catch (err) {
      setError("Erro inesperado ao salvar os dados")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0E0E0E] flex flex-col">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="h-14 px-4 flex items-center gap-4"
      >
        <Link href="/painel">
          <button className="p-2 rounded-full hover:bg-[#1C1B1B] transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        </Link>
        <span className="font-[var(--font-bebas-neue)] text-lg tracking-[0.15em] text-white">
          VALIDAÇÃO
        </span>
      </motion.header>

      {/* Content */}
      <div className="flex-1 px-4 pb-4 flex flex-col">
        {/* Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="p-4 bg-[#131313] border border-[#1C1B1B] rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-success" />
              <span className="text-xs text-success uppercase tracking-wider font-mono">
                Dados Extraídos
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Verifique e edite os dados detectados automaticamente.
            </p>
          </div>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg"
          >
            <p className="text-sm text-red-400">{error}</p>
          </motion.div>
        )}

        {/* Form Fields */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4 flex-1"
        >
          {/* Valor */}
          <div className="space-y-2">
            <label className="text-xs text-muted-foreground uppercase tracking-wider">
              Valor Total
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">
                R$
              </span>
              <input
                type="text"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                disabled={isLoading}
                className="w-full pl-12 pr-4 py-3 bg-[#131313] border border-[#1C1B1B] rounded-lg text-white font-mono text-lg focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
              />
            </div>
          </div>

          {/* Data */}
          <div className="space-y-2">
            <label className="text-xs text-muted-foreground uppercase tracking-wider">
              Data de Emissão
            </label>
            <input
              type="text"
              value={data}
              onChange={(e) => setData(e.target.value)}
              disabled={isLoading}
              className="w-full px-4 py-3 bg-[#131313] border border-[#1C1B1B] rounded-lg text-white font-mono focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
            />
          </div>

          {/* Fornecedor */}
          <div className="space-y-2">
            <label className="text-xs text-muted-foreground uppercase tracking-wider">
              Fornecedor
            </label>
            <input
              type="text"
              value={fornecedor}
              onChange={(e) => setFornecedor(e.target.value)}
              disabled={isLoading}
              className="w-full px-4 py-3 bg-[#131313] border border-[#1C1B1B] rounded-lg text-white focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
            />
          </div>

          {/* Departamento */}
          <div className="space-y-2">
            <label className="text-xs text-muted-foreground uppercase tracking-wider">
              Departamento
            </label>
            <div className="relative">
              <button
                onClick={() => !isLoading && setShowDeptDropdown(!showDeptDropdown)}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-[#131313] border border-[#1C1B1B] rounded-lg text-white text-left flex items-center justify-between focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
              >
                {departamento}
                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${showDeptDropdown ? "rotate-180" : ""}`} />
              </button>
              
              {showDeptDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 right-0 mt-1 bg-[#131313] border border-[#1C1B1B] rounded-lg overflow-hidden z-10"
                >
                  {departments.map((dept) => (
                    <button
                      key={dept}
                      onClick={() => {
                        setDepartamento(dept)
                        setShowDeptDropdown(false)
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm hover:bg-[#1C1B1B] transition-colors ${
                        dept === departamento ? "text-primary bg-primary/10" : "text-white"
                      }`}
                    >
                      {dept}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>

          {/* Forma de Pagamento */}
          <div className="space-y-2">
            <label className="text-xs text-muted-foreground uppercase tracking-wider">
              Forma de Pagamento
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => !isLoading && setPagamento("cartao")}
                disabled={isLoading}
                className={`flex-1 p-3 rounded-lg border flex items-center justify-center gap-2 transition-all disabled:opacity-50 ${
                  pagamento === "cartao"
                    ? "bg-primary/10 border-primary text-white"
                    : "bg-[#131313] border-[#1C1B1B] text-muted-foreground hover:border-primary/50"
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span className="text-sm">Cartão</span>
              </button>
              <button
                onClick={() => !isLoading && setPagamento("dinheiro")}
                disabled={isLoading}
                className={`flex-1 p-3 rounded-lg border flex items-center justify-center gap-2 transition-all disabled:opacity-50 ${
                  pagamento === "dinheiro"
                    ? "bg-primary/10 border-primary text-white"
                    : "bg-[#131313] border-[#1C1B1B] text-muted-foreground hover:border-primary/50"
                }`}
              >
                <Banknote className="w-4 h-4" />
                <span className="text-sm">Dinheiro</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Confirm Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: isLoading ? 1 : 1.02 }}
          whileTap={{ scale: isLoading ? 1 : 0.98 }}
          onClick={handleConfirm}
          disabled={isLoading}
          className="w-full py-4 px-6 bg-primary text-primary-foreground font-semibold rounded-lg text-lg tracking-wide flex items-center justify-center gap-2 mt-6 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              SALVANDO...
            </>
          ) : (
            <>
              <Check className="w-5 h-5" />
              CONFIRMAR DADOS
            </>
          )}
        </motion.button>
      </div>
    </div>
  )
}
