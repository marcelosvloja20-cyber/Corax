const CORAX_FX = (() => {

let canvas, ctx, W, H;
let particles = [];
let crowPos = { x: 300, y: 100 };

class Particle {
constructor(){
this.x = Math.random() * W;
this.y = Math.random() * H;
this.vx = (Math.random() - 0.5) * 0.5;
this.vy = (Math.random() - 0.5) * 0.5;
this.size = Math.random() * 1.8 + 0.5;
}

update(){

// movimento normal
this.x += this.vx;
this.y += this.vy;

// atração suave ao corvo
let dx = crowPos.x - this.x;
let dy = crowPos.y - this.y;
let dist = Math.sqrt(dx*dx + dy*dy);

if(dist < 180){
this.x += dx * 0.002;
this.y += dy * 0.002;
}

// bounce
if(this.x < 0 || this.x > W) this.vx *= -1;
if(this.y < 0 || this.y > H) this.vy *= -1;

}

draw(){
ctx.beginPath();
ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
ctx.fillStyle = "rgba(168,85,247,0.7)";
ctx.fill();
}
}

function connect(){
for(let i=0;i<particles.length;i++){
for(let j=i+1;j<particles.length;j++){

let dx = particles[i].x - particles[j].x;
let dy = particles[i].y - particles[j].y;
let dist = Math.sqrt(dx*dx + dy*dy);

if(dist < 120){
ctx.strokeStyle = "rgba(168,85,247,"+(1 - dist/120)*0.25+")";
ctx.lineWidth = 0.5;

ctx.beginPath();
ctx.moveTo(particles[i].x, particles[i].y);
ctx.lineTo(particles[j].x, particles[j].y);
ctx.stroke();
}

}
}
}

function drawAura(){
let gradient = ctx.createRadialGradient(
crowPos.x, crowPos.y, 0,
crowPos.x, crowPos.y, 120
);

gradient.addColorStop(0, "rgba(168,85,247,0.25)");
gradient.addColorStop(1, "transparent");

ctx.fillStyle = gradient;
ctx.beginPath();
ctx.arc(crowPos.x, crowPos.y, 120, 0, Math.PI*2);
ctx.fill();
}

function animate(){
ctx.clearRect(0,0,W,H);

drawAura();

particles.forEach(p=>{
p.update();
p.draw();
});

connect();

requestAnimationFrame(animate);
}

function updateCrowPosition(){
const crow = document.getElementById("crow");

if(crow){
const rect = crow.getBoundingClientRect();

crowPos.x = rect.left + rect.width/2;
crowPos.y = rect.top + rect.height/2;
}
}

function init(){

canvas = document.getElementById("bg");
ctx = canvas.getContext("2d");

resize();

particles = [];
for(let i=0;i<60;i++){
particles.push(new Particle());
}

setInterval(updateCrowPosition, 100);

/* PARALLAX */
document.addEventListener("mousemove", e => {

const logo = document.querySelector(".logo-corax svg");

if(logo){
let x = (e.clientX / W - 0.5) * 6;
let y = (e.clientY / H - 0.5) * 6;

logo.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
}

});

window.addEventListener("resize", resize);
}

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
