// =========================================
// CORΛX WALLET.JS
// Premium Wallet System
// =========================================

// =========================================
// START
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    initializeWallet();

    initializeBalance();

    initializeAssets();

    initializeButtons();

    initializeNetwork();

    initializeAnimations();

});

// =========================================
// WALLET INIT
// =========================================

function initializeWallet(){

    const email =
        localStorage.getItem("corax_user");

    if(!email){

        localStorage.setItem(
            "corax_user",
            "connected@corax.io"
        );

    }

    console.log(
        "CORΛX Wallet Connected 🚀"
    );

}

// =========================================
// BALANCE
// =========================================

function initializeBalance(){

    const balance =
        document.getElementById(
            "balanceValue"
        );

    if(!balance) return;

    let current = 0;

    const target = 24892.42;

    const interval = setInterval(() => {

        current += target / 80;

        if(current >= target){

            current = target;

            clearInterval(interval);

        }

        balance.innerText =
            "$ " +
            current.toLocaleString(
                "en-US",
                {

                    minimumFractionDigits:2,
                    maximumFractionDigits:2

                }
            );

    },20);

}

// =========================================
// ASSETS
// =========================================

function initializeAssets(){

    const assets = [

        {

            symbol:"BTC",
            value:"12,420",
            amount:"0.24 BTC"

        },

        {

            symbol:"ETH",
            value:"5,820",
            amount:"2.44 ETH"

        },

        {

            symbol:"CRX",
            value:"6,652",
            amount:"12,000 CRX"

        }

    ];

    console.log(
        "Assets Loaded",
        assets
    );

}

// =========================================
// BUTTONS
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

            animateButton(button);

        });

    });

}

// =========================================
// BUTTON ANIMATION
// =========================================

function animateButton(button){

    button.animate([

        {

            transform:"scale(1)"

        },

        {

            transform:"scale(.92)"

        },

        {

            transform:"scale(1)"

        }

    ],{

        duration:280,
        easing:"ease"

    });

}

// =========================================
// EXPLOSION
// =========================================

function createExplosion(x,y){

    for(let i = 0; i < 20; i++){

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
            30 + Math.random() * 80;

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
// NETWORK
// =========================================

function initializeNetwork(){

    const pulse =
        document.createElement("div");

    pulse.className =
        "network-pulse";

    document.body.appendChild(pulse);

    window.addEventListener("offline", () => {

        pulse.style.background =
            "#EF4444";

        pulse.style.boxShadow =
            "0 0 20px #EF4444";

        createToast(
            "Offline Mode Enabled"
        );

    });

    window.addEventListener("online", () => {

        pulse.style.background =
            "#22C55E";

        pulse.style.boxShadow =
            "0 0 20px #22C55E";

        createToast(
            "Connection Restored"
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
        "corax-toast show";

    toast.innerText =
        message;

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.remove();

    },3000);

}

// =========================================
// LIVE ANIMATIONS
// =========================================

function initializeAnimations(){

    setInterval(() => {

        animateOrbs();

    },4000);

}

// =========================================
// ORBS
// =========================================

function animateOrbs(){

    const orbs =
        document.querySelectorAll(".orb");

    orbs.forEach(orb => {

        orb.animate([

            {

                opacity:.18,
                transform:"scale(1)"

            },

            {

                opacity:.28,
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

}

// =========================================
// LOGOUT
// =========================================

function logout(){

    localStorage.removeItem(
        "corax_user"
    );

    window.location.href =
        "index.html";

}

// =========================================
// READY
// =========================================

console.log(
    "CORΛX Wallet Engine Active 💎"
);
