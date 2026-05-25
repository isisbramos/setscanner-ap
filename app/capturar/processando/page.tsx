"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const logMessages = [
  { text: "Iniciando processamento...", delay: 0 },
  { text: "Detectando bordas do documento...", delay: 400 },
  { text: "Aplicando correção de perspectiva...", delay: 800 },
  { text: "Extraindo texto via OCR...", delay: 1200 },
  { text: "Identificando campos fiscais...", delay: 1800 },
  { text: "CNPJ detectado: 12.345.678/0001-90", delay: 2200 },
  { text: "Valor total identificado: R$ 2.450,00", delay: 2600 },
  { text: "Data de emissão: 25/05/2026", delay: 3000 },
  { text: "Validando dados extraídos...", delay: 3400 },
  { text: "Processamento concluído.", delay: 3800 },
]

export default function ProcessandoPage() {
  const [visibleLogs, setVisibleLogs] = useState<string[]>([])
  const [progress, setProgress] = useState(0)
  const router = useRouter()

  useEffect(() => {
    logMessages.forEach((log, index) => {
      setTimeout(() => {
        setVisibleLogs(prev => [...prev, log.text])
        setProgress(((index + 1) / logMessages.length) * 100)
      }, log.delay)
    })

    // Navigate to validation screen after processing
    const timeout = setTimeout(() => {
      router.push("/capturar/validacao")
    }, 4500)

    return () => clearTimeout(timeout)
  }, [router])

  return (
    <div className="min-h-screen bg-[#0E0E0E] flex flex-col">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="h-14 px-4 flex items-center justify-center"
      >
        <span className="font-[var(--font-bebas-neue)] text-lg tracking-[0.15em] text-white">
          PROCESSANDO
        </span>
      </motion.header>

      {/* Document Preview */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-4 mb-4"
      >
        <div className="relative aspect-[3/4] bg-[#131313] rounded-2xl border border-[#1C1B1B] overflow-hidden">
          {/* Simulated document */}
          <div className="absolute inset-0 p-6 space-y-4">
            <div className="h-4 w-1/2 bg-[#1C1B1B] rounded" />
            <div className="h-3 w-3/4 bg-[#1C1B1B] rounded" />
            <div className="h-3 w-2/3 bg-[#1C1B1B] rounded" />
            <div className="mt-8 space-y-2">
              <div className="h-2 w-full bg-[#1C1B1B] rounded" />
              <div className="h-2 w-full bg-[#1C1B1B] rounded" />
              <div className="h-2 w-3/4 bg-[#1C1B1B] rounded" />
            </div>
            <div className="mt-8">
              <div className="h-6 w-1/3 bg-primary/20 rounded" />
            </div>
          </div>

          {/* Scanning overlay */}
          <div className="absolute inset-0 bg-primary/5">
            <motion.div
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent shadow-lg shadow-primary"
            />
          </div>

          {/* Scanning label */}
          <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-[#0E0E0E]/80 backdrop-blur-sm rounded-full">
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-primary"
            />
            <span className="text-xs font-mono text-primary">SCANNING...</span>
          </div>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <div className="px-4 mb-4">
        <div className="h-1 bg-[#1C1B1B] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-primary"
          />
        </div>
        <p className="text-xs text-muted-foreground text-right mt-1 font-mono">
          {Math.round(progress)}%
        </p>
      </div>

      {/* Terminal Console */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex-1 mx-4 mb-4"
      >
        <div className="h-full bg-[#131313] rounded-xl border border-[#1C1B1B] overflow-hidden">
          {/* Terminal Header */}
          <div className="px-4 py-2 border-b border-[#1C1B1B] flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-destructive/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-success/50" />
            <span className="ml-2 text-xs text-muted-foreground font-mono">
              ocr_engine.log
            </span>
          </div>

          {/* Terminal Content */}
          <div className="p-4 h-48 overflow-y-auto font-mono text-xs space-y-1">
            {visibleLogs.map((log, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start gap-2"
              >
                <span className="text-muted-foreground shrink-0">
                  [{new Date().toLocaleTimeString()}]
                </span>
                <span className={
                  log.includes("concluído") 
                    ? "text-success" 
                    : log.includes("R$") || log.includes("CNPJ") || log.includes("Data")
                    ? "text-primary"
                    : "text-muted-foreground"
                }>
                  {log}
                </span>
              </motion.div>
            ))}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="text-primary"
            >
              _
            </motion.span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
