'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface CountdownProps {
  countdown?: number | null
  initialTime?: number
  onComplete: () => void
}

export const Countdown: React.FC<CountdownProps> = ({
  countdown,
  initialTime,
  onComplete,
}) => {
  const [timeLeft, setTimeLeft] = useState(initialTime ?? 0)

  useEffect(() => {
    if (initialTime) {
      if (timeLeft === 0) {
        onComplete()
        return
      }

      const timer = setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)

      return () => clearTimeout(timer)
    } else if (countdown !== undefined && countdown === 0) {
      onComplete()
    }
  }, [timeLeft, countdown, initialTime, onComplete])

  const displayTime = countdown ?? timeLeft

  const getColor = () => {
    if (displayTime <= 3) return 'text-lavaOrange'
    return 'text-white'
  }

  return (
    <motion.div
      className={`text-[48px] leading-[48px] ${getColor()}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      {displayTime}
    </motion.div>
  )
}
