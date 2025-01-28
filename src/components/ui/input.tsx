import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  prefix?: string
  token?: string
  tokenValue?: string
  hasError?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, prefix, token, tokenValue, hasError, ...props }, ref) => {
    return (
      <div
        className={cn(
          'relative flex h-[93px] max-w-[340px] border-b-[3px] border-white bg-[#B8CAE033] px-[20px] pb-[20px] text-[32px] leading-[32px] text-white outline-none',
          hasError && 'border-lavaOrange',
          hasError && 'bg-[#F5450A33]',
        )}
      >
        {prefix && (
          <span className="absolute left-[20px] top-[20px] text-[32px] text-white">
            {prefix}
          </span>
        )}
        <input
          type={type}
          className={cn(
            'w-full bg-transparent pr-[60px] text-white outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
            prefix && 'pl-[30px]',
            className,
          )}
          ref={ref}
          {...props}
        />
        <span className="absolute bottom-[5px] left-[20px] text-[16px] text-steelBlue">
          {tokenValue} {token}
        </span>
        {/* <span className="absolute right-[20px] top-[20px] h-[70px] text-[32px] text-white">
          SV
        </span> */}
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
