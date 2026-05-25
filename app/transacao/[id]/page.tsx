"use client"

import { motion } from "framer-motion"
import { 
  ArrowLeft, 
  Receipt,
  CheckCircle2,
  Clock,
  FileText,
  Image,
  Download,
  MoreVertical,
  CreditCard
} from "lucide-react"
import Link from "next/link"

export default function TransacaoDetalhePage() {
  return (
    <div className="min-h-screen bg-[#0E0E0E]">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 h-14 px-4 flex items-center justify-between bg-[#0E0E0E]/80 backdrop-blur-md border-b border-[#1C1B1B]"
      >
        <Link href="/historico">
          <button className="p-2 rounded-full hover:bg-[#1C1B1B] transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        </Link>
        <span className="font-mono text-xs text-muted-foreground">
          #TRX-2024-0847
        </span>
        <button className="p-2 rounded-full hover:bg-[#1C1B1B] transition-colors">
          <MoreVertical className="w-5 h-5 text-muted-foreground" />
        </button>
      </motion.header>

      <div className="pt-14 px-4 py-6 space-y-6">
        {/* Status Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-success/10 border border-success/20 rounded-xl flex items-center gap-3"
        >
          <div className="p-2 rounded-full bg-success/20">
            <CheckCircle2 className="w-5 h-5 text-success" />
          </div>
          <div>
            <p className="text-sm font-medium text-success">Transação Aprovada</p>
            <p className="text-xs text-success/70">Registrada em 25/05/2026 às 14:32</p>
          </div>
        </motion.div>

        {/* Main Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-4 bg-[#131313] border border-[#1C1B1B] rounded-xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <Receipt className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-white">Casa do Artista</h1>
              <p className="text-xs text-muted-foreground">CNPJ: 12.345.678/0001-90</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-[#1C1B1B]">
              <span className="text-sm text-muted-foreground">Valor Total</span>
              <span className="text-xl font-mono font-semibold text-white">R$ 2.450,00</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[#1C1B1B]">
              <span className="text-sm text-muted-foreground">Departamento</span>
              <span className="text-sm text-white">Arte</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[#1C1B1B]">
              <span className="text-sm text-muted-foreground">Categoria</span>
              <span className="text-sm text-white">Materiais de Cenografia</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[#1C1B1B]">
              <span className="text-sm text-muted-foreground">Pagamento</span>
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-white">Cartão Corporativo</span>
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">Data de Emissão</span>
              <span className="text-sm font-mono text-white">25/05/2026</span>
            </div>
          </div>
        </motion.div>

        {/* Estimado vs Realizado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
            Comparativo Orçamentário
          </h2>
          <div className="p-4 bg-[#131313] border border-[#1C1B1B] rounded-xl">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-[#1C1B1B] rounded-lg">
                <p className="text-[10px] text-muted-foreground uppercase mb-1">Estimado</p>
                <p className="text-lg font-mono font-semibold text-white">R$ 2.500,00</p>
              </div>
              <div className="text-center p-3 bg-success/10 rounded-lg">
                <p className="text-[10px] text-success uppercase mb-1">Realizado</p>
                <p className="text-lg font-mono font-semibold text-success">R$ 2.450,00</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-center gap-2 text-xs">
              <CheckCircle2 className="w-3 h-3 text-success" />
              <span className="text-success">Economia de R$ 50,00 (2%)</span>
            </div>
          </div>
        </motion.div>

        {/* Documentos e Anexos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
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
                <p className="text-sm text-white">Nota_Fiscal_0847.pdf</p>
                <p className="text-xs text-muted-foreground">PDF • 245 KB</p>
              </div>
              <Download className="w-4 h-4 text-muted-foreground" />
            </div>

            <div className="p-3 bg-[#131313] border border-[#1C1B1B] rounded-lg flex items-center gap-3 hover:border-primary/30 transition-colors cursor-pointer">
              <div className="p-2 rounded-lg bg-[#1C1B1B]">
                <Image className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-white">Foto_Comprovante.jpg</p>
                <p className="text-xs text-muted-foreground">JPG • 1.2 MB</p>
              </div>
              <Download className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
            Histórico
          </h2>
          <div className="space-y-0">
            {[
              { icon: CheckCircle2, text: "Transação aprovada", time: "14:35", color: "text-success" },
              { icon: Clock, text: "Validação concluída", time: "14:33", color: "text-primary" },
              { icon: Receipt, text: "OCR processado", time: "14:32", color: "text-primary" },
              { icon: Receipt, text: "Documento capturado", time: "14:32", color: "text-muted-foreground" },
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3 relative">
                {index < 3 && (
                  <div className="absolute left-[11px] top-6 w-0.5 h-6 bg-[#1C1B1B]" />
                )}
                <div className={`p-1 rounded-full bg-[#131313] border border-[#1C1B1B] z-10`}>
                  <item.icon className={`w-3 h-3 ${item.color}`} />
                </div>
                <div className="flex-1 pb-4">
                  <p className="text-sm text-white">{item.text}</p>
                  <p className="text-xs text-muted-foreground">25/05/2026 • {item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
