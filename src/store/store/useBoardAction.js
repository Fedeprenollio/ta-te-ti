// import { addNewUser, deleteUserById, updateUser } from "../stores/users/slice";

import {
  updateBoard,
  updateSetting,
  updateTurn,
  updateWinner,
  updateTimer,
  updateTimeLeft,
  resetGame,
  updateMode,
  updateRoom,
  updateIsCreatedRoom,
  updateName,
  updateMessages,
  deleteMessages
} from "../board/slice";
import { useAppDispatch } from "./store";

export function useBoardActions() {
  const dispatch = useAppDispatch();

  const setTurn = ({ newTurn }) => {
    dispatch(updateTurn(newTurn));
  };

  const setSetting = ({ board, size, classNameGrid, grid }) => {
    dispatch(updateSetting({ board, size, classNameGrid, grid }));
  };
  const setBoard = (newBoard) => {
    dispatch(updateBoard({ newBoard }));
  };

  const newWinner = (newWinner) => {
    dispatch(updateWinner({ newWinner }));
  };

  const newTimer = (newTimer) => {
    dispatch(updateTimer({ newTimer }));
  };

  const newTimeLeft = (newTimer) => {
    dispatch(updateTimeLeft(newTimer));
  };

  const reserGame = () => {
    dispatch(resetGame());
  };
  const modeChange = ({newMode}) => {
    dispatch(updateMode( {newMode} ));
  };
  const newRoom =({room})=>{
    dispatch(updateRoom({room}))
  }
  const isCreated =({isNewRoom})=>{
    dispatch(updateIsCreatedRoom({isNewRoom}))
  }
  const setNewName =({name})=>{
    dispatch(updateName({name}))
  }
  const setNewMessages =({message})=>{
    dispatch(updateMessages({message}))
  }
  const clearMessages =()=>{
    dispatch(deleteMessages())
  }

  // const addUser = ({ name, email, github }) => {
  // 	dispatch(addNewUser({ name, email, github }));
  // };
  // const handleRemoveUser = (id) => {
  // 	dispatch(deleteUserById(id));
  // };

  // return { handleRemoveUser, addUser, handleUpdateUser };
  return {
    setTurn,
    setSetting,
    setBoard,
    newWinner,
    newTimer,
    newTimeLeft,
    reserGame,
    modeChange,
    newRoom,
    isCreated,
    setNewName,
    setNewMessages,
    clearMessages
  };
}
