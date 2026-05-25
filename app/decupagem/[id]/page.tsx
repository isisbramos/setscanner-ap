"use client"

import { motion } from "framer-motion"
import { 
  ArrowLeft, 
  CheckCircle2,
  Circle,
  Camera,
  FileText,
  Download,
  MoreVertical,
  TrendingUp,
  TrendingDown,
  Edit
} from "lucide-react"
import Link from "next/link"

const itemPhotos = [
  "/placeholder-1.jpg",
  "/placeholder-2.jpg",
  "/placeholder-3.jpg"
]

export default function ItemDetalhePage() {
  return (
    <div className="min-h-screen bg-[#0E0E0E]">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 h-14 px-4 flex items-center justify-between bg-[#0E0E0E]/80 backdrop-blur-md border-b border-[#1C1B1B]"
      >
        <Link href="/decupagem">
          <button className="p-2 rounded-full hover:bg-[#1C1B1B] transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        </Link>
        <span className="font-mono text-xs text-muted-foreground">
          #ITEM-0124
        </span>
        <button className="p-2 rounded-full hover:bg-[#1C1B1B] transition-colors">
          <MoreVertical className="w-5 h-5 text-muted-foreground" />
        </button>
      </motion.header>

      <div className="pt-14 px-4 py-6 space-y-6">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2"
        >
          <div className="flex items-center gap-2 px-3 py-1.5 bg-success/10 rounded-full">
            <CheckCircle2 className="w-4 h-4 text-success" />
            <span className="text-xs font-medium text-success">Adquirido</span>
          </div>
          <span className="text-xs text-muted-foreground">Cena 12 - Interior Casa</span>
        </motion.div>

        {/* Item Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className="text-2xl font-semibold text-white mb-1">
            Sofá Vintage Vermelho
          </h1>
          <p className="text-sm text-muted-foreground">
            Arte • Mobiliário • Cenografia
          </p>
        </motion.div>

        {/* Photo Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs text-muted-foreground uppercase tracking-wider">
              Galeria de Fotos
            </h2>
            <button className="flex items-center gap-1 text-xs text-primary">
              <Camera className="w-3 h-3" />
              Adicionar
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="aspect-square bg-[#131313] border border-[#1C1B1B] rounded-lg overflow-hidden"
              >
                <div className="w-full h-full flex items-center justify-center">
                  <Camera className="w-6 h-6 text-muted-foreground/30" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Estimado vs Realizado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs text-muted-foreground uppercase tracking-wider">
              Comparativo de Valores
            </h2>
            <button className="p-1 hover:bg-[#1C1B1B] rounded transition-colors">
              <Edit className="w-3 h-3 text-muted-foreground" />
            </button>
          </div>
          
          <div className="p-4 bg-[#131313] border border-[#1C1B1B] rounded-xl">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-[#1C1B1B] rounded-lg">
                <p className="text-[10px] text-muted-foreground uppercase mb-1">Estimado</p>
                <p className="text-xl font-mono font-semibold text-white">R$ 3.500</p>
              </div>
              <div className="text-center p-3 bg-success/10 rounded-lg">
                <p className="text-[10px] text-success uppercase mb-1">Realizado</p>
                <p className="text-xl font-mono font-semibold text-success">R$ 2.800</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-2 p-2 bg-success/5 rounded-lg">
              <TrendingDown className="w-4 h-4 text-success" />
              <span className="text-sm text-success font-medium">
                Economia de R$ 700,00 (20%)
              </span>
            </div>
          </div>
        </motion.div>

        {/* Item Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
            Detalhes do Item
          </h2>
          
          <div className="p-4 bg-[#131313] border border-[#1C1B1B] rounded-xl space-y-3">
            {[
              { label: "Fornecedor", value: "Antiquário Central" },
              { label: "Quantidade", value: "1 unidade" },
              { label: "Dimensões", value: "2.20m x 0.90m x 0.85m" },
              { label: "Condição", value: "Aluguel" },
              { label: "Data Aquisição", value: "20/05/2026" },
              { label: "Responsável", value: "Maria Silva" }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-[#1C1B1B] last:border-0">
                <span className="text-sm text-muted-foreground">{item.label}</span>
                <span className="text-sm text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Documents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
            Documentos e Anexos
          </h2>
          
          <div className="space-y-2">
            <div className="p-3 bg-[#131313] border border-[#1C1B1B] rounded-lg flex items-center gap-3 hover:border-primary/30 transition-colors cursor-pointer">
              <div className="p-2 rounded-lg bg-[#1C1B1B]">
                <FileText className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-white">Contrato_Aluguel.pdf</p>
                <p className="text-xs text-muted-foreground">PDF • 128 KB</p>
              </div>
              <Download className="w-4 h-4 text-muted-foreground" />
            </div>

            <div className="p-3 bg-[#131313] border border-[#1C1B1B] rounded-lg flex items-center gap-3 hover:border-primary/30 transition-colors cursor-pointer">
              <div className="p-2 rounded-lg bg-[#1C1B1B]">
                <FileText className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-white">Nota_Fiscal_Aluguel.pdf</p>
                <p className="text-xs text-muted-foreground">PDF • 89 KB</p>
              </div>
              <Download className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </motion.div>

        {/* Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
            Observações
          </h2>
          
          <div className="p-4 bg-[#131313] border border-[#1C1B1B] rounded-xl">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Sofá em ótimo estado de conservação. Tecido original vermelho bordô. 
              Necessita proteção durante transporte. Devolução prevista para 15/07/2026.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
