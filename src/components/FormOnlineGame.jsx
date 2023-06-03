import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { io } from "socket.io-client";
import { TURNS } from "../constants";
import { getkeyBoard } from "../logic/getKeyBoard";
import { useAppSelector } from "../store/store/store";
import { CreateRoom } from "./CreateRoom";
import { useBoardActions } from "../store/store/useBoardAction";

export const FormOnlineGame = ({  updateBoard, turn }) => {
  const state = useAppSelector((state) => state.tateti)
  const {setBoard} = useBoardActions()
  
  const [player, setPlayer] = useState(false);

  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState("");
  console.log("los mnks", messages);
  const [inputValue, setInputValue] = useState("");
  const [room, setRoom] = useState(1);

  function updateBoardOnline(index){
    if (index) {
      const values = index;
      const lastLetter = values[values?.length - 1];
      const key = getkeyBoard({lastLetter,boardSize : state.setting.size})
    updateBoard(key)
      // if (lastLetter === "") return;

      // const keysEnabled =
      //   boardSize?.size === 9 ? "123456789qweasdzxcuiojklnm," : "12345678";
      // if (keysEnabled.includes(lastLetter)) {
      //   const key = index.toLowerCase();
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
    }
    // ------
  };
 
  useEffect(() => {
    const lastLeter = messages?.jugada?.slice(-1);
    // setBoard(messages.board)
    if(lastLeter){
      updateBoardOnline(lastLeter);

    }
    // if(messages.board){
    //   setBoard(messages.board)
    // }
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleInputChange = (e) => {
    if (state.turn !== player) return;
    setInputValue(e.target.value);
    if (e.target.value.trim() !== "") {
      // Enviar el mensaje al servidor
      socket.emit("chat message", { jugada: e.target.value, turn, player , board:state.board});

      setInputValue("");
    }

    // e.preventDefault();
    // const values = e.target.value;
    // const lastLetter = values[values.length - 1];
    // const size = state.setting.size;
    // const index = getkeyBoard({ lastLetter, boardSize: size });
    // console.log("index", index, size);
    // updateBoard(index);
  };
  useEffect(() => {
  socket?.emit("chat message", {  turn:state.turn, player , board:state.board});

}, [state.board])


  const handleChange = (event) => {
    setPlayer(event.target.value);
    if (event.target.value) {
      socket.emit("chat message", {
        jugada: null,
        turn: null,
        player: event.target.value,
      });
    }
  };

  useEffect(() => {
    if (player === false && messages.player === TURNS.O) {
      setPlayer(TURNS.X);
    } else if (player === false && messages.player === TURNS.X) {
      setPlayer(TURNS.O);
    }
  }, [messages]);

  return (
    <div>
      <h3>Juego Online</h3>
      <h1>Tu eres:{player}</h1>
      <form onSubmit={handleSubmit} onChange={handleInputChange}>
        <label htmlFor="keys">Tus teclas:</label>
        <input
          type="text"
          id="keys"
          value={inputValue}
          autoFocus
          placeholder="1 2 3 a s d..."
        />
        <button type="submit">Jugar</button>
      </form>

      <div>
        <label>
          {TURNS.X}
          <input
            disabled={player === TURNS.O}
            type="radio"
            name="jugador"
            value={TURNS.X}
            checked={player === TURNS.X}
            onChange={handleChange}
          />
        </label>

        <label>
          {TURNS.O}
          <input
            disabled={player === TURNS.X}
            type="radio"
            name="jugador"
            value={TURNS.O}
            checked={player === TURNS.O}
            onChange={handleChange}
          />
        </label>
        {/* <label>
       Recetear:
        <input
          type="radio"
          name="jugador"
          value={"-"}
          checked={player === TURNS.O}
          onChange={handleChange}
        />
  const [room, setRoom] = useState(null)
  const [socket, setSocket] = useState(null)

      </label> */}
      </div>

     <CreateRoom room={room} setRoom={ setRoom} setSocket={setSocket} setMessages={setMessages} socket={socket}/>
    </div>
  );
};
