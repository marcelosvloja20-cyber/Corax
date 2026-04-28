/* ===================================
   CORΛX MASTER QA.JS v1
   Quality Assurance Test Suite
=================================== */

const fs = require("fs");
const path = require("path");
const http = require("http");
const https = require("https");

/* ===================================
   CONFIG
=================================== */

const QA = {
brand: "CORΛX",
frontend:
process.env.FRONTEND_URL ||
"http://localhost:5500",

backend:
process.env.API_URL ||
"http://localhost:3000",

timeout: 8000,

results: {
passed: 0,
failed: 0,
warnings: 0,
items: []
}
};

/* ===================================
   RUNNER
=================================== */

async function runQA(){

banner();

await testFrontend();
await testBackend();
await testFiles();
await testSecurity();
await testPerformance();

report();

}

/* ===================================
   FRONTEND TESTS
=================================== */

async function testFrontend(){

await requestTest(
"Frontend Home",
QA.frontend
);

await requestTest(
"App Page",
QA.frontend + "/app.html"
);

await requestTest(
"Wallet Page",
QA.frontend + "/wallet.html"
);

}

/* ===================================
   BACKEND TESTS
=================================== */

async function testBackend(){

await requestTest(
"API Health",
QA.backend + "/api/health"
);

await requestTest(
"Dashboard Route",
QA.backend + "/api/dashboard",
401
);

}

/* ===================================
   FILE TESTS
=================================== */

async function testFiles(){

checkFile("server.js");
checkFile("database.js");
checkFile("security.js");
checkFile("api.js");
checkFile("app.js");
checkFile("style.css");

}

/* ===================================
   SECURITY TESTS
=================================== */

async function testSecurity(){

await requestTest(
"Unauthorized Profile Block",
QA.backend + "/api/user/profile",
401
);

}

/* ===================================
   PERFORMANCE
=================================== */

async function testPerformance(){

const start = Date.now();

await requestTest(
"Speed Check",
QA.backend + "/api/health"
);

const ms =
Date.now() - start;

if(ms < 500){

pass(
"API Speed Good (" +
ms + "ms)"
);

}else{

warn(
"API Slow (" +
ms + "ms)"
);

}

}

/* ===================================
   HTTP TEST
=================================== */

function requestTest(
name,
url,
expected = 200
){

return new Promise(resolve=>{

const lib =
url.startsWith("https")
? https
: http;

const req =
lib.get(url,res=>{

if(res.statusCode === expected){

pass(name);

}else{

fail(
name +
" expected " +
expected +
" got " +
res.statusCode
);

}

resolve();

});

req.setTimeout(
QA.timeout,
()=>{

fail(name + " timeout");
req.destroy();
resolve();

});

req.on("error",()=>{

fail(name + " offline");
resolve();

});

});

}

/* ===================================
   FILE CHECK
=================================== */

function checkFile(file){

const full =
path.join(process.cwd(), file);

if(fs.existsSync(full)){

pass("File OK: " + file);

}else{

warn("Missing file: " + file);

}

}

/* ===================================
   RESULTS
=================================== */

function pass(msg){

QA.results.passed++;

QA.results.items.push({
type:"PASS",
msg
});

log("PASS", msg);

}

function fail(msg){

QA.results.failed++;

QA.results.items.push({
type:"FAIL",
msg
});

log("FAIL", msg);

}

function warn(msg){

QA.results.warnings++;

QA.results.items.push({
type:"WARN",
msg
});

log("WARN", msg);

}

/* ===================================
   REPORT
=================================== */

function report(){

console.log(`
===================================
CORΛX QA REPORT
===================================
Passed   : ${QA.results.passed}
Failed   : ${QA.results.failed}
Warnings : ${QA.results.warnings}
===================================
Status   : ${
QA.results.failed === 0
? "READY FOR BETA"
: "FIX REQUIRED"
}
===================================
`);
}

/* ===================================
   HELPERS
=================================== */

function log(type,msg){

console.log(
"[" + type + "]",
msg
);

}

function banner(){

console.log(`
===================================
CORΛX MASTER QA STARTED
===================================
`);
}

/* ===================================
   EXPORT
=================================== */

module.exports = {
runQA
};

/* ===================================
   AUTO RUN
=================================== */

if(require.main === module){

runQA();

  }
