/* ===================================
   CORΛX MASTER SETTINGS.JS v1
=================================== */

const SETTINGS = {
theme: "dark",
currency: "USD",
language: "EN",
notifications: true,
biometric: false,
autoLock: 5
};

/* INIT */

document.addEventListener("DOMContentLoaded", ()=>{

loadSettings();
bindSettings();
renderSettings();

});

/* LOAD */

function loadSettings(){

const saved =
JSON.parse(localStorage.getItem("corax_settings"));

if(saved){

Object.assign(SETTINGS, saved);

}

applyTheme();
}

/* SAVE */

function saveSettings(){

localStorage.setItem(
"corax_settings",
JSON.stringify(SETTINGS)
);

}

/* EVENTS */

function bindSettings(){

bindSelect("setTheme","theme");
bindSelect("setCurrency","currency");
bindSelect("setLanguage","language");
bindSelect("setAutoLock","autoLock");

bindToggle("setNotifications","notifications");
bindToggle("setBiometric","biometric");

const resetBtn =
document.getElementById("resetSettings");

if(resetBtn){

resetBtn.addEventListener("click", resetSettings);

}

}

/* HELPERS EVENTS */

function bindSelect(id,key){

const el = document.getElementById(id);

if(!el) return;

el.value = SETTINGS[key];

el.addEventListener("change",(e)=>{

SETTINGS[key] = e.target.value;

saveSettings();

if(key === "theme"){
applyTheme();
}

toast("Updated");

});
}

function bindToggle(id,key){

const el = document.getElementById(id);

if(!el) return;

el.checked = SETTINGS[key];

el.addEventListener("change",(e)=>{

SETTINGS[key] = e.target.checked;

saveSettings();

toast("Updated");

});
}

/* UI */

function renderSettings(){

const box =
document.getElementById("settingsStats");

if(!box) return;

box.innerHTML =
"Theme: " + SETTINGS.theme +
"<br>Currency: " + SETTINGS.currency +
"<br>Language: " + SETTINGS.language +
"<br>Notifications: " + (SETTINGS.notifications ? "On":"Off") +
"<br>Biometric: " + (SETTINGS.biometric ? "On":"Off") +
"<br>Auto Lock: " + SETTINGS.autoLock + " min";
}

/* THEME */

function applyTheme(){

if(SETTINGS.theme === "light"){

document.body.style.background = "#F8F8F8";
document.body.style.color = "#111";

}else{

document.body.style.background = "#050505";
document.body.style.color = "#F5F5F5";

}

}

/* RESET */

function resetSettings(){

if(!confirm("Reset settings?")) return;

SETTINGS.theme = "dark";
SETTINGS.currency = "USD";
SETTINGS.language = "EN";
SETTINGS.notifications = true;
SETTINGS.biometric = false;
SETTINGS.autoLock = 5;

saveSettings();
renderSettings();
applyTheme();

toast("Reset complete");
}

/* SECURITY */

function lockNow(){

toast("App locked");
window.location.href = "login.html";
}

/* EXPORT */

function exportSettings(){

const data =
JSON.stringify(SETTINGS,null,2);

const blob =
new Blob([data],{
type:"application/json"
});

const url =
URL.createObjectURL(blob);

const a =
document.createElement("a");

a.href = url;
a.download = "corax-settings.json";
a.click();

toast("Exported");
}
