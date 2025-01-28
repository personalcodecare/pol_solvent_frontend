import PaperIcon from '@/app/components/icons/paper'
import RockIcon from '@/app/components/icons/rock'
import ScissorsIcon from '@/app/components/icons/scissors'
import { GAME_CHOICES } from '@/app/constants/game-choices'
import { GAME_RESULTS } from '@/app/constants/game-status'

interface GameChoiceIconProps {
  choice: (typeof GAME_CHOICES)[number] | null
  size?: number
  roundResult?: (typeof GAME_RESULTS)[keyof typeof GAME_RESULTS] | null
  isPlayer: boolean
}

export const GameChoiceIcon = ({
  choice,
  size = 84,
  roundResult,
  isPlayer = false,
}: GameChoiceIconProps) => {
  let shadow = 'none'
  if (roundResult === GAME_RESULTS.TIE) {
    shadow = 'drop-shadow(0px 0px 25px #FFFFFF)'
  } else if (roundResult === GAME_RESULTS.WIN) {
    shadow = isPlayer
      ? 'drop-shadow(0px 0px 25px #0AF593)'
      : 'drop-shadow(0px 0px 25px #F5450A)'
  } else if (roundResult === GAME_RESULTS.LOSE) {
    shadow = isPlayer
      ? 'drop-shadow(0px 0px 25px #F5450A)'
      : 'drop-shadow(0px 0px 25px #0AF593)'
  }

  switch (choice) {
    case 'rock':
      return <RockIcon width={size} height={size} shadow={shadow} />
    case 'paper':
      return <PaperIcon width={size} height={size} shadow={shadow} />
    case 'scissors':
      return <ScissorsIcon width={size} height={size} shadow={shadow} />
    default:
      return null
  }
}
