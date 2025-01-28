'use client'
import { useEffect, useState } from 'react'
import { Header } from './header'

type GameStartingProps = {
  onCountdownEnd?: () => void
  isWaiting?: boolean
  children?: React.ReactNode
}

export const GameStarting = ({
  onCountdownEnd,
  isWaiting = false,
  children,
}: GameStartingProps) => {
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    if (isWaiting) return
    if (!onCountdownEnd) return

    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount === 1) {
          clearInterval(timer)
          onCountdownEnd()
        }
        return prevCount - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [onCountdownEnd, isWaiting])

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-softGold">
      <Header isGameStarting={true} />
      <div className="flex flex-grow flex-col items-center justify-center">
        {isWaiting ? (
          <div className="flex flex-col items-center justify-center gap-[20px]">
            <span className="text-center text-[48px] leading-[48px] text-darkMain">
              <span className="flex flex-row">Waiting</span>
            </span>
            {children && children}
          </div>
        ) : (
          <>
            <span className="text-center text-[48px] leading-[48px] text-darkMain">
              Game <br />
              Starting
            </span>
            <div className="text-[64px] font-bold text-darkMain">
              {countdown}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
