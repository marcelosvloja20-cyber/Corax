/* ===================================
   CORΛX MASTER RISK.JS v1
   Fraud Detection & Risk Engine
=================================== */

const RISK = {
brand: "CORΛX",

users: {},
flags: [],
rules: {
maxDailyTx: 20,
maxAmount: 10000,
maxReferrals: 10
}
};

/* ===================================
   INIT
=================================== */

function initRisk(){

loadRisk();

console.log(
"CORΛX Risk Engine Ready"
);

}

/* ===================================
   USER PROFILE
=================================== */

function initUser(userId){

if(!RISK.users[userId]){

RISK.users[userId] = {
score: 0,
level: "low",
txCount: 0,
volume: 0,
referrals: 0,
flags: [],
lastActivity:
new Date().toISOString()
};

saveRisk();
}

return RISK.users[userId];
}

/* ===================================
   TRACK ACTIVITY
=================================== */

function trackTransaction(
userId,
amount
){

const user = initUser(userId);

user.txCount++;
user.volume += Number(amount);

evaluate(userId);

saveRisk();

}

function trackReferral(userId){

const user = initUser(userId);

user.referrals++;

evaluate(userId);

saveRisk();

}

/* ===================================
   EVALUATION
=================================== */

function evaluate(userId){

const user = RISK.users[userId];

let score = 0;

if(
user.txCount > RISK.rules.maxDailyTx
){

score += 30;
flag(userId,"High TX volume");
}

if(
user.volume > RISK.rules.maxAmount
){

score += 40;
flag(userId,"High transaction value");
}

if(
user.referrals > RISK.rules.maxReferrals
){

score += 30;
flag(userId,"Referral abuse");
}

user.score = score;

if(score < 30){

user.level = "low";

}else if(score < 70){

user.level = "medium";

}else{

user.level = "high";

}

applyRestrictions(userId);

}

/* ===================================
   FLAGS
=================================== */

function flag(userId,reason){

RISK.flags.push({
userId,
reason,
time:
new Date().toISOString()
});

RISK.users[userId].flags.push(reason);

}

/* ===================================
   RESTRICTIONS
=================================== */

function applyRestrictions(userId){

const user = RISK.users[userId];

if(user.level === "high"){

user.restricted = true;

console.warn(
"[RISK] User restricted:",
userId
);

}else{

user.restricted = false;
}

}

/* ===================================
   CHECK
=================================== */

function canTransact(userId){

const user = initUser(userId);

if(user.restricted){

return {
success:false,
message:"User restricted due to risk"
};

}

return { success:true };

}

/* ===================================
   DASHBOARD
=================================== */

function dashboard(){

return {
totalUsers:
Object.keys(RISK.users).length,

flags:
RISK.flags.length,

highRisk:
Object.values(RISK.users)
.filter(x=>x.level==="high")
.length
};

}

/* ===================================
   STORAGE
=================================== */

function saveRisk(){

if(
typeof localStorage !==
"undefined"
){

localStorage.setItem(
"corax_risk",
JSON.stringify(RISK)
);

}

}

function loadRisk(){

if(
typeof localStorage !==
"undefined"
){

const saved =
localStorage.getItem(
"corax_risk"
);

if(saved){

Object.assign(
RISK,
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
initRisk,
trackTransaction,
trackReferral,
canTransact,
dashboard
};

}
