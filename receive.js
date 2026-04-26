/* ===================================
   CORΛX MASTER RECEIVE.JS v1
=================================== */

const RECEIVE = {
network: "Ethereum",
token: "USDT",
amount: "",
address: "",
requestLink: ""
};

/* INIT */

document.addEventListener("DOMContentLoaded", ()=>{

loadReceiveWallet();
bindReceive();

});

/* LOAD WALLET */

function loadReceiveWallet(){

RECEIVE.address =
localStorage.getItem("corax_wallet") ||
"0x8d3f91a2b5e67c4d8fa1b34ce9d7a221fbc09217";

renderAddress();
}

/* EVENTS */

function bindReceive(){

const network = document.getElementById("receiveNetwork");
const token = document.getElementById("receiveToken");
const amount = document.getElementById("receiveAmount");
const btn = document.getElementById("receiveBtn");

if(network){
network.addEventListener("change", e=>{
RECEIVE.network = e.target.value;
generateRequest();
});
}

if(token){
token.addEventListener("change", e=>{
RECEIVE.token = e.target.value;
generateRequest();
});
}

if(amount){
amount.addEventListener("input", e=>{
RECEIVE.amount = e.target.value;
generateRequest();
});
}

if(btn){
btn.addEventListener("click", shareRequest);
}

generateRequest();
}

/* RENDER */

function renderAddress(){

const el = document.getElementById("walletAddress");

if(el){
el.innerText = RECEIVE.address;
}
}

/* REQUEST */

function generateRequest(){

const amount = RECEIVE.amount ? `&amount=${RECEIVE.amount}` : "";

RECEIVE.requestLink =
`corax://pay?address=${RECEIVE.address}&network=${encodeURIComponent(RECEIVE.network)}&token=${RECEIVE.token}${amount}`;

renderRequest();
generateQR();
}

/* PREVIEW */

function renderRequest(){

const box = document.getElementById("receivePreview");

if(!box) return;

box.innerHTML =
"Network: " + RECEIVE.network + "<br>" +
"Token: " + RECEIVE.token + "<br>" +
"Amount: " + (RECEIVE.amount || "Open") + "<br>" +
"Address: " + shortWallet(RECEIVE.address);
}

/* QR MOCK */

function generateQR(){

const qr = document.getElementById("qrBox");

if(!qr) return;

qr.innerHTML = "";

for(let i=0;i<64;i++){

const cell = document.createElement("div");

cell.style.width = "18px";
cell.style.height = "18px";
cell.style.borderRadius = "2px";
cell.style.background =
Math.random() > .5 ? "#fff" : "#000";

qr.appendChild(cell);
}
}

/* ACTIONS */

function copyReceiveAddress(){

navigator.clipboard.writeText(RECEIVE.address);
toast("Address copied");
}

function copyRequestLink(){

navigator.clipboard.writeText(RECEIVE.requestLink);
toast("Request link copied");
}

function shareRequest(){

if(navigator.share){

navigator.share({
title:"CORΛX Payment Request",
text:"Pay with CORΛX",
url:RECEIVE.requestLink
});

}else{

copyRequestLink();
}
}

/* HISTORY */

function saveReceiveMock(value){

let history =
JSON.parse(localStorage.getItem("corax_history")) || [];

history.unshift({
type:"Receive",
amount:value,
token:RECEIVE.token,
network:RECEIVE.network,
date:new Date().toISOString()
});

localStorage.setItem(
"corax_history",
JSON.stringify(history)
);
}
