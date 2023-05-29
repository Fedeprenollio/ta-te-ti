import { useEffect, useState } from "react";
import { TURNS } from "../constants";

export function useTimer({board, setWinner,winner}) {
    const [timer , setTimer ] = useState(8)
    const [timeLeft, setTimeLeft] = useState(timer)

    // TIMER logica
  useEffect(() => {
    if(board?.includes(TURNS.X) || board?.includes(TURNS.O)){
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

  }, [timeLeft,board,winner]);

  useEffect(() => {
 setTimeLeft(timer)
  }, [timer])
  
return { timer, setTimer, timeLeft, setTimeLeft}
    
}