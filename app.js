// =========================================
// CORΛX APP.JS
// Main Authentication System
// =========================================

// =========================================
// START
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    initializeParticles();

    initializeAuth();

    initializeInputs();

    initializeAmbientFX();

});

// =========================================
// PARTICLES
// =========================================

function initializeParticles(){

    const container =
        document.getElementById("particles");

    if(!container) return;

    setInterval(() => {

        createParticle(container);

    },120);

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

    particle.style.animation =
        `particleFloat ${
            Math.random() * 4 + 4
        }s linear forwards`;

    container.appendChild(particle);

    setTimeout(() => {

        particle.remove();

    },7000);

}

// =========================================
// AUTH
// =========================================

function initializeAuth(){

    const authForm =
        document.getElementById("authForm");

    const createBtn =
        document.getElementById("createBtn");

    if(authForm){

        authForm.addEventListener(

            "submit",

            async e => {

                e.preventDefault();

                const email =
                    document
                    .getElementById("email")
                    .value;

                const password =
                    document
                    .getElementById("password")
                    .value;

                if(

                    email.length < 4
                    ||
                    password.length < 4

                ){

                    createToast(
                        "Invalid credentials"
                    );

                    return;

                }

                createToast(
                    "Connecting..."
                );

                const response =
                    await loginUser(
                        email,
                        password
                    );

                if(response.token){

                    saveToken(
                        response.token
                    );

                    localStorage.setItem(

                        "corax_user",

                        email

                    );

                    createToast(
                        "Login successful 🚀"
                    );

                    setTimeout(() => {

                        window.location.href =
                            "dashboard.html";

                    },1200);

                } else {

                    createToast(
                        response.message
                        ||
                        "Login failed"
                    );

                }

            }

        );

    }

    // =====================================
    // CREATE ACCOUNT
    // =====================================

    if(createBtn){

        createBtn.addEventListener(

            "click",

            async () => {

                const email =
                    document
                    .getElementById("email")
                    .value;

                const password =
                    document
                    .getElementById("password")
                    .value;

                if(

                    email.length < 4
                    ||
                    password.length < 4

                ){

                    createToast(
                        "Fill all fields"
                    );

                    return;

                }

                createToast(
                    "Creating account..."
                );

                const response =
                    await registerUser(
                        email,
                        password
                    );

                if(response.success){

                    createToast(
                        "Account created 💎"
                    );

                } else {

                    createToast(
                        response.message
                        ||
                        "Error creating account"
                    );

                }

            }

        );

    }

}

// =========================================
// INPUT FX
// =========================================

function initializeInputs(){

    const inputs =
        document.querySelectorAll("input");

    inputs.forEach(input => {

        input.addEventListener(

            "focus",

            () => {

                input.style.border =
                    "1px solid rgba(168,85,247,.5)";

                input.style.boxShadow =
                    "0 0 20px rgba(168,85,247,.2)";

            }

        );

        input.addEventListener(

            "blur",

            () => {

                input.style.border =
                    "1px solid rgba(255,255,255,.08)";

                input.style.boxShadow =
                    "none";

            }

        );

    });

}

// =========================================
// TOAST
// =========================================

function createToast(message){

    const toast =
        document.createElement("div");

    toast.className =
        "corax-toast";

    toast.innerText =
        message;

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.classList.add("show");

    },100);

    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {

            toast.remove();

        },400);

    },3000);

}

// =========================================
// AMBIENT FX
// =========================================

function initializeAmbientFX(){

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
                    transform:"scale(1.12)"

                },

                {

                    opacity:.18,
                    transform:"scale(1)"

                }

            ],{

                duration:4000,
                easing:"ease-in-out"

            });

        });

    },4000);

}

// =========================================
// READY
// =========================================

console.log(
    "CORΛX APP Engine Active 🚀"
);
