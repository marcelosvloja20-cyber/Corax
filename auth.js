/* ===================================
   CORΛX MASTER AUTH.JS v1
=================================== */

const AUTH = {
user: null,
logged: false,
sessionKey: null,
expiresAt: null,
remember: true
};

/* INIT */

document.addEventListener("DOMContentLoaded", ()=>{

loadSession();
bindAuth();
protectPages();

});

/* LOAD */

function loadSession(){

const saved =
JSON.parse(localStorage.getItem("corax_auth"));

if(saved){

Object.assign(AUTH, saved);

if(AUTH.expiresAt &&
Date.now() > AUTH.expiresAt){

logout(false);

}

}

}

/* SAVE */

function saveSession(){

localStorage.setItem(
"corax_auth",
JSON.stringify(AUTH)
);

}

/* EVENTS */

function bindAuth(){

const loginBtn =
document.getElementById("loginBtn");

const walletBtn =
document.getElementById("walletLoginBtn");

const logoutBtn =
document.getElementById("logoutBtn");

if(loginBtn){
loginBtn.addEventListener("click", loginEmail);
}

if(walletBtn){
walletBtn.addEventListener("click", loginWallet);
}

if(logoutBtn){
logoutBtn.addEventListener("click", ()=>logout(true));
}

}

/* EMAIL LOGIN */

function loginEmail(){

const email =
getField("email");

const pass =
getField("password");

if(!email || !pass){

toast("Fill all fields");
return;
}

AUTH.user = {
type:"email",
email: email
};

AUTH.logged = true;

createSession();

toast("Welcome");

redirectApp();

trackSafe("login_email");
}

/* WALLET LOGIN */

async function loginWallet(){

const wallet =
"0x" +
Math.random()
.toString(16)
substring(2,42);

AUTH.user = {
type:"wallet",
address: wallet
};

AUTH.logged = true;

createSession();

localStorage.setItem(
"corax_wallet",
wallet
);

toast("Wallet connected");

redirectApp();

trackSafe("login_wallet");
}

/* SESSION */

function createSession(){

AUTH.sessionKey =
"CRX-" +
Math.random()
.toString(36)
substring(2,12)
.toUpperCase();

AUTH.expiresAt =
Date.now() + (1000*60*60*24);

saveSession();
}

/* LOGOUT */

function logout(show=true){

AUTH.user = null;
AUTH.logged = false;
AUTH.sessionKey = null;
AUTH.expiresAt = null;

localStorage.removeItem("corax_auth");

if(show){
toast("Logged out");
}

window.location.href =
"login.html";
}

/* PROTECT */

function protectPages(){

const page =
location.pathname.split("/").pop();

const publicPages = [
"",
"index.html",
"login.html"
];

if(
!AUTH.logged &&
!publicPages.includes(page)
){

window.location.href =
"login.html";

}

}

/* HELPERS */

function isLogged(){

return AUTH.logged;
}

function currentUser(){

return AUTH.user;
}

function getField(id){

const el =
document.getElementById(id);

return el ? el.value.trim() : "";
}

function redirectApp(){

window.location.href =
"app.html";
}

/* AUTO LOCK */

function lockSession(){

toast("Session locked");

window.location.href =
"login.html";
}

/* RENEW */

function renewSession(){

if(!AUTH.logged) return;

AUTH.expiresAt =
Date.now() + (1000*60*60*24);

saveSession();
}

/* MAGIC LINK MOCK */

function sendMagicLink(){

const email =
getField("email");

if(!email){

toast("Enter email");
return;
}

toast("Magic link sent");

trackSafe("magic_link");
}

/* OTP MOCK */

function verifyOTP(code){

if(code === "123456"){

toast("OTP success");

}else{

toast("Invalid OTP");

}
}

/* TRACK SAFE */

function trackSafe(event){

if(typeof track === "function"){

track(event);

}

}
