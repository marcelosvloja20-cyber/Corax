/* ===================================
   CORΛX MASTER CONFIG.JS v1
=================================== */

const CONFIG = {

/* APP */

APP_NAME: "CORΛX",
TAGLINE: "Money Without Borders",
VERSION: "1.0.0",
ENV: "production",

/* URLS */

URLS: {
HOME: "index.html",
LOGIN: "login.html",
APP: "app.html",
WALLET: "wallet.html",
SEND: "send.html",
RECEIVE: "receive.html",
SWAP: "swap.html",
STAKE: "stake.html",
HISTORY: "history.html",
MERCHANT: "merchant.html",
SETTINGS: "setting.html"
},

/* BRAND */

BRAND: {
PRIMARY: "#A855F7",
PRIMARY_DARK: "#7C3AED",
BACKGROUND: "#050505",
SURFACE: "#111111",
TEXT: "#F5F5F5"
},

/* NETWORKS */

NETWORKS: [

{
id: "0x1",
name: "Ethereum",
symbol: "ETH",
rpc: "https://rpc.ankr.com/eth",
explorer: "https://etherscan.io"
},

{
id: "0x38",
name: "BNB Chain",
symbol: "BNB",
rpc: "https://bsc-dataseed.binance.org",
explorer: "https://bscscan.com"
},

{
id: "0x89",
name: "Polygon",
symbol: "MATIC",
rpc: "https://polygon-rpc.com",
explorer: "https://polygonscan.com"
},

{
id: "0x2105",
name: "Base",
symbol: "ETH",
rpc: "https://mainnet.base.org",
explorer: "https://basescan.org"
},

{
id: "0xa4b1",
name: "Arbitrum",
symbol: "ETH",
rpc: "https://arb1.arbitrum.io/rpc",
explorer: "https://arbiscan.io"
}

],

/* TOKENS */

TOKENS: [

{
symbol: "USDT",
name: "Tether USD",
decimals: 6
},

{
symbol: "USDC",
name: "USD Coin",
decimals: 6
},

{
symbol: "ETH",
name: "Ethereum",
decimals: 18
},

{
symbol: "BNB",
name: "BNB",
decimals: 18
}

],

/* FEES */

FEES: {
SEND: 0.25,
SWAP: 0.15,
MERCHANT: 0.25,
WITHDRAW: 0.10
},

/* STAKING */

STAKING: {
DEFAULT_APY: "8.5%",
LOCK_DAYS: 30,
MIN_AMOUNT: 100
},

/* SECURITY */

SECURITY: {
AUTO_LOCK_MINUTES: 5,
TWO_FA: false,
BIOMETRIC: true
},

/* SUPPORT */

SUPPORT: {
EMAIL: "support@corax.finance",
X: "@CORAX",
SITE: "www.corax.finance"
}

};

/* HELPERS */

function getNetworkById(id){

return CONFIG.NETWORKS.find(net => net.id === id);
}

function getToken(symbol){

return CONFIG.TOKENS.find(token => token.symbol === symbol);
}

function getUrl(page){

return CONFIG.URLS[page] || "index.html";
}

function feeCalc(type, amount){

const fee = CONFIG.FEES[type] || 0;

return (Number(amount) * fee / 100).toFixed(2);
}

function appVersion(){

return CONFIG.VERSION;
}

console.log(CONFIG.APP_NAME + " Config Loaded");
