/* ===================================
   CORΛX MASTER SUPPORT.JS v1
   Customer Success Engine
=================================== */

const SUPPORT = {
brand: "CORΛX",

tickets: [],
faq: [
{
id:1,
q:"How do I connect wallet?",
a:"Use MetaMask or WalletConnect."
},
{
id:2,
q:"How long do payments take?",
a:"Most transfers confirm in minutes."
},
{
id:3,
q:"Can I recover my account?",
a:"Use email recovery and 2FA."
}
],

stats: {
opened:0,
closed:0,
avgResponseMin:0,
satisfaction:100
}
};

/* ===================================
   INIT
=================================== */

function initSupport(){

loadSupport();

console.log(
"CORΛX Support Ready"
);

}

/* ===================================
   CREATE TICKET
=================================== */

function createTicket(
userId,
category,
subject,
message,
priority="normal"
){

const ticket = {
id:createId(),
userId,
category,
subject,
message,
priority,
status:"open",
createdAt:
new Date().toISOString(),
responses:[]
};

SUPPORT.tickets.push(ticket);

SUPPORT.stats.opened++;

saveSupport();

return ticket;
}

/* ===================================
   REPLY
=================================== */

function replyTicket(
ticketId,
agent,
message
){

const ticket =
findTicket(ticketId);

if(!ticket) return null;

ticket.responses.push({
agent,
message,
time:
new Date().toISOString()
});

ticket.status = "answered";

updateResponseTime();

saveSupport();

return ticket;
}

/* ===================================
   CLOSE
=================================== */

function closeTicket(ticketId){

const ticket =
findTicket(ticketId);

if(!ticket) return null;

ticket.status = "closed";

SUPPORT.stats.closed++;

saveSupport();

return ticket;
}

/* ===================================
   FAQ
=================================== */

function searchFAQ(term){

term =
term.toLowerCase();

return SUPPORT.faq.filter(
x =>
x.q.toLowerCase()
.includes(term)
);

}

/* ===================================
   DASHBOARD
=================================== */

function dashboard(){

return {
open:
SUPPORT.tickets.filter(
x => x.status !== "closed"
).length,

closed:
SUPPORT.stats.closed,

avgResponseMin:
SUPPORT.stats.avgResponseMin,

satisfaction:
SUPPORT.stats.satisfaction + "%"
};

}

/* ===================================
   HELPERS
=================================== */

function findTicket(id){

return SUPPORT.tickets.find(
x => x.id === id
);

}

function updateResponseTime(){

const base = 12;

SUPPORT.stats.avgResponseMin =
Math.max(
2,
base -
Math.floor(
SUPPORT.stats.closed / 10
)
);

}

function createId(){

return (
"TCK-" +
Math.random()
.toString(36)
.substring(2,9)
.toUpperCase()
);

}

/* ===================================
   STORAGE
=================================== */

function saveSupport(){

if(
typeof localStorage !==
"undefined"
){

localStorage.setItem(
"corax_support",
JSON.stringify(SUPPORT)
);

}

}

function loadSupport(){

if(
typeof localStorage !==
"undefined"
){

const saved =
localStorage.getItem(
"corax_support"
);

if(saved){

Object.assign(
SUPPORT,
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
initSupport,
createTicket,
replyTicket,
closeTicket,
searchFAQ,
dashboard
};

}
