import { Network, Alchemy } from "alchemy-sdk";
import  AlchemyWeb3  from "@alch/alchemy-web3";

import axios from "axios";

const alcAPI = "yGVniKr_iM25l3kCev9I0J5_Ekk0AMaU";
const ethAPI = "BXWEB6YXSX3XBMNNJ39PSZQ9EG19HC8CRQ";

const settings = {
    apiKey: alcAPI, // Replace with your Alchemy API Key.
    network: Network.ETH_MAINNET, // Replace with your network.
};
const alchemy = new Alchemy(settings);

export async function getWalletBalance(walletAddress) {
    try {
        const balance = await alchemy.core.getBalance(walletAddress, "latest");
        console.log(balance);
        return Number(parseInt(balance))/10**18;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getWalletTransactions(walletAddress) {
    return axios
        .get(
            `https://api.etherscan.io/api?module=account&action=txlistinternal&address=${walletAddress}&startblock=0&endblock=2702578&page=1&offset=100&sort=asc&apikey=${ethAPI}`
        )
        .then((response) => {
        return response.data.result;
        })
        .catch((error) => {
            console.error(error);
            return null;
        });
}


export async function getTransactionHistory(address) {
    // Create an instance of AlchemyWeb3 using your Alchemy API key
    const alchemyWeb3 = new AlchemyWeb3(`https://eth-mainnet.alchemyapi.io/v2/${alcAPI}`);

    // Get the block number of the latest block
    const latestBlockNumber = await alchemyWeb3.eth.getBlockNumber();

    // Set the starting block number for the transaction history
    const startBlockNumber = latestBlockNumber - 10000; // Get the last 10,000 blocks

    // Create a filter to fetch transactions for the specified address
    const filter = {
        fromBlock: startBlockNumber,
        toBlock: "latest",
        address: address,
    };

    // Fetch the transactions that match the filter
    const transactions = await alchemyWeb3.eth.getPastLogs(filter);

    return transactions;
}