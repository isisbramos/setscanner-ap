"use client"

import { motion } from "framer-motion"
import { Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message === "Invalid login credentials" 
        ? "E-mail ou senha incorretos" 
        : error.message)
      setIsLoading(false)
      return
    }

    router.push("/identificacao")
  }

  return (
    <div className="min-h-screen bg-[#0E0E0E] flex flex-col px-6 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="font-[var(--font-bebas-neue)] text-4xl tracking-[0.2em] text-white mb-2">
          SETSCANN
        </h1>
        <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase">
          Login
        </p>
      </motion.div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
        >
          <p className="text-sm text-red-400 text-center">{error}</p>
        </motion.div>
      )}

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleSubmit}
        className="flex-1 flex flex-col gap-6"
      >
        {/* Email Field */}
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground uppercase tracking-wider">
            E-mail
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            required
            disabled={isLoading}
            className="w-full px-4 py-4 bg-[#131313] border border-[#1C1B1B] rounded-lg text-white placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-mono text-sm disabled:opacity-50"
          />
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground uppercase tracking-wider">
            Senha
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={isLoading}
              className="w-full px-4 py-4 pr-12 bg-[#131313] border border-[#1C1B1B] rounded-lg text-white placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-mono text-sm disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Forgot Password */}
        <Link 
          href="#" 
          className="text-sm text-primary hover:underline self-end"
        >
          Esqueceu a senha?
        </Link>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: isLoading ? 1 : 1.02 }}
          whileTap={{ scale: isLoading ? 1 : 0.98 }}
          type="submit"
          disabled={isLoading}
          className="mt-auto w-full py-4 px-6 bg-primary text-primary-foreground font-semibold rounded-lg text-lg tracking-wide flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              ENTRANDO...
            </>
          ) : (
            <>
              ENTRAR
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </motion.button>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-[#1C1B1B]" />
          <span className="text-xs text-muted-foreground">ou</span>
          <div className="flex-1 h-px bg-[#1C1B1B]" />
        </div>

        {/* Register Link */}
        <p className="text-center text-muted-foreground text-sm">
          Não tem uma conta?{" "}
          <Link href="/registro" className="text-primary hover:underline">
            Cadastre-se
          </Link>
        </p>
      </motion.form>
    </div>
  )
}
