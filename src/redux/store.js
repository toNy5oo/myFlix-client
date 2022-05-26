import { configureStore } from '@reduxjs/toolkit'
import moviesReducer from '../redux/movieSlice'

export default configureStore({
    reducer: {
        movies: moviesReducer,
    }
})