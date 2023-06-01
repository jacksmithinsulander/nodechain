import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [backendData, setBackendData] = useState({})

  useEffect(() => {
    fetch("/api/1/wallet")
      .then(response => response.json())
      .then(data => {
        setBackendData(data)
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, [])

  return (
    <section className="App">
      <h1>My Blockchain</h1>
      <p>What would you like to do? </p>
      {backendData.publicKey ? (
        <p>{backendData.publicKey}</p>
      ) : (
          <p>Loading...</p>
        )}
    </section>
  );
}

export default App;
