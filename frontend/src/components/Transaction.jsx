import React from 'react';

export const Transaction = () => {
  return (
    <section>
      <p>Send transaction to another ogre:</p>
      <form>
        <label htmlFor="recipient">Recipient:</label><br />
        <input type="text" name="recipient" /><br />
        <label htmlFor="amount">Amount:</label><br />
        <input type="text" name="amount" inputMode="numeric" pattern="[0-9]*" /><br />
        <label htmlFor="gas">Gasfee:</label><br />
        <input type="text" name="gasfee" inputMode="numeric" pattern="[0-9]*" /><br />
        <button>Send transaction</button>
      </form>
    </section>
  );
};

