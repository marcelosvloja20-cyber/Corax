const walletState = {
connected: false,
address: null,
chainId: null,
balance: "0"
};

async function connectWallet(){

if(typeof window.ethereum === "undefined"){
alert("MetaMask não detectada.");
return;
}

try{

const accounts = await window.ethereum.request({
method: "eth_requestAccounts"
});

walletState.address = accounts[0];
walletState.connected = true;

walletState.chainId = await window.ethereum.request({
method: "eth_chainId"
});

const balanceWei = await window.ethereum.request({
method: "eth_getBalance",
params: [walletState.address, "latest"]
});

walletState.balance = weiToEth(balanceWei);

updateWalletUI();

localStorage.setItem("corax_wallet", walletState.address);

}catch(error){
console.error(error);
alert("Falha ao conectar carteira.");
}
}

async function autoReconnect(){

if(typeof window.ethereum === "undefined") return;

try{

const accounts = await window.ethereum.request({
method: "eth_accounts"
});

if(accounts.length > 0){

walletState.address = accounts[0];
walletState.connected = true;

walletState.chainId = await window.ethereum.request({
method: "eth_chainId"
});

const balanceWei = await window.ethereum.request({
method: "eth_getBalance",
params: [walletState.address, "latest"]
});

walletState.balance = weiToEth(balanceWei);

updateWalletUI();
}

}catch(error){
console.log(error);
}
}

function disconnectWallet(){

walletState.connected = false;
walletState.address = null;
walletState.chainId = null;
walletState.balance = "0";

localStorage.removeItem("corax_wallet");

updateWalletUI(true);
}

function updateWalletUI(reset=false){

const statusBox = document.getElementById("statusBox");
const badge = document.getElementById("badge");

if(!statusBox || !badge) return;

if(reset || !walletState.connected){

statusBox.innerHTML =
"Wallet: Not Connected<br>" +
"Address: --<br>" +
"Network: --<br>" +
"Balance: --";

badge.innerHTML = "Offline";
return;
}

statusBox.innerHTML =
"Wallet: MetaMask<br>" +
"Address: " + shortAddress(walletState.address) + "<br>" +
"Network: " + getNetwork(walletState.chainId) + "<br>" +
"Balance: " + walletState.balance + " ETH";

badge.innerHTML = "Connected";
}

function shortAddress(addr){
return addr.slice(0,6) + "..." + addr.slice(-4);
}

function weiToEth(weiHex){

const wei = parseInt(weiHex,16);

return (wei / 1e18).toFixed(4);
}

function getNetwork(chainId){

switch(chainId){

case "0x1":
return "Ethereum";

case "0x38":
return "BNB Chain";

case "0x89":
return "Polygon";

case "0xa4b1":
return "Arbitrum";

case "0x2105":
return "Base";

default:
return "Unknown";
}
}

if(window.ethereum){

window.ethereum.on("accountsChanged", function(accounts){

if(accounts.length === 0){
disconnectWallet();
return;
}

walletState.address = accounts[0];
updateWalletUI();
});

window.ethereum.on("chainChanged", function(chainId){

walletState.chainId = chainId;
updateWalletUI();
});
}

window.addEventListener("load", autoReconnect);
