import React, { useContext } from "react";
import "./App.css";

import BottomNavigationBar from "./components/BottomNavigationBar";
import { Outlet } from "react-router";
import { AuthContext } from "./services/auth/auth.context";
import HeaderBlue from "./components/Roshan/Profile/HeaderBlue";
import Header from "./components/header/header";

function App() {
  const { isAuthenticated, user } = useContext(AuthContext);

  return (
    <>
      {isAuthenticated && user ? <HeaderBlue /> : <Header />}

      <Outlet />
      <BottomNavigationBar />
    </>
  );
}

export default App;
