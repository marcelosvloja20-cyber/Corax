/* ===================================
   CORΛX FX — PARTICLES + CROW ENERGY
=================================== */

const CORAX_FX = (() => {

let canvas, ctx, W, H;
let particles = [];
let wingParticles = [];
let mouse = {x:0,y:0};

class Particle{
constructor(x,y){
this.x = x ?? Math.random()*W;
this.y = y ?? Math.random()*H;
this.vx = (Math.random()-0.5)*0.4;
this.vy = (Math.random()-0.5)*0.4;
this.size = Math.random()*1.5 + 0.3;
}

update(){
this.x += this.vx;
this.y += this.vy;

if(this.x < 0 || this.x > W) this.vx *= -1;
if(this.y < 0 || this.y > H) this.vy *= -1;
}

draw(){
ctx.beginPath();
ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
ctx.fillStyle = "rgba(168,85,247,0.6)";
ctx.fill();
}
}

/* PARTICLES DAS ASAS */
class WingParticle{
constructor(x,y){
this.x = x;
this.y = y;
this.vx = (Math.random()-0.5)*1.2;
this.vy = (Math.random()-1.5);
this.life = 60;
this.size = Math.random()*2;
}

update(){
this.x += this.vx;
this.y += this.vy;
this.life--;
}

draw(){
ctx.beginPath();
ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
ctx.fillStyle = "rgba(168,85,247," + (this.life/60) + ")";
ctx.fill();
}
}

/* CONEXÕES */
function connect(){
for(let a=0;a<particles.length;a++){
for(let b=a+1;b<particles.length;b++){

let dx = particles[a].x - particles[b].x;
let dy = particles[a].y - particles[b].y;
let dist = Math.sqrt(dx*dx + dy*dy);

if(dist < 120){
ctx.strokeStyle = "rgba(168,85,247,"+(1 - dist/120)*0.2+")";
ctx.lineWidth = 0.5;

ctx.beginPath();
ctx.moveTo(particles[a].x,particles[a].y);
ctx.lineTo(particles[b].x,particles[b].y);
ctx.stroke();
}
}
}
}

/* EMITIR DAS ASAS */
function emitFromCrow(){

const crow = document.getElementById("crow");
if(!crow) return;

const rect = crow.getBoundingClientRect();

/* ponto aproximado da asa */
const x = rect.left + rect.width * 0.6;
const y = rect.top + rect.height * 0.3;

for(let i=0;i<2;i++){
wingParticles.push(new WingParticle(x,y));
}

}

/* ANIMAÇÃO */
function animate(){
ctx.clearRect(0,0,W,H);

/* base */
particles.forEach(p=>{
p.update();
p.draw();
});

/* conexões */
connect();

/* emitir energia */
emitFromCrow();

/* partículas das asas */
wingParticles.forEach((p,i)=>{
p.update();
p.draw();

if(p.life <= 0){
wingParticles.splice(i,1);
}
});

requestAnimationFrame(animate);
}

/* INIT */
function init(){
canvas = document.getElementById("bg");
ctx = canvas.getContext("2d");

resize();

/* partículas base */
particles = [];
for(let i=0;i<60;i++){
particles.push(new Particle());
}

/* mouse */
document.addEventListener("mousemove", e => {
mouse.x = e.clientX;
mouse.y = e.clientY;
});

window.addEventListener("resize", resize);
}

/* RESIZE */
function resize(){
W = canvas.width = window.innerWidth;
H = canvas.height = window.innerHeight;
}

return {
start(){
init();
animate();
}
};

})();

window.CORAX_FX = CORAX_FX;
