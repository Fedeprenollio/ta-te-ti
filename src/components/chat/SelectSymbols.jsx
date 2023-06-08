import React, { useEffect } from 'react'
import { useState } from 'react';
import { TURNS } from '../../constants';

export const SelectSymbols = ({socket, }) => {
    const [player1Symbol, setPlayer1Symbol] = useState(null);
    const [player2Symbol, setPlayer2Symbol] = useState(null);
  
    useEffect(() => {
        if(!socket) return
      // Escucha el evento de selección de símbolo del jugador 1
      socket.on('player1SymbolSelected', (selectedSymbol) => {
        setPlayer1Symbol(selectedSymbol);
        // Actualiza el símbolo disponible para el jugador 2
        const player2Symbol = selectedSymbol === TURNS.X ? TURNS.O : TURNS.X;
        setPlayer2Symbol(player2Symbol);
      });
    }, [socket]);
  
    const handleSymbolSelect = (selectedSymbol) => {
      // Envía el símbolo seleccionado al servidor
      socket.emit('player1SymbolSelected', selectedSymbol);
      setPlayer1Symbol(selectedSymbol);
    };
  
    return (
      <div>
        <h1>Juego del Tateti</h1>
        {player1Symbol && (
          <p>Jugador 1: Símbolo seleccionado: {player1Symbol}</p>
        )}
        {player2Symbol && (
          <p>Jugador 2: Símbolo disponible: {player2Symbol}</p>
        )}
        {!player1Symbol && (
          <div>
            <p>Jugador 1: Selecciona tu símbolo:</p>
            <button onClick={() => handleSymbolSelect(TURNS.X)}>X</button>
            <button onClick={() => handleSymbolSelect(TURNS.O)}>O</button>
          </div>
        )}
      </div>
    );
}
