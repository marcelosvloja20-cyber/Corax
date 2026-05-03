/* ===================================
   CORΛX FRONTEND APP.JS v1
=================================== */

const API = "http://localhost:3000/api";

let token = null;
let userId = null;

/* ===================================
   INIT
=================================== */

function init(){

const savedToken = localStorage.getItem("token");
const savedUser = localStorage.getItem("userId");

if(savedToken && savedUser){

token = savedToken;
userId = savedUser;

showDashboard();
loadBalance();

}

}

window.onload = init;

/* ===================================
   AUTH
=================================== */

async function register(){

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

const res = await fetch(API + "/auth/register", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ email, password })
});

const data = await res.json();

if(data.userId){
alert("User created!");
}else{
alert("Error creating user");
}

}

async function login(){

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

const res = await fetch(API + "/auth/login", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ email, password })
});

const data = await res.json();

if(data.token){

token = data.token;
userId = data.userId;

localStorage.setItem("token", token);
localStorage.setItem("userId", userId);

showDashboard();
loadBalance();

}else{
alert("Login failed");
}

}

/* ===================================
   DASHBOARD UI
=================================== */

function showDashboard(){

document.getElementById("auth").classList.add("hidden");
document.getElementById("dashboard").classList.remove("hidden");

document.getElementById("userId").innerText = "User: " + userId;

}

/* ===================================
   BALANCE
=================================== */

async function loadBalance(){

try{

const res = await fetch(API + "/wallet/" + userId + "/USD", {
headers: {
"Authorization": "Bearer " + token
}
});

const data = await res.json();

if(data.balance !== undefined){

document.getElementById("balance").innerText =
"$" + Number(data.balance).toFixed(2);

}else{

document.getElementById("balance").innerText = "$0.00";

}

}catch(e){

console.error(e);
document.getElementById("balance").innerText = "$0.00";

}

}

/* ===================================
   PAYMENT
=================================== */

async function sendPayment(){

const amount = document.getElementById("amount").value;
const to = document.getElementById("to").value;

const res = await fetch(API + "/payments/send", {
method: "POST",
headers: {
"Content-Type": "application/json",
"Authorization": "Bearer " + token
},
body: JSON.stringify({
userId,
to,
amount,
currency: "USD"
})
});

const data = await res.json();

if(data.success){
alert("Payment sent!");
loadBalance();
}else{
alert(data.message || "Error");
}

}

/* ===================================
   LOGOUT
=================================== */

function logout(){

token = null;
userId = null;

localStorage.removeItem("token");
localStorage.removeItem("userId");

document.getElementById("auth").classList.remove("hidden");
document.getElementById("dashboard").classList.add("hidden");

}
