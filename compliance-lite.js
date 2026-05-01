/* ===================================
   CORΛX MASTER COMPLIANCE-LITE.JS v1
   No-KYC / Hybrid Compliance Engine
=================================== */

const COMPLIANCE = {
brand: "CORΛX",

users: {},

levels: {
anon: {
limit: 1000
},
basic: {
limit: 10000
},
verified: {
limit: 100000
}
},

alerts: [],
logs: []
};

/* ===================================
   INIT
=================================== */

function initCompliance(){

loadCompliance();

console.log(
"CORΛX Compliance Lite Ready"
);

}

/* ===================================
   USER PROFILE
=================================== */

function initUser(userId){

if(!COMPLIANCE.users[userId]){

COMPLIANCE.users[userId] = {
level: "anon",
emailVerified: false,
volume: 0,
transactions: 0,
restricted: false,
createdAt:
new Date().toISOString()
};

saveCompliance();
}

return COMPLIANCE.users[userId];
}

/* ===================================
   LEVEL UPGRADE (NO KYC)
=================================== */

function verifyEmail(userId){

const user = initUser(userId);

user.emailVerified = true;
user.level = "basic";

log(userId,"Email verified → basic level");

saveCompliance();

return user;
}

function upgradeLevel(userId){

const user = initUser(userId);

if(!user.emailVerified){

return fail("Email verification required");
}

user.level = "verified";

log(userId,"Upgraded to verified");

saveCompliance();

return user;
}

/* ===================================
   TRACK TRANSACTION
=================================== */

function trackTransaction(
userId,
amount
){

const user = initUser(userId);

user.transactions++;
user.volume += Number(amount);

checkLimits(userId);
detectSuspicious(userId, amount);

saveCompliance();

}

/* ===================================
   LIMIT SYSTEM
=================================== */

function checkLimits(userId){

const user = COMPLIANCE.users[userId];

const limit =
COMPLIANCE.levels[user.level].limit;

if(user.volume > limit){

user.restricted = true;

alert(
userId,
"Limit exceeded for level: " + user.level
);

}

}

/* ===================================
   SUSPICIOUS ACTIVITY (NO KYC MODEL)
=================================== */

function detectSuspicious(
userId,
amount
){

// large tx detection

if(amount > 50000){

alert(
userId,
"Large transaction detected"
);

}

// high frequency detection

const user = COMPLIANCE.users[userId];

if(user.transactions > 50){

alert(
userId,
"High activity detected"
);

}

}

/* ===================================
   ACCESS CONTROL
=================================== */

function canTransact(
userId,
amount
){

const user = initUser(userId);

if(user.restricted){

return {
success:false,
message:"Account temporarily restricted"
};

}

const limit =
COMPLIANCE.levels[user.level].limit;

if(amount > limit){

return {
success:false,
message:"Amount exceeds your level limit"
};

}

return { success:true };

}

/* ===================================
   ALERTS & LOGS
=================================== */

function alert(
userId,
message
){

COMPLIANCE.alerts.push({
userId,
message,
time:
new Date().toISOString()
});

log(userId,message);

}

function log(userId,message){

COMPLIANCE.logs.push({
userId,
message,
time:
new Date().toISOString()
});

if(COMPLIANCE.logs.length > 500){

COMPLIANCE.logs.shift();
}

}

/* ===================================
   DASHBOARD
=================================== */

function dashboard(){

return {
users:
Object.keys(COMPLIANCE.users).length,

alerts:
COMPLIANCE.alerts.length,

restricted:
Object.values(COMPLIANCE.users)
.filter(x=>x.restricted).length
};

}

/* ===================================
   STORAGE
=================================== */

function saveCompliance(){

if(
typeof localStorage !==
"undefined"
){

localStorage.setItem(
"corax_compliance_lite",
JSON.stringify(COMPLIANCE)
);

}

}

function loadCompliance(){

if(
typeof localStorage !==
"undefined"
){

const saved =
localStorage.getItem(
"corax_compliance_lite"
);

if(saved){

Object.assign(
COMPLIANCE,
JSON.parse(saved)
);

}

}

}

/* ===================================
   HELPERS
=================================== */

function fail(message){

return {
success:false,
message
};

}

/* ===================================
   EXPORT
=================================== */

if(typeof module !== "undefined"){

module.exports = {
initCompliance,
verifyEmail,
upgradeLevel,
trackTransaction,
canTransact,
dashboard
};

}
