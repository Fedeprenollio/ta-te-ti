import React, { useEffect, useState } from "react";
import { TURNS } from "../constants";
import { useAppSelector } from "../store/store/store";
import { useBoardActions } from "../store/store/useBoardAction";
import { io } from "socket.io-client";
import { ChatOnlineGame } from "./ChatOnlineGame";

export const CreateRoom = ({room, setRoom, setSocket , setMessages, socket}) => {

  const state = useAppSelector((state) => state.tateti)
  const {newRoom, isCreated, setBoard, setNewMessages,clearMessages} = useBoardActions()
  const [chat, setChat] = useState([])
  const [name, setName] = useState()
  const handleSubmitRoom = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const room = formData.get("room");
    const name = formData.get("name")

    if(name && room){
      clearMessages()
    } else {
      setRoom(room);
      setName(name)
      isCreated({isNewRoom: true})

    }
  };

  useEffect(() => {
    // Conectar al servidor de Socket.IO
    //https://backend-playroom.vercel.app/
    //"http://localhost:3000"
    const newSocket = io("https://play-room.onrender.com", {
      query: {
        code: room,
      },
    });
    console.log("QUE HAY?",newSocket)
    setSocket(newSocket);

    // Manejar mensajes entrantes
    newSocket.on("chat message", (message) => {
      // console.log("BOOLEANo", message.player === TURNS.O);
      console.log("EL MENSAJE",message)
      setMessages(message);

    });   

    // Limpiar la conexión cuando el componente se desmonta
    return () => {
      newSocket.disconnect();
    };
  }, [room, chat]);
  


  return (
    <div>

    <div>
      <h2>Clave de la sala: {state.createdRoom && room}</h2>
      <h2>Tu nombre: {name}</h2>
      <form onSubmit={handleSubmitRoom}>
        <input type="text" name="room" />
        <input type="text" name="name" />
        <button type="submit">Codigo de la sala privada</button>
      </form>
      <button onClick={() => setMessages(false)}></button>
    </div>




<ChatOnlineGame room={room} name={name}/>

    </div>
  );
};
