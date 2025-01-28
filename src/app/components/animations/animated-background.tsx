'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

export const AnimatedBackground = () => {
  return (
    <motion.div className="pointer-events-none absolute inset-0 z-[-1]">
      <motion.div>
        <Image
          src="/images/character_bg.png"
          alt="Background effect"
          layout="fill"
          objectFit="cover"
          className="hidden opacity-20 md:block"
        />
      </motion.div>
    </motion.div>
  )
}
