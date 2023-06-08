import React, { useEffect, useState } from "react";
import { TURNS } from "../constants";
import { useAppSelector } from "../store/store/store";
import { useBoardActions } from "../store/store/useBoardAction";
import { io } from "socket.io-client";
import { ChatOnlineGame } from "./ChatOnlineGame";

export const CreateRoom = ({
  room,
  setRoom,
  setSocket,
  setMessages,
  socket,
  name,
  setName,
  totalInRoom,
  setTotalInRoom,
  setIsSpectator,
}) => {
  const state = useAppSelector((state) => state.tateti);
  const { newRoom, isCreated, setBoard, setNewMessages, clearMessages } =
    useBoardActions();
  const [chat, setChat] = useState([]);

  const handleSubmitRoom = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const room = formData.get("room");
    const name = formData.get("name");
    setRoom(room);
    setName(name);
    isCreated({ isNewRoom: true });

    // if(name && room){
    //   clearMessages()
    // } else {
    //   setRoom(room);
    //   setName(name)
    //   isCreated({isNewRoom: true})

    // }
  };

  useEffect(() => {
    if (!room) return;
    // Conectar al servidor de Socket.IO
    //https://backend-playroom.vercel.app/
    //"http://localhost:3000"
    const newSocket = io("http://localhost:3000/", {
      query: {
        code: room,
      },
    });
    setSocket(newSocket);
    newSocket.on("roomSize", (size) => {
      setTotalInRoom(size);
      if (size > 2) {
        setIsSpectator(true);
      }
    });

    // Manejar mensajes entrantes
    newSocket.on("chat message", (message) => {
      setMessages(message);
    });

    // Limpiar la conexión cuando el componente se desmonta
    return () => {
      newSocket.disconnect();
    };
  }, [room]);

  return (
    <div className="text-slate-500">
      {totalInRoom > 1 ? (
        <p>Listo, seleccionen X o O</p>
      ) : (
        <p>esperando a otro jugador...</p>
      )}
      <div>
        {state.createdRoom &&  <h2>Clave de la sala: {state.createdRoom && room}</h2>}
        {/* {name &&  <h2>{name}</h2>} */}

        <form onSubmit={handleSubmitRoom}>
          <span>Clave de sala</span>
          <input type="text" name="room" className="mr-10 ml-2"/>

          <span>Tu nombre</span>
          <input type="text" name="name" className="mr-10 ml-2" />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="submit">Crer sala o unirse</button>
        </form>
      </div>

      <ChatOnlineGame room={room} name={name} socket={socket} />
    </div>
  );
};
