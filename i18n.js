/* ===================================
   CORΛX MASTER I18N.JS v1
=================================== */

const I18N = {

current: "en",

languages: ["en","pt","es"],

translations: {

/* ENGLISH */

en: {

brand: "CORΛX",
tagline: "Money Without Borders",

home: "Home",
wallet: "Wallet",
swap: "Swap",
send: "Send",
receive: "Receive",
history: "History",
merchant: "Merchant",
settings: "Settings",
stake: "Stake",

welcome: "Welcome back",
balance: "Total Balance",
connect_wallet: "Connect Wallet",
disconnect: "Disconnect",

wallet_title: "Wallet Hub",
wallet_desc: "Connect your wallet and access the CORΛX ecosystem.",

send_title: "Send Crypto",
send_to: "Recipient Address",
amount: "Amount",
confirm_send: "Send Now",

receive_title: "Receive Funds",
share_request: "Share Request",

swap_title: "Swap Assets",
stake_title: "Stake & Earn",

history_title: "Transaction History",

merchant_title: "Merchant Tools",
checkout: "Create Checkout",

settings_title: "Control Center",
language: "Language",
currency: "Currency",
theme: "Theme",
notifications: "Notifications",

saved: "Saved successfully",
copied: "Copied",
connected: "Connected"

},

/* PORTUGUESE */

pt: {

brand: "CORΛX",
tagline: "Dinheiro Sem Fronteiras",

home: "Início",
wallet: "Carteira",
swap: "Trocar",
send: "Enviar",
receive: "Receber",
history: "Histórico",
merchant: "Comerciante",
settings: "Configurações",
stake: "Stake",

welcome: "Bem-vindo de volta",
balance: "Saldo Total",
connect_wallet: "Conectar Carteira",
disconnect: "Desconectar",

wallet_title: "Central Wallet",
wallet_desc: "Conecte sua carteira e acesse o ecossistema CORΛX.",

send_title: "Enviar Cripto",
send_to: "Endereço Destino",
amount: "Valor",
confirm_send: "Enviar Agora",

receive_title: "Receber Fundos",
share_request: "Compartilhar Pedido",

swap_title: "Trocar Ativos",
stake_title: "Stake & Ganhos",

history_title: "Histórico de Transações",

merchant_title: "Ferramentas Comerciais",
checkout: "Criar Checkout",

settings_title: "Central de Controle",
language: "Idioma",
currency: "Moeda",
theme: "Tema",
notifications: "Notificações",

saved: "Salvo com sucesso",
copied: "Copiado",
connected: "Conectado"

},

/* SPANISH */

es: {

brand: "CORΛX",
tagline: "Dinero Sin Fronteras",

home: "Inicio",
wallet: "Billetera",
swap: "Intercambiar",
send: "Enviar",
receive: "Recibir",
history: "Historial",
merchant: "Comercio",
settings: "Configuración",
stake: "Stake",

welcome: "Bienvenido",
balance: "Saldo Total",
connect_wallet: "Conectar Wallet",
disconnect: "Desconectar",

wallet_title: "Centro Wallet",
wallet_desc: "Conecta tu wallet y accede al ecosistema CORΛX.",

send_title: "Enviar Cripto",
send_to: "Dirección Destino",
amount: "Monto",
confirm_send: "Enviar Ahora",

receive_title: "Recibir Fondos",
share_request: "Compartir Solicitud",

swap_title: "Intercambiar Activos",
stake_title: "Stake y Ganancias",

history_title: "Historial de Transacciones",

merchant_title: "Herramientas Comerciales",
checkout: "Crear Checkout",

settings_title: "Centro de Control",
language: "Idioma",
currency: "Moneda",
theme: "Tema",
notifications: "Notificaciones",

saved: "Guardado correctamente",
copied: "Copiado",
connected: "Conectado"

}

}

};

/* INIT */

document.addEventListener("DOMContentLoaded", ()=>{

loadLanguage();
translatePage();

});

/* LOAD */

function loadLanguage(){

const saved =
localStorage.getItem("corax_language");

if(saved && I18N.languages.includes(saved)){
I18N.current = saved;
}

}

/* SET */

function setLanguage(lang){

if(!I18N.languages.includes(lang)) return;

I18N.current = lang;

localStorage.setItem(
"corax_language",
lang
);

translatePage();

if(typeof toast === "function"){
toast("Language updated");
}

}

/* GET */

function t(key){

return (
I18N.translations[I18N.current][key] ||
key
);

}

/* TRANSLATE DOM */

function translatePage(){

document.querySelectorAll("[data-i18n]")
.forEach(el=>{

const key =
el.getAttribute("data-i18n");

el.innerText = t(key);

});

document.querySelectorAll("[data-i18n-placeholder]")
.forEach(el=>{

const key =
el.getAttribute("data-i18n-placeholder");

el.placeholder = t(key);

});

}

/* SELECT BIND */

function bindLanguageSelector(id="languageSelect"){

const el =
document.getElementById(id);

if(!el) return;

el.value = I18N.current;

el.addEventListener("change",(e)=>{

setLanguage(e.target.value);

});
}

/* HELPERS */

function currentLanguage(){

return I18N.current;
}
