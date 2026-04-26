/* ===================================
   CORΛX MASTER MERCHANT.JS v1
=================================== */

const MERCHANT = {
storeName: "CORΛX Store",
currency: "USDT",
network: "Polygon",
amount: 0,
invoiceId: "",
status: "idle"
};

/* INIT */

document.addEventListener("DOMContentLoaded", ()=>{

bindMerchant();
loadMerchantStats();
renderMerchant();

});

/* EVENTS */

function bindMerchant(){

const createBtn = document.getElementById("merchantCreate");
const copyBtn = document.getElementById("merchantCopy");
const amount = document.getElementById("merchantAmount");
const store = document.getElementById("merchantStore");
const currency = document.getElementById("merchantCurrency");
const network = document.getElementById("merchantNetwork");

if(createBtn){
createBtn.addEventListener("click", createInvoice);
}

if(copyBtn){
copyBtn.addEventListener("click", copyCheckoutLink);
}

if(amount){
amount.addEventListener("input", e=>{
MERCHANT.amount = parseFloat(e.target.value) || 0;
});
}

if(store){
store.addEventListener("input", e=>{
MERCHANT.storeName = e.target.value || "CORΛX Store";
});
}

if(currency){
currency.addEventListener("change", e=>{
MERCHANT.currency = e.target.value;
});
}

if(network){
network.addEventListener("change", e=>{
MERCHANT.network = e.target.value;
});
}

}

/* CREATE */

function createInvoice(){

if(MERCHANT.amount <= 0){
toast("Invalid amount");
return;
}

MERCHANT.invoiceId = generateId();
MERCHANT.status = "pending";

saveMerchantSale();
renderMerchant();

toast("Checkout created");
}

/* UI */

function renderMerchant(){

const box = document.getElementById("merchantPreview");
const stats = document.getElementById("merchantStats");

if(box){

box.innerHTML =
"Store: " + MERCHANT.storeName +
"<br>Invoice: " + (MERCHANT.invoiceId || "--") +
"<br>Amount: " + MERCHANT.amount + " " + MERCHANT.currency +
"<br>Network: " + MERCHANT.network +
"<br>Status: " + MERCHANT.status;
}

if(stats){

const sales =
JSON.parse(localStorage.getItem("corax_sales")) || [];

const total = sales.length;

let volume = 0;

sales.forEach(x=>{
volume += Number(x.amount);
});

stats.innerHTML =
"Sales: " + total +
" | Volume: $" + volume.toFixed(2);
}

}

/* STORAGE */

function saveMerchantSale(){

let sales =
JSON.parse(localStorage.getItem("corax_sales")) || [];

sales.unshift({
invoiceId: MERCHANT.invoiceId,
store: MERCHANT.storeName,
amount: MERCHANT.amount,
currency: MERCHANT.currency,
network: MERCHANT.network,
status: "pending",
date: new Date().toISOString()
});

localStorage.setItem(
"corax_sales",
JSON.stringify(sales)
);

saveHistory();
}

function loadMerchantStats(){

renderMerchant();
}

/* CHECKOUT LINK */

function checkoutLink(){

return (
"https://corax.app/pay/" +
MERCHANT.invoiceId
);
}

function copyCheckoutLink(){

if(!MERCHANT.invoiceId){
toast("Create invoice first");
return;
}

navigator.clipboard.writeText(
checkoutLink()
);

toast("Link copied");
}

/* MOCK PAYMENT */

function markPaid(){

let sales =
JSON.parse(localStorage.getItem("corax_sales")) || [];

sales = sales.map(item=>{

if(item.invoiceId === MERCHANT.invoiceId){
item.status = "paid";
}

return item;
});

localStorage.setItem(
"corax_sales",
JSON.stringify(sales)
);

MERCHANT.status = "paid";

renderMerchant();

toast("Payment received");
}

/* HISTORY */

function saveHistory(){

let history =
JSON.parse(localStorage.getItem("corax_history")) || [];

history.unshift({
type:"Merchant",
amount:MERCHANT.amount,
token:MERCHANT.currency,
network:MERCHANT.network,
date:new Date().toISOString()
});

localStorage.setItem(
"corax_history",
JSON.stringify(history)
);
}

/* HELPERS */

function generateId(){

return "CRX-" +
Math.random()
.toString(36)
.substring(2,8)
.toUpperCase();
}
