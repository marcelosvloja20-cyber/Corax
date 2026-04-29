/* ===================================
   CORΛX MASTER REFERRAL.JS v1
   Viral Growth Engine
=================================== */

const REFERRAL = {
brand: "CORΛX",

reward: {
referrerCRX: 20,
inviteeCRX: 10,
cashbackDays: 30
},

users: {},
claims: [],
blockedIps: []
};

/* ===================================
   INIT
=================================== */

function initReferral(){

loadReferral();

console.log(
"CORΛX Referral Ready"
);

}

/* ===================================
   CREATE CODE
=================================== */

function createReferral(userId){

if(
REFERRAL.users[userId]
){

return REFERRAL.users[userId];
}

const code =
"CRX" +
Math.random()
.toString(36)
.substring(2,8)
.toUpperCase();

const data = {
userId,
code,
clicks:0,
signups:0,
rewards:0,
createdAt:
new Date().toISOString()
};

REFERRAL.users[userId] = data;

saveReferral();

return data;
}

/* ===================================
   LINK
=================================== */

function referralLink(userId){

const user =
createReferral(userId);

return (
"https://corax.app/join?ref=" +
user.code
);

}

/* ===================================
   TRACK CLICK
=================================== */

function trackClick(code){

const user =
findByCode(code);

if(!user) return false;

user.clicks++;

saveReferral();

return true;
}

/* ===================================
   APPLY REFERRAL
=================================== */

function applyReferral(
code,
newUserId,
ip="0.0.0.0"
){

if(
REFERRAL.blockedIps.includes(ip)
){

return fail(
"Blocked source"
);

}

const ref =
findByCode(code);

if(!ref){

return fail(
"Invalid code"
);

}

if(
ref.userId === newUserId
){

return fail(
"Self referral blocked"
);

}

ref.signups++;

REFERRAL.claims.push({
referrer:
ref.userId,
invitee:
newUserId,
reward:
REFERRAL.reward.referrerCRX,
ip,
createdAt:
new Date().toISOString()
});

ref.rewards +=
REFERRAL.reward.referrerCRX;

saveReferral();

return {
success:true,
referrerReward:
REFERRAL.reward.referrerCRX,
inviteeReward:
REFERRAL.reward.inviteeCRX
};

}

/* ===================================
   FRAUD CONTROL
=================================== */

function blockIp(ip){

if(
!REFERRAL.blockedIps.includes(ip)
){

REFERRAL.blockedIps.push(ip);

saveReferral();
}

}

function suspicious(code){

const user =
findByCode(code);

if(!user) return false;

return (
user.signups >
user.clicks
);

}

/* ===================================
   DASHBOARD
=================================== */

function stats(userId){

const user =
REFERRAL.users[userId];

if(!user) return null;

const rate =
user.clicks === 0
? 0
: (
(user.signups /
user.clicks) * 100
).toFixed(2);

return {
code:user.code,
clicks:user.clicks,
signups:user.signups,
conversion:
rate + "%",
earnedCRX:
user.rewards
};

}

/* ===================================
   HELPERS
=================================== */

function findByCode(code){

return Object.values(
REFERRAL.users
).find(
x => x.code === code
);

}

function fail(message){

return {
success:false,
message
};

}

/* ===================================
   STORAGE
=================================== */

function saveReferral(){

if(
typeof localStorage !==
"undefined"
){

localStorage.setItem(
"corax_referral",
JSON.stringify(REFERRAL)
);

}

}

function loadReferral(){

if(
typeof localStorage !==
"undefined"
){

const saved =
localStorage.getItem(
"corax_referral"
);

if(saved){

Object.assign(
REFERRAL,
JSON.parse(saved)
);

}

}

}

/* ===================================
   EXPORT
=================================== */

if(typeof module !== "undefined"){

module.exports = {
initReferral,
createReferral,
referralLink,
trackClick,
applyReferral,
blockIp,
suspicious,
stats
};

}
