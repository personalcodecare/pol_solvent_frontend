'use client'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import React from 'react'

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

interface AnimatedListProps<T = unknown> {
  items?: T[]
  renderItem?: (item: T) => React.ReactNode
  children?: React.ReactNode
  className?: string
}

export const AnimatedList = <T,>({
  items,
  renderItem,
  children,
  className,
}: AnimatedListProps<T>) => {
  return (
    <motion.ul
      key={items ? JSON.stringify(items) : undefined}
      variants={listVariants}
      initial="hidden"
      exit="hidden"
      animate="visible"
      transition={{ type: 'linear', duration: 0.25 }}
      className={cn(`flex list-none flex-col gap-[20px]`, className)}
    >
      {items && renderItem
        ? items.map((item, index) => (
            <motion.li key={index} variants={itemVariants}>
              {renderItem(item)}
            </motion.li>
          ))
        : React.Children.map(children, (child, index) => (
            <motion.li key={index} variants={itemVariants}>
              {child}
            </motion.li>
          ))}
    </motion.ul>
  )
}
