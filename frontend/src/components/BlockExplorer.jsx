import React from 'react';

export const BlockExplorer = () => {
	return(
		<section>
			<h1>Blockexplorer</h1>
			<p>Snoop around and see what the other ogres are up to</p>
			<form>
				<label htmlFor="searchBlock">Search Block:</label><br />
				<input type="text" name="searchBlock" /><br />
				<label htmlFor="searchTransaction">Search Transaction:</label><br />
				<input type="text" name="searchTransaction" /><br />
				<label htmlFor="searchAddress">Search Address:</label><br />
				<input type="text" name="searchAddress" /><br />

			</form>
			<h2>Blockchain:</h2>
			<p>Newest > Oldest</p>
			<details>
				<summary>Block: OGRE HASH</summary>
				<table>
					<tr>
						<th>Transactions: </th>
						<td>all the transactions</td>
					</tr>
					<tr>
						<th>Block index: </th>
						<td>44</td>
					</tr>
					<tr>
						<th>Block nonce:</th>
						<td>a14</td>
					</tr>
					<tr>
						<th>Timestamp: </th>
						<td>some unix timestamp</td>
					</tr>
					<tr>
						<th>Miner: </th>
						<td>The lucky ogre that mined this block</td>
					</tr>
					<tr>
						<th>Miner rewards: </th>
						<td>How much the lucky ogre got</td>
					</tr>
					<tr>
						<th>Signature: </th>
						<td>Miner ogres signature</td>
					</tr>
					<tr>
						<th>Last Hash: </th>
						<td>The lucky ogret that mined this block</td>
					</tr>
				</table>
			</details>
		</section>
	)
}


