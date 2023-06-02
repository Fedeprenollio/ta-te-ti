import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import "./App.css";

import { checkWinner, checkEndGame } from "./logic/board";
import { WinnerModal } from "./components/WinnerModal";
import Square from "./components/Square";
import { TURNS } from "./constants";
import { saveGameToStorage, resetGameToStorage } from "./logic/storage";
import { Timer } from "./components/Timer";
import { useTimer } from "./hooks/useTimer";
import { SelectGame } from "./components/SelectGame";
import { FormOnlineGame } from "./components/FormOnlineGame";
import { useUpdateBoard } from "./hooks/useUpdateBoard";
import { getkeyBoard } from "./logic/getKeyBoard";
import { useAppSelector } from "./store/store/store";
import { useBoardActions } from "./store/store/useBoardAction";

function App() {
  const state = useAppSelector((state) => state.tateti)
  const {setTurn: UpdateTurn, newWinner,reserGame,  setBoard: updateDashboard } = useBoardActions()
console.log("REDUZ", state)



  const [boardSize, setboardSize] = useState(()=>{
    const boardSizeFromLocalStorage = window.localStorage.getItem("mode");
    return boardSizeFromLocalStorage ? JSON.parse(boardSizeFromLocalStorage) : {
      size: 42,
      grid: 6 * 7,
      classNameGrid: "board6x7",
    }
  });

  const [board, setBoard] = useState(() => {
    const boardFromLocalStorage = window.localStorage.getItem("board");
    console.log(boardFromLocalStorage)
    return boardFromLocalStorage
      ? JSON.parse(boardFromLocalStorage)
      : Array(42).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    const turnFromLocalStorage = window.localStorage.getItem("turn");
    return turnFromLocalStorage ?? TURNS.X;
  });
  // null es que no hay ganador, false es que hay empate
  const [winner, setWinner] = useState(null);
  const { timer, setTimer, timeLeft, setTimeLeft,classTime } = useTimer();

  const {updateBoard} = useUpdateBoard({ winner, setWinner, boardSize, timer, setTimeLeft, saveGameToStorage, checkWinner, checkEndGame, confetti});

  // const updateBoard = (index) => {
  //   if (boardSize.size === 42) {
  //     const tablero = board;
  //     const columna = index % 7;

  //     for (let fila = 5; fila >= 0; fila--) {
  //       const posicion = fila * 7 + columna;

  //       if (tablero[posicion] === null) {
  //         const newBoard = [...board];
  //         newBoard[posicion] = turn;
  //         setBoard(newBoard);
  //         const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
  //         console.log("Turnos", newTurn)
  //         if (newTurn) {
  //           setTimeLeft(timer);
  //         }
  //         setTurn(newTurn);
  //         // guardar partida:
  //         saveGameToStorage({ board: newBoard, turn: newTurn, mode: boardSize });

  //         // revisar si tenemos ganador:
  //         const newWinner = checkWinner(newBoard, boardSize.size);
  //         if (newWinner) {
  //           confetti();
  //           setWinner(newWinner);
  //         } else if (checkEndGame(newBoard)) {
  //           setWinner(false);
  //         }
  //         break;
  //       }
  //     }
  //   } else {
  //     if (board[index] || winner) return; // si existe algo en el casillero que marcamos, RETURN
  //     const newBoard = [...board];
  //     newBoard[index] = turn;
  //     setBoard(newBoard);

  //     const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
  //     if (newTurn) {
  //       setTimeLeft(timer);
  //     }
  //     setTurn(newTurn);
  //     // guardar partida:
  //     saveGameToStorage({ board: newBoard, turn: newTurn, mode: boardSize });

  //     // revisar si tenemos ganador:
  //     const newWinner = checkWinner(newBoard, boardSize.size);
  //     if (newWinner) {
  //       confetti();
  //       setWinner(newWinner);
  //     } else if (checkEndGame(newBoard)) {
  //       setWinner(false);
  //     }
  //   }
  // };
  const resetGame = () => {
    reserGame()
    // setBoard(Array(boardSize.size).fill(null));
    updateDashboard(Array(state.setting.size).fill(null))
    // TODO: HACER Q EL SIGUIENTE ES EL QUE GANo
    // setTurn(TURNS.X); /// old
    // const newTurn= TURNS.X
    // UpdateTurn({newTurn})
    // setWinner(null);
    // newWinner(null)
    resetGameToStorage();
    setTimeLeft(state.timer);
  };

 
  const handleChange = (e) => {
    e.preventDefault()
    const values = e.target.value;
    const lastLetter = values[values.length - 1];
    const size = state.setting.size
    const index = getkeyBoard({lastLetter, size})
    updateBoard(index)
    // if(lastLetter === "") return
    // const keysEnabled = boardSize?.size === 9 ? "123456789qweasdzxcuiojklnm," : "12345678"
    // if (keysEnabled.includes(lastLetter)) {
    //   const key = e.target.value.toLowerCase();
    //   let value;

    //   switch (lastLetter) {
    //     case "1":
    //     case "q":
    //     case "u":
    //       value = 1;
    //       break;
    //     case "2":
    //     case "w":
    //     case "i":
    //       value = 2;
    //       break;
    //     case "3":
    //     case "e":
    //     case "o":
    //       value = 3;
    //       break;
    //     case "4":
    //     case "a":
    //     case "j":
    //       value = 4;
    //       break;
    //     case "5":
    //     case "s":
    //     case "k":
    //       value = 5;
    //       break;
    //     case "6":
    //     case "d":
    //     case "l":
    //       value = 6;
    //       break;
    //     case "7":
    //     case "z":
    //     case "n":
    //       value = 7;
    //       break;
    //     case "8":
    //     case "x":
    //     case "m":
    //       value = 8;
    //       break;
    //     case "9":
    //     case "c":
    //     case ",":
    //       value = 9;
    //       break;
    //     default:
    //       value = null;
    //       break;
    //   }
    //   updateBoard(value - 1);
    // }
  };

  const handleSubmit =(e)=>{
    e.preventDefault()
  }

  return (
    <main className="board">
      <h1>Ta-te-ti</h1>
      <div className="container-setting">
        <SelectGame />
        <Timer timeLeft={timeLeft} setTimer={setTimer}  classTime={classTime}/>
      </div>
      <button onClick={resetGame}>Resetear el juego</button>
      <section className={`game ${boardSize.classNameGrid}`}>
        {state.board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard} boardSize={boardSize}>
              {state.board[index]}
            </Square>
          );
        })}
      </section>

      <section>
        <form onSubmit={handleSubmit} onChange={handleChange}>
          <div  className="input-container">
              <label htmlFor="keys">Tus teclas:</label>
              <input type="text" id="keys" autoFocus placeholder="1 2 3 a s d..." />
          </div>
          <span>Alternate con tu amigo con el mouse o tecleando</span>
        </form>
      </section>
      <section className="turn">
        <Square isSelected={state.turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={state.turn === TURNS.O}>{TURNS.O}</Square>
      </section>

    <section>
      <FormOnlineGame boardSize={boardSize} updateBoard={updateBoard} turn={turn}/>
    </section>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  );
}

export default App;
