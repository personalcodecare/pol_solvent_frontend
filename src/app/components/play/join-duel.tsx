'use client'

import { PotentialReturn } from '@/app/components/shared/potential-return'
import { Input } from '@/components/ui/input'
import { useMemo } from 'react'
import { AnimatedList } from '../animations/animated-list'

type JoinDuelProps = {
  wagerAmount: number | string
  fee?: number
}

const JoinDuelComponent = ({ wagerAmount, fee }: JoinDuelProps) => {
  const potentialReturn = useMemo(() => {
    const wager = Number(wagerAmount)
    if (isNaN(wager) || wager <= 0 || !fee) {
      return 0
    }
    const feePercentage = fee / 100
    const result = wager * 2 - wager * 2 * feePercentage
    const truncatedResult = Math.floor(result * 100000) / 100000
    return truncatedResult
  }, [wagerAmount, fee])

  return (
    <AnimatedList className="flex flex-col items-center justify-center gap-[20px]">
      <span className="text-[16px] leading-[20.48px] text-white">
        Your Wager
      </span>

      <Input value={wagerAmount} disabled />

      <span className="text-[16px] leading-[20.48px] text-white">
        Potential Return
      </span>

      <PotentialReturn
        valueInUsd={0.123}
        value={potentialReturn}
        currency="SV"
      />

      <p className="max-w-[340px] text-center text-[14px] leading-[17.92px] text-white">
        Bets will not be withdrawn until all players have joined the match
      </p>
    </AnimatedList>
  )
}

export default JoinDuelComponent
