import { useState } from "react";
import { TURNS } from "../constants";
import { useBoardActions } from "../store/store/useBoardAction";
import { useAppSelector } from "../store/store/store";

export const useUpdateBoard = ({  winner, boardSize, setTimeLeft, saveGameToStorage, checkWinner, checkEndGame, confetti}) => {
  const state = useAppSelector((state) => state.tateti)

  const { setBoard: updateDashboard ,newWinner:updateWinner , setTurn: UpdateTurn} = useBoardActions();
  
  const updateBoard = (index) => {
    console.log("STATE del USEUPDATE:", state.turn )
    if (state.setting.size === 42) {
      const tablero = state.board;
      const columna = index % 7;

          for (let fila = 5; fila >= 0; fila--) {
            const posicion = fila * 7 + columna;

            if (tablero[posicion] === null) {
              const newBoard = [...state.board];
              newBoard[posicion] = state.turn;
              // setBoard(newBoard);
              updateDashboard(newBoard)
              
              const newTurn = state.turn === TURNS.X ? TURNS.O : TURNS.X;
              if (newTurn) {
                setTimeLeft(state.timer);
              }
              // setTurn(newTurn);
              UpdateTurn({newTurn})

              // guardar partida:
              saveGameToStorage({ board: newBoard, turn: newTurn, mode: boardSize });

              // revisar si tenemos ganador:
              const newWinner = checkWinner(newBoard, state.setting.size);
              console.log("NUEVO GANADOR:", newWinner )
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
      if (state.board[index] || winner) return; // si existe algo en el casillero que marcamos, RETURN
      const newBoard = [...state.board];
      newBoard[index] = state.turn;
      // setBoard(newBoard);
      updateDashboard(newBoard)

      const newTurn = state.turn === TURNS.X ? TURNS.O : TURNS.X;
      if (newTurn) {
        setTimeLeft(state.timer);
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
