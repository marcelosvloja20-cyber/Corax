/* ===================================
   CORΛX MASTER ANALYTICS.JS v1
=================================== */

const ANALYTICS = {
sessionId: "",
startedAt: Date.now(),
events: [],
user: "guest",
device: navigator.userAgent,
page: location.pathname
};

/* INIT */

document.addEventListener("DOMContentLoaded", ()=>{

startSession();
trackPageView();
bindAutoTracking();
renderAnalytics();

});

/* SESSION */

function startSession(){

ANALYTICS.sessionId =
"CRX-" +
Math.random()
.toString(36)
.substring(2,10)
.toUpperCase();

const savedUser =
localStorage.getItem("corax_user");

if(savedUser){
ANALYTICS.user = savedUser;
}

track("session_start", {
page: ANALYTICS.page
});
}

/* TRACK */

function track(name,data={}){

const event = {
id: Date.now(),
name: name,
data: data,
page: location.pathname,
time: new Date().toISOString(),
session: ANALYTICS.sessionId
};

ANALYTICS.events.push(event);

saveAnalytics();

console.log("TRACK:", event);
}

/* PAGE VIEW */

function trackPageView(){

track("page_view", {
url: location.href,
title: document.title
});
}

/* AUTO TRACK */

function bindAutoTracking(){

document.querySelectorAll("button")
.forEach(btn=>{

btn.addEventListener("click", ()=>{

track("button_click", {
text: btn.innerText.trim()
});

});

});

document.querySelectorAll("a")
.forEach(link=>{

link.addEventListener("click", ()=>{

track("link_click", {
href: link.getAttribute("href")
});

});

});

document.querySelectorAll("input,select")
.forEach(el=>{

el.addEventListener("change", ()=>{

track("field_change", {
id: el.id || "unknown"
});

});

});
}

/* SAVE */

function saveAnalytics(){

localStorage.setItem(
"corax_analytics",
JSON.stringify(ANALYTICS.events)
);

}

/* LOAD */

function loadAnalytics(){

return JSON.parse(
localStorage.getItem("corax_analytics")
) || [];

}

/* UI */

function renderAnalytics(){

const box =
document.getElementById("analyticsStats");

if(!box) return;

const events = loadAnalytics();

box.innerHTML =
"Events: " + events.length +
"<br>Session: " + ANALYTICS.sessionId +
"<br>User: " + ANALYTICS.user;
}

/* CUSTOM EVENTS */

function trackWalletConnect(){

track("wallet_connected");
}

function trackSend(amount,token){

track("send_completed", {
amount: amount,
token: token
});
}

function trackSwap(from,to,amount){

track("swap_completed", {
from: from,
to: to,
amount: amount
});
}

function trackStake(amount){

track("stake_created", {
amount: amount
});
}

function trackLanguage(lang){

track("language_changed", {
language: lang
});
}

function trackMerchant(amount){

track("merchant_checkout", {
amount: amount
});
}

/* REPORTS */

function analyticsSummary(){

const events = loadAnalytics();

let pages = 0;
let clicks = 0;
let swaps = 0;

events.forEach(e=>{

if(e.name === "page_view") pages++;
if(e.name === "button_click") clicks++;
if(e.name === "swap_completed") swaps++;

});

return {
events: events.length,
pages: pages,
clicks: clicks,
swaps: swaps
};
}

/* EXPORT */

function exportAnalytics(){

const data =
JSON.stringify(loadAnalytics(),null,2);

const blob =
new Blob([data],{
type:"application/json"
});

const url =
URL.createObjectURL(blob);

const a =
document.createElement("a");

a.href = url;
a.download = "corax-analytics.json";
a.click();

toast("Analytics exported");
}

/* RESET */

function resetAnalytics(){

localStorage.removeItem(
"corax_analytics"
);

ANALYTICS.events = [];

toast("Analytics reset");
}
