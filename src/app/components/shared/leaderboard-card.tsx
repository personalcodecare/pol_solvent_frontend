type LeaderboardCardProps = {
  rank: number
  address: string
  value: number | string
  valueInUsd: number | string
  currency: string
  backgroundColor?: string
}

export const LeaderboardCard = (props: LeaderboardCardProps) => {
  const backgroundColor = props.backgroundColor || 'brightGreen'

  return (
    <div className="w-[340px]">
      <div className="flex">
        <div
          className={`flex h-[56px] min-w-[55px] items-center justify-center bg-${backgroundColor}`}
        >
          <span className="text-[24px] leading-[16px] text-darkSecondary">
            {props.rank}
          </span>
        </div>
        <div
          className={`flex h-[56px] w-full items-center justify-start bg-${backgroundColor} p-[20px] text-[20px] leading-[16px] text-darkSecondary opacity-80`}
        >
          <span>{props.address}</span>
        </div>
      </div>

      <div className={`h-[93px] bg-${backgroundColor} p-[20px] text-darkMain`}>
        <div className="flex justify-between">
          <div className="flex flex-col gap-[5px]">
            <span className="text-[32px] leading-[32px]">{props.value}</span>
            <span className="text-[16px] leading-[16px] text-darkSecondary">
              ${props.valueInUsd}
            </span>
          </div>
          <span className="text-[32px] leading-[32px]">{props.currency}</span>
        </div>
      </div>
    </div>
  )
}
