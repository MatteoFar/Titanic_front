import React, { useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./screens/home";
import HeaderComponent from "./component/header";
import LoginFormProvider from "./context/LoginFormContext";
import IsLoggedProvider from "./context/isLoggedContext";
import SearchPage from "./screens/searchPage";
import { verifyToken } from "./tools";
import "./App.css";

function App() {
  useEffect(() => {
    console.log("TEEEEEESTAPP", verifyToken());
  }, []);

  return (
    <BrowserRouter>
      <LoginFormProvider value={true}>
        <IsLoggedProvider value={false}>
          <HeaderComponent isLoggedProps={verifyToken()} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </IsLoggedProvider>
      </LoginFormProvider>
    </BrowserRouter>
  );
}

export default App;
