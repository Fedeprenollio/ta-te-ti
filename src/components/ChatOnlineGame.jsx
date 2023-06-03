import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import ChatForm from "./ChatForm";
import "./GameOnline.css"
import { useAppSelector } from "../store/store/store";
import { useBoardActions } from "../store/store/useBoardAction";

export const ChatOnlineGame = ({room, name}) => {
    const state = useAppSelector((state) => state.tateti)
    const {setNewName, setNewMessages} = useBoardActions()
console.log(state)

  const [socket, setSocket] = useState(null);


  useEffect(() => {
    const newSocket = io("https://play-room.onrender.com", {
        query: {
          code: room,
        },
      }); // Reemplaza la URL con la URL de tu servidor
    setSocket(newSocket);

    // Limpiar la conexión cuando el componente se desmonte
    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Resto del código del componente...

  const sendMessage = (message) => {
    socket.emit("only chat", {message, name});
  };

//   const [messages, setMessages] = useState([]);
// console.log("MENSAKEs DEL CHAT", messages)

  useEffect(() => {
    if (!socket) return;

    socket.on("only chat", (message) => {
    //   setMessages((prevMessages) => [...prevMessages, message]);
    setNewMessages({message, name})
    });
  }, [socket]);

 
  return (
   <div>

    <ul>
        { state?.messages.length > 0  && state?.messages?.map((message, i)=>{
            return(
                <li key={i} className={message?.name === name ? 'own' : 'rival'} > {message?.name === name ? "Yo" : message?.name} : {message?.message}</li>
            )
        })}
    </ul>
    <ChatForm sendMessage={sendMessage}/>
   </div>
  );
};
