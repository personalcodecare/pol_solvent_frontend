import { GAME_CHOICES } from '@/app/constants/game-choices'
import {
  GAME_END_RESULTS,
  GAME_RESULTS,
  GAME_STATUS,
} from '@/app/constants/game-status'

export const getGameStep = (
  playerChoiceConfirmed: boolean,
  opponentChoice: string | null,
  roundResult?: string | null,
  gameEnded?: boolean,
) => {
  if (roundResult || gameEnded) {
    return GAME_STATUS.RESULT
  }
  if (playerChoiceConfirmed && opponentChoice) {
    return GAME_STATUS.RESULT
  }
  if (playerChoiceConfirmed && !opponentChoice) {
    return GAME_STATUS.LOCKED_IN
  }
  return GAME_STATUS.CHOOSE
}

export const getAiChoice = () => {
  return GAME_CHOICES[Math.floor(Math.random() * GAME_CHOICES.length)]
}

export const determineWinnerPlayWithAi = (
  playerChoiceConfirmed: string,
  aiChoice: string,
) => {
  if (playerChoiceConfirmed === aiChoice) {
    return 'tie'
  }
  if (
    (playerChoiceConfirmed === 'rock' && aiChoice === 'scissors') ||
    (playerChoiceConfirmed === 'paper' && aiChoice === 'rock') ||
    (playerChoiceConfirmed === 'scissors' && aiChoice === 'paper')
  ) {
    return 'player'
  }
  return 'ai'
}

export const determineWinner = (
  playerChoice: string,
  opponentChoice: string,
) => {
  if (playerChoice === opponentChoice) {
    return 'tie'
  }
  if (
    (playerChoice === 'rock' && opponentChoice === 'scissors') ||
    (playerChoice === 'paper' && opponentChoice === 'rock') ||
    (playerChoice === 'scissors' && opponentChoice === 'paper')
  ) {
    return 'player'
  }
  return 'opponent'
}

export const displayHeaderMessage = ({
  playerChoiceConfirmed,
  roundResult,
  gameEnded,
  playerScore,
}: {
  playerChoiceConfirmed: boolean
  roundResult: string | null
  gameEnded?: boolean
  playerScore?: number
}) => {
  if (gameEnded && typeof playerScore === 'number') {
    if (playerScore >= 2) {
      return 'You win!'
    } else {
      return 'You lose!'
    }
  }
  if (playerChoiceConfirmed && !roundResult) {
    return 'Locked In'
  }
  if (roundResult) {
    return roundResult
  }
  return 'Choose'
}

export const getHeaderTextColor = (
  roundResult: string | null,
  playerScore?: number,
  gameEnded?: boolean,
): string => {
  if (gameEnded && typeof playerScore === 'number') {
    if (playerScore >= 2) {
      return '#0AF593'
    } else {
      return '#F5450A'
    }
  }
  if (!roundResult) {
    return '#FFFFFF'
  }
  if (roundResult === GAME_RESULTS.WIN) {
    return '#0AF593'
  }
  if (roundResult === GAME_RESULTS.LOSE) {
    return '#F5450A'
  }
  return '#FFFFFF'
}

export const getSelectedChoiceColor = (
  choice: string,
  selectedChoice: string,
  playerChoiceConfirmed: boolean,
) => {
  if (selectedChoice === choice && playerChoiceConfirmed) {
    return 'border-softGold'
  }
  if (selectedChoice === choice && !playerChoiceConfirmed) {
    return 'border-white'
  }
  return 'border-transparent'
}

export const getResultStyles = (
  choice: string,
  lastSelectedChoice: string,
  lastOpponentChoice: string,
  roundResult: string,
  currentGameStep: string,
) => {
  if (currentGameStep !== GAME_STATUS.RESULT) {
    return {
      border: 'border-transparent',
      text: 'white',
      shadow: 'none',
    }
  }

  if (!lastSelectedChoice || !lastOpponentChoice || !roundResult) {
    return { border: 'border-transparent', text: 'text-softGold' }
  }

  if (roundResult === GAME_RESULTS.TIE) {
    return {
      border: 'border-white shadow-white',
      text: 'text-red text-shadow-white',
    }
  }

  const playerWon =
    roundResult === GAME_RESULTS.WIN || roundResult === GAME_END_RESULTS.WIN
  const isPlayerChoice = choice === lastSelectedChoice
  const isOpponentChoice = choice === lastOpponentChoice

  if ((playerWon && isPlayerChoice) || (!playerWon && isOpponentChoice)) {
    return {
      border: 'border-brightGreen shadow-green',
      text: 'text-brightGreen text-shadow-green',
    }
  } else if (
    (playerWon && isOpponentChoice) ||
    (!playerWon && isPlayerChoice)
  ) {
    return {
      border: 'border-lavaOrange opacity-60',
      text: 'text-lavaOrange opacity-60',
    }
  }

  return { border: 'border-transparent', text: 'text-softGold' }
}
