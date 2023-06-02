import { configureStore } from '@reduxjs/toolkit';
import tatetiReducer from "./board/slice.js"


const store = configureStore({
    reducer: {
      tateti: tatetiReducer,
    },
  });
  
  export default store;
