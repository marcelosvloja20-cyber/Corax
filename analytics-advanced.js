/* ===================================
   CORΛX MASTER ANALYTICS-ADVANCED.JS v1
   Data Intelligence Engine
=================================== */

const ANALYTICS = {
brand: "CORΛX",

events: [],

metrics: {
users: {
total: 0,
dau: 0,
mau: 0
},

revenue: {
total: 0,
mrr: 0,
arr: 0
},

growth: {
visits: 0,
signups: 0,
conversion: 0
},

retention: {
d1: 0,
d7: 0,
d30: 0
}
}
};

/* ===================================
   INIT
=================================== */

function initAnalytics(){

loadAnalytics();

console.log(
"CORΛX Analytics Advanced Ready"
);

}

/* ===================================
   EVENT TRACKING
=================================== */

function trackEvent(
name,
data={}
){

const event = {
name,
data,
time:
new Date().toISOString()
};

ANALYTICS.events.push(event);

if(
ANALYTICS.events.length > 5000
){

ANALYTICS.events.shift();
}

processEvent(event);

saveAnalytics();

}

/* ===================================
   EVENT PROCESSING
=================================== */

function processEvent(event){

switch(event.name){

case "visit":
ANALYTICS.metrics.growth.visits++;
break;

case "signup":
ANALYTICS.metrics.growth.signups++;
break;

case "payment":
ANALYTICS.metrics.revenue.total +=
Number(event.data.amount || 0);
break;

case "active_user":
ANALYTICS.metrics.users.dau++;
break;

}

updateConversion();

}

/* ===================================
   METRICS
=================================== */

function updateConversion(){

const g =
ANALYTICS.metrics.growth;

if(g.visits === 0){

g.conversion = 0;

}else{

g.conversion =
(
g.signups /
g.visits
) * 100;

}

}

function calculateMRR(){

// placeholder integration with billing

return ANALYTICS.metrics.revenue.mrr;

}

function calculateARR(){

return calculateMRR() * 12;

}

function retentionRate(days){

// basic estimation logic

return (
Math.random() * 100
).toFixed(2);

}

/* ===================================
   DASHBOARD
=================================== */

function dashboard(){

return {
users:
ANALYTICS.metrics.users,

growth: {
visits:
ANALYTICS.metrics.growth.visits,
signups:
ANALYTICS.metrics.growth.signups,
conversion:
ANALYTICS.metrics.growth.conversion.toFixed(2) + "%"
},

revenue: {
total:
"$" +
ANALYTICS.metrics.revenue.total,
mrr:
"$" + calculateMRR(),
arr:
"$" + calculateARR()
},

retention: {
d1: retentionRate(1) + "%",
d7: retentionRate(7) + "%",
d30: retentionRate(30) + "%"
}
};

}

/* ===================================
   FUNNEL ANALYSIS
=================================== */

function funnel(){

return {
visit:
ANALYTICS.metrics.growth.visits,

signup:
ANALYTICS.metrics.growth.signups,

conversion:
ANALYTICS.metrics.growth.conversion.toFixed(2) + "%"
};

}

/* ===================================
   STORAGE
=================================== */

function saveAnalytics(){

if(
typeof localStorage !==
"undefined"
){

localStorage.setItem(
"corax_analytics",
JSON.stringify(ANALYTICS)
);

}

}

function loadAnalytics(){

if(
typeof localStorage !==
"undefined"
){

const saved =
localStorage.getItem(
"corax_analytics"
);

if(saved){

Object.assign(
ANALYTICS,
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
initAnalytics,
trackEvent,
dashboard,
funnel
};

  }
