/* ===================================
   CORΛX MASTER SWAP.JS v1
=================================== */

const SWAP = {
fromToken: "USDT",
toToken: "ETH",
fromAmount: 0,
toAmount: 0,
rate: 0,
fee: 0.15
};

/* INIT */

document.addEventListener("DOMContentLoaded", ()=>{

bindSwap();
updateQuote();

});

/* EVENTS */

function bindSwap(){

const fromToken = document.getElementById("swapFromToken");
const toToken = document.getElementById("swapToToken");
const fromAmount = document.getElementById("swapFromAmount");
const btn = document.getElementById("swapBtn");
const reverse = document.getElementById("swapReverse");

if(fromToken){
fromToken.addEventListener("change", e=>{
SWAP.fromToken = e.target.value;
updateQuote();
});
}

if(toToken){
toToken.addEventListener("change", e=>{
SWAP.toToken = e.target.value;
updateQuote();
});
}

if(fromAmount){
fromAmount.addEventListener("input", e=>{
SWAP.fromAmount = parseFloat(e.target.value) || 0;
updateQuote();
});
}

if(btn){
btn.addEventListener("click", executeSwap);
}

if(reverse){
reverse.addEventListener("click", reverseTokens);
}

}

/* QUOTE */

function updateQuote(){

SWAP.rate = getRate(
SWAP.fromToken,
SWAP.toToken
);

SWAP.toAmount =
(SWAP.fromAmount * SWAP.rate);

renderSwap();
}

/* RATES MOCK */

function getRate(from,to){

const pairs = {

"USDT_ETH":0.00031,
"USDC_ETH":0.00031,
"ETH_USDT":3200,
"ETH_USDC":3200,
"USDT_BNB":0.0017,
"BNB_USDT":590,
"USDT_USDC":1,
"USDC_USDT":1

};

return pairs[from + "_" + to] || 1;
}

/* RENDER */

function renderSwap(){

const receive = document.getElementById("swapReceive");
const info = document.getElementById("swapInfo");

const feeValue =
((SWAP.fromAmount * SWAP.fee)/100);

if(receive){
receive.value =
SWAP.toAmount.toFixed(6);
}

if(info){
info.innerHTML =
"Rate: 1 " + SWAP.fromToken +
" = " + SWAP.rate +
" " + SWAP.toToken +
"<br>Fee: $" +
feeValue.toFixed(2);
}

}

/* EXECUTE */

function executeSwap(){

if(SWAP.fromAmount <= 0){
toast("Invalid amount");
return;
}

toast("Swap Executed");

saveSwapHistory();
clearSwap();
}

/* REVERSE */

function reverseTokens(){

const temp = SWAP.fromToken;
SWAP.fromToken = SWAP.toToken;
SWAP.toToken = temp;

const from = document.getElementById("swapFromToken");
const to = document.getElementById("swapToToken");

if(from) from.value = SWAP.fromToken;
if(to) to.value = SWAP.toToken;

updateQuote();
}

/* CLEAR */

function clearSwap(){

const input =
document.getElementById("swapFromAmount");

if(input) input.value = "";

SWAP.fromAmount = 0;

updateQuote();
}

/* HISTORY */

function saveSwapHistory(){

let history =
JSON.parse(localStorage.getItem("corax_history")) || [];

history.unshift({
type:"Swap",
fromToken:SWAP.fromToken,
toToken:SWAP.toToken,
amount:SWAP.fromAmount,
received:SWAP.toAmount,
date:new Date().toISOString()
});

localStorage.setItem(
"corax_history",
JSON.stringify(history)
);
}
