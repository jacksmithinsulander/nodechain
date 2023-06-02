import React, { useState, useEffect } from "react";
import { Outlet } from "react-router";
import { Navigation } from "../components/Navigation";
import "./MainView.css";

export const MainView = () => {
  const [walletData, setWalletData] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("walletData"));
    setWalletData(data);
  }, []);

  return (
    <>
      <header>
        <Navigation className="navigation-bar" />
        {walletData ? (
          <p className="message">
            Welcome, <span className="wallet">{walletData.publicKey}</span>
          </p>
        ) : (
          <p className="message">Please log in</p>
        )}
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};