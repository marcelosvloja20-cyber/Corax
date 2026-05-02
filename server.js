/* ===================================
   CORΛX MASTER SERVER.JS v2
   Full System Bootstrap
=================================== */

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

/* ===== CONFIG ===== */
const { ENV, validateEnv } = require("./env");

/* ===== DATABASE ===== */
const DB = require("./database");

/* ===== MIDDLEWARE ===== */
const {
requestLogger,
rateLimiter,
securityHeaders,
errorHandler
} = require("./middleware");

/* ===== ROUTES ===== */
const apiRoutes = require("./api-server");

/* ===================================
   INIT
=================================== */

const app = express();

/* ENV VALIDATION */
validateEnv();

/* GLOBAL MIDDLEWARE */
app.use(cors());
app.use(bodyParser.json());
app.use(securityHeaders);
app.use(requestLogger);
app.use(rateLimiter(200, 60000));

/* ROUTES */
app.use("/api", apiRoutes);

/* HEALTH CHECK */
app.get("/", (req, res) => {
res.json({
status: "CORΛX running",
env: ENV.NODE_ENV
});
});

/* ERROR HANDLER */
app.use(errorHandler);

/* ===================================
   START SERVER
=================================== */

async function start(){

try{

await DB.connectDB();

app.listen(ENV.PORT, () => {

console.log(
`CORΛX Server running on port ${ENV.PORT}`
);

});

}catch(err){

console.error(
"Failed to start server",
err
);

process.exit(1);

}

}

start();
