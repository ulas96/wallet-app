import React, { useState } from 'react';
import './App.css';
import { getWalletBalance, getWalletTransactions, getTransactionHistory } from '/Users/ulas/Desktop/Blockchain Projects/wallet-app/src/utils/getWalletInfo.js';
function App() {

const [walletAddress, setWalletAddress] = useState("");
const [walletBalance, setWalletBalance] = useState(0);
const [transactions, setTransactions] = useState([]);
    function handleChange(event) {
        setWalletAddress(event.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const balance = await getWalletBalance(walletAddress);
        setWalletBalance(balance);
        getTransactionHistory(walletAddress).then((data) => {
            setTransactions(data);
            console.log(transactions);
        });


    }
  return (
    <div className="App">

      <header>
        <input id="input" value={walletAddress} onChange={handleChange}/>
          <button onClick={handleSubmit}>Get Wallet Info</button>
        <p>
            {walletAddress ? walletBalance : "Provide a wallet address"}
        </p>

      </header>
        <p>
            {transactions.map((transaction, index) => (
                <li key={index}>
                    {transaction.from} - {transaction.value/1000000000000000000}
                </li>
            ))}
        </p>
    </div>
  );
}

export default App;
