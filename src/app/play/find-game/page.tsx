'use client'

import { AnimatedList } from '@/app/components/animations/animated-list'
import { AnimatedText } from '@/app/components/animations/animated-text'
import { ErrorPage } from '@/app/components/shared/error-page'
import { FindGameCard } from '@/app/components/shared/find-game-card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { getDuels } from '@/services/get-duels'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

const useDuels = () => {
  return useQuery({
    queryKey: ['duels'],
    queryFn: getDuels,
    refetchInterval: 5000,
    refetchOnWindowFocus: true,
    refetchIntervalInBackground: true,
  })
}

export default function Page() {
  const { data: duels, isLoading, error } = useDuels()

  if (error) {
    return (
      <>
        <ErrorPage message={'Error while finding games'}></ErrorPage>
      </>
    )
  }

  return (
    <div className="pb-[85px]">
      <div className="flex flex-col items-center justify-center gap-[20px] px-[25px] pt-[20px] md:pt-[114px]">
        <AnimatedText>
          <h1 className="pb-[20px] text-center text-[36px] leading-[36px] text-white md:text-[64px] md:leading-[64px]">
            Find Game
          </h1>
        </AnimatedText>

        {isLoading && (
          <>
            <Skeleton className="h-[93px] w-[340px]" />
            <Skeleton className="h-[93px] w-[340px]" />
            <Skeleton className="h-[93px] w-[340px]" />
          </>
        )}

        {!isLoading &&
          (!duels || duels.length === 0 ? (
            <span className="text-center text-[24px] leading-[24px] text-white">
              No duels available
            </span>
          ) : null)}

        {duels &&
          duels.length > 0 &&
          duels.map((duel) => (
            <FindGameCard
              key={duel.id}
              id={duel.id}
              value={duel.wagerAmount}
              valueInUsd={duel.wagerAmount}
              currency="SV"
            />
          ))}

        <AnimatedList>
          <Link href="/play/wager">
            <Button>Back</Button>
          </Link>
        </AnimatedList>
      </div>
    </div>
  )
}
