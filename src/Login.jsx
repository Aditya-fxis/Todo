import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { setLoggedInUser } from './feature/todoSlice'

const Login = () => {
  // const users = useSelector((state) => {
  //   // console.log("Redux State:", state);
  //   return state.todo.users;
  // });
  const users = JSON.parse(localStorage.getItem("users"))
  const dispatch = useDispatch();
  // console.log("user", users);
  const navigate = useNavigate();
  const [formData, setFormData] = useState
    ({
      email: "",
      password: ""
    });

    const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
  
      const { email, password } = formData;
  
      const user = users.find((user) => user.email === email && user.password === password);
  
      if (user) {
        alert("Login successful!");
        dispatch(setLoggedInUser(user));
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        navigate("/profile"); 
      } else {
        alert("Invalid email or password!");
      }
    };
  return (
    <>
    <div className="bg-[#242424] flex items-center  justify-center">
      <div className="bg-white mt-28 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">Login to Your Account</h1>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              placeholder="aditya@gmail.com"
              className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              placeholder="password"
              className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleInputChange}
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-300"
            >
              Login
            </button>
          </div>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="text-indigo-600 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
    </>
  );
};

export default Login;