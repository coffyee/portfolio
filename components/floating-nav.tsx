"use client"

import { motion } from "framer-motion"

interface FloatingNavProps {
  navItems: {
    name: string
    section: string
  }[]
  activeSection: string
  onNavClick: (section: string) => void
}

export function FloatingNav({ navItems, activeSection, onNavClick }: FloatingNavProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 hidden md:block"
    >
      <div className="bg-background/20 backdrop-blur-lg border border-white/10 rounded-full px-4 py-2 shadow-[0_0_15px_rgba(149,128,255,0.5)]">
        <div className="flex items-center space-x-4">
          {navItems.map((item) => (
            <button
              key={item.section}
              onClick={() => onNavClick(item.section)}
              className={`relative px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                activeSection === item.section ? "text-white" : "text-muted-foreground hover:text-white"
              }`}
            >
              {activeSection === item.section && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full -z-10"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

