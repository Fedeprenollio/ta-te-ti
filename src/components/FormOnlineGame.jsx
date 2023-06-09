import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { io } from "socket.io-client";
import { TURNS } from "../constants";
import { getkeyBoard } from "../logic/getKeyBoard";
import { useAppSelector } from "../store/store/store";
import { CreateRoom } from "./CreateRoom";
import { useBoardActions } from "../store/store/useBoardAction";
import ChatComponent from "./chat/ChatComponent";
import { SelectSymbols } from "./chat/SelectSymbols";

export const FormOnlineGame = ({ updateBoard, turn, socket, setSocket, player, setPlayer }) => {
  const state = useAppSelector((state) => state.tateti);
  const { setBoard } = useBoardActions();

  const [messages, setMessages] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [room, setRoom] = useState(false);
  const [name, setName] = useState();
  const [totalInRoom, setTotalInRoom] = useState(0);
  const [isSpectator, setIsSpectator] = useState(false);
  const [memberNames, setMemberNames] = useState([]);

  function updateBoardOnline(index) {
    if (index) {
      const values = index;
      const lastLetter = values[values?.length - 1];
      const key = getkeyBoard({ lastLetter, boardSize: state.setting.size });
      updateBoard(key);
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
  }

  useEffect(() => {
    const lastLeter = messages?.jugada?.slice(-1);
    console.log("QUE LLEGA COMO MNJ", messages.jugada, lastLeter)
    // setBoard(messages.board)
    if (lastLeter) {
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
    //CONTROL JUEGO ONLINE
    if (isSpectator.status === "Espectador") {
      return;
    }

    if (!socket) {
      alert("Debes crear o unirte a una sala");
    }
    if (isSpectator.status === "Espectador") {
      return;
    }

    if (memberNames.length <= 1) {
      alert("Esperando mas jugadores");
      return;
    }
    console.log("LISTA DE PLAYER", memberNames);
    const countX = memberNames.reduce((count, member) => {
      if (member.symbol === TURNS.X) {
        return count + 1;
      }
      return count;
    }, 0);
    const countO = memberNames.reduce((count, member) => {
      if (member.symbol === TURNS.O) {
        return count + 1;
      }
      return count;
    }, 0);
    if (countO === 1 && countX === 1) {
      console.log("PARTIDA EN MARCHA");
    } else {
      alert("Tienes demasiados jugadores con X o O");
      return;
    }

    const countReady = memberNames.reduce((count, member) => {
      if (member.ready === true) {
        return count + 1;
      }
      return count;
    }, 0);
    if (countReady === 2) {
    } else {
      alert("1 o mas jugadores no estan listos");
      return;
    }

    //JUEGO ONLINE
    if (state.turn !== player) return;
    setInputValue(e.target.value);
    if (e.target.value.trim() !== "") {
      // Enviar el mensaje al servidor
      socket.emit("chat message", {
        jugada: e.target.value,
        turn,
        player,
        board: state.board,
      });

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


  //TODO: EN TEORIA ESTE USE EFECT NO ES NECESARIO
  // useEffect(() => {
  //   socket?.emit("chat message", {
  //     turn: state.turn,
  //     player,
  //     board: state.board,
  //   });
  // }, [state.board]);

  const handleChange = (event) => {
    console.log("STATUS DE JUEGO", isSpectator);
    // if(!socket){
    //   alert("Debes crear o unirte a una sala")
    // }
    // if(isSpectator.status === "Espectador"){
    //  console.log("NO DEBO SELECCIONAR FICHAS")
    //   return
    // }

    // if(memberNames.length <=1){
    //   console.log("ESPERANDO POR MAS JUGADORES")
    //   alert("Esperando mas jugadores")
    //   return
    // }
    // console.log("LISTA DE PLAYER", memberNames)
    // const countX = memberNames.reduce((count, member) => {
    //   if (member.symbol === TURNS.X) {
    //     return count + 1;
    //   }
    //   return count;
    // }, 0);
    // const countO = memberNames.reduce((count, member) => {
    //   if (member.symbol === TURNS.O) {
    //     return count + 1;
    //   }
    //   return count;
    // }, 0);
    // if( countO === 1 && countX === 1){
    //   alert("PODEMOS JUG")
    // }else{
    //   console.log(countO, countX)
    //   alert("Tienes demasiados jugadores con X o O")
    //   return
    // }

    // if(event.target.value === "-"){
    //   console.log("RESETEO FICHAS")
    //   setPlayer(false)
    //   socket.emit("chat message", {
    //     jugada: null,
    //     turn: null,
    //     player: false,
    //   });
    //   return
    // }else {

    //   setPlayer(event.target.value);
    //   socket.emit("chat message", {
    //     jugada: null,
    //     turn: null,
    //     player: event.target.value,
    //   });
    // }
  };

  // useEffect(() => {
  //   if(isSpectator.status ==="Espectador") return
  //   if (player === false && messages.player === TURNS.O) {
  //     console.log("MI RIVAL ELIGIO REDONDAs")

  //     setPlayer(TURNS.X);
  //   } else if (player === false && messages.player === TURNS.X) {

  //     console.log("MI RIVAL HA ELEGIDO X")
  //     setPlayer(TURNS.O);
  //   }else if(messages.player === false){
  //     console.log("EL RIVAL PIDE CAMBIO DE FICHAS")
  //     setPlayer(false)
  //   }
  // }, [messages.player]);

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
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="submit">Jugar</button>
      </form>

      {/* <div>
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


        <label>
       Resetear:
        <input
          type="radio"
          name="jugador"
          value={"-"}
          checked={player === false}
          onChange={handleChange}
        />
 

      </label>
      </div> */}

      <CreateRoom
        memberNames={memberNames}
        setMemberNames={setMemberNames}
        setIsSpectator={setIsSpectator}
        totalInRoom={totalInRoom}
        setTotalInRoom={setTotalInRoom}
        room={room}
        setRoom={setRoom}
        setSocket={setSocket}
        setMessages={setMessages}
        socket={socket}
        name={name}
        setName={setName}
      />
      <ChatComponent
        player={player}
        setPlayer={setPlayer}
        isSpectator={isSpectator}
        setIsSpectator={setIsSpectator}
        memberNames={memberNames}
        setMemberNames={setMemberNames}
        socket={socket}
        name={name}
        totalInRoom={totalInRoom}
        setTotalInRoom={setTotalInRoom}
      />
      {/* <SelectSymbols socket={socket} /> */}
    </div>
  );
};
