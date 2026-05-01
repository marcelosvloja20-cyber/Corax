/* ===================================
   CORΛX MASTER API-SERVER.JS v1
   Node.js + Express Backend Layer
=================================== */

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

/* ===== IMPORT MODULES ===== */
const payments = require("./payments");
const onboarding = require("./onboarding");
const referral = require("./referral");
const billing = require("./billing");
const analytics = require("./analytics-advanced");
const risk = require("./risk");
const compliance = require("./compliance-lite");

/* ===== INIT ===== */
const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = 3000;

/* ===================================
   HEALTH CHECK
=================================== */

app.get("/", (req, res) => {
res.json({
status: "CORΛX API running"
});
});

/* ===================================
   AUTH (SIMPLES)
=================================== */

app.post("/auth", (req, res) => {

const { userId } = req.body;

if(!userId){
return res.status(400).json({
error: "userId required"
});
}

onboarding.startOnboarding(userId);

res.json({
success: true,
userId
});

});

/* ===================================
   WALLET / BALANCE
=================================== */

app.get("/wallet/:userId/:currency", (req, res) => {

const { userId, currency } = req.params;

const balance =
payments.getBalance(userId, currency);

res.json({
userId,
currency,
balance
});

});

/* ===================================
   PAYMENTS
=================================== */

app.post("/payments/send", (req, res) => {

const { userId, to, amount, currency } = req.body;

/* RISK + COMPLIANCE CHECK */

const riskCheck =
risk.canTransact(userId);

if(!riskCheck.success){
return res.status(403).json(riskCheck);
}

const complianceCheck =
compliance.canTransact(userId, amount);

if(!complianceCheck.success){
return res.status(403).json(complianceCheck);
}

/* PROCESS */

const result =
payments.sendPayment(userId, to, amount, currency);

/* TRACK */

analytics.trackEvent("payment", { amount });
risk.trackTransaction(userId, amount);
compliance.trackTransaction(userId, amount);

res.json(result);

});

/* ===================================
   RECEIVE PAYMENT
=================================== */

app.post("/payments/receive", (req, res) => {

const { userId, amount, currency } = req.body;

const tx =
payments.receivePayment(
userId,
amount,
currency
);

analytics.trackEvent("payment", { amount });

res.json(tx);

});

/* ===================================
   BILLING
=================================== */

app.post("/billing/subscribe", (req, res) => {

const { userId, plan } = req.body;

const sub =
billing.subscribe(userId, plan);

res.json(sub);

});

/* ===================================
   REFERRAL
=================================== */

app.get("/referral/:userId", (req, res) => {

const { userId } = req.params;

const link =
referral.referralLink(userId);

res.json({
link
});

});

/* ===================================
   ANALYTICS
=================================== */

app.get("/analytics", (req, res) => {

res.json(
analytics.dashboard()
);

});

/* ===================================
   START SERVER
=================================== */

app.listen(PORT, () => {

console.log(
`CORΛX API running on port ${PORT}`
);

});
