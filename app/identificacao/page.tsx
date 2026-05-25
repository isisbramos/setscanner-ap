"use client"

import { motion } from "framer-motion"
import { 
  Clapperboard, 
  Palette, 
  Camera, 
  Users, 
  Wallet, 
  ArrowRight,
  Check
} from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

const roles = [
  { id: "diretor", label: "Diretor", icon: Clapperboard },
  { id: "diretor-arte", label: "Diretor de Arte", icon: Palette },
  { id: "produtor", label: "Produtor", icon: Users },
  { id: "diretor-foto", label: "Diretor de Fotografia", icon: Camera },
  { id: "financeiro", label: "Financeiro", icon: Wallet },
]

export default function IdentificacaoPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const router = useRouter()

  const handleContinue = () => {
    if (selectedRole) {
      router.push("/projetos/selecionar")
    }
  }

  return (
    <div className="min-h-screen bg-[#0E0E0E] flex flex-col px-6 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="font-[var(--font-bebas-neue)] text-4xl tracking-[0.2em] text-white mb-2">
          SETSCANN
        </h1>
        <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase">
          Identificação
        </p>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex-1"
      >
        <h2 className="text-xl font-medium text-white mb-2">
          Qual é o seu cargo?
        </h2>
        <p className="text-sm text-muted-foreground mb-8">
          Selecione sua função na produção para personalizarmos sua experiência.
        </p>

        {/* Role Cards */}
        <div className="space-y-3">
          {roles.map((role, index) => {
            const Icon = role.icon
            const isSelected = selectedRole === role.id
            
            return (
              <motion.button
                key={role.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                onClick={() => setSelectedRole(role.id)}
                className={`w-full p-4 flex items-center gap-4 rounded-lg border transition-all ${
                  isSelected
                    ? "bg-primary/10 border-primary"
                    : "bg-[#131313] border-[#1C1B1B] hover:border-primary/50"
                }`}
              >
                <div className={`p-3 rounded-full ${
                  isSelected ? "bg-primary/20" : "bg-[#1C1B1B]"
                }`}>
                  <Icon className={`w-5 h-5 ${
                    isSelected ? "text-primary" : "text-muted-foreground"
                  }`} />
                </div>
                <span className={`flex-1 text-left font-medium ${
                  isSelected ? "text-white" : "text-muted-foreground"
                }`}>
                  {role.label}
                </span>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                  >
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </motion.div>
                )}
              </motion.button>
            )
          })}
        </div>
      </motion.div>

      {/* Continue Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: selectedRole ? 1.02 : 1 }}
        whileTap={{ scale: selectedRole ? 0.98 : 1 }}
        onClick={handleContinue}
        disabled={!selectedRole}
        className={`w-full py-4 px-6 font-semibold rounded-lg text-lg tracking-wide flex items-center justify-center gap-2 transition-all ${
          selectedRole
            ? "bg-primary text-primary-foreground"
            : "bg-[#1C1B1B] text-muted-foreground cursor-not-allowed"
        }`}
      >
        CONTINUAR
        <ArrowRight className="w-5 h-5" />
      </motion.button>
    </div>
  )
}
