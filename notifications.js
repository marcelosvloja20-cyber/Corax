/* ===================================
   CORΛX MASTER NOTIFICATIONS.JS v1
=================================== */

const NOTIFY = {
items: [],
enabled: true,
sound: true,
badge: 0
};

/* INIT */

document.addEventListener("DOMContentLoaded", ()=>{

loadNotifications();
renderNotifications();
requestBrowserPermission();
simulateFeed();

});

/* LOAD */

function loadNotifications(){

const saved =
JSON.parse(localStorage.getItem("corax_notifications"));

if(saved){

NOTIFY.items = saved.items || [];
NOTIFY.enabled = saved.enabled ?? true;
NOTIFY.sound = saved.sound ?? true;
NOTIFY.badge = saved.badge || 0;

}

}

/* SAVE */

function saveNotifications(){

localStorage.setItem(
"corax_notifications",
JSON.stringify(NOTIFY)
);

}

/* ADD */

function addNotification(title,message,type="info"){

if(!NOTIFY.enabled) return;

const item = {
id: Date.now(),
title,
message,
type,
read:false,
date:new Date().toISOString()
};

NOTIFY.items.unshift(item);

NOTIFY.badge++;

saveNotifications();
renderNotifications();
toastPush(title,message);

if(NOTIFY.sound){
playPing();
}

browserPush(title,message);
}

/* RENDER */

function renderNotifications(){

const list =
document.getElementById("notifyList");

const badge =
document.getElementById("notifyBadge");

if(badge){

badge.innerText =
NOTIFY.badge > 99 ? "99+" : NOTIFY.badge;

badge.style.display =
NOTIFY.badge > 0 ? "inline-flex":"none";
}

if(!list) return;

list.innerHTML = "";

if(NOTIFY.items.length === 0){

list.innerHTML =
"<div class='card'>No notifications</div>";

return;
}

NOTIFY.items.forEach(item=>{

const div =
document.createElement("div");

div.className = "item";

div.innerHTML =
"<div class='row'>" +
"<b>" + iconType(item.type) + " " +
item.title + "</b>" +
"<small>" +
timeAgo(item.date) +
"</small></div>" +

"<div class='subtitle mt-10'>" +
item.message +
"</div>";

div.onclick = ()=>markRead(item.id);

list.appendChild(div);

});
}

/* READ */

function markRead(id){

NOTIFY.items =
NOTIFY.items.map(item=>{

if(item.id === id && !item.read){

item.read = true;

if(NOTIFY.badge > 0){
NOTIFY.badge--;
}

}

return item;
});

saveNotifications();
renderNotifications();
}

/* CLEAR */

function clearNotifications(){

NOTIFY.items = [];
NOTIFY.badge = 0;

saveNotifications();
renderNotifications();

toast("Notifications cleared");
}

/* SETTINGS */

function toggleNotifications(){

NOTIFY.enabled =
!NOTIFY.enabled;

saveNotifications();

toast(
NOTIFY.enabled ?
"Notifications On" :
"Notifications Off"
);
}

function toggleSound(){

NOTIFY.sound =
!NOTIFY.sound;

saveNotifications();

toast(
NOTIFY.sound ?
"Sound On" :
"Sound Off"
);
}

/* TOAST */

function toastPush(title,msg){

const box =
document.createElement("div");

box.style.position = "fixed";
box.style.top = "20px";
box.style.left = "50%";
box.style.transform =
"translateX(-50%)";
box.style.background = "#111";
box.style.color = "#fff";
box.style.padding = "14px";
box.style.borderRadius = "14px";
box.style.zIndex = "9999";
box.style.border =
"1px solid rgba(255,255,255,.08)";
box.style.minWidth = "280px";

box.innerHTML =
"<b>" + title + "</b><br>" +
"<small>" + msg + "</small>";

document.body.appendChild(box);

setTimeout(()=>{
box.remove();
},3200);
}

/* SOUND */

function playPing(){

const audio =
new Audio(
"data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEA"
);

audio.play().catch(()=>{});
}

/* BROWSER PUSH */

function requestBrowserPermission(){

if("Notification" in window &&
Notification.permission === "default"){

Notification.requestPermission();

}
}

function browserPush(title,message){

if("Notification" in window &&
Notification.permission === "granted"){

new Notification(title,{
body:message
});

}
}

/* MOCK FEED */

function simulateFeed(){

setTimeout(()=>{
addNotification(
"Wallet Connected",
"Your wallet is now active.",
"success"
);
},4000);

setTimeout(()=>{
addNotification(
"Swap Completed",
"250 USDT → ETH successful.",
"success"
);
},9000);

setTimeout(()=>{
addNotification(
"Stake Rewards",
"Daily rewards are available.",
"info"
);
},14000);
}

/* HELPERS */

function iconType(type){

if(type === "success") return "✅";
if(type === "warning") return "⚠️";
if(type === "danger") return "❌";

return "🔔";
}

function timeAgo(date){

const sec =
Math.floor(
(new Date() - new Date(date)) / 1000
);

if(sec < 60) return "now";
if(sec < 3600) return Math.floor(sec/60)+"m";
if(sec < 86400) return Math.floor(sec/3600)+"h";

return Math.floor(sec/86400)+"d";
  }
