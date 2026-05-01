/* ===================================
   CORΛX MASTER SCALE.JS v1
   High Load & Resilience Engine
=================================== */

const SCALE = {
brand: "CORΛX",

limits: {
requestsPerMinute: 300,
queueLimit: 1000
},

stats: {
requests: 0,
queued: 0,
rejected: 0,
processed: 0
},

queue: [],
cache: {},
servers: [
{ id:"srv-1", load:0, status:"online" }
]
};

/* ===================================
   INIT
=================================== */

function initScale(){

loadScale();

setInterval(processQueue, 1000);

console.log(
"CORΛX Scale Engine Ready"
);

}

/* ===================================
   REQUEST HANDLER
=================================== */

function handleRequest(req){

SCALE.stats.requests++;

if(isOverLimit()){

SCALE.stats.rejected++;

return {
success:false,
message:"Rate limit exceeded"
};

}

if(SCALE.queue.length >= SCALE.limits.queueLimit){

SCALE.stats.rejected++;

return {
success:false,
message:"Server busy"
};

}

SCALE.queue.push(req);

SCALE.stats.queued++;

saveScale();

return {
success:true,
message:"Queued"
};

}

/* ===================================
   QUEUE PROCESSING
=================================== */

function processQueue(){

if(SCALE.queue.length === 0) return;

const batch = SCALE.queue.splice(0, 10);

batch.forEach(req=>{

routeRequest(req);

SCALE.stats.processed++;

});

saveScale();

}

/* ===================================
   ROUTER
=================================== */

function routeRequest(req){

const server =
pickServer();

server.load++;

setTimeout(()=>{

server.load--;

}, 100);

}

/* ===================================
   SERVER SELECTION
=================================== */

function pickServer(){

return SCALE.servers.sort(
(a,b)=>a.load - b.load
)[0];

}

/* ===================================
   CACHE
=================================== */

function cacheSet(key,value){

SCALE.cache[key] = {
value,
time:Date.now()
};

}

function cacheGet(key,ttl=5000){

const item = SCALE.cache[key];

if(!item) return null;

if(
Date.now() - item.time > ttl
){

delete SCALE.cache[key];

return null;
}

return item.value;

}

/* ===================================
   LIMIT CONTROL
=================================== */

function isOverLimit(){

return (
SCALE.stats.requests >
SCALE.limits.requestsPerMinute
);

}

/* ===================================
   AUTO SCALE
=================================== */

function autoScale(){

if(
SCALE.queue.length > 200
){

addServer();
}

if(
SCALE.queue.length < 20 &&
SCALE.servers.length > 1
){

removeServer();
}

}

/* ===================================
   SERVER MANAGEMENT
=================================== */

function addServer(){

const id =
"srv-" + (SCALE.servers.length + 1);

SCALE.servers.push({
id,
load:0,
status:"online"
});

console.log(
"[SCALE] Added server",
id
);

}

function removeServer(){

const removed =
SCALE.servers.pop();

console.log(
"[SCALE] Removed server",
removed.id
);

}

/* ===================================
   STATUS
=================================== */

function dashboard(){

return {
requests:
SCALE.stats.requests,
queued:
SCALE.queue.length,
processed:
SCALE.stats.processed,
servers:
SCALE.servers.length,
rejected:
SCALE.stats.rejected
};

}

/* ===================================
   STORAGE
=================================== */

function saveScale(){

if(
typeof localStorage !==
"undefined"
){

localStorage.setItem(
"corax_scale",
JSON.stringify(SCALE)
);

}

}

function loadScale(){

if(
typeof localStorage !==
"undefined"
){

const saved =
localStorage.getItem(
"corax_scale"
);

if(saved){

Object.assign(
SCALE,
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
initScale,
handleRequest,
cacheSet,
cacheGet,
autoScale,
dashboard
};

  }
