import { configureStore } from '@reduxjs/toolkit';
import tatetiReducer from "./board/slice.js"


const persistanceLocalStorageMiddleware = (store) => (next) => (action) => {
	next(action);
	localStorage.setItem("__redux__state__", JSON.stringify(store.getState()));
}


 export const store = configureStore({
    reducer: {
      tateti: tatetiReducer,
    },
    middleware: [persistanceLocalStorageMiddleware],
  });
  
  // export default store;
