import React, { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./screens/home";
import HeaderComponent from "./component/header";
import LoginFormProvider from "./context/LoginFormContext";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <LoginFormProvider value={true}>
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </LoginFormProvider>
    </BrowserRouter>
  );
}

export default App;
