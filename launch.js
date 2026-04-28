/* ===================================
   CORΛX MASTER LAUNCH.JS v1
   Beta Launch Growth Engine
=================================== */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

/* ===================================
   CONFIG
=================================== */

const LAUNCH = {
brand: "CORΛX",
phase: "BETA",
maxInvites: 1000,
inviteBonus: 5,
dataFile: path.join(
__dirname,
"launch-data.json"
),

data: {
waitlist: [],
users: [],
stats: {
visits: 0,
signups: 0,
invitesUsed: 0
}
}
};

/* ===================================
   INIT
=================================== */

function initLaunch(){

loadData();

log("Launch Engine Ready");

}

/* ===================================
   WAITLIST
=================================== */

function joinWaitlist(
email,
source = "organic"
){

if(!validEmail(email)){

return fail(
"Invalid email"
);

}

const exists =
LAUNCH.data.waitlist.find(
x => x.email === email
);

if(exists){

return fail(
"Already joined"
);

}

const code =
createCode();

const item = {
id: createId(),
email,
source,
code,
position:
LAUNCH.data.waitlist.length + 1,
referrals: 0,
createdAt:
new Date().toISOString()
};

LAUNCH.data.waitlist.push(item);

LAUNCH.data.stats.signups++;

saveData();

return success({
message:"Joined",
position:item.position,
code:item.code
});

}

/* ===================================
   REFERRAL
=================================== */

function useReferral(code){

const user =
LAUNCH.data.waitlist.find(
x => x.code === code
);

if(!user){

return fail(
"Invalid code"
);

}

user.referrals += 1;

user.position =
Math.max(
1,
user.position -
LAUNCH.inviteBonus
);

LAUNCH.data.stats.invitesUsed++;

saveData();

return success({
message:"Referral applied"
});

}

/* ===================================
   INVITE ACCESS
=================================== */

function approveUser(email){

const user =
LAUNCH.data.waitlist.find(
x => x.email === email
);

if(!user){

return fail(
"Not found"
);

}

LAUNCH.data.users.push({
email,
invite:true,
approvedAt:
new Date().toISOString()
});

saveData();

return success({
message:"Access granted"
});

}

/* ===================================
   METRICS
=================================== */

function trackVisit(){

LAUNCH.data.stats.visits++;

saveData();

}

function conversionRate(){

const visits =
LAUNCH.data.stats.visits;

const signups =
LAUNCH.data.stats.signups;

if(visits === 0) return 0;

return (
(signups / visits) * 100
).toFixed(2);

}

function dashboard(){

return {
phase:
LAUNCH.phase,

waitlist:
LAUNCH.data.waitlist.length,

approved:
LAUNCH.data.users.length,

visits:
LAUNCH.data.stats.visits,

signups:
LAUNCH.data.stats.signups,

conversion:
conversionRate() + "%"
};

}

/* ===================================
   STORAGE
=================================== */

function saveData(){

fs.writeFileSync(
LAUNCH.dataFile,
JSON.stringify(
LAUNCH.data,
null,
2
)
);

}

function loadData(){

if(
fs.existsSync(
LAUNCH.dataFile
)
){

LAUNCH.data =
JSON.parse(
fs.readFileSync(
LAUNCH.dataFile,
"utf8"
)
);

}

}

/* ===================================
   HELPERS
=================================== */

function createCode(){

return (
"CRX" +
crypto
.randomBytes(3)
.toString("hex")
.toUpperCase()
);

}

function createId(){

return (
"USR-" +
crypto
.randomBytes(4)
.toString("hex")
.toUpperCase()
);

}

function validEmail(email){

return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
.test(email);

}

function success(data){

return {
success:true,
...data
};

}

function fail(message){

return {
success:false,
message
};

}

function log(msg){

console.log(
"[CORΛX]",
msg
);

}

/* ===================================
   EXPORT
=================================== */

module.exports = {
initLaunch,
joinWaitlist,
useReferral,
approveUser,
trackVisit,
dashboard
};

/* ===================================
   AUTO RUN
=================================== */

if(require.main === module){

initLaunch();

console.log(
dashboard()
);

          }
