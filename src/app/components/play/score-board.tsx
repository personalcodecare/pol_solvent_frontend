'use client'
import { useEffect, useState } from 'react'

type ScoreBoardProps = {
  score: number
  title: string
  maxScore?: number
  alignEnd?: boolean
}

export const ScoreBoard = ({
  score,
  title,
  maxScore = 2,
  alignEnd = false,
}: ScoreBoardProps) => {
  const [animatedScore, setAnimatedScore] = useState(score)

  useEffect(() => {
    setAnimatedScore(score)
  }, [score])

  return (
    <div className="flex flex-col gap-[10px]">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div
        className={`flex gap-[10px] ${alignEnd ? 'justify-end' : ''}`}
        role="group"
        aria-label={`Score: ${score} out of ${maxScore}`}
      >
        {[...Array(maxScore)].map((_, i) => (
          <div
            key={i}
            className="relative h-[18px] w-[18px] overflow-hidden bg-[#636569]"
            aria-hidden="true"
          >
            <div
              className={`absolute inset-0 bg-brightGreen transition-all duration-300 ease-out`}
              style={{
                transform: `translateY(${i < animatedScore ? '0%' : '100%'})`,
                opacity: i < animatedScore ? 1 : 0,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
