import { createSlice } from "@reduxjs/toolkit";
import { TURNS } from "../../constants";

const DEFAULT_STATE = {
  turn: TURNS.X,
  winner: null,
  timer: 8,
  timeLeft: null,
  setting: {
    size: 42,
    grid: 6 * 7,
    classNameGrid: "board6x7",
  },
  board: Array(42).fill(null),
  mode: "offline",
  createdRoom: 0,
  webSocket: 0,
  name:"",
  messages:[]


};

// initialState.timeLeft = initialState.timer;
const initialState = (() => {
	const persistedState = localStorage.getItem("__redux__state__");
	return persistedState ? JSON.parse(persistedState).tateti : DEFAULT_STATE;
})();

const tatetiSlice = createSlice({
  name: "tateti",
  initialState,
  reducers: {
    updateTurn: (state, action) => {
      const newTurn = action.payload;

      state.turn = newTurn;
    },
    updateSetting: (state, action) => {
      const { size, classNameGrid, grid } = action.payload;
      state.setting = { size, classNameGrid, grid };
    },
    updateWinner: (state, action) => {
      const { newWinner } = action.payload;
      state.winner = newWinner;
    },
    updateBoard: (state, action) => {
      const { newBoard } = action.payload;
      state.board = newBoard;
    },
    updateTimer: (state, action) => {
      const { newTimer } = action.payload;
      state.timer = newTimer;
    },
    updateTimeLeft: (state, action) => {
      //ahora no lo voy a implementar
      const { newTimeLeft } = action.payload;
      state.timeLeft = newTimeLeft;
    },
    resetGame: (state) => {
      state.turn =TURNS.X;
      state.winner = null;
      state.timeLeft = null;
    },
    updateMode: (state, action)=>{
      const {newMode}= action.payload
      state.mode = newMode
    },
    updateRoom: (state,action)=>{
      const {room} = action.payload
      state.room = room
    },
    updateIsCreatedRoom: (state,action)=>{
      console.log(action.payload)
      const {isNewRoom} = action.payload
      state.createdRoom = isNewRoom
    },
    updateName: (state,action)=>{
      const {name} = action.payload
      state.name = name
    },
    updateMessages: (state,action)=>{
      const {message, name} = action.payload
      console.log("message slice:::", {message, name})
      console.log(state)
      state.messages = [... state.messages, message]
      // return {
      //   ...state,
      //   messages: state.messages.concat(message),
      // };
    },
    deleteMessages: (state)=>{
      state.messages= []
    }
  },
});
export const {
  updateTurn,
  updateSetting,
  updateWinner,
  updateBoard,
  resetGame,
  updateTimer,
  updateTimeLeft,
  updateMode,
  updateRoom,
  updateIsCreatedRoom,
  updateName,
  updateMessages,
  deleteMessages
} = tatetiSlice.actions;
export default tatetiSlice.reducer;
