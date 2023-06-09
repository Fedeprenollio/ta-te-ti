import React, { useState } from "react";
import { useBoardActions } from "../store/store/useBoardAction";
import { useAppSelector } from "../store/store/store";

export const Timer = ({ timeLeft, classTime }) => {
  const state = useAppSelector((state) => state.tateti)

  const  {newTimer} = useBoardActions()
  const [error, setError] = useState(false);

  const handleTimer = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const timer = formData.get("timer");
    
    // Validar que el valor sea un número:
    const isTimerValid = /^[1-9]\d*$/.test(timer);
    if(isTimerValid){
      setError(false);
      // El valor es un número válido
      const seconds = parseInt(timer, 10); // Convertir a entero si es necesario
      // Realiza las operaciones necesarias con el valor numérico
      // setTimer(seconds);
      newTimer( seconds)
    }else {
      setError("El tiempo debe ser un número positivo y sin decimales")
    }

 
  };
  return (
    <div>
      {state.mode === "offline"  &&
      <div>
        <form onSubmit={handleTimer} className="container-form text-slate-500">
          <label htmlFor="timer">Tiempo:</label>
          <div>
            <div style={{display:"flex", alignItems:"center"}}>
              <input
                type="text"
                name="timer"
                id="timer"
                placeholder="10 segundos..."
              />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" >Cambiar</button>
            </div>
              {error && <span className="error">{error}</span>}
          </div>
        </form>
      </div>
      
      }

      <div className="container-timer">
        <h4>Tiempo restante: </h4>
        <div
          className={`time-container ${classTime}
`}
        >
          <div className="seconds">
            <h2 className={`timer `}>{Math.floor(timeLeft.toFixed(1))}</h2>
          </div>
          <div className="points">
            <h2 className={`timer `}>:</h2>
          </div>
          <div className="decimas">
            <h2 className={`timer `}>{timeLeft.toFixed(1).slice(-1)}</h2>
          </div>
          <h2 className={`timer `}>seg</h2>
          {/* <h2 className="timer-before"> </h2> */}
        </div>
      </div>
    </div>
  );
};
