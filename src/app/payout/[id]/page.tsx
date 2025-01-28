'use client'

import { AnimatedList } from '@/app/components/animations/animated-list'
import { AnimatedText } from '@/app/components/animations/animated-text'
import { ErrorPage } from '@/app/components/shared/error-page'
import { Header } from '@/app/components/shared/header'
import { PotentialReturn } from '@/app/components/shared/potential-return'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { getDuel } from '@/services/get-duel'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

const useDuels = (duelId: number | null) => {
  return useQuery({
    queryKey: ['duels'],
    queryFn: () => getDuel(duelId),
    enabled: !!duelId,
  })
}

export default function Page() {
  const router = useRouter()
  const params = useParams()
  const duelId = Number(params.id)
  const { data: duel, error, isPending } = useDuels(duelId)

  if (error) {
    if (error.message.includes('not found')) {
      return (
        <ErrorPage
          title="Duel Not Found"
          message="The duel you're looking for doesn't exist."
          action={{
            label: 'Go Back',
            onClick: () => router.back(),
          }}
        />
      )
    }
    return <ErrorPage message={'Error while finding game details'}></ErrorPage>
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-brightGreen pb-[85px] text-darkMain">
      <Header isGameStarting={true} />
      <div className="flex flex-col items-center justify-center gap-[20px] px-[25px] pt-[20px] md:pt-[114px]">
        <AnimatedText>
          <h1 className="pb-[20px] text-center text-[64px] leading-[64px]">
            Payout
          </h1>
        </AnimatedText>

        {isPending ? (
          <>
            <span>Total Return</span>
            <Skeleton className="h-[93px] w-[340px]" />
            <span>Reward</span>
            <Skeleton className="h-[93px] w-[340px]" />
          </>
        ) : null}

        {!isPending && !duel ? (
          <span className="text-center text-[24px] leading-[24px]">
            Duel not found
          </span>
        ) : null}

        {duel && !isPending && (
          <>
            <AnimatedList className="items-center">
              <span>Total Return</span>
              <PotentialReturn
                key={duel.id}
                value={duel.wagerAmount}
                valueInUsd={duel.wagerAmount}
                currency="SV"
                backgroundColor="transparent"
                borderColor="#3B3E43"
                textColor="#3B3E43"
                secondaryTextColor="#474C52"
              />

              <span>Reward</span>

              <PotentialReturn
                key={duel.id}
                value={`(+${duel.wagerAmount})`}
                valueInUsd={`+${duel.wagerAmount}`}
                currency="SV"
                backgroundColor="transparent"
                borderColor="transparent"
                textColor="#3B3E43"
                secondaryTextColor="#474C52"
                customValueInUsd={`(+$${duel.wagerAmount})`}
              />
            </AnimatedList>
          </>
        )}

        <AnimatedList>
          <Link href="/play">
            <Button>Continue</Button>
          </Link>
        </AnimatedList>
      </div>
    </div>
  )
}
