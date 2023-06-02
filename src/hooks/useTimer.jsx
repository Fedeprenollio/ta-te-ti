import { useEffect, useState } from "react";
import { TURNS } from "../constants";
import { useBoardActions } from "../store/store/useBoardAction";
import { useAppSelector } from "../store/store/store";
import confetti from "canvas-confetti";


export function useTimer() {
  const state = useAppSelector((state) => state.tateti)

  const {newWinner: updateWinner, newTimmer, newTimeLeft} = useBoardActions();

    const [timer , setTimer ] = useState(8)
    const [timeLeft, setTimeLeft] = useState(timer)
    const [classTime, setClassTime] = useState("")

    // TIMER logica
  useEffect(() => {
    if(state.board?.includes(TURNS.X) || state.board?.includes(TURNS.O)){
      if ( state.turn === TURNS.X && timeLeft <= 0.0) {
       // Lógica a ejecutar cuando se agota el tiempo
        // setWinner(TURNS.O)
        updateWinner(TURNS.O)
      
      }else if( state.turn === TURNS.O && timeLeft <= 0.0){
        // setWinner(TURNS.X)
        updateWinner(TURNS.X)
      }
      
  
      const timer = setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 0.1);
        newTimeLeft(-0.1)
      }, 100);

      if(state.winner !== null){
        clearTimeout(timer)
      }

      return () => clearTimeout(timer);
    }

  }, [timeLeft,state.board,state.winner]);
 
  
  useEffect(() => {
    if (state.winner) {
      confetti();
      // setWinner(newWinner);
      updateWinner(state.winner)
    } 
    // else if (checkEndGame(newBoard)) {
    //   // setWinner(false);
    //   updateWinner(false)
    // }
  }, [state.winner])
  


  useEffect(() => {
 setTimeLeft(state.timer) 
  }, [state.timer])

  useEffect(() => {
     if(timeLeft <= 3.0){
  setClassTime("alert-time")
 }
  
    return () => {
      setClassTime("")

    }
  }, [timeLeft])
  
  
return { timer, setTimer, timeLeft, setTimeLeft,classTime}
    
}