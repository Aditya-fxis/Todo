import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTodo } from './feature/todoSlice';

const Edit = ({ setShowComponent, currentTodo }) => {
  const dispatch = useDispatch();
  const [editInput, setEditInput] = useState(currentTodo.text); 

  const handleUpdateTodo = () => {
    if (editInput.trim()) {
      dispatch(updateTodo({ id: currentTodo.id, newText: editInput }));
      setShowComponent(false); 
    }
  };

  return (
    <div className="container">
      <div className="insidecon">
        <h1 className="mt-10 bg-black-400">Edit Todo</h1>

        <div className="add">
          <input
            type="text"
            className="rounded-md"
            value={editInput}
            onChange={(e) => setEditInput(e.target.value)}
            placeholder="Edit your todo"
            style={{
              padding: '10px',
              width: '300px',
              marginRight: '10px',
              margin: '30px',
            }}
          />
        </div>
        <div className="add">
          <button className="btn" onClick={handleUpdateTodo} disabled={!editInput.trim()}>
            Save
          </button>
          <button
            className="btn"
            onClick={() => setShowComponent(false)}
            style={{ marginLeft: '10px' }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
