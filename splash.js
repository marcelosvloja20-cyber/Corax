// =========================================
// CORΛX SPLASH.JS
// Cinematic Intro Motion Engine
// =========================================

// =========================================
// START
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    initializeParticles();

    initializeCrowFX();

    initializeAmbientGlow();

    initializeSoundPulse();

    initializeTransition();

});

// =========================================
// PARTICLES ENGINE
// =========================================

function initializeParticles(){

    const container =
        document.getElementById("particles");

    if(!container) return;

    setInterval(() => {

        createParticle(container);

    },70);

}

// =========================================
// CREATE PARTICLE
// =========================================

function createParticle(container){

    const particle =
        document.createElement("div");

    particle.className =
        "particle-bg";

    const size =
        Math.random() * 6 + 2;

    particle.style.width =
        size + "px";

    particle.style.height =
        size + "px";

    particle.style.left =
        Math.random() * window.innerWidth + "px";

    particle.style.top =
        window.innerHeight + "px";

    particle.style.opacity =
        Math.random();

    particle.style.animationDuration =
        (Math.random() * 3 + 3) + "s";

    container.appendChild(particle);

    setTimeout(() => {

        particle.remove();

    },7000);

}

// =========================================
// CROW PARTICLES
// =========================================

function initializeCrowFX(){

    const crow =
        document.querySelector(".splash-crow");

    if(!crow) return;

    setInterval(() => {

        const rect =
            crow.getBoundingClientRect();

        createWingParticle(

            rect.left + 24,
            rect.top + 44

        );

        createWingParticle(

            rect.right - 24,
            rect.top + 44

        );

    },90);

}

// =========================================
// WING PARTICLE
// =========================================

function createWingParticle(x,y){

    const particle =
        document.createElement("div");

    particle.className =
        "particle-bg";

    document.body.appendChild(particle);

    particle.style.left =
        x + "px";

    particle.style.top =
        y + "px";

    particle.style.width = "5px";
    particle.style.height = "5px";

    const moveX =
        (Math.random() - .5) * 120;

    const moveY =
        -40 - Math.random() * 80;

    particle.animate([

        {

            transform:
                "translate(0,0) scale(1)",

            opacity:1

        },

        {

            transform:
                `translate(${moveX}px,${moveY}px) scale(0)`,

            opacity:0

        }

    ],{

        duration:2000,
        easing:"ease-out"

    });

    setTimeout(() => {

        particle.remove();

    },2000);

}

// =========================================
// AMBIENT GLOW
// =========================================

function initializeAmbientGlow(){

    const orbs =
        document.querySelectorAll(".orb");

    setInterval(() => {

        orbs.forEach(orb => {

            orb.animate([

                {

                    opacity:.18,
                    transform:"scale(1)"

                },

                {

                    opacity:.32,
                    transform:"scale(1.15)"

                },

                {

                    opacity:.18,
                    transform:"scale(1)"

                }

            ],{

                duration:5000,
                easing:"ease-in-out"

            });

        });

    },5000);

}

// =========================================
// FAKE SOUND PULSE
// =========================================

function initializeSoundPulse(){

    const logo =
        document.querySelector(".splash-logo");

    if(!logo) return;

    setInterval(() => {

        logo.animate([

            {

                textShadow:
                "0 0 20px rgba(168,85,247,.2)"

            },

            {

                textShadow:
                "0 0 60px rgba(168,85,247,.8)"

            },

            {

                textShadow:
                "0 0 20px rgba(168,85,247,.2)"

            }

        ],{

            duration:1800,
            easing:"ease"

        });

    },1800);

}

// =========================================
// PAGE TRANSITION
// =========================================

function initializeTransition(){

    setTimeout(() => {

        document.body.animate([

            {

                opacity:1,
                filter:"blur(0px)"

            },

            {

                opacity:0,
                filter:"blur(10px)"

            }

        ],{

            duration:1200,
            easing:"ease-in-out",
            fill:"forwards"

        });

    },3200);

    setTimeout(() => {

        window.location.href =
            "dashboard.html";

    },4300);

}

// =========================================
// READY
// =========================================

console.log("CORΛX SPLASH ENGINE ACTIVE 🚀");
