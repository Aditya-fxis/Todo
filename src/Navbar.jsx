import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoggedInUser } from "./feature/todoSlice";

const Navbar = () => {


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loggedInUser = useSelector((state) => state.todo.loggedInUser); 
   const handleLogout = () => {
      dispatch(setLoggedInUser(null));
  
      localStorage.removeItem("loggedInUser");
  
      navigate("/login");
  
      alert("Logged out successfully!");
    };
  return (
    <nav className="navbar top-0">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          MyApp
        </Link>
        {loggedInUser ? (
          <ul className="navbar-links">
            <Link to="/add">AddTodo</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/about">About</Link>
            <button onClick={handleLogout}>Logout</button>
          </ul>
        ) : (
          <ul className="navbar-links">
            <Link to="/login">Login</Link>
            <Link to="/signup">SignUp</Link>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
