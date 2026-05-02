/* ===================================
   CORΛX MASTER AUTH.JS v1
   JWT Authentication System
=================================== */

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const DB = require("./database");

/* ===================================
   CONFIG
=================================== */

const SECRET =
process.env.JWT_SECRET ||
"corax_secret_key";

/* ===================================
   REGISTER
=================================== */

async function register(
email,
password
){

const hashed =
await bcrypt.hash(password, 10);

const user = {
email,
password: hashed
};

const userId =
await DB.createUser(user);

return {
success: true,
userId
};

}

/* ===================================
   LOGIN
=================================== */

async function login(
email,
password
){

const user =
await findUserByEmail(email);

if(!user){

return fail("User not found");
}

const match =
await bcrypt.compare(
password,
user.password
);

if(!match){

return fail("Invalid credentials");
}

const token =
generateToken(user);

return {
success: true,
token,
userId: user._id
};

}

/* ===================================
   TOKEN
=================================== */

function generateToken(user){

return jwt.sign(
{
id: user._id,
email: user.email
},
SECRET,
{
expiresIn: "7d"
}
);

}

function verifyToken(token){

try{

return jwt.verify(
token,
SECRET
);

}catch(e){

return null;
}

}

/* ===================================
   MIDDLEWARE
=================================== */

function authMiddleware(
req,
res,
next
){

const header =
req.headers["authorization"];

if(!header){

return res.status(401).json({
error: "No token"
});
}

const token =
header.split(" ")[1];

const decoded =
verifyToken(token);

if(!decoded){

return res.status(403).json({
error: "Invalid token"
});
}

req.user = decoded;

next();

}

/* ===================================
   HELPERS
=================================== */

async function findUserByEmail(email){

const db = await DB.connectDB();

return db.collection("users")
.findOne({ email });

}

function fail(message){

return {
success:false,
message
};

}

/* ===================================
   EXPORT
=================================== */

module.exports = {
register,
login,
authMiddleware,
verifyToken
};
