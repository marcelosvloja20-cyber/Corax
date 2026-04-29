/* ===================================
   CORΛX MASTER BILLING.JS v1
   Recurring Revenue Engine
=================================== */

const BILLING = {
brand: "CORΛX",

plans: {
FREE: {
price: 0,
currency: "USD",
users: 0
},

PRO: {
price: 19,
currency: "USD",
users: 0
},

BUSINESS: {
price: 99,
currency: "USD",
users: 0
},

ENTERPRISE: {
price: 499,
currency: "USD",
users: 0
}
},

subscriptions: [],
invoices: [],

stats: {
mrr: 0,
arr: 0,
customers: 0,
churn: 0
}
};

/* ===================================
   INIT
=================================== */

function initBilling(){

loadBilling();

recalculate();

console.log(
"CORΛX Billing Ready"
);

}

/* ===================================
   SUBSCRIBE
=================================== */

function subscribe(
userId,
plan="PRO",
cycle="monthly"
){

if(
!BILLING.plans[plan]
){

return fail(
"Invalid plan"
);

}

const sub = {
id:createId("SUB"),
userId,
plan,
cycle,
price:
BILLING.plans[plan].price,
currency:
BILLING.plans[plan].currency,
status:"active",
startedAt:
new Date().toISOString(),
renewAt:
nextRenewal()
};

BILLING.subscriptions.push(sub);

BILLING.plans[plan].users++;
BILLING.stats.customers++;

createInvoice(
userId,
sub.price,
plan
);

recalculate();
saveBilling();

return sub;
}

/* ===================================
   CANCEL
=================================== */

function cancel(subId){

const sub =
BILLING.subscriptions.find(
x => x.id === subId
);

if(!sub) return null;

sub.status = "cancelled";

BILLING.stats.churn++;

recalculate();
saveBilling();

return sub;
}

/* ===================================
   INVOICES
=================================== */

function createInvoice(
userId,
amount,
plan
){

const inv = {
id:createId("INV"),
userId,
plan,
amount,
status:"paid",
createdAt:
new Date().toISOString()
};

BILLING.invoices.push(inv);

return inv;
}

function invoiceHistory(userId){

return BILLING.invoices.filter(
x => x.userId === userId
);

}

/* ===================================
   METRICS
=================================== */

function recalculate(){

let monthly = 0;

BILLING.subscriptions
.filter(
x => x.status === "active"
)
.forEach(sub=>{

if(sub.cycle === "monthly"){

monthly += sub.price;

}else{

monthly +=
sub.price / 12;
}

});

BILLING.stats.mrr =
monthly;

BILLING.stats.arr =
monthly * 12;

}

function dashboard(){

return {
mrr:
"$" + BILLING.stats.mrr,

arr:
"$" + BILLING.stats.arr,

customers:
BILLING.stats.customers,

churn:
BILLING.stats.churn,

plans:
BILLING.plans
};

}

/* ===================================
   HELPERS
=================================== */

function nextRenewal(){

const d = new Date();

d.setMonth(
d.getMonth() + 1
);

return d.toISOString();
}

function createId(prefix){

return (
prefix + "-" +
Math.random()
.toString(36)
substring(2,9)
.toUpperCase()
);

}

function fail(message){

return {
success:false,
message
};

}

/* ===================================
   STORAGE
=================================== */

function saveBilling(){

if(
typeof localStorage !==
"undefined"
){

localStorage.setItem(
"corax_billing",
JSON.stringify(BILLING)
);

}

}

function loadBilling(){

if(
typeof localStorage !==
"undefined"
){

const saved =
localStorage.getItem(
"corax_billing"
);

if(saved){

Object.assign(
BILLING,
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
initBilling,
subscribe,
cancel,
invoiceHistory,
dashboard
};

  }
