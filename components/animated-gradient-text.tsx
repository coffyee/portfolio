"use client"

import { motion } from "framer-motion"

interface AnimatedGradientTextProps {
  text: string
}

export function AnimatedGradientText({ text }: AnimatedGradientTextProps) {
  return (
    <motion.h1
      className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 bg-size-200"
      style={{
        backgroundSize: "200% auto",
      }}
      animate={{
        backgroundPosition: ["0% center", "200% center"],
      }}
      transition={{
        duration: 5,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      }}
    >
      {text}
    </motion.h1>
  )
}

