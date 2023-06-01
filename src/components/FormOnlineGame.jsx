import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { io } from "socket.io-client";

export const FormOnlineGame = ({ boardSize, updateBoard, turn }) => {

  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState("");
  console.log("los mnks", messages);
  const [inputValue, setInputValue] = useState("");
  const [room, setRoom] = useState(1);
  useEffect(() => {
    // Conectar al servidor de Socket.IO
    //https://backend-playroom.vercel.app/
    //"http://localhost:3000"
    const newSocket = io("https://play-room.onrender.com", {
      query: {
        code: room,
      },
    });
    setSocket(newSocket);

    // Manejar mensajes entrantes
    newSocket.on("chat message", (message) => {
      console.log(message);
      setMessages(message);
      //   const lastLeter =message?.slice(-1)

      //   updateBoardOnline(lastLeter)
    });

    // Limpiar la conexión cuando el componente se desmonta
    return () => {
      newSocket.disconnect();
    };
  }, [room]);
  console.log(typeof turn);
  useEffect(() => {
    const lastLeter = messages?.jugada?.slice(-1);
    updateBoardOnline(lastLeter);
    
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (inputValue.trim() !== "") {
    //   // Enviar el mensaje al servidor
    //   socket.emit("chat message", inputValue);
    //   setInputValue("");
    // }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value.trim() !== "") {
      // Enviar el mensaje al servidor
      socket.emit("chat message", { jugada: e.target.value, player: turn });

      setInputValue("");
    }
  };
  const handleSubmitRoom = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const room = formData.get("room");
    setRoom(room);
  };

  const updateBoardOnline = (index) => {
    if(index){
        const values = index;
        const lastLetter = values[values?.length - 1];
        if (lastLetter === "") return;

   
    console.log(index);

    const keysEnabled =
      boardSize?.size === 9 ? "123456789qweasdzxcuiojklnm," : "12345678";
    if (keysEnabled.includes(lastLetter)) {
      const key = index.toLowerCase();
      let value;

      switch (lastLetter) {
        case "1":
        case "q":
        case "u":
          value = 1;
          break;
        case "2":
        case "w":
        case "i":
          value = 2;
          break;
        case "3":
        case "e":
        case "o":
          value = 3;
          break;
        case "4":
        case "a":
        case "j":
          value = 4;
          break;
        case "5":
        case "s":
        case "k":
          value = 5;
          break;
        case "6":
        case "d":
        case "l":
          value = 6;
          break;
        case "7":
        case "z":
        case "n":
          value = 7;
          break;
        case "8":
        case "x":
        case "m":
          value = 8;
          break;
        case "9":
        case "c":
        case ",":
          value = 9;
          break;
        default:
          value = null;
          break;
      }
      updateBoard(value - 1);
      //   if (e.target.value.trim() !== "") {
      //     // Enviar el mensaje al servidor
      //     console.log("aca")
      //     socket.emit("chat message", e.target.value);

      // }
    }
}
    // ------
  };

  return (
    <div>
      <h3>online game</h3>
      <h1>Ultima letra:{messages.jugada}</h1>
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

      <form onSubmit={handleSubmitRoom}>
        <input type="text" name="room" />
        <button type="submit">Codigo de la sala privada</button>
      </form>
      <button onClick={() => setMessages(false)}></button>
    </div>
  );
};
