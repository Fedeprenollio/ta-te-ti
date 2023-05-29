import { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'
import './App.css'

import { checkWinner, checkEndGame } from './logic/board'
import { WinnerModal } from './components/WinnerModal'
import Square from './components/Square'
import { TURNS } from './constants'
import { saveGameToStorage, resetGameToStorage } from './logic/storage'
import { Timer } from './components/Timer'

function App () {
  const [timer , setTimer ] = useState(8)
  const [timeLeft, setTimeLeft] = useState(timer)
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
    if (board[index] || winner) return // si existe algo en el casillero que marcamos, RETURN
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = (turn === TURNS.X) ? TURNS.O : TURNS.X
    if(newTurn){
      setTimeLeft(timer)
    }
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
    setTimeLeft(timer)
  }


// TIMER logica
  useEffect(() => {
    if(board.includes(TURNS.X) || board.includes(TURNS.O)){
      if (TURNS.X && timeLeft === 0) {
       // Lógica a ejecutar cuando se agota el tiempo
        setWinner(TURNS.O)
      }else if(TURNS.O && timeLeft === 0){
        setWinner(TURNS.X)
      }
  
      const timer = setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      if(winner !== null){
        clearTimeout(timer)
      }

      return () => clearTimeout(timer);
    }

  }, [timeLeft,board]);

  useEffect(() => {
 setTimeLeft(timer)
  }, [timer])
  
  // const handleTimeout = () => {
  //   // Lógica a ejecutar cuando se agota el tiempo
  //   // Por ejemplo:
  //   console.log(`Se agotó el tiempo para el jugador ${turn}`);
  //   handlePlayerChange();
  // };

  // const handlePlayerChange = () => {
  //   // Lógica para cambiar de jugador
  //   // Por ejemplo:
  //   setPlayer((prevPlayer) => (prevPlayer === 'X' ? 'O' : 'X'));
  //   setTimeLeft(2); // Reiniciar el tiempo para el nuevo jugador
  // };

const handleChange=(e)=>{
  const values = e.target.value
  const lastLetter = values[values.length - 1];
  if("012345678".includes(lastLetter) ) {
    // lastLetter.slice(0, -1)
    updateBoard(lastLetter)
  }

}

  return (
    <main className='board'>
      <h1>Ta-te-ti</h1>
      <Timer  timeLeft={timeLeft} setTimer={setTimer}/>
      <button onClick={resetGame}>Resetear el juego</button>
      <section className='game'>
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>{board[index]}</Square>
          )
        })}

      </section>

      <section>
        <form onChange={handleChange}>
          <input type="text" />
        </form>
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
     
      </section>

      <WinnerModal winner={winner} resetGame={resetGame}  />
    </main>
  )
}

export default App
