export const saveGameToStorage = ({ board, turn }) => {
  window.localStorage.setItem('board', JSON.stringify(board))
  window.localStorage.setItem('turn', turn)
}

export const resetGameToStorage = () => {
  window.localStorage.removeItem('turn')
  window.localStorage.removeItem('board')
}
