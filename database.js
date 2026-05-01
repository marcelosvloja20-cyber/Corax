/* ===================================
   CORΛX MASTER DATABASE.JS v1
   MongoDB Persistence Layer
=================================== */

const { MongoClient, ObjectId } = require("mongodb");

/* ===================================
   CONFIG
=================================== */

const URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
const DB_NAME = "corax";

let client;
let db;

/* ===================================
   CONNECT
=================================== */

async function connectDB(){

if(db) return db;

client = new MongoClient(URI);

await client.connect();

db = client.db(DB_NAME);

console.log("CORΛX Database Connected");

return db;

}

/* ===================================
   COLLECTIONS
=================================== */

async function users(){

return (await connectDB()).collection("users");

}

async function transactions(){

return (await connectDB()).collection("transactions");

}

async function referrals(){

return (await connectDB()).collection("referrals");

}

async function logs(){

return (await connectDB()).collection("logs");

}

async function analytics(){

return (await connectDB()).collection("analytics");

}

/* ===================================
   USER METHODS
=================================== */

async function createUser(user){

const col = await users();

const res = await col.insertOne({
...user,
createdAt: new Date()
});

return res.insertedId;

}

async function getUser(userId){

const col = await users();

return col.findOne({
_id: new ObjectId(userId)
});

}

async function updateUser(userId,data){

const col = await users();

return col.updateOne(
{ _id: new ObjectId(userId) },
{ $set: data }
);

}

/* ===================================
   TRANSACTIONS
=================================== */

async function saveTransaction(tx){

const col = await transactions();

return col.insertOne({
...tx,
createdAt: new Date()
});

}

async function getTransactions(userId){

const col = await transactions();

return col.find({
userId
}).toArray();

}

/* ===================================
   REFERRALS
=================================== */

async function saveReferral(ref){

const col = await referrals();

return col.insertOne({
...ref,
createdAt: new Date()
});

}

/* ===================================
   LOGS
=================================== */

async function saveLog(log){

const col = await logs();

return col.insertOne({
...log,
createdAt: new Date()
});

}

/* ===================================
   ANALYTICS
=================================== */

async function saveEvent(event){

const col = await analytics();

return col.insertOne({
...event,
createdAt: new Date()
});

}

/* ===================================
   CLOSE CONNECTION
=================================== */

async function closeDB(){

if(client){

await client.close();

console.log("CORΛX Database Closed");

}

}

/* ===================================
   EXPORT
=================================== */

module.exports = {
connectDB,
createUser,
getUser,
updateUser,
saveTransaction,
getTransactions,
saveReferral,
saveLog,
saveEvent,
closeDB
};
