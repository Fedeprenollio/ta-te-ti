import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  turn: "X",
  winner: null,
  timer: 8,
  timeLeft: null,
  setting: {
    size: 42,
    grid: 6 * 7,
    classNameGrid: "board6x7",
  },
  board: Array(42).fill(null),
};

initialState.timeLeft = initialState.timer;

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
      //s

      state.turn = "X";
      state.winner = null;
      state.timer = 8;
      state.timeLeft = null;
    //   state.setting = {
    //     size: 42,
    //     grid: 6 * 7,
    //     classNameGrid: "board6x7",
    //   };
      state.board = Array(42).fill(null);
      //S
    },
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
} = tatetiSlice.actions;
export default tatetiSlice.reducer;
