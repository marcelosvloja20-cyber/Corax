/* ===================================
   CORΛX MASTER ONBOARDING.JS v1
   User Activation Engine
=================================== */

const ONBOARDING = {
brand: "CORΛX",

steps: [
"create_account",
"verify_email",
"connect_wallet",
"choose_language",
"enable_security",
"first_deposit",
"first_transaction"
],

rewards: {
completeSetup: 25
},

users: {}
};

/* ===================================
   INIT
=================================== */

function initOnboarding(){

loadOnboarding();

console.log(
"CORΛX Onboarding Ready"
);

}

/* ===================================
   START FLOW
=================================== */

function startOnboarding(userId){

if(
!ONBOARDING.users[userId]
){

ONBOARDING.users[userId] = {
startedAt:
new Date().toISOString(),
completed: [],
finished:false
};

saveOnboarding();
}

return status(userId);
}

/* ===================================
   COMPLETE STEP
=================================== */

function completeStep(
userId,
step
){

const user =
ONBOARDING.users[userId];

if(!user){

startOnboarding(userId);
}

const profile =
ONBOARDING.users[userId];

if(
!ONBOARDING.steps.includes(step)
){

return fail(
"Invalid step"
);

}

if(
!profile.completed.includes(step)
){

profile.completed.push(step);
}

checkFinished(userId);

saveOnboarding();

return status(userId);
}

/* ===================================
   FINISH FLOW
=================================== */

function checkFinished(userId){

const user =
ONBOARDING.users[userId];

if(
user.completed.length >=
ONBOARDING.steps.length
){

user.finished = true;
user.reward =
ONBOARDING.rewards.completeSetup;

console.log(
"Reward:",
user.reward,
"CRX"
);

}

}

/* ===================================
   STATUS
=================================== */

function status(userId){

const user =
ONBOARDING.users[userId];

if(!user){

return null;
}

const progress =
(
user.completed.length /
ONBOARDING.steps.length
) * 100;

return {
userId,
progress:
progress.toFixed(0) + "%",

completed:
user.completed,

remaining:
ONBOARDING.steps.filter(
x =>
!user.completed.includes(x)
),

finished:
user.finished
};

}

/* ===================================
   NEXT STEP
=================================== */

function nextStep(userId){

const user =
ONBOARDING.users[userId];

if(!user){

return ONBOARDING.steps[0];
}

return ONBOARDING.steps.find(
x =>
!user.completed.includes(x)
) || null;

}

/* ===================================
   TOOLTIPS
=================================== */

function tip(step){

const tips = {

create_account:
"Use email or wallet",

verify_email:
"Confirm inbox to secure account",

connect_wallet:
"MetaMask or WalletConnect",

choose_language:
"Select preferred language",

enable_security:
"Activate 2FA protection",

first_deposit:
"Add crypto or fiat balance",

first_transaction:
"Try send or swap"

};

return tips[step] || "";
}

/* ===================================
   REMINDER
=================================== */

function reminder(userId){

const step =
nextStep(userId);

if(!step){

return "Setup complete";
}

return (
"Complete next step: " +
step
);

}

/* ===================================
   STORAGE
=================================== */

function saveOnboarding(){

if(
typeof localStorage !==
"undefined"
){

localStorage.setItem(
"corax_onboarding",
JSON.stringify(ONBOARDING)
);

}

}

function loadOnboarding(){

if(
typeof localStorage !==
"undefined"
){

const saved =
localStorage.getItem(
"corax_onboarding"
);

if(saved){

Object.assign(
ONBOARDING,
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
initOnboarding,
startOnboarding,
completeStep,
status,
nextStep,
tip,
reminder
};

}
