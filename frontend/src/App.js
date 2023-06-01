import React, { useEffect, useState } from 'react';
import './App.css';
import {LandingPage} from "./components/LandingPage";

function App() {
  const [backendData, setBackendData] = useState({})

  return (
    <section className="App">
      <LandingPage></LandingPage>
    </section>
  );
}

export default App;
