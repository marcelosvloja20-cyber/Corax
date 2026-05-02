/* ===================================
   CORΛX MASTER LOGGER.JS v1
   Logging & Observability System
=================================== */

const fs = require("fs");
const path = require("path");

/* ===================================
   CONFIG
=================================== */

const LOG_DIR = path.join(__dirname, "logs");

if (!fs.existsSync(LOG_DIR)) {
fs.mkdirSync(LOG_DIR);
}

const LOG_FILE = path.join(LOG_DIR, "corax.log");

/* ===================================
   CORE LOGGER
=================================== */

function writeLog(level, message, meta = {}) {

const logEntry = {
level,
message,
meta,
time: new Date().toISOString()
};

const line = JSON.stringify(logEntry);

/* Console Output */
if (level === "error") {
console.error(line);
} else if (level === "warn") {
console.warn(line);
} else {
console.log(line);
}

/* File Output */
fs.appendFileSync(LOG_FILE, line + "\n");

}

/* ===================================
   LOG TYPES
=================================== */

function info(message, meta) {
writeLog("info", message, meta);
}

function warn(message, meta) {
writeLog("warn", message, meta);
}

function error(message, meta) {
writeLog("error", message, meta);
}

/* ===================================
   REQUEST LOGGER (ADVANCED)
=================================== */

function logRequest(req) {

info("HTTP Request", {
method: req.method,
url: req.url,
ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress
});

}

/* ===================================
   EXPORT
=================================== */

module.exports = {
info,
warn,
error,
logRequest
};
