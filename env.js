/* ===================================
   CORΛX MASTER ENV.JS v1
   Secure Environment Configuration
=================================== */

require("dotenv").config();

/* ===================================
   ENV VARIABLES
=================================== */

const ENV = {
NODE_ENV:
process.env.NODE_ENV || "development",

PORT:
process.env.PORT || 3000,

MONGO_URI:
process.env.MONGO_URI ||
"mongodb://127.0.0.1:27017",

JWT_SECRET:
process.env.JWT_SECRET ||
"corax_super_secret",

API_KEY:
process.env.API_KEY || "",

APP_NAME:
"CORΛX"
};

/* ===================================
   VALIDATION
=================================== */

function validateEnv(){

const required = [
"MONGO_URI",
"JWT_SECRET"
];

required.forEach(key => {

if(!ENV[key]){

console.warn(
`[ENV WARNING] Missing ${key}`
);

}

});

console.log(
`[ENV] Running in ${ENV.NODE_ENV}`
);

}

/* ===================================
   EXPORT
=================================== */

module.exports = {
ENV,
validateEnv
};
