/* ===================================
   CORΛX MASTER STAKE.JS v1
=================================== */

const STAKE = {
apy: 8.5,
lockDays: 30,
token: "USDT",
amount: 0,
staked: 0,
rewards: 0
};

/* INIT */

document.addEventListener("DOMContentLoaded", ()=>{

loadStakeData();
bindStakeEvents();
renderStake();

});

/* LOAD */

function loadStakeData(){

const data =
JSON.parse(localStorage.getItem("corax_stake"));

if(data){

STAKE.staked = data.staked || 0;
STAKE.rewards = data.rewards || 0;
STAKE.token = data.token || "USDT";

}

}

/* SAVE */

function saveStakeData(){

localStorage.setItem(
"corax_stake",
JSON.stringify({
staked: STAKE.staked,
rewards: STAKE.rewards,
token: STAKE.token
})
);

}

/* EVENTS */

function bindStakeEvents(){

const stakeBtn = document.getElementById("stakeBtn");
const unstakeBtn = document.getElementById("unstakeBtn");
const claimBtn = document.getElementById("claimBtn");
const input = document.getElementById("stakeAmount");
const token = document.getElementById("stakeToken");

if(stakeBtn){
stakeBtn.addEventListener("click", depositStake);
}

if(unstakeBtn){
unstakeBtn.addEventListener("click", withdrawStake);
}

if(claimBtn){
claimBtn.addEventListener("click", claimRewards);
}

if(input){
input.addEventListener("input", e=>{
STAKE.amount = parseFloat(e.target.value) || 0;
previewStake();
});
}

if(token){
token.addEventListener("change", e=>{
STAKE.token = e.target.value;
renderStake();
});
}

}

/* STAKE */

function depositStake(){

if(STAKE.amount <= 0){
toast("Invalid amount");
return;
}

STAKE.staked += STAKE.amount;

const reward =
calculateDailyReward(STAKE.amount);

STAKE.rewards += reward;

saveStakeData();
renderStake();
clearStakeInput();

toast("Stake confirmed");
saveStakeHistory("Stake", STAKE.amount);
}

/* UNSTAKE */

function withdrawStake(){

if(STAKE.staked <= 0){
toast("Nothing staked");
return;
}

const amount = STAKE.staked;

STAKE.staked = 0;

saveStakeData();
renderStake();

toast("Unstaked");
saveStakeHistory("Unstake", amount);
}

/* CLAIM */

function claimRewards(){

if(STAKE.rewards <= 0){
toast("No rewards");
return;
}

const value = STAKE.rewards;

STAKE.rewards = 0;

saveStakeData();
renderStake();

toast("Rewards claimed");
saveStakeHistory("Claim", value);
}

/* CALC */

function calculateDailyReward(value){

return (
(value * STAKE.apy / 100) / 365
);
}

function estimatedMonthly(){

return (
(STAKE.staked * STAKE.apy / 100) / 12
).toFixed(2);
}

/* UI */

function renderStake(){

const stats = document.getElementById("stakeStats");
const preview = document.getElementById("stakePreview");

if(stats){

stats.innerHTML =
"Staked: " + STAKE.staked.toFixed(2) + " " + STAKE.token +
"<br>Rewards: " + STAKE.rewards.toFixed(4) + " " + STAKE.token +
"<br>APY: " + STAKE.apy + "%" +
"<br>Lock: " + STAKE.lockDays + " days";
}

if(preview){

preview.innerHTML =
"Monthly Estimate: +" +
estimatedMonthly() +
" " + STAKE.token;
}

}

function previewStake(){

const box =
document.getElementById("stakePreview");

if(!box) return;

const est =
((STAKE.amount * STAKE.apy / 100) / 12)
.toFixed(2);

box.innerHTML =
"Estimated monthly reward: +" +
est + " " + STAKE.token;
}

function clearStakeInput(){

const el =
document.getElementById("stakeAmount");

if(el) el.value = "";

STAKE.amount = 0;
}

/* HISTORY */

function saveStakeHistory(type,amount){

let history =
JSON.parse(localStorage.getItem("corax_history")) || [];

history.unshift({
type:type,
amount:amount,
token:STAKE.token,
network:"CORΛX Earn",
date:new Date().toISOString()
});

localStorage.setItem(
"corax_history",
JSON.stringify(history)
);
  }
