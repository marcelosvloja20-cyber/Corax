/* ===================================
   CORΛX TRANSACTION HISTORY
=================================== */

function getHistory(){
return JSON.parse(localStorage.getItem("corax_history") || "[]");
}

function saveHistory(list){
localStorage.setItem("corax_history", JSON.stringify(list));
}

/* ADD TRANSACTION */
function addTransaction(type, amount, to){

const history = getHistory();

const tx = {
id: Date.now(),
type,
amount,
to,
date: new Date().toLocaleString()
};

history.unshift(tx);

saveHistory(history);
renderHistory();
}

/* RENDER */
function renderHistory(){

const container = document.getElementById("historyList");
if(!container) return;

const history = getHistory();

container.innerHTML = "";

history.forEach(tx => {

const el = document.createElement("div");
el.className = "tx-item";

el.innerHTML = `
<div>
<strong>${tx.type}</strong><br/>
<span>${tx.to || "-"}</span>
</div>

<div class="tx-right">
<span>${tx.amount}</span><br/>
<small>${tx.date}</small>
</div>
`;

container.appendChild(el);

});

}
