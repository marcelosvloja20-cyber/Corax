/* ===================================
   CORΛX FX — FULL SYSTEM
   particles + crow + explosions
=================================== */

const CORAX_FX = (() => {

let canvas, ctx, W, H;
let particles = [];
let wingParticles = [];

/* BASE PARTICLES */
class Particle{
constructor(){
this.x = Math.random()*W;
this.y = Math.random()*H;
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
this.vx = (Math.random()-0.5)*1.5;
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
ctx.fillStyle = "rgba(168,85,247,"+(this.life/60)+")";
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
ctx.strokeStyle = "rgba(168,85,247,"+(1-dist/120)*0.2+")";
ctx.lineWidth = 0.5;

ctx.beginPath();
ctx.moveTo(particles[a].x,particles[a].y);
ctx.lineTo(particles[b].x,particles[b].y);
ctx.stroke();
}
}
}
}

/* EMISSÃO DO CORVO */
function emitFromCrow(){

const crow = document.getElementById("crow");
if(!crow) return;

const rect = crow.getBoundingClientRect();

const x = rect.left + rect.width * 0.6;
const y = rect.top + rect.height * 0.3;

for(let i=0;i<2;i++){
wingParticles.push(new WingParticle(x,y));
}

}

/* EXPLOSÃO */
function explode(x,y){

for(let i=0;i<25;i++){
wingParticles.push({
x:x,
y:y,
vx:(Math.random()-0.5)*3,
vy:(Math.random()-0.5)*3,
life:40,
size:Math.random()*3
});
}

}

/* CLICK EVENT */
document.addEventListener("click",(e)=>{

const btn = e.target.closest("button");
if(!btn) return;

const rect = btn.getBoundingClientRect();

const x = rect.left + rect.width/2;
const y = rect.top + rect.height/2;

explode(x,y);

});

/* ANIMATION */
function animate(){

ctx.clearRect(0,0,W,H);

/* base */
particles.forEach(p=>{
p.update();
p.draw();
});

/* connections */
connect();

/* crow energy */
emitFromCrow();

/* particles render */
wingParticles.forEach((p,i)=>{

p.x += p.vx;
p.y += p.vy;
p.life--;

ctx.beginPath();
ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
ctx.fillStyle = "rgba(168,85,247,"+(p.life/40)+")";
ctx.fill();

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

/* base particles */
particles = [];
for(let i=0;i<60;i++){
particles.push(new Particle());
}

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
