import { motion } from 'framer-motion'
import React from 'react'

interface AnimatedTextProps {
  children: React.ReactNode
  className?: string
}

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  children,
  className = '',
}) => {
  return (
    <motion.div
      variants={textVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
