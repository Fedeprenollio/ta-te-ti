import { useEffect, useState } from "react";
import io from "socket.io-client";
import { TURNS } from "../../constants";
import { useBoardActions } from "../../store/store/useBoardAction";
import { useAppSelector } from "../../store/store/store";
import { MembersList } from "../MembersList";

const ChatComponent = ({
  socket,
  name,
  isSpectator,
  setIsSpectator,
  memberNames,
  setMemberNames,
  player,
  setPlayer,
 
}) => {
  const [getStatus, setGetStatus] = useState(false);
  const { setSetting, setBoard,newTimer } = useBoardActions();
  const {winner} = useAppSelector((state) => state.tateti)
  const [isReady, setIsReady] = useState(false)

  const [error, setError] = useState(false);
  const modeTateti = {
    size: 9,
    grid: 3 * 3,
    classNameGrid: "board3x3",
  };
  const mode4InLine = { size: 42, grid: 42, classNameGrid: "board6x7" };

  useEffect(() => {
    if (!socket) return;


    if(winner){
      setIsReady(false)
    }
    // Evento para recibir la lista de nombres de los integrantes
    socket.on("memberNames", (names) => {
      setMemberNames(names);
      names.find((player) => {
        if (player.id === socket.id) {
          setPlayer(player.symbol);
          setIsSpectator(player);
        }
      });
    });

    // Evento para unirse a la sala de chat con un nombre
    const joinChat = (name) => {
      socket.emit("joinChat", name);
    };

    socket.on("gameSetting", (memberStatus) => {
      console.log("LA SETTING QUE SE ESCUCH>",memberStatus);
      if (memberStatus === "modeTateti") {
        setSetting(modeTateti);
        setBoard(Array(9).fill(null));
      }
      if (memberStatus === "mode4inLine") {
        setSetting(mode4InLine);
        setBoard(Array(42).fill(null));
      }
    });

    socket.on("timerSetting", (timer) => {
      if(!timer) return
      if(timer ==="") return
      newTimer(timer)
    });




    // Un ejemplo de cómo se puede llamar a la función joinChat con un nombre determinado
    joinChat(name);

    return () => {
      // Limpiar los listeners del socket cuando se desmonta el componente
      socket.off("memberNames");
    };
  }, [socket, name, getStatus, isReady, winner]);

  // useEffect(() => {
  //   if(!socket) return
  //   if(memberNames.length <3){
  //     socket.emit("ocuparLugar", "Jugador")

  //   }else{
  //     socket.emit("ocuparLugar", "Espectador")
  //   }
  // }, [socket, memberNames])

  const handleSeletStatus = (e) => {
    if (e.target.value === "Espectador") {
      socket.emit("selectSymbol", "---");
    }

    socket.on("ocuparLugar", (memberStatus) => {
      console.log(memberStatus);
    });

    socket.emit("ocuparLugar", e.target.value);
    setGetStatus(!getStatus);
  };

  const handleSeletSymbol = (e) => {
    socket.on("selectSymbol", (memberStatus) => {
      console.log(memberStatus);
    });

    console.log("CLIN?", e.target.value);
    socket.emit("selectSymbol", e.target.value);
    setGetStatus(!getStatus);
  };


  const handleSelectMode = (e) => {
    const newMode = e.target.value;

    if (newMode === "modeTateti") {
      socket.emit("gameSetting", "modeTateti");
    }

    if (newMode === "mode4inLine") {
      socket.emit("gameSetting", "mode4inLine");
    }
    setGetStatus(!getStatus);
  };

  const handleSubmitTimer=(e)=>{
    e.preventDefault();
    const formData = new FormData(e.target);
    const timer = formData.get("timer")
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
   socket.emit("timerSetting", Number(timer)) 
  
  }
  
  const handleStatusReady=(e)=>{
    console.log("READY", e.target.checked)
    setIsReady(!isReady)
    socket.emit("areYouReady", e.target.checked)

  }
  return (
    <div>
  
      <MembersList memberNames={memberNames} socket={socket} handleSeletStatus={handleSeletStatus} handleSeletSymbol={handleSeletSymbol} handleStatusReady={handleStatusReady} handleSelectMode={handleSelectMode} handleSubmitTimer={handleSubmitTimer} isReady={isReady}/>
    </div>
  );
};

export default ChatComponent;
