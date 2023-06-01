import React, { useState, useEffect } from 'react';

export const CheckLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const walletData = localStorage.getItem('walletData');
    if (walletData) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <p>Logged In</p>
      ) : (
        <div>
          <p>Please log in to access the page.</p>
          <button>Log In</button>
        </div>
      )}
    </div>
  );
}

