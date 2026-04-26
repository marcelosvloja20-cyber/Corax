/* ===================================
   CORΛX MASTER SEND.JS v1
=================================== */

const SEND = {
token: "USDT",
network: "Ethereum",
to: "",
amount: 0
};

/* INIT */

document.addEventListener("DOMContentLoaded", ()=>{

bindSendForm();

});

/* FORM */

function bindSendForm(){

const btn = document.getElementById("sendBtn");

if(btn){
btn.addEventListener("click", executeSend);
}

}

/* MAIN */

async function executeSend(){

SEND.to = getField("sendTo");
SEND.amount = parseFloat(getField("sendAmount")) || 0;
SEND.token = getField("sendToken") || "USDT";
SEND.network = getField("sendNetwork") || "Ethereum";

if(!validateSend()) return;

const fee = calculateSendFee(SEND.amount);

showPreview(fee);

setTimeout(()=>{

toast("Transaction Sent");
saveHistory(fee);
clearSendFields();

},1200);

}

/* VALIDATION */

function validateSend(){

if(SEND.to.length < 8){
toast("Invalid address");
return false;
}

if(SEND.amount <= 0){
toast("Invalid amount");
return false;
}

return true;
}

/* FEES */

function calculateSendFee(amount){

const percent = CONFIG.FEES.SEND || 0.25;

return ((amount * percent) / 100).toFixed(2);
}

/* UI */

function showPreview(fee){

const box = document.getElementById("sendPreview");

if(!box) return;

box.innerHTML =
"To: " + shortWallet(SEND.to) + "<br>" +
"Amount: " + SEND.amount + " " + SEND.token + "<br>" +
"Network: " + SEND.network + "<br>" +
"Fee: $" + fee;
}

/* HELPERS */

function getField(id){

const el = document.getElementById(id);

if(!el) return "";

return el.value.trim();
}

function clearSendFields(){

["sendTo","sendAmount"].forEach(id=>{

const el = document.getElementById(id);

if(el) el.value = "";

});

}

/* HISTORY */

function saveHistory(fee){

let history = JSON.parse(localStorage.getItem("corax_history")) || [];

history.unshift({
type: "Send",
to: SEND.to,
token: SEND.token,
amount: SEND.amount,
network: SEND.network,
fee: fee,
date: new Date().toISOString()
});

localStorage.setItem("corax_history", JSON.stringify(history));
}

/* QUICK ACTIONS */

function maxSend(){

const input = document.getElementById("sendAmount");

if(input){
input.value = "1000";
}
}

function pasteAddress(){

navigator.clipboard.readText().then(text=>{

const input = document.getElementById("sendTo");

if(input){
input.value = text;
toast("Address pasted");
}

});
}
