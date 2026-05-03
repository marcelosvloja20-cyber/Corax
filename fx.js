const CORAX_FX = (() => {

let canvas, ctx, W, H;
let particles = [];
let mouse = {x:0,y:0};

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
ctx.fillStyle = "rgba(168,85,247,0.7)";
ctx.fill();
}
}

function connect(){
for(let a=0;a<particles.length;a++){
for(let b=a+1;b<particles.length;b++){

let dx = particles[a].x - particles[b].x;
let dy = particles[a].y - particles[b].y;
let dist = Math.sqrt(dx*dx + dy*dy);

if(dist < 120){
ctx.strokeStyle = "rgba(168,85,247,"+(1 - dist/120)*0.25+")";
ctx.lineWidth = 0.6;

ctx.beginPath();
ctx.moveTo(particles[a].x,particles[a].y);
ctx.lineTo(particles[b].x,particles[b].y);
ctx.stroke();
}
}
}
}

function animate(){
ctx.clearRect(0,0,W,H);

particles.forEach(p=>{
p.update();
p.draw();
});

connect();

requestAnimationFrame(animate);
}

function init(){
canvas = document.getElementById("bg");
ctx = canvas.getContext("2d");

resize();

particles = [];
for(let i=0;i<60;i++){ // otimizado
particles.push(new Particle());
}

/* PARALLAX */
document.addEventListener("mousemove", e => {

mouse.x = (e.clientX/W - 0.5);
mouse.y = (e.clientY/H - 0.5);

const logo = document.getElementById("logo");

if(logo){
logo.style.transform =
`rotateX(${mouse.y*6}deg) rotateY(${mouse.x*6}deg)`;
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
