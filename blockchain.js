/* ===================================
   CORΛX MASTER BLOCKCHAIN.JS v1
   Multi-Chain Web3 Layer
=================================== */

const CHAIN = {
provider: null,
signer: null,
wallet: null,
network: null,
connected: false
};

/* ===================================
   SUPPORTED NETWORKS
=================================== */

const CHAINS = {

ethereum: {
chainId: "0x1",
name: "Ethereum",
rpc: "https://rpc.ankr.com/eth",
symbol: "ETH"
},

bsc: {
chainId: "0x38",
name: "BNB Chain",
rpc: "https://bsc-dataseed.binance.org",
symbol: "BNB"
},

polygon: {
chainId: "0x89",
name: "Polygon",
rpc: "https://polygon-rpc.com",
symbol: "MATIC"
},

base: {
chainId: "0x2105",
name: "Base",
rpc: "https://mainnet.base.org",
symbol: "ETH"
},

arbitrum: {
chainId: "0xa4b1",
name: "Arbitrum",
rpc: "https://arb1.arbitrum.io/rpc",
symbol: "ETH"
}

};

/* ===================================
   CONNECT WALLET
=================================== */

async function connectWallet(){

if(!window.ethereum){

toastSafe("Install MetaMask");
return null;
}

try{

const accounts =
await ethereum.request({
method:"eth_requestAccounts"
});

CHAIN.provider = window.ethereum;
CHAIN.wallet = accounts[0];
CHAIN.connected = true;

const net =
await ethereum.request({
method:"eth_chainId"
});

CHAIN.network = net;

localStorage.setItem(
"corax_wallet",
CHAIN.wallet
);

trackSafe("wallet_connected");

toastSafe("Wallet Connected");

return CHAIN.wallet;

}catch(err){

console.error(err);
toastSafe("Connection rejected");

return null;
}

}

/* ===================================
   DISCONNECT
=================================== */

function disconnectWallet(){

CHAIN.provider = null;
CHAIN.wallet = null;
CHAIN.network = null;
CHAIN.connected = false;

localStorage.removeItem(
"corax_wallet"
);

toastSafe("Disconnected");
}

/* ===================================
   GET ADDRESS
=================================== */

function walletAddress(){

return CHAIN.wallet;
}

/* ===================================
   BALANCE
=================================== */

async function getNativeBalance(){

if(!CHAIN.wallet) return 0;

try{

const balance =
await ethereum.request({
method:"eth_getBalance",
params:[
CHAIN.wallet,
"latest"
]
});

return (
parseInt(balance,16) /
1e18
).toFixed(4);

}catch(err){

return 0;
}

}

/* ===================================
   SEND NATIVE
=================================== */

async function sendNative(
to,
amountEth
){

if(!CHAIN.wallet){

toastSafe("Connect wallet");
return;
}

const value =
(
Number(amountEth) * 1e18
).toString(16);

try{

const tx =
await ethereum.request({
method:"eth_sendTransaction",
params:[{
from: CHAIN.wallet,
to: to,
value: "0x" + value
}]
});

trackSafe("send_onchain");

toastSafe("Transaction Sent");

return tx;

}catch(err){

console.error(err);
toastSafe("Transaction failed");

}
}

/* ===================================
   SIGN MESSAGE
=================================== */

async function signMessage(msg){

if(!CHAIN.wallet) return null;

try{

const sig =
await ethereum.request({
method:"personal_sign",
params:[
msg,
CHAIN.wallet
]
});

return sig;

}catch(err){

return null;
}

}

/* ===================================
   SWITCH NETWORK
=================================== */

async function switchNetwork(name){

const chain = CHAINS[name];

if(!chain) return;

try{

await ethereum.request({
method:"wallet_switchEthereumChain",
params:[{
chainId: chain.chainId
}]
});

CHAIN.network =
chain.chainId;

toastSafe(
"Switched to " +
chain.name
);

}catch(err){

toastSafe("Switch failed");
}

}

/* ===================================
   GAS ESTIMATE MOCK
=================================== */

async function estimateGas(){

return "0.00042";
}

/* ===================================
   TX STATUS MOCK
=================================== */

async function txStatus(hash){

return {
hash: hash,
status: "confirmed"
};
}

/* ===================================
   EVENTS
=================================== */

if(window.ethereum){

ethereum.on(
"accountsChanged",
(accounts)=>{

CHAIN.wallet =
accounts[0] || null;

}
);

ethereum.on(
"chainChanged",
(chainId)=>{

CHAIN.network =
chainId;

}
);

}

/* ===================================
   HELPERS
=================================== */

function shortWallet(addr){

if(!addr) return "";

return (
addr.slice(0,6) +
"..." +
addr.slice(-4)
);
}

function toastSafe(msg){

if(typeof toast === "function"){

toast(msg);

}else{

console.log(msg);

}
}

function trackSafe(event){

if(typeof track === "function"){

track(event);

}
}

console.log(
"CORΛX Blockchain Ready"
);
