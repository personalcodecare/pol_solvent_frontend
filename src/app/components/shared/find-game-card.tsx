'use client'
import { useRouter } from 'next/navigation'

type FindGameCardProps = {
  id: number | string
  value: number | string
  valueInUsd: number | string
  currency: string
  backgroundColor?: string
}

export const FindGameCard = (props: FindGameCardProps) => {
  const router = useRouter()
  const backgroundColor = props.backgroundColor || 'softGold'

  const handleClick = () => {
    router.push(`/play/find-game/${props.id}`)
  }

  return (
    <article
      className="w-[340px] cursor-pointer"
      role="contentinfo"
      aria-label="Find game card"
      onClick={handleClick}
    >
      <section
        className={`h-[93px] bg-${backgroundColor} p-[20px] text-darkMain`}
      >
        <div className="flex justify-between">
          <div className="flex flex-col gap-[5px]">
            <span
              className="text-[32px] leading-[32px]"
              role="heading"
              aria-level={1}
            >
              {props.value}
            </span>
            <span
              className="text-[16px] leading-[16px] text-darkSecondary"
              aria-label={`Value in USD: ${props.valueInUsd}`}
            >
              ${props.valueInUsd}
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
