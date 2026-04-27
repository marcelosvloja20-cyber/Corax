/* ===================================
   CORΛX MASTER DASHBOARD.JS v1
   Premium Product Intelligence Layer
=================================== */

const DASHBOARD = {
wallet: localStorage.getItem("corax_wallet") || null,
currency: "USD",
refreshMs: 15000,
data: {
usdBalance: 0,
cryptoBalance: 0,
change24h: 0,
stakingRewards: 0,
txCount: 0,
lastTransactions: [],
market: []
}
};

/* ===================================
   INIT
=================================== */

document.addEventListener("DOMContentLoaded", () => {
initDashboard();
});

async function initDashboard(){

showSkeleton();

await loadDashboard();

bindDashboard();

autoRefresh();
}

/* ===================================
   LOAD
=================================== */

async function loadDashboard(){

try{

DASHBOARD.data = await getDashboardData();

renderDashboard();

}catch(err){

console.error(err);
renderFallback();

}
}

/* ===================================
   MOCK / API READY
=================================== */

async function getDashboardData(){

if(typeof apiRequest === "function"){

const live =
await apiRequest("/dashboard");

if(live) return live;
}

return {
usdBalance: 18452.62,
cryptoBalance: 0.5421,
change24h: 4.82,
stakingRewards: 128.40,
txCount: 42,
lastTransactions: [
{
type:"Received USDT",
amount:"+250.00",
time:"2 min ago"
},
{
type:"Swap USDT → ETH",
amount:"500.00",
time:"1 hour ago"
},
{
type:"Sent ETH",
amount:"-0.145",
time:"Today"
}
],
market: [
{ symbol:"BTC", price:"$68,420", move:"+2.8%" },
{ symbol:"ETH", price:"$3,420", move:"+4.1%" },
{ symbol:"SOL", price:"$182", move:"+6.7%" }
]
};

}

/* ===================================
   RENDER
=================================== */

function renderDashboard(){

setText("dbUsd", money(DASHBOARD.data.usdBalance));
setText("dbCrypto", DASHBOARD.data.cryptoBalance + " ETH");
setText("dbChange", signed(DASHBOARD.data.change24h) + "%");
setText("dbRewards", money(DASHBOARD.data.stakingRewards));
setText("dbTxCount", DASHBOARD.data.txCount);

renderTransactions();
renderMarket();
hideSkeleton();

trackSafe("dashboard_loaded");
}

function renderTransactions(){

const box =
document.getElementById("dbTransactions");

if(!box) return;

box.innerHTML = "";

DASHBOARD.data.lastTransactions.forEach(tx => {

box.innerHTML += `
<div class="corax-tx-row">
<div>
<div class="corax-tx-title">${tx.type}</div>
<div class="corax-tx-time">${tx.time}</div>
</div>
<div class="corax-tx-amount">${tx.amount}</div>
</div>
`;

});

}

function renderMarket(){

const box =
document.getElementById("dbMarket");

if(!box) return;

box.innerHTML = "";

DASHBOARD.data.market.forEach(item => {

box.innerHTML += `
<div class="corax-market-card">
<div class="corax-market-symbol">${item.symbol}</div>
<div class="corax-market-price">${item.price}</div>
<div class="corax-market-move">${item.move}</div>
</div>
`;

});

}

/* ===================================
   AUTO REFRESH
=================================== */

function autoRefresh(){

setInterval(async ()=>{

await loadDashboard();

}, DASHBOARD.refreshMs);

}

/* ===================================
   EVENTS
=================================== */

function bindDashboard(){

const refresh =
document.getElementById("refreshDashboard");

if(refresh){

refresh.addEventListener("click", async ()=>{

pulse(refresh);

await loadDashboard();

toastSafe("Dashboard updated");

});

}

}

/* ===================================
   UI STATES
=================================== */

function showSkeleton(){

document.body.classList.add(
"corax-loading"
);

}

function hideSkeleton(){

document.body.classList.remove(
"corax-loading"
);

}

function renderFallback(){

setText("dbUsd", "$0.00");
setText("dbCrypto", "0 ETH");
setText("dbChange", "0%");
setText("dbRewards", "$0");
setText("dbTxCount", "0");

}

/* ===================================
   HELPERS
=================================== */

function setText(id,value){

const el =
document.getElementById(id);

if(el) el.innerText = value;

}

function money(v){

return "$" +
Number(v).toLocaleString(
undefined,
{
minimumFractionDigits:2,
maximumFractionDigits:2
}
);

}

function signed(v){

return Number(v) > 0
? "+" + v
: v;

}

function pulse(el){

el.style.transform =
"scale(.96)";

setTimeout(()=>{

el.style.transform =
"scale(1)";

},150);

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
"CORΛX Dashboard Ready"
);
