import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./screens/home";
import "./App.css";
import HeaderComponent from "./component/header";

function App() {
  return (
    <BrowserRouter>
      <HeaderComponent />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
