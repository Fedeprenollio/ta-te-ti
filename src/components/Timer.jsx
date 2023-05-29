import React, { useState } from "react";

export const Timer = ({ timeLeft, setTimer }) => {
  const [error, setError] = useState(false);

  const handleTimer = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const timer = formData.get("timer");
    // Validar que el valor sea un número
    if (!isNaN(timer) && timer !== "") {
      setError(false);
      // El valor es un número válido
      const seconds = parseInt(timer, 10); // Convertir a entero si es necesario
      // Realiza las operaciones necesarias con el valor numérico
      setTimer(seconds)
    } else {
      // El valor no es un número válido
      setError("Debes ingresar números unicamente");
    }
  };
  return (
    <div>
      <div>
        <form onSubmit={handleTimer}  className="container-form">
          <label htmlFor="timer">Tiempo:</label>
          <input
            type="text"
            name="timer"
            id="timer"
            placeholder="10 segundos..."
          />
          {error && <span className="error">{error}</span>}
          <button>Cambiar</button>
        </form>
      </div>
      <div className="container-timer">
        {" "}
        <h4>Tiempo restante: </h4>
        <h2 className="timer">{timeLeft} seg</h2>
      </div>
    </div>
  );
};
