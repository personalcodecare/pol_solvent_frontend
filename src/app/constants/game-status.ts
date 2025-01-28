export const GAME_STATUS = {
  CHOOSE: 'choose',
  LOCKED_IN: 'lockedIn',
  RESULT: 'result',
} as const

export const GAME_RESULTS = {
  WIN: 'Round Win!',
  LOSE: 'Round Lost!',
  TIE: 'Tie!',
} as const

export const GAME_END_RESULTS = {
  WIN: 'You win!',
  LOSE: 'You lose!',
} as const
