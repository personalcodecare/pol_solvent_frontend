'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { AnimatedText } from '../components/animations/animated-text'
import PaperIcon from '../components/icons/paper'
import RockIcon from '../components/icons/rock'
import ScissorsIcon from '../components/icons/scissors'

export default function Page() {
  return (
    <>
      <section className="mx-auto flex max-w-[720px] flex-col gap-[40px] px-[25px] pb-[40px] pt-[20px] text-white md:pb-[176px] md:pt-[115px]">
        <AnimatedText>
          <h1 className="text-[48px]">How to play</h1>
        </AnimatedText>

        <AnimatedText>
          <div className="flex flex-col gap-[20px]">
            <h2 className="text-[24px] leading-[24px]">The game</h2>

            <p className="text-[16px] leading-[20px]">
              Decision Duel{' '}
              <span className="text-steelBlue">
                is a fast-paced, player-versus-player game based on the classic
                Rock, Paper, Scissors format.
              </span>{' '}
              <br />
              <br />
              <span className="text-steelBlue">
                Each match consists of a
              </span>{' '}
              best-of-three series{' '}
              <span className="text-steelBlue">
                where players quickly choose from
              </span>{' '}
              rock, paper, or scissors{' '}
              <span className="text-steelBlue">within</span> a 15-second
              timeframe.
            </p>

            <div className="flex justify-around">
              <div className="flex flex-col items-center justify-center gap-[10px]">
                <RockIcon />
                <span>Rock</span>
              </div>

              <div className="flex flex-col items-center justify-center gap-[10px]">
                <PaperIcon />
                <span>Paper</span>
              </div>

              <div className="flex flex-col items-center justify-center gap-[10px]">
                <ScissorsIcon />
                <span>Scissors</span>
              </div>
            </div>

            <p>
              What happens if you don’t make a selection?{' '}
              <span className="text-steelBlue">
                The game automates selection confirmation if the timer runs out.
                If you don’t make a selection, the game will randomly select an
                option for you.
              </span>
            </p>
          </div>

          <div className="flex flex-col gap-[20px]">
            <h2 className="text-[24px] leading-[24px]">Starting Out</h2>

            <p className="text-steelBlue">
              Players can <span className="text-white">host a game</span> by
              specifying the game type and wager amount, or{' '}
              <span className="text-white">join existing games</span>,
              facilitated by a user-friendly interface that sorts games by wager
              size.
            </p>
          </div>

          <div className="flex flex-col gap-[20px]">
            <h2 className="text-[24px] leading-[24px] text-brightGreen">
              Payouts
            </h2>

            <p className="text-steelBlue">
              When A match is over, the winner receives the spoils via{' '}
              <span className="text-white">SV tokens</span>. A Proprietary{' '}
              <span className="text-white">Smart contract</span> is implemented
              to manage wagers and payouts.{' '}
              <span className="text-white">
                Fairness and security is prioritized
              </span>{' '}
              when handling in-game outcomes.
            </p>
          </div>

          <div className="flex flex-col gap-[20px]">
            <h2 className="text-[24px] leading-[24px] text-brightGreen">
              Weekly Rewards
            </h2>

            <p className="text-steelBlue">
              Solvent Labs promotes a more equitable gaming environment by
              incorporating a{' '}
              <span className="text-white">
                weekly token redistribution model
              </span>{' '}
              that rewards the{' '}
              <span className="text-brightGreen">top two winners</span>,{' '}
              <span className="text-lavaOrange">bottom two losers</span>, and{' '}
              <span className="text-softGold">most active player</span>.
            </p>
          </div>
        </AnimatedText>

        <Link href="/">
          <Button variant="outline" className="w-full">
            Back
          </Button>
        </Link>
      </section>
    </>
  )
}
