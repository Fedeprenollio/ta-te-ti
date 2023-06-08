import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import ChatForm from "./ChatForm";
import "./GameOnline.css";
import { useAppSelector } from "../store/store/store";
import { useBoardActions } from "../store/store/useBoardAction";

export const ChatOnlineGame = ({ room, name, socket }) => {
  const state = useAppSelector((state) => state.tateti);
  const { setNewName, setNewMessages } = useBoardActions();
  const [messagesLocal, setMessagesLocal] = useState([]);
//   const [socket, setSocket] = useState(null);
  const [isAlone, setIsAlone] = useState(false);
  //   const newSocket = io("https://play-room.onrender.com", {
//   useEffect(() => {
//     const newSocket = io("http://localhost:3000/", {
//       query: {
//         code: room,
//       },
//     }); // Reemplaza la URL con la URL de tu servidor
//     setSocket(newSocket);

//     newSocket.on('roomSize', (size) => {
//         setTotalInSala(size);
//       });

//     // Limpiar la conexión cuando el componente se desmonte
//     return () => {
//       newSocket.disconnect();
//     };
//   }, [room]);

  // Resto del código del componente...

  const sendMessage = (message) => {
    socket.emit("only chat", { message, name });
  };

  //   const [messages, setMessages] = useState([]);
  // console.log("MENSAKEs DEL CHAT", messages)

  useEffect(() => {
    if (!socket) return;

    socket.on("only chat", (message) => {
        console.log("que viene desde el msj", message)
      setMessagesLocal((prevMessages) => [...prevMessages, message]);
    //   setNewMessages({ message, name });
    });

 
  }, [socket]);



    // useEffect(() => {
    //             if(!socket)  return
    //     // Manejar el evento cuando te unes a la sala
    //     socket.on('join', (roomSize) => {
    //         setTotalInSala(roomSize)
    //       if (roomSize === 1) {
    //         setIsAlone(true); // Estás solo en la sala
    //     } else {
    //         setIsAlone(false); // Hay otros usuarios conectados en la sala
    //     }
    // });
    //     socket.emit('join', room); // Unirse a la sala con el código proporcionado

    //     return () => {
    //       socket.emit('leave', room); // Salir de la sala al desmontar el componente
    //     };
    //   }, [room, socket]);


  return (
    <div className="flex flex-col max-w-700 border-double border-4 border-indigo-600 mt-2 p-2"  style={{ maxWidth: '700px', margin:"0 auto" }}>
      <ul className="flex-grow overflow-auto flex flex-col ">
        {/* { state?.messages.length > 0  && state?.messages?.map((message, i)=>{
            return(
                <li key={i} className={message?.name === name ? 'own' : 'rival'} > {message?.name === name ? "Yo" : message?.name} : {message?.message}</li>
            )
        })} */}

        {messagesLocal.length > 0 &&
         messagesLocal?.map((message, i) => {
          const isOwnMessage = message?.name === name;
          const messageClasses = isOwnMessage ? "own" : "rival";
          const nameDisplay = isOwnMessage ? "Yo" : message?.name;
            return (
              <li
                key={i}
                className={`px-4 py-2 mb-2 rounded-md ${
                  messageClasses === "own"
                    ? "bg-blue-500 text-white self-end"
                    : "bg-gray-200 text-gray-800 self-start"
                }`}
              >
                <span className="font-bold">{nameDisplay}</span>: {message?.message}
              </li>
            );
          })}
      </ul>
      <ChatForm sendMessage={sendMessage} />
      <button  className="px-4 py-2 mt-4 text-white bg-red-500 rounded-md" onClick={() => socket.disconnect()}> Salir de la sala</button>
    </div>
  );
};
