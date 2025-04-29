import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLoggedInUser } from "./feature/todoSlice";

const Profile = () => {
  const loggedInUser = useSelector((state) => state.todo.loggedInUser);
  const [editMode, setEditMode] = useState(false);
  const [editInput, setEditInput] = useState(loggedInUser || {});
  const dispatch = useDispatch();

  if (!loggedInUser) {
    return (
      <div className="bg-gray-700 text-white flex items-center justify-center min-h-screen">
        <div className="p-4 text-center">
          Please log in to view your profile.
        </div>
      </div>
    );
  }

  const handleUpdate = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    dispatch(setLoggedInUser(editInput)); 
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditInput(loggedInUser); 
    setEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditInput({ ...editInput, [name]: value });
  };

  return (
    <div className="bg-white mt-28 p-8 rounded-lg shadow-lg w-full max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">
        Profile
      </h1>
      {editMode ? (
        <div className="space-y-4 text-gray-700">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name:
            </label>
            <input
              type="text"
              name="name"
              value={editInput.name}
              onChange={handleChange}
              className="input input-bordered w-full mt-1 p-1 bg-white border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 bg-white">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={editInput.email}
              onChange={handleChange}
              className="input input-bordered w-full mt-1  bg-white p-1 border"
            />
          </div>
          <div className="flex justify-end space-x-4 mt-4">
            <button className="btn text-white" onClick={handleSave}>
              Save
            </button>
            <button className="btn text-white" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4 text-gray-700">
          <p>
            <strong>Name:</strong> {loggedInUser.name}
          </p>
          <p>
            <strong>Email:</strong> {loggedInUser.email}
          </p>
          <button className="btn mt-2 text-white" onClick={handleUpdate}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
