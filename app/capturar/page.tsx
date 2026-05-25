"use client"

import { motion } from "framer-motion"
import { 
  Camera, 
  Image, 
  X,
  Zap
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CapturarPage() {
  const [isScanning, setIsScanning] = useState(false)
  const router = useRouter()

  const handleCapture = () => {
    setIsScanning(true)
    // Simulate scanning process
    setTimeout(() => {
      router.push("/capturar/processando")
    }, 500)
  }

  return (
    <div className="min-h-screen bg-[#0E0E0E] flex flex-col">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 h-14 px-4 flex items-center justify-between bg-[#0E0E0E]/80 backdrop-blur-md"
      >
        <Link href="/painel">
          <button className="p-2 rounded-full hover:bg-[#1C1B1B] transition-colors">
            <X className="w-5 h-5 text-white" />
          </button>
        </Link>
        <span className="font-[var(--font-bebas-neue)] text-lg tracking-[0.15em] text-white">
          CAPTURAR
        </span>
        <div className="w-9" />
      </motion.header>

      {/* Camera Viewfinder */}
      <div className="flex-1 pt-14 flex flex-col">
        <div className="flex-1 relative bg-[#131313] m-4 rounded-2xl overflow-hidden border border-[#1C1B1B]">
          {/* Simulated Camera View */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Camera className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground text-sm">
                Posicione a nota fiscal na área de captura
              </p>
            </div>
          </div>

          {/* Scanning Overlay */}
          {isScanning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-primary/5"
            >
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  animate={{ top: ["0%", "100%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
                />
              </div>
            </motion.div>
          )}

          {/* Corner Guides */}
          <div className="absolute inset-8 pointer-events-none">
            {/* Top Left */}
            <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-primary/50 rounded-tl-lg" />
            {/* Top Right */}
            <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-primary/50 rounded-tr-lg" />
            {/* Bottom Left */}
            <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-primary/50 rounded-bl-lg" />
            {/* Bottom Right */}
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-primary/50 rounded-br-lg" />
          </div>

          {/* Flash indicator */}
          <div className="absolute top-4 right-4">
            <button className="p-2 rounded-full bg-[#1C1B1B]/80 backdrop-blur-sm">
              <Zap className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Controls */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="px-6 pb-8"
        >
          <div className="flex items-center justify-center gap-8">
            {/* Gallery Button */}
            <Link href="/capturar/galeria">
              <button className="p-4 rounded-full bg-[#131313] border border-[#1C1B1B] hover:border-primary/50 transition-colors">
                <Image className="w-6 h-6 text-muted-foreground" />
              </button>
            </Link>

            {/* Capture Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleCapture}
              disabled={isScanning}
              className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30 disabled:opacity-50"
            >
              <div className="w-16 h-16 rounded-full border-4 border-primary-foreground" />
            </motion.button>

            {/* Placeholder for symmetry */}
            <div className="w-14 h-14" />
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Toque para capturar ou selecione da galeria
          </p>
        </motion.div>
      </div>
    </div>
  )
}
