'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useSelectedLayoutSegment } from 'next/navigation'
import FrozenRoute from './frozen-route'

interface PageAnimatePresenceProps {
  children: React.ReactNode
  className?: React.ComponentProps<typeof motion.div>['className']
  style?: React.ComponentProps<typeof motion.div>['style']
  initial?: React.ComponentProps<typeof motion.div>['initial']
  animate?: React.ComponentProps<typeof motion.div>['animate']
  exit?: React.ComponentProps<typeof motion.div>['exit']
}

const PageAnimatePresence = ({
  children,
  className,
  style,
  initial,
  animate,
  exit,
}: PageAnimatePresenceProps) => {
  const segment = useSelectedLayoutSegment()
  return (
    <AnimatePresence mode="wait" initial={true}>
      {/**
       * We use `motion.div` as the first child of `<AnimatePresence />` Component so we can specify page animations at the page level.
       * The `motion.div` Component gets re-evaluated when the `key` prop updates, triggering the animation's lifecycles.
       * During this re-evaluation, the `<FrozenRoute />` Component also gets updated with the new route components.
       */}
      <motion.div
        className={className}
        style={style}
        key={segment}
        initial={initial}
        animate={animate}
        exit={exit}
      >
        <FrozenRoute>{children}</FrozenRoute>
      </motion.div>
    </AnimatePresence>
  )
}

export default PageAnimatePresence
