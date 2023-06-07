import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Wallet.css";

export const Wallet = () => {
  const [walletData, setWalletData] = useState(null);
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("walletData"));
    setWalletData(data);
  }, []);

  useEffect(() => {
    if (walletData) {
      fetch(`/api/1/senderTransaction/${walletData.publicKey}`)
        .then((response) => response.json())
        .then((data) => {
          setTransactions(data);
        });
    }
  }, [walletData]);

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
          <section className="border">
            <h1 className="wallet-title">
              Wallet: <span className="wallet">{walletData.publicKey}</span>
            </h1>
            <p>
              <b>
                Balance: {balance !== null ? `${balance} $OGRES ` : "Loading..."}
              </b>
            </p>
          </section>
          <p>Transactions:</p>
          {transactions.map((transaction) => (
            <details key={transaction.hash}>
              <summary>Transaction: {transaction.hash}</summary>
              <table>
                <tbody>
                  <tr>
                    <th>Sending Ogre:</th>
                    <td>{transaction.sender.publicKey}</td>
                  </tr>
                  <tr>
                    <th>Recieving Ogre:</th>
                    <td>{transaction.recipient.publicKey}</td>
                  </tr>
                  <tr>
                    <th>Amount Ogrecoins sent:</th>
                    <td>{transaction.amount}</td>
                  </tr>
                </tbody>
              </table>
            </details>
          ))}
        </>
      )}
    </section>
  );
};