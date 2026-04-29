/* ===================================
   CORΛX MASTER PAYMENTS.JS v1
   Revenue & Settlement Engine
=================================== */

const PAYMENTS = {
brand: "CORΛX",

fees: {
merchant: 0.25,
swap: 0.15,
subscription: 0
},

supported: {
crypto: [
"USDT",
"USDC",
"BTC",
"ETH",
"SOL"
],

fiat: [
"USD",
"EUR",
"BRL"
]
},

transactions: [],
balances: {},
invoices: []
};

/* ===================================
   INIT
=================================== */

function initPayments(){

loadPayments();

console.log(
"CORΛX Payments Ready"
);

}

/* ===================================
   RECEIVE PAYMENT
=================================== */

function receivePayment(
userId,
amount,
currency,
source="merchant"
){

const tx = {
id: createId("PAY"),
type: "receive",
userId,
amount: Number(amount),
currency,
source,
status: "completed",
fee: calcFee(
source,
amount
),
createdAt:
new Date().toISOString()
};

PAYMENTS.transactions.push(tx);

creditBalance(
userId,
currency,
amount - tx.fee
);

savePayments();

return tx;
}

/* ===================================
   SEND PAYMENT
=================================== */

function sendPayment(
userId,
to,
amount,
currency
){

const balance =
getBalance(
userId,
currency
);

if(
balance < amount
){

return {
success:false,
message:"Insufficient funds"
};

}

debitBalance(
userId,
currency,
amount
);

const tx = {
id: createId("SND"),
type:"send",
userId,
to,
amount,
currency,
status:"completed",
createdAt:
new Date().toISOString()
};

PAYMENTS.transactions.push(tx);

savePayments();

return {
success:true,
tx
};

}

/* ===================================
   CHECKOUT
=================================== */

function createInvoice(
merchantId,
amount,
currency="USD"
){

const item = {
id:createId("INV"),
merchantId,
amount,
currency,
status:"pending",
createdAt:
new Date().toISOString()
};

PAYMENTS.invoices.push(item);

savePayments();

return item;
}

function payInvoice(
invoiceId,
userId
){

const inv =
PAYMENTS.invoices.find(
x => x.id === invoiceId
);

if(!inv){

return {
success:false
};

}

const pay =
sendPayment(
userId,
inv.merchantId,
inv.amount,
inv.currency
);

if(pay.success){

inv.status = "paid";

savePayments();
}

return pay;
}

/* ===================================
   SUBSCRIPTIONS
=================================== */

function subscribe(
userId,
plan="PRO"
){

return {
success:true,
userId,
plan,
renewal:"30 days"
};

}

/* ===================================
   FEES
=================================== */

function calcFee(
type,
amount
){

const rate =
PAYMENTS.fees[type] || 0;

return (
Number(amount) *
rate / 100
);
}

/* ===================================
   BALANCES
=================================== */

function creditBalance(
userId,
currency,
amount
){

if(
!PAYMENTS.balances[userId]
){

PAYMENTS.balances[userId] = {};
}

if(
!PAYMENTS.balances[userId][currency]
){

PAYMENTS.balances[userId][currency] = 0;
}

PAYMENTS.balances[userId][currency] +=
Number(amount);
}

function debitBalance(
userId,
currency,
amount
){

PAYMENTS.balances[userId][currency] -=
Number(amount);
}

function getBalance(
userId,
currency
){

return (
PAYMENTS.balances[userId]?.[currency]
|| 0
);

}

/* ===================================
   REPORTS
=================================== */

function merchantRevenue(
merchantId
){

return PAYMENTS.transactions
.filter(
x =>
x.type === "receive" &&
x.userId === merchantId
)
.reduce(
(sum,x)=>
sum + x.amount,
0
);

}

function totalVolume(){

return PAYMENTS.transactions
.reduce(
(sum,x)=>
sum + x.amount,
0
);

}

/* ===================================
   STORAGE
=================================== */

function savePayments(){

if(
typeof localStorage !==
"undefined"
){

localStorage.setItem(
"corax_payments",
JSON.stringify(PAYMENTS)
);

}

}

function loadPayments(){

if(
typeof localStorage !==
"undefined"
){

const saved =
localStorage.getItem(
"corax_payments"
);

if(saved){

Object.assign(
PAYMENTS,
JSON.parse(saved)
);

}

}

}

/* ===================================
   HELPERS
=================================== */

function createId(prefix){

return (
prefix + "-" +
Math.random()
.toString(36)
.substring(2,10)
.toUpperCase()
);

}

/* ===================================
   EXPORT
=================================== */

if(typeof module !== "undefined"){

module.exports = {
initPayments,
receivePayment,
sendPayment,
createInvoice,
payInvoice,
subscribe,
getBalance,
merchantRevenue,
totalVolume
};

  }
