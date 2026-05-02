/* ===================================
   CORΛX MASTER MIDDLEWARE.JS v1
   Security, Validation & Logging Layer
=================================== */

const rateLimitStore = {};

/* ===================================
   REQUEST LOGGER
=================================== */

function requestLogger(req, res, next){

console.log(
`[REQ] ${req.method} ${req.url} - ${new Date().toISOString()}`
);

next();

}

/* ===================================
   RATE LIMIT (BASIC)
=================================== */

function rateLimiter(
limit = 100,
windowMs = 60000
){

return (req, res, next) => {

const ip =
req.headers["x-forwarded-for"] ||
req.socket.remoteAddress;

if(!rateLimitStore[ip]){

rateLimitStore[ip] = {
count: 1,
start: Date.now()
};

}else{

const elapsed =
Date.now() - rateLimitStore[ip].start;

if(elapsed > windowMs){

rateLimitStore[ip] = {
count: 1,
start: Date.now()
};

}else{

rateLimitStore[ip].count++;

if(rateLimitStore[ip].count > limit){

return res.status(429).json({
error: "Too many requests"
});
}

}

}

next();

};

}

/* ===================================
   VALIDATION
=================================== */

function validateBody(requiredFields = []){

return (req, res, next) => {

const body = req.body;

for(let field of requiredFields){

if(
body[field] === undefined ||
body[field] === null
){

return res.status(400).json({
error: `Missing field: ${field}`
});
}

}

next();

};

}

/* ===================================
   ERROR HANDLER
=================================== */

function errorHandler(
err,
req,
res,
next
){

console.error("[ERROR]", err);

res.status(500).json({
error: "Internal server error"
});

}

/* ===================================
   SECURITY HEADERS
=================================== */

function securityHeaders(req, res, next){

res.setHeader(
"X-Content-Type-Options",
"nosniff"
);

res.setHeader(
"X-Frame-Options",
"SAMEORIGIN"
);

res.setHeader(
"X-XSS-Protection",
"1; mode=block"
);

next();

}

/* ===================================
   EXPORT
=================================== */

module.exports = {
requestLogger,
rateLimiter,
validateBody,
errorHandler,
securityHeaders
};
