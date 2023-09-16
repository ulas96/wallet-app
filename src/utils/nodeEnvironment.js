const { Network, Alchemy } = require("alchemy-sdk");
const axios = require("axios");
const { ethers } = require("ethers");



const alcAPI = "yGVniKr_iM25l3kCev9I0J5_Ekk0AMaU";
const ethAPI = "BXWEB6YXSX3XBMNNJ39PSZQ9EG19HC8CRQ";

const provider = new ethers.providers.AlchemyProvider(
    'goerli',
    alcAPI
);

const settings = {
    apiKey: alcAPI, // Replace with your Alchemy API Key.
    network: Network.ETH_MAINNET, // Replace with your network.
};
const alchemy = new Alchemy(settings);

async function getWalletBalance(walletAddress) {
    try {
        const balance = await alchemy.core.getBalance(walletAddress, "latest");
        console.log(balance);
        return Number(parseInt(balance)) / 10 ** 18;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function getWalletTransactions(walletAddress) {
    return axios
        .get(
            `https://api.etherscan.io/api?module=account&action=txlistinternal&address=${walletAddress}&startblock=0&endblock=2702578&page=1&offset=10&sort=asc&apikey=${ethAPI}`
        )
        .then((response) => {
            let tx = [];
            for(let i = 0; i < response.data.result.length; i++) {
                tx[i] = response.data.result[i] ;
            }
            return tx;
        })
        .catch((error) => {
            console.error(error);
            return null;
        });
}

async function getWalletTransactions2(walletAddress) {
    let transacions =  [];
    provider.getHistory(walletAddress).then((response) => {
        for(let i = 0; i < response.length; i++) {
            transacions[i] = response[i];
        }
        return transacions;
    });
}

    getWalletTransactions2("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045").then((response) => {
        console.log(response);
    });
