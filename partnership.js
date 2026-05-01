/* ===================================
   CORΛX MASTER PARTNERSHIPS.JS v1
   Strategic Partnerships Engine
=================================== */

const PARTNERSHIPS = {
brand: "CORΛX",

partners: [],

stats: {
prospects: 0,
active: 0,
closed: 0,
revenue: 0
}
};

/* ===================================
   INIT
=================================== */

function initPartnerships(){

loadPartnerships();

console.log(
"CORΛX Partnerships Ready"
);

}

/* ===================================
   CREATE PARTNER
=================================== */

function createPartner(
name,
type="merchant",
contact=""
){

const partner = {
id:createId("PRT"),
name,
type,
contact,
stage:"prospect",
status:"open",
deal:null,
performance:{
volume:0,
revenue:0
},
createdAt:
new Date().toISOString()
};

PARTNERSHIPS.partners.push(partner);

PARTNERSHIPS.stats.prospects++;

savePartnerships();

return partner;
}

/* ===================================
   UPDATE STAGE
=================================== */

function updateStage(
id,
stage
){

const p =
findPartner(id);

if(!p) return null;

p.stage = stage;

savePartnerships();

return p;
}

/* ===================================
   CLOSE DEAL
=================================== */

function closeDeal(
id,
dealValue,
model="revenue_share"
){

const p =
findPartner(id);

if(!p) return null;

p.status = "active";
p.stage = "closed";

p.deal = {
value:dealValue,
model,
closedAt:
new Date().toISOString()
};

PARTNERSHIPS.stats.active++;
PARTNERSHIPS.stats.closed++;

savePartnerships();

return p;
}

/* ===================================
   TRACK PERFORMANCE
=================================== */

function trackPerformance(
id,
volume,
revenue
){

const p =
findPartner(id);

if(!p) return null;

p.performance.volume +=
Number(volume);

p.performance.revenue +=
Number(revenue);

PARTNERSHIPS.stats.revenue +=
Number(revenue);

savePartnerships();

return p.performance;
}

/* ===================================
   PIPELINE
=================================== */

function pipeline(){

return {
prospects:
PARTNERSHIPS.partners.filter(
x => x.stage === "prospect"
).length,

negotiation:
PARTNERSHIPS.partners.filter(
x => x.stage === "negotiation"
).length,

closed:
PARTNERSHIPS.partners.filter(
x => x.stage === "closed"
).length
};

}

/* ===================================
   DASHBOARD
=================================== */

function dashboard(){

return {
totalPartners:
PARTNERSHIPS.partners.length,

active:
PARTNERSHIPS.stats.active,

closedDeals:
PARTNERSHIPS.stats.closed,

totalRevenue:
"$" + PARTNERSHIPS.stats.revenue,

pipeline:
pipeline()
};

}

/* ===================================
   HELPERS
=================================== */

function findPartner(id){

return PARTNERSHIPS.partners.find(
x => x.id === id
);

}

function createId(prefix){

return (
prefix + "-" +
Math.random()
.toString(36)
.substring(2,9)
.toUpperCase()
);

}

/* ===================================
   STORAGE
=================================== */

function savePartnerships(){

if(
typeof localStorage !==
"undefined"
){

localStorage.setItem(
"corax_partnerships",
JSON.stringify(PARTNERSHIPS)
);

}

}

function loadPartnerships(){

if(
typeof localStorage !==
"undefined"
){

const saved =
localStorage.getItem(
"corax_partnerships"
);

if(saved){

Object.assign(
PARTNERSHIPS,
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
initPartnerships,
createPartner,
updateStage,
closeDeal,
trackPerformance,
dashboard
};

}
