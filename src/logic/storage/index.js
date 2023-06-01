export const saveGameToStorage = ({ board, turn,mode }) => {
  window.localStorage.setItem('board', JSON.stringify(board))
  window.localStorage.setItem('turn', turn)
  window.localStorage.setItem('mode',  JSON.stringify(mode))

}

export const resetGameToStorage = () => {
  window.localStorage.removeItem('turn')
  window.localStorage.removeItem('board')
  window.localStorage.removeItem('mode')
}
