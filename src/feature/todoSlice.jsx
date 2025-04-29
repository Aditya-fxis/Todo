import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  users: [],
  loggedInUser: null
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      // state.push({ id: nanoid(), text: action.payload, completed: false });
      const todo = { id: nanoid(), text: action.payload, completed: false };
      state.todos.push(todo);
    },

    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (state, action) => {
      const { id, newText } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.text = newText;
      }
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    registerUser: (state, action) => {
      const { name, email, password } = action.payload;
    
      let storedUsers = JSON.parse(localStorage.getItem("users")) || [];
      if (!Array.isArray(storedUsers)) {
        storedUsers = [];
      }
    
      const existingUser = storedUsers.find((user) => user.email === email);
      if (existingUser) {
        throw new Error("Email already registered!");
      }
    
      const user = { id: nanoid(), name, email, password };
    
      state.users.push(user);
      storedUsers.push(user);
      localStorage.setItem("users", JSON.stringify(storedUsers)); 
      // localStorage.setItem('loggedInUser', JSON.stringify(user));
    },
    
    setLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const {
  addTodo,
  deleteTodo,
  updateTodo,
  toggleTodo,
  registerUser,
  setLoggedInUser,
  incrementByAmount,
} = todoSlice.actions;

export default todoSlice.reducer;
