import { useState } from "react";
import { TURNS } from "../constants";
import { useBoardActions } from "../store/store/useBoardAction";
import { useAppSelector } from "../store/store/store";

export const useUpdateBoard = ({ UpdateTurn,board, setBoard, turn, setTurn, winner, setWinner, boardSize, timer, setTimeLeft, saveGameToStorage, checkWinner, checkEndGame, confetti}) => {
  const state = useAppSelector((state) => state.tateti)

  const { setBoard: updateDashboard ,newWinner:updateWinner } = useBoardActions();

 
  const updateBoard = (index) => {
    if (state.setting.size === 42) {
      const tablero = board;
      const columna = index % 7;

      for (let fila = 5; fila >= 0; fila--) {
        const posicion = fila * 7 + columna;

        if (tablero[posicion] === null) {
          const newBoard = [...board];
          newBoard[posicion] = turn;
          // setBoard(newBoard);
          updateDashboard(newBoard)
          
          const newTurn = state.turn === TURNS.X ? TURNS.O : TURNS.X;
          if (newTurn) {
            setTimeLeft(timer);
          }
          // setTurn(newTurn);
          UpdateTurn({newTurn})

          // guardar partida:
          saveGameToStorage({ board: newBoard, turn: newTurn, mode: boardSize });

          // revisar si tenemos ganador:
          const newWinner = checkWinner(newBoard, state.setting.size);
          if (newWinner) {
            confetti();
            // setWinner(newWinner);
            updateWinner(newWinner)
          } else if (checkEndGame(newBoard)) {
            // setWinner(false);
            updateWinner(false)
          }
          break;
        }
      }
    } else {
      if (board[index] || winner) return; // si existe algo en el casillero que marcamos, RETURN
      const newBoard = [...board];
      newBoard[index] = turn;
      // setBoard(newBoard);
      updateDashboard(newBoard)

      const newTurn = state.turn === TURNS.X ? TURNS.O : TURNS.X;
      if (newTurn) {
        setTimeLeft(timer);
      }
      // setTurn(newTurn);
      UpdateTurn({newTurn})
      // guardar partida:
      saveGameToStorage({ board: newBoard, turn: newTurn, mode: boardSize });

      // revisar si tenemos ganador:
      const newWinner = checkWinner(newBoard, state.setting.size);
      if (newWinner) {
        confetti();
        // setWinner(newWinner);
        updateWinner(newWinner)
        
      } else if (checkEndGame(newBoard)) {
        // setWinner(false);
        updateWinner(false)
      }
    }
  };

  return {updateBoard};
};
