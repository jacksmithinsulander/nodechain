import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Wallet.css";

export const Wallet = () => {
  const [walletData, setWalletData] = useState(null);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("walletData"));
    setWalletData(data);
  }, []);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get(`/api/1/balance/${walletData.publicKey}`);
        setBalance(response.data.balance);
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };

    if (walletData) {
      fetchBalance();
    }
  }, [walletData]);

  return (
    <section>
      {walletData && (
        <>
        <section class="border">
          <h1 className="wallet-title">
            Wallet: <span className="wallet">{walletData.publicKey}</span>
          </h1>
          <p><b>Balance: {balance !== null ? `${balance} $OGRES `: "Loading..."}</b></p>
        </section>
        <p>Transactions: </p>
        </>
      )}
    </section>
  );
}; 

