import { useEffect, useState } from "react";
import { TURNS } from "../constants";

export function useTimer({board, setWinner,winner, turn}) {
    const [timer , setTimer ] = useState(8)
    const [timeLeft, setTimeLeft] = useState(timer)
    const [classTime, setClassTime] = useState("")

    // TIMER logica
  useEffect(() => {
    if(board?.includes(TURNS.X) || board?.includes(TURNS.O)){
      if ( turn === TURNS.X && timeLeft <= 0.0) {
       // Lógica a ejecutar cuando se agota el tiempo
        setWinner(TURNS.O)
      }else if( turn === TURNS.O && timeLeft <= 0.0){
        setWinner(TURNS.X)
      }
      
  
      const timer = setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 0.1);
      }, 100);

      if(winner !== null){
        clearTimeout(timer)
      }

      return () => clearTimeout(timer);
    }

  }, [timeLeft,board,winner]);
 
  
  useEffect(() => {
 setTimeLeft(timer)


 
  }, [timer])

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