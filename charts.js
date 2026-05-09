/* =========================================
   CORΛX CHARTS.JS
   Premium Web3 Animated Chart System
========================================= */

const canvas = document.getElementById("coraxChart");
const ctx = canvas.getContext("2d");

/* =========================================
   RESPONSIVE SIZE
========================================= */

function resizeChart() {

    canvas.width = canvas.offsetWidth;
    canvas.height = 260;

}

resizeChart();

window.addEventListener("resize", resizeChart);

/* =========================================
   DEMO DATA
========================================= */

let points = [
    40,
    55,
    48,
    72,
    90,
    78,
    120,
    135,
    150,
    170,
    165,
    190
];

/* =========================================
   SMOOTH LINE
========================================= */

function drawSmoothLine(data) {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    /* ================================
       BACKGROUND GLOW
    ================================= */

    const gradient = ctx.createLinearGradient(
        0,
        0,
        0,
        canvas.height
    );

    gradient.addColorStop(0, "rgba(168,85,247,0.35)");
    gradient.addColorStop(1, "rgba(168,85,247,0)");

    /* ================================
       LINE
    ================================= */

    ctx.beginPath();

    ctx.lineWidth = 4;
    ctx.strokeStyle = "#A855F7";

    ctx.shadowBlur = 20;
    ctx.shadowColor = "#A855F7";

    const stepX =
        canvas.width / (data.length - 1);

    data.forEach((value, index) => {

        const x = index * stepX;

        const y =
            canvas.height -
            (value / 200) * canvas.height;

        if (index === 0) {

            ctx.moveTo(x, y);

        } else {

            ctx.lineTo(x, y);

        }

    });

    ctx.stroke();

    /* ================================
       AREA FILL
    ================================= */

    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);

    ctx.closePath();

    ctx.fillStyle = gradient;

    ctx.fill();

    /* ================================
       POINTS
    ================================= */

    data.forEach((value, index) => {

        const x = index * stepX;

        const y =
            canvas.height -
            (value / 200) * canvas.height;

        ctx.beginPath();

        ctx.arc(x, y, 5, 0, Math.PI * 2);

        ctx.fillStyle = "#ffffff";

        ctx.shadowBlur = 15;
        ctx.shadowColor = "#A855F7";

        ctx.fill();

    });

}

/* =========================================
   ANIMATION LOOP
========================================= */

function animateChart() {

    drawSmoothLine(points);

    requestAnimationFrame(animateChart);

}

animateChart();

/* =========================================
   LIVE MARKET SIMULATION
========================================= */

setInterval(() => {

    points.shift();

    const last =
        points[points.length - 1];

    const variation =
        Math.random() * 40 - 20;

    let next = last + variation;

    if (next < 20) next = 20;
    if (next > 200) next = 200;

    points.push(next);

}, 2200);

/* =========================================
   HOVER FX
========================================= */

canvas.addEventListener("mousemove", e => {

    const rect = canvas.getBoundingClientRect();

    const x = e.clientX - rect.left;

    const glow =
        x / canvas.width;

    canvas.style.boxShadow =
        `0 0 ${20 + glow * 40}px rgba(168,85,247,.45)`;

});

/* =========================================
   MOBILE TOUCH GLOW
========================================= */

canvas.addEventListener("touchstart", () => {

    if (navigator.vibrate) {

        navigator.vibrate(20);

    }

});

/* =========================================
   SYSTEM READY
========================================= */

console.log("CORΛX CHART SYSTEM READY 🚀");
