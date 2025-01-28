import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'text-[24px] leading-[32px] inline-flex items-center justify-center whitespace-nowrap font-normal ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-20 disabled:cursor-not-allowed disabled:shadow-none active:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-white text-darkMain hover:shadow-hover-white',
        warning: 'bg-softGold text-darkMain hover:shadow-hover-gold',
        success: 'bg-brightGreen text-darkMain hover:shadow-hover-green',
        outline:
          'border-[3px] border-steelBlue bg-transparent text-steelBlue hover:shadow-hover-white hover:border-white hover:text-white',
        destructive: 'bg-lavaOrange text-darkMain hover:shadow-hover-orange',
      },
      size: {
        default: 'w-[340px] h-[60px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
