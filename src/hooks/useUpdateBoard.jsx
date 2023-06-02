import { useState } from "react";
import { TURNS } from "../constants";

export const useUpdateBoard = ({board, setBoard, turn, setTurn, winner, setWinner, boardSize, timer, setTimeLeft, saveGameToStorage, checkWinner, checkEndGame, confetti}) => {
 const updateBoard = (index) => {
    console.log("USE UPDATE BOARD", index)
    if (boardSize.size === 42) {
      const tablero = board;
      const columna = index % 7;

      for (let fila = 5; fila >= 0; fila--) {
        const posicion = fila * 7 + columna;

        if (tablero[posicion] === null) {
          const newBoard = [...board];
          newBoard[posicion] = turn;
          setBoard(newBoard);
          const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
          console.log("Turnos", newTurn)
          if (newTurn) {
            setTimeLeft(timer);
          }
          setTurn(newTurn);
          // guardar partida:
          saveGameToStorage({ board: newBoard, turn: newTurn, mode: boardSize });

          // revisar si tenemos ganador:
          const newWinner = checkWinner(newBoard, boardSize.size);
          if (newWinner) {
            confetti();
            setWinner(newWinner);
          } else if (checkEndGame(newBoard)) {
            setWinner(false);
          }
          break;
        }
      }
    } else {
      if (board[index] || winner) return; // si existe algo en el casillero que marcamos, RETURN
      const newBoard = [...board];
      newBoard[index] = turn;
      setBoard(newBoard);

      const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
      if (newTurn) {
        setTimeLeft(timer);
      }
      setTurn(newTurn);
      // guardar partida:
      saveGameToStorage({ board: newBoard, turn: newTurn, mode: boardSize });

      // revisar si tenemos ganador:
      const newWinner = checkWinner(newBoard, boardSize.size);
      if (newWinner) {
        confetti();
        setWinner(newWinner);
      } else if (checkEndGame(newBoard)) {
        setWinner(false);
      }
    }
  };

  return {updateBoard};
};
