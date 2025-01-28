'use client'

import { cn } from '@/lib/utils'

type Props = {
  value: number | string
  valueInUsd?: number | string
  valueInToken?: number | string
  currency?: string
  backgroundColor?: string
  borderColor?: string
  textColor?: string
  secondaryTextColor?: string
  customValueInUsd?: string
  valuePrefix?: string
}

export const PotentialReturn = (props: Props) => {
  const backgroundColor = props.backgroundColor || 'transparent'
  const borderColor = props.borderColor || 'softGold'
  const textColor = props.textColor || 'white'
  const secondaryTextColor = props.secondaryTextColor || 'steelBlue'

  const getBorderClass = () => {
    return borderColor === 'softGold' ? 'border-softGold' : ''
  }

  const getBackgroundClass = () => {
    return backgroundColor === 'transparent' ? 'bg-transparent' : ''
  }

  const getTextColorClass = () => {
    return textColor === 'white' ? 'text-white' : ''
  }

  const getSecondaryTextColorClass = () => {
    return secondaryTextColor === 'steelBlue' ? 'text-steelBlue' : ''
  }

  const getSecondaryValue = () => {
    if (props.customValueInUsd) {
      return props.customValueInUsd
    }
    if (props.valueInUsd) {
      return `$${props.valueInUsd}`
    }
    if (props.valueInToken) {
      return `${props.valueInToken} SV`
    }
    return ''
  }

  const getSecondaryValueLabel = () => {
    if (props.valueInUsd) {
      return `Value in USD: ${props.valueInUsd}`
    }
    return `Value in Token: ${props.valueInToken}`
  }

  return (
    <article
      className={cn('w-[340px] border-[3px]', getBorderClass())}
      style={{
        borderColor: borderColor !== 'softGold' ? borderColor : undefined,
      }}
      role="contentinfo"
      aria-label="Potential return card"
    >
      <section
        className={cn(
          'h-[93px] p-[20px]',
          getBackgroundClass(),
          getTextColorClass(),
        )}
        style={{
          backgroundColor:
            backgroundColor !== 'transparent' ? backgroundColor : undefined,
          color: textColor !== 'white' ? textColor : undefined,
        }}
      >
        <div className="flex justify-between">
          <div className="flex flex-col gap-[5px]">
            <span
              className="text-[32px] leading-[32px]"
              role="heading"
              aria-level={1}
            >
              {props.valuePrefix && <span>{props.valuePrefix}</span>}
              {props.value}
            </span>
            <span
              className={cn(
                'text-[16px] leading-[16px]',
                getSecondaryTextColorClass(),
              )}
              style={{
                color:
                  secondaryTextColor !== 'steelBlue'
                    ? secondaryTextColor
                    : undefined,
              }}
              aria-label={getSecondaryValueLabel()}
            >
              {getSecondaryValue()}
            </span>
          </div>
          <span
            className="text-[32px] leading-[32px]"
            aria-label={`Currency: ${props.currency}`}
          >
            {props.currency}
          </span>
        </div>
      </section>
    </article>
  )
}
