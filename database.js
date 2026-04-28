/* ===================================
   CORΛX MASTER DATABASE.JS v1
   PostgreSQL Data Layer
=================================== */

const { Pool } = require("pg");

/* ===================================
   CONFIG
=================================== */

const DB = new Pool({
host:
process.env.DB_HOST ||
"localhost",

port:
process.env.DB_PORT || 5432,

user:
process.env.DB_USER ||
"postgres",

password:
process.env.DB_PASSWORD ||
"postgres",

database:
process.env.DB_NAME ||
"corax",

ssl:
process.env.DB_SSL === "true"
? { rejectUnauthorized:false }
: false
});

/* ===================================
   CONNECT
=================================== */

DB.connect()
.then(()=>{
console.log(
"CORΛX PostgreSQL Connected"
);
})
.catch(err=>{
console.error(
"DB Error:",
err.message
);
});

/* ===================================
   CORE QUERY
=================================== */

async function query(
text,
params=[]
){

try{

const res =
await DB.query(
text,
params
);

return res;

}catch(err){

console.error(
"SQL ERROR:",
err.message
);

throw err;
}

}

/* ===================================
   INIT TABLES
=================================== */

async function initDatabase(){

await query(`
CREATE TABLE IF NOT EXISTS users (
id VARCHAR(40) PRIMARY KEY,
name VARCHAR(120),
email VARCHAR(180) UNIQUE NOT NULL,
password TEXT,
wallet VARCHAR(80),
created_at TIMESTAMP DEFAULT NOW()
);
`);

await query(`
CREATE TABLE IF NOT EXISTS sessions (
id VARCHAR(40) PRIMARY KEY,
user_id VARCHAR(40),
token TEXT,
created_at TIMESTAMP DEFAULT NOW()
);
`);

await query(`
CREATE TABLE IF NOT EXISTS transactions (
id VARCHAR(40) PRIMARY KEY,
user_id VARCHAR(40),
type VARCHAR(40),
token VARCHAR(40),
amount NUMERIC(20,8),
status VARCHAR(40),
meta JSONB,
created_at TIMESTAMP DEFAULT NOW()
);
`);

await query(`
CREATE TABLE IF NOT EXISTS checkouts (
id VARCHAR(40) PRIMARY KEY,
user_id VARCHAR(40),
amount NUMERIC(20,8),
currency VARCHAR(20),
status VARCHAR(40),
created_at TIMESTAMP DEFAULT NOW()
);
`);

await query(`
CREATE TABLE IF NOT EXISTS notifications (
id SERIAL PRIMARY KEY,
user_id VARCHAR(40),
title VARCHAR(180),
message TEXT,
read BOOLEAN DEFAULT FALSE,
created_at TIMESTAMP DEFAULT NOW()
);
`);

await query(`
CREATE TABLE IF NOT EXISTS staking (
id VARCHAR(40) PRIMARY KEY,
user_id VARCHAR(40),
token VARCHAR(20),
amount NUMERIC(20,8),
apy NUMERIC(10,2),
status VARCHAR(20),
created_at TIMESTAMP DEFAULT NOW()
);
`);

await query(`
CREATE TABLE IF NOT EXISTS analytics (
id SERIAL PRIMARY KEY,
user_id VARCHAR(40),
event VARCHAR(80),
meta JSONB,
created_at TIMESTAMP DEFAULT NOW()
);
`);

console.log(
"CORΛX Tables Ready"
);
}

/* ===================================
   USERS
=================================== */

async function createUser(data){

return await query(
`
INSERT INTO users
(id,name,email,password,wallet)
VALUES($1,$2,$3,$4,$5)
RETURNING *
`,
[
data.id,
data.name,
data.email,
data.password,
data.wallet || null
]
);

}

async function getUserByEmail(email){

return await query(
`
SELECT * FROM users
WHERE email=$1
LIMIT 1
`,
[email]
);

}

async function getUserById(id){

return await query(
`
SELECT * FROM users
WHERE id=$1
LIMIT 1
`,
[id]
);

}

/* ===================================
   TRANSACTIONS
=================================== */

async function createTransaction(data){

return await query(
`
INSERT INTO transactions
(id,user_id,type,token,amount,status,meta)
VALUES($1,$2,$3,$4,$5,$6,$7)
RETURNING *
`,
[
data.id,
data.user_id,
data.type,
data.token,
data.amount,
data.status,
data.meta || {}
]
);

}

async function getTransactions(userId){

return await query(
`
SELECT *
FROM transactions
WHERE user_id=$1
ORDER BY created_at DESC
LIMIT 100
`,
[userId]
);

}

/* ===================================
   CHECKOUTS
=================================== */

async function createCheckout(data){

return await query(
`
INSERT INTO checkouts
(id,user_id,amount,currency,status)
VALUES($1,$2,$3,$4,$5)
RETURNING *
`,
[
data.id,
data.user_id,
data.amount,
data.currency,
data.status
]
);

}

async function getSales(userId){

return await query(
`
SELECT *
FROM checkouts
WHERE user_id=$1
ORDER BY created_at DESC
`,
[userId]
);

}

/* ===================================
   EXPORT
=================================== */

module.exports = {
DB,
query,
initDatabase,
createUser,
getUserByEmail,
getUserById,
createTransaction,
getTransactions,
createCheckout,
getSales
};
