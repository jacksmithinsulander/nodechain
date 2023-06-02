import React, { useState } from 'react';
import { Wallet } from "./Wallet";

export const Transaction = () => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [gasFee, setGasFee] = useState('');

  const handleTransactionSubmit = (event) => {
    event.preventDefault();

    // Get the wallet data from localStorage
    const walletData = JSON.parse(localStorage.getItem('walletData'));
    if (walletData) {
      const { publicKey, secretKey } = walletData;

      // Prepare transaction data
      const transactionData = {
        sender: publicKey,
        recipient: recipient,
        amount: amount,
        gasFee: gasFee,
        secretKey: secretKey
      };

      // Send transaction data to the server
      fetch('/api/1/transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(transactionData)
      })
        .then(response => response.json())
        .then(data => {
          console.log('Transaction processed successfully:', data);
          // Do something with the response data if needed
        })
        .catch(error => {
          console.error('Error processing transaction:', error);
          // Handle the error if needed
        });
    }
  };

  return (
    <section>
      <Wallet />
      <section className="border">
        <p>Send transaction to another ogre:</p>
        <form onSubmit={handleTransactionSubmit}>
          <label htmlFor="recipient">Recipient:</label><br />
          <input
            type="text"
            name="recipient"
            value={recipient}
            onChange={(event) => setRecipient(event.target.value)}
          /><br />
          <label htmlFor="amount">Amount:</label><br />
          <input
            type="text"
            name="amount"
            inputMode="numeric"
            pattern="[0-9]*"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          /><br />
          <label htmlFor="gas">Gasfee:</label><br />
          <input
            type="text"
            name="gasfee"
            inputMode="numeric"
            pattern="[0-9]*"
            value={gasFee}
            onChange={(event) => setGasFee(event.target.value)}
          /><br />
          <button type="submit">Send transaction</button>
        </form>
      </section>
    </section>
  );
};
