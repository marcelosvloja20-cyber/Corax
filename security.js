/* ===================================
   CORΛX MASTER SECURITY.JS v1
   Production Security Layer
=================================== */

const rateLimit =
require("express-rate-limit");

const helmet =
require("helmet");

const jwt =
require("jsonwebtoken");

const crypto =
require("crypto");

const bcrypt =
require("bcryptjs");

/* ===================================
   CONFIG
=================================== */

const JWT_SECRET =
process.env.JWT_SECRET ||
"CHANGE_CORAX_SECRET_NOW";

const ENC_SECRET =
process.env.ENC_SECRET ||
"CHANGE_CORAX_ENCRYPTION_KEY";

/* ===================================
   HEADERS
=================================== */

function secureHeaders(){

return helmet({

contentSecurityPolicy:false,

crossOriginEmbedderPolicy:false

});

}

/* ===================================
   RATE LIMITS
=================================== */

const globalLimiter =
rateLimit({

windowMs:
15 * 60 * 1000,

max: 250,

standardHeaders:true,

legacyHeaders:false

});

const authLimiter =
rateLimit({

windowMs:
15 * 60 * 1000,

max: 10,

message:{
message:
"Too many login attempts"
}

});

/* ===================================
   JWT
=================================== */

function createToken(payload){

return jwt.sign(
payload,
JWT_SECRET,
{
expiresIn:"7d"
}
);

}

function verifyToken(token){

try{

return jwt.verify(
token,
JWT_SECRET
);

}catch{

return null;
}

}

function authRequired(
req,
res,
next
){

const header =
req.headers.authorization;

if(!header){

return res.status(401).json({
message:"Unauthorized"
});

}

const token =
header.replace(
"Bearer ",
""
);

const user =
verifyToken(token);

if(!user){

return res.status(401).json({
message:"Invalid token"
});

}

req.user = user;

next();
}

/* ===================================
   PASSWORDS
=================================== */

async function hashPassword(password){

return await bcrypt.hash(
password,
12
);

}

async function comparePassword(
password,
hash
){

return await bcrypt.compare(
password,
hash
);

}

/* ===================================
   ENCRYPTION
=================================== */

function encrypt(text){

const iv =
crypto.randomBytes(16);

const key =
crypto
.createHash("sha256")
.update(ENC_SECRET)
.digest();

const cipher =
crypto.createCipheriv(
"aes-256-cbc",
key,
iv
);

let encrypted =
cipher.update(
text,
"utf8",
"hex"
);

encrypted +=
cipher.final("hex");

return (
iv.toString("hex") +
":" +
encrypted
);

}

function decrypt(data){

const parts =
data.split(":");

const iv =
Buffer.from(
parts[0],
"hex"
);

const encrypted =
parts[1];

const key =
crypto
.createHash("sha256")
.update(ENC_SECRET)
.digest();

const decipher =
crypto.createDecipheriv(
"aes-256-cbc",
key,
iv
);

let result =
decipher.update(
encrypted,
"hex",
"utf8"
);

result +=
decipher.final("utf8");

return result;
}

/* ===================================
   API KEY
=================================== */

function generateApiKey(){

return (
"crx_" +
crypto
.randomBytes(24)
.toString("hex")
);

}

/* ===================================
   REQUEST LOG
=================================== */

function requestLogger(
req,
res,
next
){

console.log(
new Date().toISOString(),
req.method,
req.originalUrl,
req.ip
);

next();
}

/* ===================================
   SUSPICIOUS CHECK
=================================== */

function suspicious(req){

const ua =
req.headers["user-agent"] || "";

if(
ua.length < 10
){

return true;
}

return false;
}

/* ===================================
   INPUT SANITIZE
=================================== */

function sanitize(text=""){

return text
.toString()
.replace(/[<>]/g,"")
.trim();

}

/* ===================================
   EXPORT
=================================== */

module.exports = {

secureHeaders,
globalLimiter,
authLimiter,

createToken,
verifyToken,
authRequired,

hashPassword,
comparePassword,

encrypt,
decrypt,

generateApiKey,

requestLogger,
suspicious,
sanitize

};
