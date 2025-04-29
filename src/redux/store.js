import { configureStore } from '@reduxjs/toolkit'
import todoReducer from '../feature/todoSlice.jsx'

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
})