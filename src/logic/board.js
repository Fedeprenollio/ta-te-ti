import { WINNER_COMBOS, WINNER_COMBOS6x7 } from '../constants'

export const checkWinner = (boardToCheck, boardSize) => {
  console.log(boardSize)
  console.log(boardToCheck)
  if(boardSize === 9){
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo
    if (
      boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a]
    }
    // Si no hay ganador return NULL
  }
  return null
} else if(boardSize === 42){
  for (const combo of WINNER_COMBOS6x7) {
    const [a, b, c,d] = combo
    if (
      boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[b] === boardToCheck[c] &&
        boardToCheck[c] === boardToCheck[d]

    ) {
      return boardToCheck[a]
    }
    // Si no hay ganador return NULL
  }
  return null
}

}

export const checkEndGame = (newBoard) => {
  return newBoard.every(square => square != null)
}
