/* ===================================
   CORΛX MASTER AI-ENGINE.JS v1
   Intelligence & Prediction Layer
=================================== */

const AI = {
brand: "CORΛX",

users: {},

models: {
churnThreshold: 3,
riskBoost: 20
},

insights: []
};

/* ===================================
   INIT
=================================== */

function initAI(){

loadAI();

console.log(
"CORΛX AI Engine Ready"
);

}

/* ===================================
   USER PROFILE
=================================== */

function initUser(userId){

if(!AI.users[userId]){

AI.users[userId] = {
activity:0,
lastActive:Date.now(),
transactions:0,
volume:0,
riskScore:0,
churnRisk:"low",
profile:"normal"
};

saveAI();
}

return AI.users[userId];
}

/* ===================================
   TRACKING
=================================== */

function trackActivity(userId){

const user = initUser(userId);

user.activity++;
user.lastActive = Date.now();

evaluate(userId);

saveAI();

}

function trackTransaction(
userId,
amount
){

const user = initUser(userId);

user.transactions++;
user.volume += Number(amount);

evaluate(userId);

saveAI();

}

/* ===================================
   EVALUATION
=================================== */

function evaluate(userId){

const user = AI.users[userId];

predictChurn(userId);
classifyUser(userId);
detectRisk(userId);

}

/* ===================================
   CHURN PREDICTION
=================================== */

function predictChurn(userId){

const user = AI.users[userId];

const daysInactive =
(Math.abs(Date.now() - user.lastActive) /
(1000*60*60*24));

if(daysInactive > AI.models.churnThreshold){

user.churnRisk = "high";

addInsight(
userId,
"User likely to churn"
);

}else{

user.churnRisk = "low";
}

}

/* ===================================
   USER CLASSIFICATION
=================================== */

function classifyUser(userId){

const user = AI.users[userId];

if(user.volume > 10000){

user.profile = "whale";

}else if(user.transactions > 20){

user.profile = "active";

}else{

user.profile = "casual";
}

}

/* ===================================
   RISK DETECTION
=================================== */

function detectRisk(userId){

const user = AI.users[userId];

if(user.volume > 20000){

user.riskScore +=
AI.models.riskBoost;

addInsight(
userId,
"High volume risk detected"
);

}

}

/* ===================================
   INSIGHTS
=================================== */

function addInsight(
userId,
message
){

AI.insights.push({
userId,
message,
time:
new Date().toISOString()
});

if(AI.insights.length > 200){

AI.insights.shift();
}

}

/* ===================================
   RECOMMENDATIONS
=================================== */

function recommend(userId){

const user = AI.users[userId];

if(!user) return null;

if(user.churnRisk === "high"){

return "Send retention offer";

}

if(user.profile === "whale"){

return "Offer premium plan";

}

if(user.profile === "casual"){

return "Guide onboarding";

}

return "Keep engaged";

}

/* ===================================
   DASHBOARD
=================================== */

function dashboard(){

return {
users:
Object.keys(AI.users).length,

highRisk:
Object.values(AI.users)
.filter(x=>x.churnRisk==="high")
.length,

whales:
Object.values(AI.users)
.filter(x=>x.profile==="whale")
.length,

insights:
AI.insights.slice(-5)
};

}

/* ===================================
   STORAGE
=================================== */

function saveAI(){

if(
typeof localStorage !==
"undefined"
){

localStorage.setItem(
"corax_ai",
JSON.stringify(AI)
);

}

}

function loadAI(){

if(
typeof localStorage !==
"undefined"
){

const saved =
localStorage.getItem(
"corax_ai"
);

if(saved){

Object.assign(
AI,
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
initAI,
trackActivity,
trackTransaction,
recommend,
dashboard
};

}
