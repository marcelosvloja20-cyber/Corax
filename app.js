/* ===================================
   CORΛX APP CORE
=================================== */

/* STORAGE */
function getUser(){
return localStorage.getItem("corax_user");
}

function setUser(user){
localStorage.setItem("corax_user", user);
}

function clearUser(){
localStorage.removeItem("corax_user");
}

/* BALANCE */
function getBalance(){
return parseFloat(localStorage.getItem("corax_balance") || "100");
}

function setBalance(value){
localStorage.setItem("corax_balance", value);
}

/* HISTORY */
function getHistory(){
return JSON.parse(localStorage.getItem("corax_history") || "[]");
}

function saveHistory(list){
localStorage.setItem("corax_history", JSON.stringify(list));
}

/* ADD TRANSACTION */
function addTransaction(type, amount, to){

const history = getHistory();

history.unshift({
id: Date.now(),
type,
amount,
to,
date: new Date().toLocaleString()
});

saveHistory(history);
renderHistory();
}

/* RENDER HISTORY */
function renderHistory(){

const container = document.getElementById("historyList");
if(!container) return;

const history = getHistory();
container.innerHTML = "";

history.forEach(tx => {

const div = document.createElement("div");
div.className = "tx-item";

div.innerHTML = `
<div>
<strong>${tx.type}</strong><br/>
<span>${tx.to}</span>
</div>
<div class="tx-right">
<span>${tx.amount}</span><br/>
<small>${tx.date}</small>
</div>
`;

container.appendChild(div);

});
}

/* AUTH */
function login(){
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

if(!email || !password){
return showError("Fill all fields");
}

setUser(email);
enterApp(email);
}

function register(){
login();
}

function showError(msg){
const el = document.getElementById("errorMsg");
el.innerText = msg;
el.classList.remove("hidden");
}

/* ENTER */
function enterApp(email){

document.getElementById("auth").style.display = "none";
document.getElementById("dashboard").classList.remove("hidden");

document.getElementById("userId").innerText = email;

updateBalance();
renderHistory();
}

/* BALANCE UI */
function updateBalance(){
document.getElementById("balance").innerText = "$" + getBalance().toFixed(2);
}

/* SEND PAYMENT */
function sendPayment(){

const to = document.getElementById("to").value;
const amount = parseFloat(document.getElementById("amount").value);

if(!to || !amount){
alert("Fill all fields");
return;
}

let balance = getBalance();

if(amount > balance){
alert("Insufficient balance");
return;
}

balance -= amount;
setBalance(balance);

/* salvar */
addTransaction("Sent", "$"+amount.toFixed(2), to);

updateBalance();

document.getElementById("to").value = "";
document.getElementById("amount").value = "";

}

/* LOGOUT */
function logout(){
clearUser();
location.reload();
}

/* AUTO LOGIN */
window.onload = () => {

const user = getUser();

if(user){
enterApp(user);
}

};
