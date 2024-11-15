import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";
import Signup from "./components/Signup";
import Login from "./components/Login";
import CarList from "./components/CarList";
import CarDetail from "./components/CarDetail";
import CarForm from "./components/CarForm";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Router>
      <div className="theme-switcher" onClick={toggleTheme}>
        {theme === "light" ? <FaMoon /> : <FaSun />}
      </div>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cars" element={<CarList />} />
        <Route path="/cars/create" element={<CarForm />} />
        <Route path="/cars/:id" element={<CarDetail />} />
        <Route path="/cars/:id/edit" element={<CarForm editMode />} />
      </Routes>
    </Router>
  );
}

export default App;
