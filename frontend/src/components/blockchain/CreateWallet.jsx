import React, { useState, useEffect } from 'react';

function CreateWallet() {
  const [wallet, setWallet] = useState(null);
  const [buttonPressed, setButtonPressed] = useState(false);

  useEffect(() => {
    if (buttonPressed) {
      fetch("/api/1/wallet")
        .then(response => response.json())
        .then(data => {
          setWallet(data);
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        })
        .finally(() => {
          setButtonPressed(false);
        });
    }
  }, [buttonPressed]);

  const handleButtonClick = () => {
    setButtonPressed(true);
  };

  const handleSignIntoWallet = () => {
    if (wallet) {
      const walletData = {
        publicKey: wallet.publicKey,
        secretKey: wallet.keyPair.secretKey
      };
      localStorage.setItem('walletData', JSON.stringify(walletData));
    }
  };

  return (
    <>
      <button onClick={handleButtonClick}>Create Wallet!</button>
      {wallet ? (
        <section key={wallet.publicKey}>
          <p>{wallet.publicKey}</p>
          <p>Would you like to keep this wallet and sign into it?</p>
          <button onClick={handleSignIntoWallet}>Yes</button>
        </section>
      ) : (
        buttonPressed ? <p>Loading...</p> : null
      )}
    </>
  );
}

export default CreateWallet;