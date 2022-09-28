import React, { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./screens/home";
import HeaderComponent from "./component/header";
import LoginFormProvider from "./context/LoginFormContext";
import SearchPage from "./screens/searchPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <LoginFormProvider value={true}>
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </LoginFormProvider>
    </BrowserRouter>
  );
}

export default App;
