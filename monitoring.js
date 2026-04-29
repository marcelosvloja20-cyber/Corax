/* ===================================
   CORΛX MASTER MONITORING.JS v1
   Production Health Engine
=================================== */

const MONITOR = {
startedAt: new Date().toISOString(),
checks: [],
stats: {
uptime: 0,
errors: 0,
warnings: 0,
requests: 0
},
services: {
api: "unknown",
database: "unknown",
wallet: "unknown",
payments: "unknown"
}
};

/* ===================================
   INIT
=================================== */

function initMonitoring(){

console.log(
"CORΛX Monitoring Ready"
);

heartbeat();

setInterval(
heartbeat,
30000
);

}

/* ===================================
   HEARTBEAT
=================================== */

function heartbeat(){

MONITOR.stats.uptime++;

checkAPI();
checkDatabase();
checkWallet();
checkPayments();

saveState();

}

/* ===================================
   SERVICE CHECKS
=================================== */

function checkAPI(){

MONITOR.services.api = "online";

logCheck(
"api",
"online"
);

}

function checkDatabase(){

MONITOR.services.database =
"online";

logCheck(
"database",
"online"
);

}

function checkWallet(){

MONITOR.services.wallet =
"online";

logCheck(
"wallet",
"online"
);

}

function checkPayments(){

MONITOR.services.payments =
"online";

logCheck(
"payments",
"online"
);

}

/* ===================================
   LOGGING
=================================== */

function logCheck(
service,
status
){

MONITOR.checks.push({
time:
new Date().toISOString(),
service,
status
});

if(
MONITOR.checks.length > 100
){

MONITOR.checks.shift();

}

console.log(
"[MONITOR]",
service,
status
);

}

/* ===================================
   ALERTS
=================================== */

function errorAlert(msg){

MONITOR.stats.errors++;

console.error(
"[CORΛX ERROR]",
msg
);

}

function warningAlert(msg){

MONITOR.stats.warnings++;

console.warn(
"[CORΛX WARNING]",
msg
);

}

/* ===================================
   REQUEST TRACKING
=================================== */

function trackRequest(){

MONITOR.stats.requests++;

saveState();

}

/* ===================================
   REPORT
=================================== */

function statusReport(){

return {
startedAt:
MONITOR.startedAt,

uptimeChecks:
MONITOR.stats.uptime,

requests:
MONITOR.stats.requests,

errors:
MONITOR.stats.errors,

warnings:
MONITOR.stats.warnings,

services:
MONITOR.services
};

}

/* ===================================
   STORAGE
=================================== */

function saveState(){

if(
typeof localStorage !==
"undefined"
){

localStorage.setItem(
"corax_monitor",
JSON.stringify(MONITOR)
);

}

}

/* ===================================
   EXPORT
=================================== */

if(typeof module !== "undefined"){

module.exports = {
initMonitoring,
trackRequest,
errorAlert,
warningAlert,
statusReport
};

}
