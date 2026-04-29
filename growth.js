/* ===================================
   CORΛX MASTER GROWTH.JS v1
   User Acquisition Engine
=================================== */

const GROWTH = {
campaigns: [],
referrals: [],
metrics: {
visits: 0,
signups: 0,
walletConnects: 0,
paidUsers: 0
}
};

/* ===================================
   INIT
=================================== */

function initGrowth(){

loadGrowth();

console.log(
"CORΛX Growth Ready"
);

}

/* ===================================
   TRACK EVENTS
=================================== */

function trackVisit(source="organic"){

GROWTH.metrics.visits++;

saveGrowth();

trackEvent(
"visit",
{ source }
);

}

function trackSignup(source="organic"){

GROWTH.metrics.signups++;

saveGrowth();

trackEvent(
"signup",
{ source }
);

}

function trackWalletConnect(){

GROWTH.metrics.walletConnects++;

saveGrowth();

trackEvent(
"wallet_connect"
);

}

function trackPaidUser(plan="premium"){

GROWTH.metrics.paidUsers++;

saveGrowth();

trackEvent(
"paid_user",
{ plan }
);

}

/* ===================================
   CAMPAIGNS
=================================== */

function createCampaign(
name,
channel,
budget=0
){

const item = {
id: id(),
name,
channel,
budget,
createdAt:
new Date().toISOString(),
clicks:0,
signups:0
};

GROWTH.campaigns.push(item);

saveGrowth();

return item;
}

function campaignClick(idValue){

const c =
GROWTH.campaigns.find(
x => x.id === idValue
);

if(!c) return;

c.clicks++;

saveGrowth();
}

function campaignSignup(idValue){

const c =
GROWTH.campaigns.find(
x => x.id === idValue
);

if(!c) return;

c.signups++;

saveGrowth();
}

/* ===================================
   REFERRAL SYSTEM
=================================== */

function createReferral(user){

const code =
"CRX" +
Math.random()
.toString(36)
.substring(2,8)
.toUpperCase();

GROWTH.referrals.push({
user,
code,
uses:0
});

saveGrowth();

return code;
}

function useReferral(code){

const ref =
GROWTH.referrals.find(
x => x.code === code
);

if(!ref) return false;

ref.uses++;

saveGrowth();

return true;
}

/* ===================================
   METRICS
=================================== */

function conversionRate(){

if(
GROWTH.metrics.visits === 0
) return "0%";

return (
(
GROWTH.metrics.signups /
GROWTH.metrics.visits
) * 100
).toFixed(2) + "%";
}

function walletRate(){

if(
GROWTH.metrics.signups === 0
) return "0%";

return (
(
GROWTH.metrics.walletConnects /
GROWTH.metrics.signups
) * 100
).toFixed(2) + "%";
}

function dashboard(){

return {
visits:
GROWTH.metrics.visits,

signups:
GROWTH.metrics.signups,

conversion:
conversionRate(),

walletConnect:
walletRate(),

paidUsers:
GROWTH.metrics.paidUsers
};

}

/* ===================================
   STORAGE
=================================== */

function saveGrowth(){

localStorage.setItem(
"corax_growth",
JSON.stringify(GROWTH)
);

}

function loadGrowth(){

const saved =
localStorage.getItem(
"corax_growth"
);

if(saved){

Object.assign(
GROWTH,
JSON.parse(saved)
);

}
}

/* ===================================
   HELPERS
=================================== */

function trackEvent(
name,
data={}
){

console.log(
"[GROWTH]",
name,
data
);

}

function id(){

return (
"GR-" +
Math.random()
.toString(36)
.substring(2,9)
.toUpperCase()
);

}

/* ===================================
   EXPORT
=================================== */

if(typeof module !== "undefined"){

module.exports = {
initGrowth,
trackVisit,
trackSignup,
trackWalletConnect,
trackPaidUser,
createCampaign,
campaignClick,
campaignSignup,
createReferral,
useReferral,
dashboard
};

}
