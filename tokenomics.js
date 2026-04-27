/* ===================================
   CORΛX MASTER TOKENOMICS.JS v1
   Economic Engine Layer
=================================== */

const TOKENOMICS = {
token: "CORΛX",
symbol: "CRX",

supply: {
max: 1000000000,
circulating: 185000000,
burned: 12450000,
treasury: 220000000,
stakingPool: 140000000
},

fees: {
merchant: 0.25,
swap: 0.15,
send: 0.10
},

distribution: {
burn: 40,
treasury: 30,
staking: 20,
referral: 10
},

price: 0.18
};

/* ===================================
   INIT
=================================== */

document.addEventListener("DOMContentLoaded", ()=>{

renderTokenomics();

});

/* ===================================
   FEE ENGINE
=================================== */

function calculateFee(type, amount){

const rate =
TOKENOMICS.fees[type] || 0;

return (
Number(amount) * rate / 100
);
}

function splitFee(value){

return {
burn:
value *
TOKENOMICS.distribution.burn / 100,

treasury:
value *
TOKENOMICS.distribution.treasury / 100,

staking:
value *
TOKENOMICS.distribution.staking / 100,

referral:
value *
TOKENOMICS.distribution.referral / 100
};
}

/* ===================================
   BURN
=================================== */

function burnTokens(amount){

TOKENOMICS.supply.burned += amount;

TOKENOMICS.supply.circulating -= amount;

saveTokenomics();

toastSafe(
amount + " CRX burned"
);

trackSafe("token_burn");
}

/* ===================================
   REWARDS
=================================== */

function rewardStakers(amount){

TOKENOMICS.supply.stakingPool -= amount;

saveTokenomics();

toastSafe(
amount + " CRX rewards sent"
);

trackSafe("staking_rewards");
}

function cashbackUser(amount){

toastSafe(
amount + " CRX cashback"
);

trackSafe("cashback_paid");
}

function referralPayout(amount){

toastSafe(
amount + " CRX referral paid"
);

trackSafe("referral_paid");
}

/* ===================================
   PROCESS TX
=================================== */

function processTransaction(
type,
amount
){

const fee =
calculateFee(type, amount);

const split =
splitFee(fee);

burnTokens(split.burn);

TOKENOMICS.supply.treasury +=
split.treasury;

rewardStakers(split.staking);

referralPayout(split.referral);

renderTokenomics();

return {
fee: fee,
split: split
};
}

/* ===================================
   STATS
=================================== */

function marketCap(){

return (
TOKENOMICS.supply.circulating *
TOKENOMICS.price
);
}

function fdv(){

return (
TOKENOMICS.supply.max *
TOKENOMICS.price
);
}

function supplyStats(){

return {
max:
TOKENOMICS.supply.max,

circulating:
TOKENOMICS.supply.circulating,

burned:
TOKENOMICS.supply.burned
};
}

/* ===================================
   STORAGE
=================================== */

function saveTokenomics(){

localStorage.setItem(
"corax_tokenomics",
JSON.stringify(TOKENOMICS)
);
}

function loadTokenomics(){

const saved =
JSON.parse(
localStorage.getItem(
"corax_tokenomics"
));

if(saved){

Object.assign(
TOKENOMICS,
saved
);

}
}

/* ===================================
   UI
=================================== */

function renderTokenomics(){

loadTokenomics();

const box =
document.getElementById(
"tokenomicsStats"
);

if(!box) return;

box.innerHTML =

"Token: " +
TOKENOMICS.token +

"<br>Price: $" +
TOKENOMICS.price +

"<br>Circulating: " +
numberFormat(
TOKENOMICS.supply.circulating
) +

"<br>Burned: " +
numberFormat(
TOKENOMICS.supply.burned
) +

"<br>Market Cap: $" +
numberFormat(
marketCap()
) +

"<br>FDV: $" +
numberFormat(
fdv()
);
}

/* ===================================
   HELPERS
=================================== */

function numberFormat(v){

return Number(v)
.toLocaleString();
}

function toastSafe(msg){

if(typeof toast === "function"){

toast(msg);

}else{

console.log(msg);

}
}

function trackSafe(event){

if(typeof track === "function"){

track(event);

}
}

console.log(
"CORΛX Tokenomics Ready"
);
