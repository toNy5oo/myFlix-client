import rootReducer from "./reducers";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: rootReducer,
    devTools: true,
});


// import { configureStore } from '@reduxjs/toolkit'
// import { combineReducers } from "redux";
// import moviesReducer from '../redux/movieSlice'
// import userReducer from '../redux/userSlice'
// import filterReducer from './filterSlice'

// const allReducer = combineReducers({
//     movies: moviesReducer,
//     visibilityFilter: filterReducer,
// });

// export default configureStore({
//     reducer: {
//         allReducer
//     }
// })