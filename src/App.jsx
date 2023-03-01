import { useState } from 'react'
import confetti from 'canvas-confetti'
import './App.css'

import { checkWinner, checkEndGame } from './logic/board'
import { WinnerModal } from './components/WinnerModal'
import Square from './components/Square'
import { TURNS } from './constants'
import { saveGameToStorage, resetGameToStorage } from './logic/storage'

function App () {
  const [board, setBoard] = useState(() => {
    const boardFromLocalStorage = window.localStorage.getItem('board')
    return boardFromLocalStorage ? JSON.parse(boardFromLocalStorage) : Array(9).fill(null)
  }
  )

  const [turn, setTurn] = useState(() => {
    const turnFromLocalStorage = window.localStorage.getItem('turn')
    return turnFromLocalStorage ?? TURNS.X
  }
  )

  // null es que no hay ganador, false es que hay empate
  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {
    console.log(winner)
    if (board[index] || winner) return // si existe algo en el casillero que marcamos, RETURN
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = (turn === TURNS.X) ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // guardar partida:
    saveGameToStorage({ board: newBoard, turn: newTurn })

    // revisar si tenemos ganador:
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    // TODO: HACER Q EL SIGUIENTE ES EL QUE GANo
    setTurn(TURNS.X)
    setWinner(null)
    resetGameToStorage()
  }

  return (
    <main className='board'>
      <h1>Ta-te-ti</h1>
      <button onClick={resetGame}>Resetear el juego</button>
      <section className='game'>
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>{board[index]}</Square>
          )
        })}

      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App
