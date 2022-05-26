import moviesReducer from "./movieSlice";
import filterReducer from "./filterSlice";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
    movies: moviesReducer,
    visibilityFilter: filterReducer,
});

export default rootReducer;