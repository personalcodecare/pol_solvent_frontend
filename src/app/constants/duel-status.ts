export const DUEL_STATUS = {
  PENDING: 'Pending', // User1 creates the duel and is waiting for user2 to join.
  JOINED: 'Joined', // Both users have approved their token usage and are waiting for the smart contract to start the duel.
  ACTIVE: 'Active', // Both users are having the duel (this happens off-chain).
  COMPLETED: 'Completed', // There's a winner for the duel and earnings/fees have been distributed.
}
