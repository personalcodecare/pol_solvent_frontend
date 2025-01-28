'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { AnimatedList } from '../components/animations/animated-list'
import { AnimatedText } from '../components/animations/animated-text'
import { LeaderboardCard } from '../components/shared/leaderboard-card'

export default function Page() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-[20px] pt-[20px] md:pt-[114px]">
        <AnimatedText>
          <h1 className="pb-[20px] text-center text-[64px] leading-[64px] text-white">
            Leaders
          </h1>

          <div className="flex flex-col pb-[20px] text-center">
            <span className="text-white">Weekly Distribution In</span>
            <span className="text-brightGreen">4d 5h 30m 49s</span>
          </div>
        </AnimatedText>

        <AnimatedList>
          <LeaderboardCard
            rank={1}
            address="0x000...0000"
            value="943.25"
            valueInUsd="4276.06"
            currency="SV"
          />

          <LeaderboardCard
            rank={2}
            address="0x000...0000"
            value="580.50"
            valueInUsd="2496.15"
            currency="SV"
          />

          <LeaderboardCard
            rank={3}
            address="0x000...0000"
            value="441.18"
            valueInUsd="2000.00"
            currency="SV"
            backgroundColor="steelBlue"
          />

          <Link href="/">
            <Button variant="outline">Back</Button>
          </Link>
        </AnimatedList>
      </div>
    </>
  )
}
