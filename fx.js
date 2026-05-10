// =========================================
// CORΛX FX.JS
// Cinematic Motion Engine
// Apple/Web3 Premium Effects
// =========================================

// =========================================
// INIT
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    initializeTilt();

    initializeGlow();

    initializeParallax();

    initializeButtons();

    initializeCrowParticles();

    initializeBackgroundPulse();

});

// =========================================
// 3D CARD TILT
// =========================================

function initializeTilt(){

    const cards =
        document.querySelectorAll(".glass-card");

    cards.forEach(card => {

        card.addEventListener("mousemove", e => {

            const rect =
                card.getBoundingClientRect();

            const x =
                e.clientX - rect.left;

            const y =
                e.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -6;

            const rotateY =
                ((x - centerX) / centerX) * 6;

            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-4px)
            `;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = `
                perspective(1000px)
                rotateX(0deg)
                rotateY(0deg)
                translateY(0px)
            `;

        });

    });

}

// =========================================
// DYNAMIC GLOW
// =========================================

function initializeGlow(){

    document.addEventListener("mousemove", e => {

        const glow =
            document.querySelector(".orb3");

        if(!glow) return;

        const x =
            e.clientX / window.innerWidth;

        const y =
            e.clientY / window.innerHeight;

        glow.style.transform = `
            translate(
                ${x * 40 - 20}px,
                ${y * 40 - 20}px
            )
        `;

    });

}

// =========================================
// PARALLAX
// =========================================

function initializeParallax(){

    window.addEventListener("scroll", () => {

        const scroll =
            window.scrollY;

        const orbs =
            document.querySelectorAll(".orb");

        orbs.forEach((orb,index) => {

            const speed =
                (index + 1) * 0.08;

            orb.style.transform =
                `translateY(${scroll * speed}px)`;

        });

    });

}

// =========================================
// PREMIUM BUTTONS
// =========================================

function initializeButtons(){

    const buttons =
        document.querySelectorAll("button");

    buttons.forEach(button => {

        button.addEventListener("click", e => {

            createExplosion(
                e.clientX,
                e.clientY
            );

            button.animate([

                {

                    transform:
                        "scale(1)"

                },

                {

                    transform:
                        "scale(.92)"

                },

                {

                    transform:
                        "scale(1)"

                }

            ],{

                duration:300

            });

            if(navigator.vibrate){

                navigator.vibrate(25);

            }

        });

    });

}

// =========================================
// PARTICLE EXPLOSION
// =========================================

function createExplosion(x,y){

    for(let i = 0; i < 22; i++){

        const particle =
            document.createElement("div");

        particle.className =
            "click-particle";

        document.body.appendChild(particle);

        particle.style.left =
            x + "px";

        particle.style.top =
            y + "px";

        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            40 + Math.random() * 80;

        const moveX =
            Math.cos(angle) * distance;

        const moveY =
            Math.sin(angle) * distance;

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

            duration:700,
            easing:"cubic-bezier(.2,.8,.2,1)"

        });

        setTimeout(() => {

            particle.remove();

        },700);

    }

}

// =========================================
// CROW PARTICLES
// =========================================

function initializeCrowParticles(){

    const crow =
        document.querySelector(".crow-container");

    if(!crow) return;

    setInterval(() => {

        const rect =
            crow.getBoundingClientRect();

        createWingParticle(
            rect.left + 20,
            rect.top + 30
        );

        createWingParticle(
            rect.right - 20,
            rect.top + 30
        );

    },120);

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

    const moveX =
        (Math.random() - .5) * 80;

    const moveY =
        -40 - Math.random() * 60;

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

        duration:1800,
        easing:"ease-out"

    });

    setTimeout(() => {

        particle.remove();

    },1800);

}

// =========================================
// BACKGROUND PULSE
// =========================================

function initializeBackgroundPulse(){

    setInterval(() => {

        const orbs =
            document.querySelectorAll(".orb");

        orbs.forEach(orb => {

            orb.animate([

                {

                    opacity:.18

                },

                {

                    opacity:.28

                },

                {

                    opacity:.18

                }

            ],{

                duration:4000

            });

        });

    },4000);

}

// =========================================
// APP READY
// =========================================

console.log("CORΛX FX ENGINE ACTIVE 🚀");
