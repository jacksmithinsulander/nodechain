import React, { useEffect, useState } from 'react';

export const BlockExplorer = () => {
  const [backendData, setBackendData] = useState([]);
  const [searchBlockHash, setSearchBlockHash] = useState('');
  const [searchAddress, setSearchAddress] = useState('');
  const [blockResponse, setBlockResponse] = useState('');
  const [balanceResponse, setBalanceResponse] = useState('');

  useEffect(() => {
    fetch("/api/1/chain")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  const handleSearchBlock = () => {
    fetch(`/api/1/block/${searchBlockHash}`)
      .then((response) => response.json())
      .then((data) => {
        setBlockResponse(data);
      });
  };

  const handleSearchAddress = () => {
    fetch(`/api/1/balance/${searchAddress}`)
      .then((response) => response.json())
      .then((data) => {
        setBalanceResponse(`The ogre: ${searchAddress} has ${data.balance} $OGRES`);
      });
  };

  return (
    <section>
      <h1>Blockexplorer</h1>
      <p>Snoop around and see what the other ogres are up to</p>
      <form>
        <label htmlFor="searchBlock">Search Block:</label>
        <br />
        <input type="text" name="searchBlock" value={searchBlockHash} onChange={(e) => setSearchBlockHash(e.target.value)} />
        <button type="button" onClick={handleSearchBlock}>Search</button>
        {blockResponse && (
          <details>
            <summary>Block: {blockResponse.hash}</summary>
            <table>
              <tbody>
                <tr>
                  <th>Transactions:</th>
                  <td>
                    <ul>
                      {blockResponse.data.map((transaction, j) => (
                        <li key={j}>{transaction.hash}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th>Block index:</th>
                  <td>{blockResponse.index}</td>
                </tr>
                <tr>
                  <th>Block nonce:</th>
                  <td>{blockResponse.nonce}</td>
                </tr>
                <tr>
                  <th>Timestamp:</th>
                  <td>{blockResponse.timestamp}</td>
                </tr>
                <tr>
                  <th>Miner:</th>
                  <td>{blockResponse.miner}</td>
                </tr>
                <tr>
                  <th>Miner rewards:</th>
                  <td>{blockResponse.miningReward}</td>
                </tr>
                <tr>
                  <th>Signature:</th>
                  <td>{blockResponse.signature}</td>
                </tr>
                <tr>
                  <th>Last Hash:</th>
                  <td>{blockResponse.lastHash}</td>
                </tr>
              </tbody>
            </table>
          </details>
        )}
        <br />
        <br />
        <label htmlFor="searchAddress">Search Address:</label>
        <br />
        <input type="text" name="searchAddress" value={searchAddress} onChange={(e) => setSearchAddress(e.target.value)} />
        <button type="button" onClick={handleSearchAddress}>Search</button>
        <p>{balanceResponse}</p>
        <br />
      </form>
      <h2>Blockchain:</h2>
      <p>Newest &gt; Oldest</p>
      {typeof backendData.length === 'undefined' ? (
        <p>Fetching blockchain...</p>
      ) : (
        backendData
          .slice()
          .reverse() // Reverse the array to display newest blocks first
          .map((block, i) => (
            <details key={i}>
              <summary>Block: {block.hash}</summary>
              <table>
                <tbody>
                  <tr>
                    <th>Transactions:</th>
                    <td>
                      <ul>
                        {block.data.map((transaction, j) => (
                          <li key={j}>{transaction.hash}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <th>Block index:</th>
                    <td>{block.index}</td>
                  </tr>
                  <tr>
                    <th>Block nonce:</th>
                    <td>{block.nonce}</td>
                  </tr>
                  <tr>
                    <th>Timestamp:</th>
                    <td>{block.timestamp}</td>
                  </tr>
                  <tr>
                    <th>Miner:</th>
                    <td>{block.miner}</td>
                  </tr>
                  <tr>
                    <th>Miner rewards:</th>
                    <td>{block.miningReward}</td>
                  </tr>
                  <tr>
                    <th>Signature:</th>
                    <td>{block.signature}</td>
                  </tr>
                  <tr>
                    <th>Last Hash:</th>
                    <td>{block.lastHash}</td>
                  </tr>
                </tbody>
              </table>
            </details>
          ))
      )}
    </section>
  );
};