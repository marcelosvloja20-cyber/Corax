/* ===================================
   CORΛX MASTER HISTORY.JS v1
=================================== */

const HISTORY = {
items: [],
filter: "All"
};

/* INIT */

document.addEventListener("DOMContentLoaded", ()=>{

loadHistory();
bindHistoryActions();
renderHistory();

});

/* LOAD */

function loadHistory(){

HISTORY.items =
JSON.parse(
localStorage.getItem("corax_history")
) || [];

/* Seed demo if empty */

if(HISTORY.items.length === 0){

HISTORY.items = [

{
type:"Receive",
amount:"250",
token:"USDT",
network:"Polygon",
from:"0x92ae...45fd",
date:new Date().toISOString()
},

{
type:"Send",
amount:"120",
token:"USDC",
network:"Ethereum",
to:"0x6fe1...12ac",
fee:"0.30",
date:new Date(Date.now()-86400000).toISOString()
},

{
type:"Swap",
amount:"500",
fromToken:"USDT",
toToken:"ETH",
received:"0.155",
date:new Date(Date.now()-172800000).toISOString()
}

];

saveHistory();
}

}

/* SAVE */

function saveHistory(){

localStorage.setItem(
"corax_history",
JSON.stringify(HISTORY.items)
);

}

/* EVENTS */

function bindHistoryActions(){

const filter = document.getElementById("historyFilter");
const clear = document.getElementById("clearHistory");
const exportBtn = document.getElementById("exportHistory");

if(filter){

filter.addEventListener("change",(e)=>{

HISTORY.filter = e.target.value;
renderHistory();

});

}

if(clear){

clear.addEventListener("click", ()=>{

if(confirm("Clear history?")){

HISTORY.items = [];
saveHistory();
renderHistory();
toast("History cleared");

}

});

}

if(exportBtn){

exportBtn.addEventListener("click", exportCSV);

}

}

/* FILTER */

function getFilteredItems(){

if(HISTORY.filter === "All"){
return HISTORY.items;
}

return HISTORY.items.filter(item =>
item.type === HISTORY.filter
);

}

/* RENDER */

function renderHistory(){

const list = document.getElementById("historyList");
const stats = document.getElementById("historyStats");

if(!list) return;

const data = getFilteredItems();

list.innerHTML = "";

if(data.length === 0){

list.innerHTML =
"<div class='card'>No transactions found.</div>";

updateStats([]);
return;
}

data.forEach(item=>{

const div = document.createElement("div");
div.className = "item";

div.innerHTML = buildCard(item);

list.appendChild(div);

});

updateStats(data);
}

/* CARD */

function buildCard(item){

const date = formatDate(item.date);

if(item.type === "Send"){

return `
<div class="row">
<b>Send</b>
<span class="danger">-${item.amount} ${item.token}</span>
</div>
<div class="subtitle mt-10">
To: ${item.to || "--"}<br>
${item.network}<br>
Fee: $${item.fee || "0"}<br>
${date}
</div>
`;
}

if(item.type === "Receive"){

return `
<div class="row">
<b>Receive</b>
<span class="success">+${item.amount} ${item.token}</span>
</div>
<div class="subtitle mt-10">
From: ${item.from || "--"}<br>
${item.network}<br>
${date}
</div>
`;
}

if(item.type === "Swap"){

return `
<div class="row">
<b>Swap</b>
<span>${item.amount} ${item.fromToken}</span>
</div>
<div class="subtitle mt-10">
Received: ${item.received} ${item.toToken}<br>
${date}
</div>
`;
}

return "";
}

/* STATS */

function updateStats(data){

const stats = document.getElementById("historyStats");

if(!stats) return;

let total = data.length;

let sends =
data.filter(x=>x.type==="Send").length;

let receives =
data.filter(x=>x.type==="Receive").length;

let swaps =
data.filter(x=>x.type==="Swap").length;

stats.innerHTML =
"Total: " + total +
" | Send: " + sends +
" | Receive: " + receives +
" | Swap: " + swaps;
}

/* EXPORT */

function exportCSV(){

let rows = [
["Type","Amount","Token","Network","Date"]
];

HISTORY.items.forEach(item=>{

rows.push([
item.type,
item.amount || "",
item.token || item.fromToken || "",
item.network || "",
item.date
]);

});

let csv = rows.map(r =>
r.join(",")
).join("\n");

const blob =
new Blob([csv], {type:"text/csv"});

const url =
URL.createObjectURL(blob);

const a =
document.createElement("a");

a.href = url;
a.download = "corax-history.csv";
a.click();

toast("CSV exported");
}

/* HELPERS */

function formatDate(date){

return new Date(date).toLocaleString();
  }
