import { motion } from 'framer-motion'
import PaperIcon from '../icons/paper'
import RockIcon from '../icons/rock'
import ScissorsIcon from '../icons/scissors'

const variants = {
  rock: {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
  },
  paper: {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  },
  scissors: {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
  },
}

export const AnimatedChoiceIcon = ({
  choice,
}: {
  choice?: 'rock' | 'paper' | 'scissors' | null
}) => (
  <motion.div
    layout
    initial={choice ? variants[choice].initial : { scale: 1 }}
    animate={
      choice ? { ...variants[choice].animate, scale: 1.25 } : { scale: 1.25 }
    }
    exit={{ scale: 0 }}
    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    className="flex flex-col items-center"
  >
    <div
      className={`cursor-pointer border-[3px] border-softGold transition-colors duration-300 ease-in-out `}
    >
      {choice === 'rock' && <RockIcon />}
      {choice === 'paper' && <PaperIcon />}
      {choice === 'scissors' && <ScissorsIcon />}
    </div>
    {choice && (
      <motion.span
        initial={variants[choice].initial}
        animate={variants[choice].animate}
        transition={{ delay: 0.2 }}
        className="text-[24px] capitalize text-softGold"
      >
        {choice}
      </motion.span>
    )}
  </motion.div>
)
