'use client'

import { AnimatedChoiceIcon } from '@/app/components/animations/animated-choice-icon'
import PaperIcon from '@/app/components/icons/paper'
import RockIcon from '@/app/components/icons/rock'
import ScissorsIcon from '@/app/components/icons/scissors'
import { Countdown } from '@/app/components/play/countdown'
import { GameChoiceIcon } from '@/app/components/play/game-choice-icon'
import { ScoreBoard } from '@/app/components/play/score-board'
import { ErrorPage } from '@/app/components/shared/error-page'
import { GameStarting } from '@/app/components/shared/game-starting'
import { PageLoading } from '@/app/components/shared/loading'
import { TypingDots } from '@/app/components/shared/typing-dots'
import { DUEL_STATUS } from '@/app/constants/duel-status'
import { GAME_CHOICES } from '@/app/constants/game-choices'
import { GAME_RESULTS, GAME_STATUS } from '@/app/constants/game-status'
import { Button } from '@/components/ui/button'
import { useSocket } from '@/contexts/socket'
import { getDuel } from '@/services/get-duel'
import {
  determineWinner,
  displayHeaderMessage,
  getGameStep,
  getHeaderTextColor,
  getResultStyles,
  getSelectedChoiceColor,
} from '@/utils/game-helper'
import { getPlayerIdFromToken } from '@/utils/jwt-decode'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'

const GamePlayPage = () => {
  const pathname = usePathname()
  const router = useRouter()
  const params = useParams()
  const duelId = Number(params.id)
  const { socket } = useSocket()
  const { width, height } = useWindowSize()
  const [playerIdFromToken, setPlayerIdFromToken] = useState<string | null>(
    null,
  )

  const useDuel = ({ duelId }: { duelId: number }) => {
    return useQuery({
      queryKey: ['duel', duelId],
      queryFn: () => getDuel(duelId),
      enabled: !!duelId,
      // refetchOnWindowFocus: true,
    })
  }

  const {
    data: duel,
    isPending: isLoadingDuel,
    isError: isErrorDuel,
    error: errorDuel,
  } = useDuel({ duelId })

  // Game states
  const [playerScore, setPlayerScore] = useState(0)
  const [opponentScore, setOpponentScore] = useState(0)
  const [isWaiting, setIsWaiting] = useState(false)
  const [lastSelectedChoice, setLastSelectedChoice] = useState<
    (typeof GAME_CHOICES)[number] | null
  >(null)
  const [lastOpponentChoice, setLastOpponentChoice] = useState<
    (typeof GAME_CHOICES)[number] | null
  >(null)
  const [gameStep, setGameStep] = useState<
    (typeof GAME_STATUS)[keyof typeof GAME_STATUS]
  >(GAME_STATUS.CHOOSE)
  const [gameEnded, setGameEnded] = useState(false)
  const [selectedChoice, setSelectedChoice] = useState<
    (typeof GAME_CHOICES)[number] | null
  >(null)
  const [roundResult, setRoundResult] = useState<
    (typeof GAME_RESULTS)[keyof typeof GAME_RESULTS] | null
  >(null)
  const [opponentChoice, setOpponentChoice] = useState<
    (typeof GAME_CHOICES)[number] | null
  >(null)
  const [playerChoiceConfirmed, setPlayerChoiceConfirmed] = useState(false)
  const [gameActuallyStarted, setGameActuallyStarted] = useState(false)
  const [currentRound, setCurrentRound] = useState(1)
  // const [opponentIsInNextRound, setOpponentIsInNextRound] = useState(false)
  const [countdown, setCountdown] = useState<number | null>(-1)
  const [isCalculatingResults, setIsCalculatingResults] = useState(false)
  const [waitingStartTime, setWaitingStartTime] = useState<number | null>(null)
  const [initialSetupDone, setInitialSetupDone] = useState(false)
  const [showStartingScreen, setShowStartingScreen] = useState(false)

  const localStorageKey = `duel_${duelId}_starting_screen_shown`
  const startingScreenShown = localStorage.getItem(localStorageKey)

  const checkAndSetStartingScreen = useCallback((duelId: number) => {
    const key = `duel_${duelId}_starting_screen_shown`
    const shown = localStorage.getItem(key)
    if (!shown) {
      setShowStartingScreen(true)
      localStorage.setItem(key, 'true')
    }
  }, [])

  useEffect(() => {
    const userId = getPlayerIdFromToken()
    setPlayerIdFromToken(userId)
  }, [])

  useEffect(() => {
    if (
      duel?.gameStatus === DUEL_STATUS.JOINED ||
      duel?.gameStatus === DUEL_STATUS.ACTIVE
    ) {
      setIsWaiting(true)
    }
  }, [duel?.gameStatus])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null
    const key = `duel_${duelId}_starting_screen_shown`
    const shown = localStorage.getItem(key)

    if (isWaiting && !gameActuallyStarted && !shown) {
      setWaitingStartTime(Date.now())

      timeoutId = setTimeout(() => {
        const currentTime = Date.now()
        if (
          waitingStartTime &&
          currentTime - waitingStartTime >= 15000 &&
          !showStartingScreen
        ) {
          window.location.reload()
        }
      }, 15000)
    } else {
      setWaitingStartTime(null)
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [
    isWaiting,
    gameActuallyStarted,
    waitingStartTime,
    duelId,
    showStartingScreen,
  ])

  const shouldDisplayCountdown = () => {
    if (!countdown) {
      return false
    }
    if (countdown < 0) {
      return false
    }
    return gameStep === GAME_STATUS.CHOOSE || gameStep === GAME_STATUS.LOCKED_IN
  }

  const resetRoundState = (): void => {
    setPlayerChoiceConfirmed(false)
    setSelectedChoice(null)
    setRoundResult(null)
    setLastSelectedChoice(null)
    setLastOpponentChoice(null)
    setOpponentChoice(null)
    setGameStep(GAME_STATUS.CHOOSE)
  }

  // Update the game step based on the player's choice and the opponent's choice
  useEffect(() => {
    const newGameStep = getGameStep(
      playerChoiceConfirmed,
      opponentChoice,
      roundResult,
      gameEnded,
    )
    setGameStep(newGameStep)
  }, [playerChoiceConfirmed, opponentChoice, roundResult, gameEnded])

  const sendPlayerJoinedMessage = useCallback(() => {
    socket?.emit('PLAYER_JOINED', { duelId })
  }, [socket, duelId])

  useEffect(() => {
    const key = `duel_${duelId}_starting_screen_shown`
    const shown = localStorage.getItem(key)
    if (socket && !shown) {
      const intervalId = setInterval(() => {
        sendPlayerJoinedMessage()
      }, 5000)

      return () => clearInterval(intervalId)
    }
  }, [sendPlayerJoinedMessage, socket, duelId])

  const confirmChoice = () => {
    const currentRound = duel?.actions?.length
      ? Math.floor(duel.actions.length / 2) + 1
      : 1
    setPlayerChoiceConfirmed(true)
    setCurrentRound(currentRound)
    socket?.emit('PLAYER_CHOICE', {
      choice: selectedChoice,
      duelId,
      roundNumber: currentRound,
    })
  }

  // Handle socket events
  useEffect(() => {
    if (!socket || !duel) {
      return
    }

    const onPlayerChoice = (data: {
      duelId: number
      playerId: number
      actionType: string
      hostOrJoiner: string
      roundNumber: number
    }) => {
      if (data.duelId === duelId) {
        const { playerId, actionType } = data
        const isOpponentChoice = Number(playerId) !== Number(playerIdFromToken)

        if (isOpponentChoice) {
          setOpponentChoice(actionType as (typeof GAME_CHOICES)[number])
          // setOpponentIsInNextRound(roundNumber > currentRound)
          setLastOpponentChoice(actionType as (typeof GAME_CHOICES)[number])
        } else {
          setSelectedChoice(actionType as (typeof GAME_CHOICES)[number])
          setPlayerChoiceConfirmed(true)
          setLastSelectedChoice(actionType as (typeof GAME_CHOICES)[number])
        }
      }
    }

    const onBothPlayersJoined = (data: { duelId: number }) => {
      if (data.duelId === duelId) {
        checkAndSetStartingScreen(duelId)
      }
    }

    const onStartNextRound = (data: {
      duelId: number
      roundNumber: number
    }) => {
      if (gameEnded) {
        return
      }

      if (data.duelId === duelId) {
        setCurrentRound(data.roundNumber)
        resetRoundState()
        setGameStep(GAME_STATUS.CHOOSE)
      }
    }

    const onCountdownUpdate = (data: {
      duelId: number
      roundNumber: number
      countdown: number
    }) => {
      if (data.duelId === duelId) {
        setCountdown(data.countdown)
      }
    }

    const onDuelCompleted = (data: {
      duelId: number
      winner: 'host' | 'joiner'
      winnerId: number
      hostId: number
      joinerId: number
      finalScore: { hostScore: number; joinerScore: number }
    }) => {
      if (data.duelId === duelId) {
        const isHost = Number(playerIdFromToken) === Number(data.hostId)

        setPlayerScore(
          isHost ? data.finalScore.hostScore : data.finalScore.joinerScore,
        )
        setOpponentScore(
          isHost ? data.finalScore.joinerScore : data.finalScore.hostScore,
        )

        setIsCalculatingResults(true)

        let roundResult = null

        if (isHost) {
          roundResult =
            data.winner === 'host' ? GAME_RESULTS.WIN : GAME_RESULTS.LOSE
        } else {
          roundResult =
            data.winner === 'joiner' ? GAME_RESULTS.WIN : GAME_RESULTS.LOSE
        }

        setTimeout(() => {
          setIsCalculatingResults(false)
          setGameEnded(true)
          setRoundResult(roundResult)
        }, 3000)
      }
    }

    const onRoundComplete = (data: {
      duelId: number
      completedRound: number
      nextRound: number
      hostId: number
      joinerId: number
      scores: { hostScore: number; joinerScore: number }
    }) => {
      if (data.duelId === duelId) {
        const isHost = Number(playerIdFromToken) === Number(data.hostId)

        setPlayerScore(isHost ? data.scores.hostScore : data.scores.joinerScore)
        setOpponentScore(
          isHost ? data.scores.joinerScore : data.scores.hostScore,
        )
      }
    }

    socket.on('PLAYER_CHOICE', onPlayerChoice)
    socket.on('COUNTDOWN_UPDATE', onCountdownUpdate)
    socket.on('START_NEXT_ROUND', onStartNextRound)
    socket.on('BOTH_PLAYERS_JOINED', onBothPlayersJoined)
    socket.on('DUEL_COMPLETED', onDuelCompleted)
    socket.on('ROUND_COMPLETE', onRoundComplete)

    return () => {
      socket.off('PLAYER_CHOICE', onPlayerChoice)
      socket.off('COUNTDOWN_UPDATE', onCountdownUpdate)
      socket.off('START_NEXT_ROUND', onStartNextRound)
      socket.off('BOTH_PLAYERS_JOINED', onBothPlayersJoined)
      socket.off('DUEL_COMPLETED', onDuelCompleted)
      socket.off('ROUND_COMPLETE', onRoundComplete)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, duelId, playerIdFromToken, currentRound, duel])

  useEffect(() => {
    if (
      !playerChoiceConfirmed ||
      !selectedChoice ||
      !opponentChoice ||
      gameEnded
    ) {
      return
    }

    const winner = determineWinner(selectedChoice, opponentChoice)

    const resultMap = {
      player: { result: GAME_RESULTS.WIN },
      opponent: { result: GAME_RESULTS.LOSE },
      tie: { result: GAME_RESULTS.TIE },
    }

    const { result } = resultMap[winner]

    setRoundResult(result)
    setLastSelectedChoice(selectedChoice)
    setLastOpponentChoice(opponentChoice)
    setGameStep(GAME_STATUS.RESULT)
  }, [playerChoiceConfirmed, selectedChoice, opponentChoice, gameEnded])

  // Update the score and game status when the duel is updated
  useEffect(() => {
    if (duel && playerIdFromToken && !initialSetupDone) {
      const isHost = duel.hostId === Number(playerIdFromToken)
      const currentRound = Math.floor((duel.actions?.length || 0) / 2) + 1

      if (duel.actions && duel.actions.length > 0) {
        setGameActuallyStarted(true)
      }

      // Reset choices for the new round
      setSelectedChoice(null)
      setOpponentChoice(null)
      setPlayerChoiceConfirmed(false)

      const playerActions = duel.actions?.filter((action) =>
        isHost
          ? action.playerId === duel.hostId
          : action.playerId === duel.joinerId,
      )

      const opponentActions = duel.actions?.filter((action) =>
        isHost
          ? action.playerId === duel.joinerId
          : action.playerId === duel.hostId,
      )

      if (playerActions && playerActions.length > 0) {
        const lastAction = playerActions[playerActions.length - 1]
        if (lastAction.roundNumber === currentRound) {
          setSelectedChoice(
            lastAction.actionType as (typeof GAME_CHOICES)[number],
          )
          setPlayerChoiceConfirmed(true)
        }
      }

      if (opponentActions && opponentActions.length > 0) {
        const lastOpponentAction = opponentActions[opponentActions.length - 1]
        if (lastOpponentAction.roundNumber === currentRound) {
          setOpponentChoice(
            lastOpponentAction.actionType as (typeof GAME_CHOICES)[number],
          )
        }
      }

      // Set last round result
      if (duel.winnerId && playerActions && opponentActions) {
        const lastPlayerAction = playerActions[playerActions.length - 1]
        const lastOpponentAction = opponentActions[opponentActions.length - 1]
        if (lastPlayerAction && lastOpponentAction) {
          const lastRoundResult = determineWinner(
            lastPlayerAction.actionType as (typeof GAME_CHOICES)[number],
            lastOpponentAction.actionType as (typeof GAME_CHOICES)[number],
          )

          const resultMap = {
            player: GAME_RESULTS.WIN,
            opponent: GAME_RESULTS.LOSE,
            tie: GAME_RESULTS.TIE,
          }

          setLastOpponentChoice(
            lastOpponentAction.actionType as (typeof GAME_CHOICES)[number],
          )
          setLastSelectedChoice(
            lastPlayerAction.actionType as (typeof GAME_CHOICES)[number],
          )
          setRoundResult(resultMap[lastRoundResult])
        }
      }

      if (isHost) {
        setPlayerScore(duel.duelStatus?.hostScore || 0)
        setOpponentScore(duel.duelStatus?.joinerScore || 0)
      } else {
        setPlayerScore(duel.duelStatus?.joinerScore || 0)
        setOpponentScore(duel.duelStatus?.hostScore || 0)
      }

      if (duel.winnerId) {
        setGameEnded(true)
        setGameStep(GAME_STATUS.RESULT)
      }

      setInitialSetupDone(true)
    }
  }, [duel, playerIdFromToken, initialSetupDone])

  if (!pathname.startsWith('/duels/')) {
    return null
  }

  if (
    !isLoadingDuel &&
    isErrorDuel &&
    !isNaN(duelId) &&
    duelId > 0 &&
    errorDuel?.message.toLowerCase().includes('not found')
  ) {
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

  if (isLoadingDuel) {
    return <PageLoading />
  }

  if (
    duel &&
    playerIdFromToken &&
    Number(playerIdFromToken) !== duel.hostId &&
    Number(playerIdFromToken) !== duel.joinerId
  ) {
    return (
      <ErrorPage
        title="Access Denied"
        message="You are not a participant in this duel."
        action={{
          label: 'Go Back',
          onClick: () => router.back(),
        }}
      />
    )
  }

  if (!isLoadingDuel && isErrorDuel && !isNaN(duelId) && duelId > 0) {
    return <ErrorPage message={'Error while loading the duel'} />
  }

  if (showStartingScreen) {
    return (
      <GameStarting
        isWaiting={false}
        onCountdownEnd={() => {
          setShowStartingScreen(false)
          setGameActuallyStarted(true)
          socket?.emit('GAME_STARTED', { duelId })
        }}
      />
    )
  }

  if (isWaiting && !gameActuallyStarted && !startingScreenShown) {
    return (
      <GameStarting
        isWaiting={true}
        onCountdownEnd={() => {
          console.log('Countdown ended')
        }}
      >
        <span className="flex flex-row px-5 text-center text-darkMain">
          Waiting for opponent
          <TypingDots className="hidden sm:flex" />
        </span>
        <div className="h-2">
          <TypingDots className="flex text-darkMain sm:hidden" />
        </div>
      </GameStarting>
    )
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
            style={{
              color: getHeaderTextColor(roundResult, playerScore, gameEnded),
            }}
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
            <ScoreBoard
              score={opponentScore}
              title="Opponent"
              alignEnd={true}
            />
          </div>

          {gameStep === GAME_STATUS.CHOOSE && (
            <motion.div
              className="flex w-full justify-around"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex w-full justify-around">
                <div className="flex flex-col items-center justify-center gap-[10px]">
                  <button
                    className={`cursor-pointer border-[3px] transition-colors duration-300 ease-in-out ${getSelectedChoiceColor(
                      'rock',
                      selectedChoice || '',
                      playerChoiceConfirmed,
                    )}`}
                    onClick={() => setSelectedChoice('rock')}
                    disabled={gameEnded}
                  >
                    <RockIcon />
                  </button>
                  <span>Rock</span>
                </div>

                <div className="flex flex-col items-center justify-center gap-[10px]">
                  <button
                    className={`cursor-pointer border-[3px] transition-colors duration-300 ease-in-out ${getSelectedChoiceColor(
                      'paper',
                      selectedChoice || '',
                      playerChoiceConfirmed,
                    )}`}
                    onClick={() => setSelectedChoice('paper')}
                    disabled={gameEnded}
                  >
                    <PaperIcon />
                  </button>
                  <span>Paper</span>
                </div>

                <div className="flex flex-col items-center justify-center gap-[10px]">
                  <button
                    className={`cursor-pointer border-[3px] transition-colors duration-300 ease-in-out ${getSelectedChoiceColor(
                      'scissors',
                      selectedChoice || '',
                      playerChoiceConfirmed,
                    )}`}
                    onClick={() => setSelectedChoice('scissors')}
                    disabled={gameEnded}
                  >
                    <ScissorsIcon />
                  </button>
                  <span>Scissors</span>
                </div>
              </div>
            </motion.div>
          )}

          {gameStep === GAME_STATUS.LOCKED_IN && (
            <div className="flex w-full justify-center">
              <AnimatedChoiceIcon choice={selectedChoice} />
            </div>
          )}

          {gameStep === GAME_STATUS.RESULT && (
            <div className="flex w-full justify-around">
              <motion.div
                className="flex flex-col items-center"
                initial={{ x: '50%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className={`border-[3px] ${
                    getResultStyles(
                      lastSelectedChoice || '',
                      lastSelectedChoice || '',
                      lastOpponentChoice || '',
                      roundResult || '',
                      gameStep,
                    ).border
                  }`}
                >
                  {lastSelectedChoice && (
                    <GameChoiceIcon
                      choice={lastSelectedChoice}
                      size={108}
                      roundResult={roundResult}
                      isPlayer={true}
                    />
                  )}
                </div>
                <span
                  className={`text-[24px] ${
                    getResultStyles(
                      lastSelectedChoice || '',
                      lastSelectedChoice || '',
                      lastOpponentChoice || '',
                      roundResult || '',
                      gameStep,
                    ).text
                  }`}
                >
                  {lastSelectedChoice}
                </span>
              </motion.div>

              <motion.div
                className="flex flex-col items-center"
                initial={{ x: '-50%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div
                  className={`border-[3px] ${
                    getResultStyles(
                      lastOpponentChoice || '',
                      lastSelectedChoice || '',
                      lastOpponentChoice || '',
                      roundResult || '',
                      gameStep,
                    ).border
                  }`}
                >
                  {lastOpponentChoice && (
                    <GameChoiceIcon
                      choice={lastOpponentChoice}
                      size={108}
                      roundResult={roundResult}
                      isPlayer={false}
                    />
                  )}
                </div>
                <span
                  className={`text-[24px] ${
                    getResultStyles(
                      lastOpponentChoice || '',
                      lastSelectedChoice || '',
                      lastOpponentChoice || '',
                      roundResult || '',
                      gameStep,
                    ).text
                  }`}
                >
                  {lastOpponentChoice}
                </span>
              </motion.div>
            </div>
          )}

          {gameStep !== GAME_STATUS.RESULT && !gameEnded ? (
            <Button
              variant="warning"
              disabled={playerChoiceConfirmed || !selectedChoice}
              onClick={() => {
                if (selectedChoice) {
                  confirmChoice()
                }
              }}
            >
              Confirm Selection
            </Button>
          ) : null}

          {gameStep === GAME_STATUS.RESULT &&
            !gameEnded &&
            !isCalculatingResults && (
              <motion.span
                className="flex flex-row"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Preparing for next round
                <TypingDots />
              </motion.span>
            )}

          {gameEnded && opponentScore >= 2 ? (
            <Button
              variant="warning"
              onClick={() => {
                if (gameEnded) {
                  router.push('/play')
                }
              }}
            >
              Continue
            </Button>
          ) : null}

          {gameEnded && playerScore >= 2 ? (
            <Button
              variant="success"
              onClick={() => {
                router.push(`/payout/${duel?.id}`)
              }}
            >
              View Payout
            </Button>
          ) : null}

          {!playerChoiceConfirmed &&
            opponentChoice &&
            gameStep === GAME_STATUS.CHOOSE && (
              <motion.span
                className="flex flex-row"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Opponent Has Selected
              </motion.span>
            )}

          {playerChoiceConfirmed &&
            !opponentChoice &&
            gameStep === GAME_STATUS.CHOOSE && (
              <motion.span
                className="flex flex-row"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Waiting On Opponent
                <TypingDots />
              </motion.span>
            )}

          {shouldDisplayCountdown() ? (
            <Countdown countdown={countdown} onComplete={() => {}} />
          ) : null}

          {isCalculatingResults && (
            <motion.span
              className="flex flex-row"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Calculating match results
              <TypingDots />
            </motion.span>
          )}
        </div>
      </div>
    </div>
  )
}

export default GamePlayPage
