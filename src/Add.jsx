import React, { useEffect } from "react";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, toggleTodo } from "./feature/todoSlice.jsx";
import Edit from "./Edit.jsx";

const Add = () => {
  const [showComponent, setShowComponent] = useState(false);
  const [input, setInput] = useState("");
  const [currentTodo, setCurrentTodo] = useState(null);
  const todoslist = useSelector((state) => state.todo.todos);

  const dispatch = useDispatch();

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch(addTodo(input));
      setInput("");
    }
  };

  const handleToggleTodo = (id) => {
    dispatch(toggleTodo(id));
  };

  const handleUpdate = (todo) => {
    setCurrentTodo(todo);
    setShowComponent(true);
  };

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos && storedTodos.length > 0) {
      storedTodos.forEach((todo) => {
        const exists = todoslist.some((t) => t.id === todo.id);
        if (!exists) {
          dispatch(addTodo(todo.text));
        }
      });
    }
  }, [dispatch]);
  

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoslist));
  }, [todoslist]);

  return (
    <>
      {showComponent ? (
        <Edit setShowComponent={setShowComponent} currentTodo={currentTodo} />
      ) : (
        <div className="container">
          <div className="insidecon">
            <h1 className="mt-10">Todo App</h1>
            <div className="add">
              <input
              className="rounded-md bg-black-400"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Add a new todo"
                style={{
                  padding: "10px",
                  width: "300px",
                  marginRight: "10px",
                  margin: "30px",
                }}
              />
              <button
                className="btn"
                onClick={handleAddTodo}
                style={{ padding: "9px 16px" }}
                disabled={!input.trim()}
              >
                Add
              </button>
            </div>
            <ul>
              {todoslist.map((todo) => (
                <li
                  key={todo.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <div className="check">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggleTodo(todo.id)}
                      style={{
                        marginRight: "10px",
                        width: "20px",
                        height: "20px",
                        cursor: "pointer",
                      }}
                    />
                    <span
                      style={{
                        textDecoration: todo.completed
                          ? "line-through"
                          : "none",
                      }}
                    >
                      {todo.text}
                    </span>
                  </div>
                  <div>
                    <button
                      className="delete"
                      onClick={() => handleUpdate(todo)}
                      style={{ marginRight: "10px" }}
                    >
                      ✏️
                    </button>
                    <button
                      className="delete"
                      onClick={() => dispatch(deleteTodo(todo.id))}
                    >
                      ❌
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Add;