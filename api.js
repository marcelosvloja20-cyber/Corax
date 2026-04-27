/* ===================================
   CORΛX MASTER API.JS v1
=================================== */

const API = {
baseURL: "https://api.corax.finance/v1",
token: localStorage.getItem("corax_token") || null,
timeout: 15000
};

/* ===================================
   CORE REQUEST
=================================== */

async function apiRequest(
endpoint,
method = "GET",
data = null
){

const controller =
new AbortController();

const timer =
setTimeout(
()=>controller.abort(),
API.timeout
);

const options = {
method: method,
headers: {
"Content-Type":"application/json"
},
signal: controller.signal
};

if(API.token){

options.headers.Authorization =
"Bearer " + API.token;

}

if(data){

options.body =
JSON.stringify(data);

}

try{

const res =
await fetch(
API.baseURL + endpoint,
options
);

clearTimeout(timer);

const json =
await res.json();

if(!res.ok){

throw new Error(
json.message || "API Error"
);

}

return json;

}catch(err){

console.error(err);

toastSafe(
err.message ||
"Connection failed"
);

return null;
}

}

/* ===================================
   AUTH
=================================== */

async function apiLogin(
email,
password
){

const result =
await apiRequest(
"/auth/login",
"POST",
{
email,
password
}
);

if(result?.token){

API.token = result.token;

localStorage.setItem(
"corax_token",
result.token
);

}

return result;
}

async function apiRegister(
name,
email,
password
){

return await apiRequest(
"/auth/register",
"POST",
{
name,
email,
password
}
);
}

async function apiWalletLogin(
address,
signature
){

return await apiRequest(
"/auth/wallet",
"POST",
{
address,
signature
}
);
}

async function apiLogout(){

API.token = null;

localStorage.removeItem(
"corax_token"
);

return true;
}

/* ===================================
   USER
=================================== */

async function apiProfile(){

return await apiRequest(
"/user/profile"
);
}

async function apiUpdateProfile(data){

return await apiRequest(
"/user/profile",
"PUT",
data
);
}

/* ===================================
   WALLET
=================================== */

async function apiBalance(){

return await apiRequest(
"/wallet/balance"
);
}

async function apiTransactions(){

return await apiRequest(
"/wallet/history"
);
}

async function apiSend(
to,
amount,
token
){

return await apiRequest(
"/wallet/send",
"POST",
{
to,
amount,
token
}
);
}

/* ===================================
   SWAP
=================================== */

async function apiSwapQuote(
from,
to,
amount
){

return await apiRequest(
"/swap/quote",
"POST",
{
from,
to,
amount
}
);
}

async function apiSwap(
from,
to,
amount
){

return await apiRequest(
"/swap/execute",
"POST",
{
from,
to,
amount
}
);
}

/* ===================================
   STAKE
=================================== */

async function apiStake(
amount,
token
){

return await apiRequest(
"/stake/deposit",
"POST",
{
amount,
token
}
);
}

async function apiRewards(){

return await apiRequest(
"/stake/rewards"
);
}

/* ===================================
   MERCHANT
=================================== */

async function apiCreateCheckout(
amount,
currency
){

return await apiRequest(
"/merchant/checkout",
"POST",
{
amount,
currency
}
);
}

async function apiMerchantSales(){

return await apiRequest(
"/merchant/sales"
);
}

/* ===================================
   NOTIFICATIONS
=================================== */

async function apiNotifications(){

return await apiRequest(
"/notifications"
);
}

/* ===================================
   HELPERS
=================================== */

function toastSafe(msg){

if(typeof toast === "function"){

toast(msg);

}else{

console.log(msg);

}
}

function apiConnected(){

return !!API.token;
}

console.log("CORΛX API Ready");
