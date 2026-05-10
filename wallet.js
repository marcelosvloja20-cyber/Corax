// =========================================
// CORΛX WALLET.JS
// Wallet Engine + UI Logic
// =========================================

// =========================================
// START
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    initializeWallet();

    initializeBalanceAnimation();

    initializeButtons();

});

// =========================================
// INIT WALLET
// =========================================

function initializeWallet(){

    const user =
        localStorage.getItem(
            "corax_user"
        );

    if(!user){

        console.log(
            "No user detected"
        );

        return;

    }

    console.log(
        `Wallet loaded for ${user}`
    );

    updateWalletBalance();

}

// =========================================
// BALANCE
// =========================================

function updateWalletBalance(){

    const balanceElement =
        document.getElementById(
            "balanceValue"
        );

    if(!balanceElement) return;

    let current = 0;

    const target = 24842.82;

    const interval =
        setInterval(() => {

            current += 284;

            balanceElement.innerText =
                "$ " +
                current
                .toLocaleString(
                    "en-US",
                    {

                        minimumFractionDigits:2

                    }

                );

            if(current >= target){

                current = target;

                balanceElement.innerText =
                    "$ " +
                    target
                    .toLocaleString(
                        "en-US",
                        {

                            minimumFractionDigits:2

                        }

                    );

                clearInterval(interval);

            }

        },22);

}

// =========================================
// BALANCE FX
// =========================================

function initializeBalanceAnimation(){

    const balance =
        document.getElementById(
            "balanceValue"
        );

    if(!balance) return;

    setInterval(() => {

        balance.animate([

            {

                transform:"scale(1)"

            },

            {

                transform:"scale(1.03)"

            },

            {

                transform:"scale(1)"

            }

        ],{

            duration:1200

        });

    },5000);

}

// =========================================
// BUTTONS
// =========================================

function initializeButtons(){

    const buttons =
        document.querySelectorAll("button");

    buttons.forEach(button => {

        button.addEventListener(

            "click",

            e => {

                createExplosion(

                    e.clientX,

                    e.clientY

                );

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

                    duration:300

                });

            }

        );

    });

}

// =========================================
// PARTICLE EXPLOSION
// =========================================

function createExplosion(x,y){

    for(let i = 0; i < 18; i++){

        const particle =
            document.createElement("div");

        particle.className =
            "click-particle";

        document.body.appendChild(
            particle
        );

        particle.style.left =
            x + "px";

        particle.style.top =
            y + "px";

        const randomX =
            (Math.random() - .5) * 240;

        const randomY =
            (Math.random() - .5) * 240;

        particle.animate([

            {

                transform:
                "translate(0,0) scale(1)",

                opacity:1

            },

            {

                transform:
                `translate(${randomX}px,${randomY}px) scale(0)`,

                opacity:0

            }

        ],{

            duration:900,
            easing:"ease-out"

        });

        setTimeout(() => {

            particle.remove();

        },900);

    }

}

// =========================================
// SEND
// =========================================

function sendCrypto(){

    createToast(
        "Transfer initiated 🚀"
    );

}

// =========================================
// RECEIVE
// =========================================

function receiveCrypto(){

    createToast(
        "Wallet address copied 💎"
    );

}

// =========================================
// STAKING
// =========================================

function startStaking(){

    createToast(
        "CRX staking enabled 🔥"
    );

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

    document.body.appendChild(
        toast
    );

    setTimeout(() => {

        toast.remove();

    },3000);

}

// =========================================
// LOGOUT
// =========================================

function logout(){

    localStorage.removeItem(
        "corax_user"
    );

    localStorage.removeItem(
        "corax_token"
    );

    window.location.href =
        "index.html";

}

// =========================================
// READY
// =========================================

console.log(
    "CORΛX Wallet Engine Active 💰"
);
