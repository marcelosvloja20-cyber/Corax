/* ===================================
   CORΛX FX — particles + links + parallax
=================================== */

const CORAX_FX = (() => {

  let canvas, ctx, W, H, particles = [], mouse = {x:0,y:0};

  class P {
    constructor(){
      this.x = Math.random()*W;
      this.y = Math.random()*H;
      this.vx = (Math.random()-.5)*0.4;
      this.vy = (Math.random()-.5)*0.4;
      this.r = Math.random()*1.8 + .3;
    }
    step(){
      this.x += this.vx;
      this.y += this.vy;

      if(this.x<0||this.x>W) this.vx*=-1;
      if(this.y<0||this.y>H) this.vy*=-1;
    }
    draw(){
      ctx.beginPath();
      ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
      ctx.fillStyle = "rgba(168,85,247,.8)";
      ctx.fill();
    }
  }

  function connect(){
    for(let i=0;i<particles.length;i++){
      for(let j=i+1;j<particles.length;j++){
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx*dx+dy*dy);
        if(d < 120){
          ctx.strokeStyle = "rgba(168,85,247,"+(1-d/120)*.25+")";
          ctx.lineWidth = .6;
          ctx.beginPath();
          ctx.moveTo(particles[i].x,particles[i].y);
          ctx.lineTo(particles[j].x,particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function tick(){
    ctx.clearRect(0,0,W,H);

    particles.forEach(p=>{
      p.step();
      p.draw();
    });

    connect();
    requestAnimationFrame(tick);
  }

  function init(){
    canvas = document.getElementById("bg");
    ctx = canvas.getContext("2d");
    resize();

    particles = [];
    for(let i=0;i<90;i++) particles.push(new P());

    // PARALLAX (logo segue mouse levemente)
    const logo = document.getElementById("logo");
    document.addEventListener("mousemove",(e)=>{
      mouse.x = (e.clientX/W - .5);
      mouse.y = (e.clientY/H - .5);
      if(logo){
        logo.style.transform = `rotateX(${mouse.y*6}deg) rotateY(${mouse.x*6}deg)`;
      }
    });

    window.addEventListener("resize", resize);
  }

  function resize(){
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function start(){
    init();
    tick();
  }

  return { start };

})();

window.CORAX_FX = CORAX_FX;
