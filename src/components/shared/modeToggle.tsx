"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="w-10 h-10" />

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative rounded-full w-10 h-10 transition-colors hover:bg-muted active:scale-90 cursor-pointer overflow-hidden"
      aria-label="Toggle theme"
    >
      <AnimatePresence initial={false}>
        {theme === "dark" ? (
          <motion.div
            key="moon"
            initial={{ y: 15, opacity: 0, rotate: 45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -15, opacity: 0, rotate: -45 }}
            transition={{ type: "spring", stiffness: 600, damping: 30 }}
            className="absolute"
          >
            <Moon className="h-[1.2rem] w-[1.2rem] text-blue-400 fill-blue-400/20" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ y: 15, opacity: 0, rotate: -45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -15, opacity: 0, rotate: 45 }}
            transition={{ type: "spring", stiffness: 600, damping: 30 }}
            className="absolute"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] text-orange-500 fill-orange-500/20" />
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  )
}