import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Add from "./Add";
import Navbar from "./Navbar";
import Login from "./Login";
import Signup from "./SignUp";
import Profile from "./Profile";

const App = () => {
  return (
    <div>
      <Router><div className="">

          <Navbar />
      </div>
        <Routes>
          <Route path="/add" element={<Add />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
