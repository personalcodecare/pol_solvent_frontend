'use client'
import { AnimatedChoiceIcon } from '@/app/components/animations/animated-choice-icon'
import PaperIcon from '@/app/components/icons/paper'
import RockIcon from '@/app/components/icons/rock'
import ScissorsIcon from '@/app/components/icons/scissors'
import { GameChoiceIcon } from '@/app/components/play/game-choice-icon'
import { ScoreBoard } from '@/app/components/play/score-board'
import { GameStarting } from '@/app/components/shared/game-starting'
import { TypingDots } from '@/app/components/shared/typing-dots'
import { GAME_CHOICES } from '@/app/constants/game-choices'
import { GAME_RESULTS, GAME_STATUS } from '@/app/constants/game-status'
import { Button } from '@/components/ui/button'
import {
  determineWinnerPlayWithAi,
  displayHeaderMessage,
  getAiChoice,
  getGameStep,
  getHeaderTextColor,
} from '@/utils/game-helper'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'

export default function Page() {
  const [selectedChoice, setSelectedChoice] = useState<
    (typeof GAME_CHOICES)[number] | null
  >(null)
  const [aiChoice, setAiChoice] = useState<
    (typeof GAME_CHOICES)[number] | null
  >(null)
  const [roundResult, setRoundResult] = useState<
    (typeof GAME_RESULTS)[keyof typeof GAME_RESULTS] | null
  >(null)
  const [playerChoiceConfirmed, setPlayerChoiceConfirmed] = useState(false)
  const [playerScore, setPlayerScore] = useState(0)
  const [aiScore, setAiScore] = useState(0)

  const [isStarting, setIsStarting] = useState(true)
  const [gameEnded, setGameEnded] = useState(false)
  const { width, height } = useWindowSize()

  useEffect(() => {
    if (!playerChoiceConfirmed || !selectedChoice) {
      return
    }

    const timer = setTimeout(() => {
      const aiSelectedChoice = getAiChoice()
      setAiChoice(aiSelectedChoice)
      const winner = determineWinnerPlayWithAi(selectedChoice, aiSelectedChoice)

      const resultMap = {
        player: { score: setPlayerScore, result: GAME_RESULTS.WIN },
        ai: { score: setAiScore, result: GAME_RESULTS.LOSE },
        tie: { score: null, result: GAME_RESULTS.TIE },
      }

      const { score, result } = resultMap[winner]
      score?.((prev: number) => {
        const newScore = prev + 1
        if (newScore === 2) {
          setGameEnded(true)
          return newScore
        }
        return newScore
      })
      setRoundResult(result)
    }, 2000)

    return () => clearTimeout(timer)
  }, [playerChoiceConfirmed, selectedChoice])

  const getSelectedChoiceColor = useCallback(
    (choice: string) => {
      if (selectedChoice === choice && playerChoiceConfirmed)
        return 'border-softGold'
      if (selectedChoice === choice && !playerChoiceConfirmed)
        return 'border-white'
      return 'border-transparent'
    },
    [selectedChoice, playerChoiceConfirmed],
  )

  const getResultStyles = useCallback(
    (choice: string) => {
      if (!selectedChoice || !aiChoice || !roundResult) {
        return { border: 'border-transparent', text: 'text-softGold' }
      }

      if (roundResult === GAME_RESULTS.TIE) {
        return {
          border: 'border-white shadow-white',
          text: 'text-red text-shadow-white ',
        }
      }

      const playerWon = roundResult === GAME_RESULTS.WIN
      const isPlayerChoice = choice === selectedChoice
      const isAiChoice = choice === aiChoice

      if ((playerWon && isPlayerChoice) || (!playerWon && isAiChoice)) {
        return {
          border: 'border-brightGreen shadow-green',
          text: 'text-brightGreen text-shadow-green',
        }
      } else if ((playerWon && isAiChoice) || (!playerWon && isPlayerChoice)) {
        return {
          border: 'border-lavaOrange opacity-60',
          text: 'text-lavaOrange opacity-60',
        }
      }

      return { border: 'border-transparent', text: 'text-softGold' }
    },
    [selectedChoice, aiChoice, roundResult],
  )

  const handleCountdownEnd = useCallback(() => {
    setIsStarting(false)
  }, [])

  if (isStarting) {
    return <GameStarting onCountdownEnd={handleCountdownEnd} />
  }

  return (
    <div className="flex w-full justify-center px-[25px]">
      {gameEnded && playerScore >= 2 && (
        <Confetti width={width} height={height} recycle={false} />
      )}

      <div className="w-full max-w-[380px] pb-[85px]">
        <div className="flex flex-col items-center justify-center gap-[20px] pt-[20px] md:pt-[114px]">
          <h1
            className="pb-[20px] text-center text-[48px] leading-[48px]"
            style={{ color: getHeaderTextColor(roundResult) }}
          >
            {displayHeaderMessage({
              playerChoiceConfirmed,
              roundResult,
              gameEnded,
              playerScore,
            })}
          </h1>

          <div className="flex w-full flex-row justify-between">
            <ScoreBoard score={playerScore} title="You" />
            <ScoreBoard score={aiScore} title="Opponent" alignEnd={true} />
          </div>

          {getGameStep(playerChoiceConfirmed, aiChoice) ===
            GAME_STATUS.CHOOSE && (
            <motion.div
              className="flex w-full justify-around"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex w-full justify-around">
                <div className="flex flex-col items-center justify-center gap-[10px]">
                  <div
                    className={`cursor-pointer border-[3px] transition-colors duration-300 ease-in-out ${getSelectedChoiceColor(
                      'rock',
                    )}`}
                    onClick={() => setSelectedChoice('rock')}
                  >
                    <RockIcon />
                  </div>
                  <span>Rock</span>
                </div>

                <div className="flex flex-col items-center justify-center gap-[10px]">
                  <div
                    className={`cursor-pointer border-[3px] transition-colors duration-300 ease-in-out ${getSelectedChoiceColor(
                      'paper',
                    )}`}
                    onClick={() => setSelectedChoice('paper')}
                  >
                    <PaperIcon />
                  </div>
                  <span>Paper</span>
                </div>

                <div className="flex flex-col items-center justify-center gap-[10px]">
                  <div
                    className={`cursor-pointer border-[3px] transition-colors duration-300 ease-in-out ${
                      selectedChoice === 'scissors'
                        ? 'border-white'
                        : 'border-transparent'
                    }`}
                    onClick={() => setSelectedChoice('scissors')}
                  >
                    <ScissorsIcon />
                  </div>
                  <span>Scissors</span>
                </div>
              </div>
            </motion.div>
          )}

          {getGameStep(playerChoiceConfirmed, aiChoice) ===
          GAME_STATUS.LOCKED_IN ? (
            <div className="flex w-full justify-center">
              <AnimatedChoiceIcon choice={selectedChoice} />
            </div>
          ) : null}

          {getGameStep(playerChoiceConfirmed, aiChoice) ===
          GAME_STATUS.RESULT ? (
            <div className="flex w-full justify-around">
              <motion.div
                className="flex flex-col items-center"
                initial={{ x: '50%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className={`border-[3px] ${getResultStyles(selectedChoice || '').border}`}
                >
                  {selectedChoice && (
                    <GameChoiceIcon
                      choice={selectedChoice}
                      size={108}
                      roundResult={roundResult}
                      isPlayer={true}
                    />
                  )}
                </div>
                <span
                  className={`text-[24px] ${getResultStyles(selectedChoice || '').text}`}
                >
                  {selectedChoice}
                </span>
              </motion.div>

              <motion.div
                className="flex flex-col items-center"
                initial={{ x: '-50%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div
                  className={`border-[3px] ${getResultStyles(aiChoice || '').border}`}
                >
                  {aiChoice && (
                    <GameChoiceIcon
                      choice={aiChoice}
                      size={108}
                      roundResult={roundResult}
                      isPlayer={false}
                    />
                  )}
                </div>
                <span
                  className={`text-[24px] ${getResultStyles(aiChoice || '').text}`}
                >
                  {aiChoice}
                </span>
              </motion.div>
            </div>
          ) : null}

          {getGameStep(playerChoiceConfirmed, aiChoice) !==
          GAME_STATUS.RESULT ? (
            <Button
              variant="warning"
              disabled={playerChoiceConfirmed || !selectedChoice}
              onClick={() => {
                if (selectedChoice) {
                  setPlayerChoiceConfirmed(true)
                }
              }}
            >
              Confirm Selection
            </Button>
          ) : null}

          {getGameStep(playerChoiceConfirmed, aiChoice) ===
            GAME_STATUS.RESULT && (
            <>
              <Button
                variant="warning"
                onClick={() => {
                  setPlayerChoiceConfirmed(false)
                  setSelectedChoice(null)
                  setAiChoice(null)
                  setRoundResult(null)
                  if (gameEnded) {
                    setPlayerScore(0)
                    setAiScore(0)
                    setGameEnded(false)
                  }
                }}
              >
                {gameEnded ? 'Play Again' : 'Next'}
              </Button>
              <Link href="/play">
                <Button variant="outline">Back</Button>
              </Link>
            </>
          )}

          {playerChoiceConfirmed && !aiChoice && (
            <span className="flex flex-row">
              Waiting On Opponent
              <TypingDots />
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
