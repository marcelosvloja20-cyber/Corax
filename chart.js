/* ===================================
   CORΛX SPENDING CHART
=================================== */

function renderChart(){

const canvas = document.getElementById("spendingChart");
if(!canvas) return;

const ctx = canvas.getContext("2d");

const history = JSON.parse(localStorage.getItem("corax_history") || "[]");

/* pegar últimos 7 */
const last = history.slice(0,7).reverse();

const data = last.map(tx => parseFloat(tx.amount.replace("$","")) || 0);
const labels = last.map((_,i) => "T"+(i+1));

const W = canvas.width = canvas.offsetWidth;
const H = canvas.height = 200;

ctx.clearRect(0,0,W,H);

const max = Math.max(...data, 1);
const barWidth = W / data.length;

/* draw bars */
data.forEach((value, i) => {

const height = (value / max) * 140;

const x = i * barWidth + 10;
const y = H - height - 20;

ctx.beginPath();
ctx.roundRect(x, y, barWidth - 20, height, 8);

const grad = ctx.createLinearGradient(0, y, 0, y + height);
grad.addColorStop(0, "#A855F7");
grad.addColorStop(1, "#7C3AED");

ctx.fillStyle = grad;
ctx.fill();

/* value text */
ctx.fillStyle = "#aaa";
ctx.font = "10px Arial";
ctx.fillText("$"+value, x, y - 5);

});

}
