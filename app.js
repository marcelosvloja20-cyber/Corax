/* ===================================
   CORΛX MASTER APP.JS v1
=================================== */

const CORAX = {
user: {
name: "User",
wallet: null,
logged: false
},

ui: {
theme: "dark"
},

config: {
appName: "CORΛX"
}
};

/* INIT */

document.addEventListener("DOMContentLoaded", () => {
bootApp();
});

/* BOOT */

function bootApp(){
loadSession();
highlightNav();
bindToggles();
setBrand();
}

/* SESSION */

function loadSession(){

const wallet = localStorage.getItem("corax_wallet");
const user = localStorage.getItem("corax_user");

if(wallet){
CORAX.user.wallet = wallet;
CORAX.user.logged = true;
}

if(user){
CORAX.user.name = user;
}
}

function loginUser(name="User"){
localStorage.setItem("corax_user", name);
CORAX.user.name = name;
CORAX.user.logged = true;
toast("Welcome to CORΛX");
}

function logoutUser(){
localStorage.removeItem("corax_user");
localStorage.removeItem("corax_wallet");
window.location.href = "login.html";
}

/* BRAND */

function setBrand(){

document.querySelectorAll(".brand").forEach(el=>{
el.innerText = "CORΛX";
});
}

/* NAV */

function go(page){
window.location.href = page;
}

function highlightNav(){

const page = window.location.pathname.split("/").pop();

document.querySelectorAll(".nav a, .nav div").forEach(item=>{

const target = item.getAttribute("data-page");

if(target === page){
item.classList.add("active");
}
});
}

/* UI */

function toast(message){

let old = document.getElementById("toast-msg");
if(old) old.remove();

const toast = document.createElement("div");
toast.id = "toast-msg";
toast.innerText = message;

toast.style.position = "fixed";
toast.style.left = "50%";
toast.style.bottom = "95px";
toast.style.transform = "translateX(-50%)";
toast.style.background = "#A855F7";
toast.style.color = "#fff";
toast.style.padding = "14px 18px";
toast.style.borderRadius = "14px";
toast.style.fontSize = "14px";
toast.style.zIndex = "9999";
toast.style.boxShadow = "0 0 24px rgba(168,85,247,.35)";

document.body.appendChild(toast);

setTimeout(()=>{
toast.remove();
},2500);
}

function modal(title,text){

alert(title + "\n\n" + text);
}

/* COPY */

function copyText(id){

const el = document.getElementById(id);

if(!el) return;

navigator.clipboard.writeText(el.innerText);
toast("Copied");
}

/* TOGGLES */

function bindToggles(){

document.querySelectorAll(".toggle").forEach(toggle=>{

toggle.addEventListener("click", ()=>{

toggle.classList.toggle("active");

if(toggle.classList.contains("active")){
toast("Enabled");
}else{
toast("Disabled");
}

});

});
}

/* FORMS */

function getValue(id){

const el = document.getElementById(id);
if(!el) return "";
return el.value.trim();
}

function clearValue(id){

const el = document.getElementById(id);
if(el) el.value = "";
}

/* PAYMENTS */

function createPayment(){

toast("Checkout generated");
}

function sendPayment(){

toast("Transaction sent");
}

function receiveRequest(){

toast("Payment request shared");
}

/* HISTORY */

function exportHistory(){

toast("CSV export soon");
}

/* SETTINGS */

function switchTheme(){

if(CORAX.ui.theme === "dark"){
CORAX.ui.theme = "light";
toast("Light mode soon");
}else{
CORAX.ui.theme = "dark";
toast("Dark mode enabled");
}
}

/* HELPERS */

function shortWallet(address){

if(!address) return "--";

return address.slice(0,6) + "..." + address.slice(-4);
}

function formatUSD(value){

return "$" + Number(value).toLocaleString("en-US", {
minimumFractionDigits:2,
maximumFractionDigits:2
});
}

/* DEBUG */

function status(){

console.log(CORAX);
}
