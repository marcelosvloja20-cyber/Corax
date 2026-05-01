/* ===================================
   CORΛX MASTER LIQUIDITY.JS v1
   Multi-Chain Liquidity Engine
=================================== */

const LIQUIDITY = {
brand: "CORΛX",

pools: {},

routes: [],

stats: {
totalLiquidity: 0,
totalSwaps: 0,
volume: 0
}
};

/* ===================================
   INIT
=================================== */

function initLiquidity(){

loadLiquidity();

console.log(
"CORΛX Liquidity Engine Ready"
);

}

/* ===================================
   CREATE POOL
=================================== */

function createPool(
tokenA,
tokenB,
amountA,
amountB
){

const key = pairKey(tokenA, tokenB);

LIQUIDITY.pools[key] = {
tokenA,
tokenB,
reserveA: Number(amountA),
reserveB: Number(amountB),
createdAt:
new Date().toISOString()
};

updateTotalLiquidity();

saveLiquidity();

return LIQUIDITY.pools[key];
}

/* ===================================
   GET PRICE
=================================== */

function getPrice(
tokenA,
tokenB
){

const pool =
getPool(tokenA, tokenB);

if(!pool) return null;

return (
pool.reserveB /
pool.reserveA
);

}

/* ===================================
   SWAP
=================================== */

function swap(
userId,
fromToken,
toToken,
amountIn
){

const pool =
getPool(fromToken, toToken);

if(!pool){

return {
success:false,
message:"No liquidity"
};

}

const amountOut =
calcSwap(
pool,
fromToken,
amountIn
);

updateReserves(
pool,
fromToken,
amountIn,
amountOut
);

LIQUIDITY.stats.totalSwaps++;
LIQUIDITY.stats.volume +=
Number(amountIn);

saveLiquidity();

return {
success:true,
amountOut
};

}

/* ===================================
   SWAP LOGIC (AMM)
=================================== */

function calcSwap(
pool,
fromToken,
amountIn
){

const k =
pool.reserveA *
pool.reserveB;

if(fromToken === pool.tokenA){

const newA =
pool.reserveA + amountIn;

const newB =
k / newA;

return pool.reserveB - newB;

}else{

const newB =
pool.reserveB + amountIn;

const newA =
k / newB;

return pool.reserveA - newA;

}

}

/* ===================================
   UPDATE RESERVES
=================================== */

function updateReserves(
pool,
fromToken,
amountIn,
amountOut
){

if(fromToken === pool.tokenA){

pool.reserveA += amountIn;
pool.reserveB -= amountOut;

}else{

pool.reserveB += amountIn;
pool.reserveA -= amountOut;

}

}

/* ===================================
   ROUTING (BASIC)
=================================== */

function bestRoute(
from,
to
){

const direct =
getPool(from,to);

if(direct){

return [from,to];
}

// fallback multi-hop (simplified)

const keys =
Object.keys(LIQUIDITY.pools);

for(let key of keys){

const [a,b] =
key.split("_");

if(a === from){

if(getPool(b,to)){

return [from,b,to];
}

}

}

return null;
}

/* ===================================
   HELPERS
=================================== */

function getPool(a,b){

return (
LIQUIDITY.pools[pairKey(a,b)]
|| LIQUIDITY.pools[pairKey(b,a)]
);

}

function pairKey(a,b){

return [a,b].sort().join("_");

}

function updateTotalLiquidity(){

let total = 0;

Object.values(
LIQUIDITY.pools
).forEach(p=>{

total +=
p.reserveA +
p.reserveB;

});

LIQUIDITY.stats.totalLiquidity = total;

}

/* ===================================
   DASHBOARD
=================================== */

function dashboard(){

return {
pools:
Object.keys(LIQUIDITY.pools).length,

totalLiquidity:
LIQUIDITY.stats.totalLiquidity,

totalSwaps:
LIQUIDITY.stats.totalSwaps,

volume:
LIQUIDITY.stats.volume
};

}

/* ===================================
   STORAGE
=================================== */

function saveLiquidity(){

if(
typeof localStorage !==
"undefined"
){

localStorage.setItem(
"corax_liquidity",
JSON.stringify(LIQUIDITY)
);

}

}

function loadLiquidity(){

if(
typeof localStorage !==
"undefined"
){

const saved =
localStorage.getItem(
"corax_liquidity"
);

if(saved){

Object.assign(
LIQUIDITY,
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
initLiquidity,
createPool,
getPrice,
swap,
bestRoute,
dashboard
};

}
