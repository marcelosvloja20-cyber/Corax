/* ===================================
   CORΛX MASTER CRM.JS v1
   Relationship & Growth Intelligence
=================================== */

const CRM = {
brand: "CORΛX",

leads: [],
users: [],
partners: [],

stats: {
leads: 0,
converted: 0,
activeUsers: 0,
vipUsers: 0
}
};

/* ===================================
   INIT
=================================== */

function initCRM(){

loadCRM();

console.log(
"CORΛX CRM Ready"
);

}

/* ===================================
   LEADS
=================================== */

function createLead(
name,
email,
source="organic"
){

const lead = {
id:createId("LED"),
name,
email,
source,
status:"new",
tags:[],
createdAt:
new Date().toISOString()
};

CRM.leads.push(lead);

CRM.stats.leads++;

saveCRM();

return lead;
}

function updateLead(
id,
status
){

const lead =
CRM.leads.find(
x => x.id === id
);

if(!lead) return null;

lead.status = status;

if(status === "closed"){

CRM.stats.converted++;

}

saveCRM();

return lead;
}

/* ===================================
   USERS
=================================== */

function addUser(
userId,
level="normal"
){

const user = {
userId,
level,
tags:[],
lastActive:
new Date().toISOString(),
createdAt:
new Date().toISOString()
};

CRM.users.push(user);

CRM.stats.activeUsers++;

saveCRM();

return user;
}

function updateUserLevel(
userId,
level
){

const user =
CRM.users.find(
x => x.userId === userId
);

if(!user) return null;

user.level = level;

if(level === "vip"){

CRM.stats.vipUsers++;

}

saveCRM();

return user;
}

function tagUser(
userId,
tag
){

const user =
CRM.users.find(
x => x.userId === userId
);

if(!user) return null;

if(!user.tags.includes(tag)){

user.tags.push(tag);
}

saveCRM();

return user;
}

/* ===================================
   PARTNERSHIPS
=================================== */

function addPartner(
name,
type="merchant"
){

const partner = {
id:createId("PRT"),
name,
type,
status:"prospect",
stage:"contact",
createdAt:
new Date().toISOString()
};

CRM.partners.push(partner);

saveCRM();

return partner;
}

function updatePartner(
id,
stage,
status
){

const partner =
CRM.partners.find(
x => x.id === id
);

if(!partner) return null;

partner.stage = stage;
partner.status = status;

saveCRM();

return partner;
}

/* ===================================
   FOLLOW UPS
=================================== */

function followUp(type,id){

return {
type,
id,
message:"Follow-up scheduled",
time:
new Date().toISOString()
};

}

/* ===================================
   DASHBOARD
=================================== */

function dashboard(){

return {
leads:CRM.stats.leads,
converted:CRM.stats.converted,
activeUsers:CRM.stats.activeUsers,
vipUsers:CRM.stats.vipUsers,
partners:CRM.partners.length
};

}

/* ===================================
   HELPERS
=================================== */

function createId(prefix){

return (
prefix + "-" +
Math.random()
.toString(36)
.substring(2,9)
.toUpperCase()
);

}

/* ===================================
   STORAGE
=================================== */

function saveCRM(){

if(
typeof localStorage !==
"undefined"
){

localStorage.setItem(
"corax_crm",
JSON.stringify(CRM)
);

}

}

function loadCRM(){

if(
typeof localStorage !==
"undefined"
){

const saved =
localStorage.getItem(
"corax_crm"
);

if(saved){

Object.assign(
CRM,
JSON.parse(saved)
);

}

}

}

/* ===================================
   EXPORT
=================================== */

if(typeof module !== "undefined"){

module.exports = {
initCRM,
createLead,
updateLead,
addUser,
updateUserLevel,
tagUser,
addPartner,
updatePartner,
followUp,
dashboard
};

  }
