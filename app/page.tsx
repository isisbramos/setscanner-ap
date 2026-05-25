"use client"

import { motion } from "framer-motion"
import { Camera, Film, Sparkles } from "lucide-react"
import Link from "next/link"

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-[#0E0E0E] flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Logo */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="font-[var(--font-bebas-neue)] text-5xl tracking-[0.3em] text-white mb-2">
              SETSCANN
            </h1>
            <p className="text-xs tracking-[0.4em] text-primary uppercase">
              Obsidian Production Finance
            </p>
          </motion.div>

          {/* Hero Visual */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative w-64 h-64 mx-auto mb-12"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" />
            <div className="relative w-full h-full border border-[#1C1B1B] rounded-2xl bg-[#131313] flex items-center justify-center overflow-hidden">
              {/* Scanning Lines Animation */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-scan" />
              </div>
              
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <Camera className="w-16 h-16 text-primary" />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-1 -right-1"
                  >
                    <Sparkles className="w-5 h-5 text-primary" />
                  </motion.div>
                </div>
                <Film className="w-10 h-10 text-muted-foreground" />
              </div>
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <h2 className="text-xl font-medium text-white mb-3">
              Gestão Financeira Inteligente
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
              Escaneie notas fiscais, gerencie orçamentos e acompanhe gastos de produções de cinema em tempo real.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="px-6 pb-12"
      >
        <Link href="/login">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 px-6 bg-primary text-primary-foreground font-semibold rounded-lg text-lg tracking-wide"
          >
            COMEÇAR
          </motion.button>
        </Link>
        
        <p className="text-center text-muted-foreground text-xs mt-4">
          Já tem uma conta?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Fazer login
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
