/* ===================================
   CORΛX MASTER SERVER.JS v1
   Production Backend Core
=================================== */

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const app = express();

/* ===================================
   CONFIG
=================================== */

const PORT = process.env.PORT || 3000;
const JWT_SECRET =
process.env.JWT_SECRET ||
"CORAX_SECRET_CHANGE_NOW";

const USERS = [];
const SESSIONS = [];
const TXS = [];
const CHECKOUTS = [];

/* ===================================
   MIDDLEWARE
=================================== */

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(
rateLimit({
windowMs: 15 * 60 * 1000,
max: 200
})
);

/* ===================================
   HELPERS
=================================== */

function id(prefix="CRX"){

return (
prefix + "-" +
crypto.randomBytes(4)
.toString("hex")
.toUpperCase()
);

}

function token(user){

return jwt.sign(
{
id: user.id,
email: user.email
},
JWT_SECRET,
{
expiresIn:"7d"
}
);

}

function auth(req,res,next){

const header =
req.headers.authorization;

if(!header)
return res.status(401).json({
message:"Unauthorized"
});

try{

const t =
header.replace("Bearer ","");

const decoded =
jwt.verify(t,JWT_SECRET);

req.user = decoded;

next();

}catch{

return res.status(401).json({
message:"Invalid token"
});

}

}

/* ===================================
   HEALTH
=================================== */

app.get("/api/health",(req,res)=>{

res.json({
status:"online",
brand:"CORΛX",
time:new Date()
});

});

/* ===================================
   AUTH
=================================== */

app.post("/api/auth/register",
async (req,res)=>{

const {
name,
email,
password
} = req.body;

if(!email || !password){

return res.status(400).json({
message:"Missing fields"
});

}

const exists =
USERS.find(
u=>u.email===email
);

if(exists){

return res.status(409).json({
message:"Email exists"
});

}

const hash =
await bcrypt.hash(password,10);

const user = {
id:id("USR"),
name:name || "",
email,
password:hash,
createdAt:new Date()
};

USERS.push(user);

res.json({
success:true,
userId:user.id
});

});

/* LOGIN */

app.post("/api/auth/login",
async (req,res)=>{

const {
email,
password
} = req.body;

const user =
USERS.find(
u=>u.email===email
);

if(!user){

return res.status(401).json({
message:"Invalid login"
});

}

const ok =
await bcrypt.compare(
password,
user.password
);

if(!ok){

return res.status(401).json({
message:"Invalid login"
});

}

const jwtToken =
token(user);

SESSIONS.push({
id:id("SES"),
userId:user.id,
createdAt:new Date()
});

res.json({
success:true,
token:jwtToken,
user:{
id:user.id,
email:user.email
}
});

});

/* ===================================
   PROFILE
=================================== */

app.get("/api/user/profile",
auth,
(req,res)=>{

const user =
USERS.find(
u=>u.id===req.user.id
);

res.json({
id:user.id,
email:user.email,
name:user.name
});

});

/* ===================================
   WALLET
=================================== */

app.get("/api/wallet/balance",
auth,
(req,res)=>{

res.json({
usd:"18452.62",
usdt:"9200",
eth:"0.5421",
btc:"0.012"
});

});

app.get("/api/wallet/history",
auth,
(req,res)=>{

const items =
TXS.filter(
x=>x.userId===req.user.id
);

res.json(items);

});

app.post("/api/wallet/send",
auth,
(req,res)=>{

const {
to,
amount,
token
} = req.body;

const tx = {
id:id("TX"),
userId:req.user.id,
type:"send",
to,
amount,
token,
status:"completed",
createdAt:new Date()
};

TXS.push(tx);

res.json({
success:true,
tx
});

});

/* ===================================
   SWAP
=================================== */

app.post("/api/swap/quote",
auth,
(req,res)=>{

const {
from,
to,
amount
} = req.body;

res.json({
from,
to,
amount,
receive:
Number(amount)*0.00031,
fee:"0.15%"
});

});

app.post("/api/swap/execute",
auth,
(req,res)=>{

const tx = {
id:id("SWP"),
userId:req.user.id,
type:"swap",
data:req.body,
status:"completed",
createdAt:new Date()
};

TXS.push(tx);

res.json({
success:true,
tx
});

});

/* ===================================
   MERCHANT
=================================== */

app.post("/api/merchant/checkout",
auth,
(req,res)=>{

const {
amount,
currency
} = req.body;

const order = {
id:id("CHK"),
userId:req.user.id,
amount,
currency,
status:"pending",
createdAt:new Date()
};

CHECKOUTS.push(order);

res.json({
success:true,
checkout:order
});

});

app.get("/api/merchant/sales",
auth,
(req,res)=>{

const sales =
CHECKOUTS.filter(
x=>x.userId===req.user.id
);

res.json(sales);

});

/* ===================================
   DASHBOARD
=================================== */

app.get("/api/dashboard",
auth,
(req,res)=>{

res.json({
usdBalance:18452.62,
cryptoBalance:0.5421,
change24h:4.82,
stakingRewards:128.40,
txCount:TXS.length,
lastTransactions:TXS.slice(-5)
});

});

/* ===================================
   START
=================================== */

app.listen(PORT,()=>{

console.log(
"CORΛX Server Live on " +
PORT
);

});
