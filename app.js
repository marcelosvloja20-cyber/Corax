/* ===================================
   CORΛX AUTH SYSTEM (MVP FUNCIONAL)
=================================== */

function showError(message){
const el = document.getElementById("errorMsg");
if(!el) return;

el.innerText = message;
el.classList.remove("hidden");
}

/* LOGIN */
function login(){

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

if(!email || !password){
return showError("Fill all fields");
}

/* simulação de login */
localStorage.setItem("corax_user", email);

enterApp(email);

}

/* REGISTER */
function register(){

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

if(!email || !password){
return showError("Fill all fields");
}

/* simulação */
localStorage.setItem("corax_user", email);

enterApp(email);

}

/* ENTRAR NO APP */
function enterApp(email){

document.getElementById("auth").style.display = "none";
document.getElementById("dashboard").classList.remove("hidden");

document.getElementById("userId").innerText = email;

/* saldo fake */
document.getElementById("balance").innerText = "$100.00";

}

/* LOGOUT */
function logout(){
localStorage.removeItem("corax_user");
location.reload();
}

/* AUTO LOGIN */
window.addEventListener("load", () => {

const user = localStorage.getItem("corax_user");

if(user){
enterApp(user);
}

});

/* SEND PAYMENT */
function sendPayment(){

const amount = document.getElementById("amount").value;

if(!amount){
alert("Enter amount");
return;
}

/* feedback */
alert("Payment sent 🚀");

}
