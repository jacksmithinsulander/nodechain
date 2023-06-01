import React, { useState, useEffect } from 'react';

function CreateWallet() {
  const [backendData, setBackendData] = useState({});
  const [buttonPressed, setButtonPressed] = useState(false);

  useEffect(() => {
    if (buttonPressed) {
      fetch("/api/1/wallet")
        .then(response => response.json())
        .then(data => {
          setBackendData(data);
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
    }
  }, [buttonPressed]);

  const handleButtonClick = () => {
    setButtonPressed(true);
  };

  return (
    <>
      <button onClick={handleButtonClick}>Create Wallet!</button>
      {buttonPressed ? (
        backendData.publicKey ? (
          <p>{backendData.publicKey}</p>
        ) : (
          <p>Loading...</p>
        )
      ) : null}
    </>
  );
}

export default CreateWallet;