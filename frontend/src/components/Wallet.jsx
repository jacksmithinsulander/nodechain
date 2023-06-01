import React, { useState, useEffect } from "react";
import axios from "axios";

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
        const response = await axios.get('/api/1/balance', {
          data: { walletData: walletData }
        });
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
          <h1>Wallet: {walletData.publicKey}</h1>
          <p>Balance: {balance !== null ? balance : "Loading..."}</p>
          <p>Transactions: </p>
        </>
      )}
    </section>
  );
};
