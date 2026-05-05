/* ===============================
   CORΛX CORE APP
================================ */

/* STORAGE */
const getUser = () => localStorage.getItem("user");
const setUser = u => localStorage.setItem("user", u);
const clearUser = () => localStorage.removeItem("user");

const getBalance = () => parseFloat(localStorage.getItem("balance") || "100");
const setBalance = b => localStorage.setItem("balance", b);

const getHistory = () => JSON.parse(localStorage.getItem("history") || "[]");
const setHistory = h => localStorage.setItem("history", JSON.stringify(h));

/* AUTH */
function login(){
const email = document.getElementById("email").value;
const pass = document.getElementById("password").value;

if(!email || !pass){
return showError("Fill fields");
}

setUser(email);
enterApp(email);
}

function register(){ login(); }

function logout(){
clearUser();
location.reload();
}

function showError(msg){
const e = document.getElementById("errorMsg");
e.innerText = msg;
e.classList.remove("hidden");
}

/* ENTER */
function enterApp(email){

document.getElementById("auth").style.display="none";
document.getElementById("dashboard").classList.remove("hidden");

document.getElementById("userId").innerText=email;

updateBalance();
renderHistory();
renderChart();
}

/* BALANCE */
function updateBalance(){
document.getElementById("balance").innerText="$"+getBalance().toFixed(2);
}

/* SEND */
function sendPayment(){

const to = document.getElementById("to").value;
const amount = parseFloat(document.getElementById("amount").value);

if(!to || !amount){
return alert("Fill fields");
}

let bal = getBalance();

if(amount > bal){
return alert("Insufficient balance");
}

bal -= amount;
setBalance(bal);

/* HISTORY */
const history = getHistory();

history.unshift({
type:"Sent",
to,
amount,
date:new Date().toLocaleString()
});

setHistory(history);

updateBalance();
renderHistory();
renderChart();

document.getElementById("to").value="";
document.getElementById("amount").value="";
}

/* HISTORY */
function renderHistory(){

const el = document.getElementById("history");
el.innerHTML="";

getHistory().forEach(tx=>{

const div=document.createElement("div");
div.className="tx";

div.innerHTML=`
<span>${tx.type} → ${tx.to}</span>
<span>$${tx.amount}</span>
`;

el.appendChild(div);

});
}

/* CHART */
function renderChart(){

const c = document.getElementById("chart");
const ctx = c.getContext("2d");

const data = getHistory().slice(0,5).map(tx=>tx.amount).reverse();

const W = c.width = c.offsetWidth;
const H = c.height = 200;

ctx.clearRect(0,0,W,H);

const max = Math.max(...data,1);
const bw = W / data.length;

data.forEach((v,i)=>{

const h = (v/max)*150;

ctx.fillStyle="#A855F7";
ctx.fillRect(i*bw+10,H-h-10,bw-20,h);

});
}

/* AUTO LOGIN */
window.onload = () => {
const u = getUser();
if(u){ enterApp(u); }
};
