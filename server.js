/* ===================================
   CORΛX BACKEND (MVP REAL)
=================================== */

const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const SECRET = "corax-secret";

/* DB */
const db = new sqlite3.Database("./corax.db");

/* CREATE TABLES */
db.serialize(() => {

db.run(`
CREATE TABLE IF NOT EXISTS users (
id INTEGER PRIMARY KEY AUTOINCREMENT,
email TEXT UNIQUE,
password TEXT,
balance REAL DEFAULT 100
)
`);

db.run(`
CREATE TABLE IF NOT EXISTS transactions (
id INTEGER PRIMARY KEY AUTOINCREMENT,
user_id INTEGER,
type TEXT,
amount REAL,
to_user TEXT,
date TEXT
)
`);

});

/* REGISTER */
app.post("/register", async (req, res) => {

const { email, password } = req.body;

if(!email || !password){
return res.status(400).json({error:"Missing fields"});
}

const hash = await bcrypt.hash(password, 10);

db.run(
"INSERT INTO users (email,password) VALUES (?,?)",
[email, hash],
function(err){

if(err){
return res.status(400).json({error:"User exists"});
}

res.json({message:"User created"});
}

);

});

/* LOGIN */
app.post("/login", (req,res)=>{

const { email, password } = req.body;

db.get(
"SELECT * FROM users WHERE email=?",
[email],
async (err,user)=>{

if(!user){
return res.status(401).json({error:"Invalid"});
}

const valid = await bcrypt.compare(password, user.password);

if(!valid){
return res.status(401).json({error:"Invalid"});
}

const token = jwt.sign({id:user.id}, SECRET);

res.json({token});

});

});

/* AUTH MIDDLEWARE */
function auth(req,res,next){

const token = req.headers.authorization;

if(!token) return res.sendStatus(403);

try{
const data = jwt.verify(token, SECRET);
req.user = data;
next();
}catch{
return res.sendStatus(403);
}

}

/* GET BALANCE */
app.get("/balance", auth, (req,res)=>{

db.get(
"SELECT balance FROM users WHERE id=?",
[req.user.id],
(err,row)=>{
res.json({balance: row.balance});
}
);

});

/* SEND PAYMENT */
app.post("/send", auth, (req,res)=>{

const { to, amount } = req.body;

db.get(
"SELECT balance FROM users WHERE id=?",
[req.user.id],
(err,user)=>{

if(user.balance < amount){
return res.status(400).json({error:"Insufficient"});
}

const newBalance = user.balance - amount;

/* update balance */
db.run(
"UPDATE users SET balance=? WHERE id=?",
[newBalance, req.user.id]
);

/* save tx */
db.run(
"INSERT INTO transactions (user_id,type,amount,to_user,date) VALUES (?,?,?,?,?)",
[
req.user.id,
"Sent",
amount,
to,
new Date().toLocaleString()
]
);

res.json({message:"Sent", balance:newBalance});

});

});

/* HISTORY */
app.get("/history", auth, (req,res)=>{

db.all(
"SELECT * FROM transactions WHERE user_id=? ORDER BY id DESC",
[req.user.id],
(err,rows)=>{
res.json(rows);
}
);

});

/* START */
const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
console.log("CORΛX backend running on port " + PORT);
});
});
