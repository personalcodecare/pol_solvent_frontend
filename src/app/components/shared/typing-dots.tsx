// import { useEffect, useState } from 'react'

// interface TypingDotsProps {
//   className?: string
// }

// export const TypingDots = ({ className = '' }: TypingDotsProps) => {
//   const [dots, setDots] = useState('')

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setDots((prev) => (prev.length < 3 ? prev + '.' : ''))
//     }, 500)

//     return () => clearInterval(interval)
//   }, [])

//   return (
//     <div className={`flex items-center justify-center ${className}`}>
//       <span>{dots}</span>
//     </div>
//   )
// }

import { motion } from 'framer-motion'
import React from 'react'

export const TypingDots: React.FC<{ className?: string }> = ({
  className = '',
}) => {
  const dotVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  const dotTransition = {
    duration: 0.5,
    repeat: Infinity,
    repeatType: 'reverse' as const,
    ease: 'easeInOut',
  }

  return (
    <div className={`inline-flex w-7 justify-between ${className}`}>
      {[0, 1, 2].map((index) => (
        <motion.span
          key={index}
          variants={dotVariants}
          initial="hidden"
          animate="visible"
          transition={{ ...dotTransition, delay: index * 0.2 }}
        >
          .
        </motion.span>
      ))}
    </div>
  )
}
