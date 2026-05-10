// =========================================
// CORΛX DASHBOARD.JS
// Premium Web3 App Logic
// Apple-Level Motion + UI
// =========================================

// =========================================
// USER SESSION
// =========================================

const userEmail = localStorage.getItem("corax_user") || "guest@corax.io";

document.addEventListener("DOMContentLoaded", () => {

    initializeDashboard();

});

// =========================================
// INITIALIZE
// =========================================

function initializeDashboard() {

    updateUser();

    animateBalance();

    generateParticles();

    generateTransactions();

    initializeButtons();

    initializeCharts();

    startLiveUpdates();

}

// =========================================
// UPDATE USER
// =========================================

function updateUser() {

    const userElement = document.getElementById("userEmail");

    if(userElement){

        userElement.innerText = userEmail;

    }

}

// =========================================
// ANIMATED BALANCE
// =========================================

function animateBalance() {

    const balanceElement = document.getElementById("balanceValue");

    if(!balanceElement) return;

    let current = 0;

    const target = 24892.44;

    const interval = setInterval(() => {

        current += target / 60;

        if(current >= target){

            current = target;

            clearInterval(interval);

        }

        balanceElement.innerText =
            "$ " + current.toLocaleString("en-US", {

                minimumFractionDigits: 2,
                maximumFractionDigits: 2

            });

    }, 25);

}

// =========================================
// PARTICLES SYSTEM
// =========================================

function generateParticles() {

    const container = document.getElementById("particles");

    if(!container) return;

    setInterval(() => {

        const particle = document.createElement("div");

        particle.classList.add("particle-bg");

        particle.style.left = Math.random() * window.innerWidth + "px";

        particle.style.top = window.innerHeight + "px";

        particle.style.animationDuration =
            (Math.random() * 4 + 3) + "s";

        particle.style.opacity =
            Math.random();

        particle.style.transform =
            `scale(${Math.random() * 2})`;

        container.appendChild(particle);

        setTimeout(() => {

            particle.remove();

        }, 7000);

    }, 120);

}

// =========================================
// TRANSACTION HISTORY
// =========================================

function generateTransactions() {

    const history = document.getElementById("historyList");

    if(!history) return;

    const transactions = [

        {
            name: "BTC Swap",
            amount: "+1,240.00",
            type: "positive"
        },

        {
            name: "USDT Transfer",
            amount: "-220.00",
            type: "negative"
        },

        {
            name: "ETH Stake Reward",
            amount: "+482.00",
            type: "positive"
        },

        {
            name: "CRX Purchase",
            amount: "+12,000 CRX",
            type: "positive"
        },

        {
            name: "Polygon Bridge",
            amount: "-95.00",
            type: "negative"
        }

    ];

    history.innerHTML = "";

    transactions.forEach(tx => {

        const item = document.createElement("div");

        item.className = "history-item";

        item.innerHTML = `

            <div>

                <div class="tx-type">
                    ${tx.name}
                </div>

                <div class="tx-date">
                    Just now
                </div>

            </div>

            <div class="tx-amount ${tx.type}">
                ${tx.amount}
            </div>

        `;

        history.appendChild(item);

    });

}

// =========================================
// BUTTON EFFECTS
// =========================================

function initializeButtons() {

    const buttons = document.querySelectorAll("button");

    buttons.forEach(button => {

        button.addEventListener("click", e => {

            createExplosion(e);

            button.style.transform = "scale(.97)";

            setTimeout(() => {

                button.style.transform = "";

            }, 150);

        });

    });

}

// =========================================
// PARTICLE EXPLOSION
// =========================================

function createExplosion(e) {

    for(let i = 0; i < 18; i++){

        const particle = document.createElement("div");

        particle.className = "click-particle";

        document.body.appendChild(particle);

        const x = e.clientX;
        const y = e.clientY;

        particle.style.left = x + "px";
        particle.style.top = y + "px";

        const angle = Math.random() * 360;
        const distance = Math.random() * 90;

        const moveX =
            Math.cos(angle) * distance;

        const moveY =
            Math.sin(angle) * distance;

        particle.animate([

            {

                transform:
                    "translate(0,0) scale(1)",

                opacity: 1

            },

            {

                transform:
                    `translate(${moveX}px,${moveY}px) scale(0)`,

                opacity: 0

            }

        ], {

            duration: 700,
            easing: "cubic-bezier(.2,.8,.2,1)"

        });

        setTimeout(() => {

            particle.remove();

        }, 700);

    }

}

// =========================================
// LIVE MARKET CHART
// =========================================

function initializeCharts() {

    const canvas = document.getElementById("marketChart");

    if(!canvas) return;

    const ctx = canvas.getContext("2d");

    const gradient = ctx.createLinearGradient(0,0,0,300);

    gradient.addColorStop(0,"rgba(168,85,247,.6)");
    gradient.addColorStop(1,"rgba(168,85,247,0)");

    new Chart(ctx, {

        type: "line",

        data: {

            labels: [

                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
                "Sun"

            ],

            datasets: [{

                label: "CRX",

                data: [

                    18,
                    24,
                    22,
                    36,
                    42,
                    40,
                    55

                ],

                borderColor: "#A855F7",

                backgroundColor: gradient,

                tension: .5,

                fill: true,

                borderWidth: 3,

                pointRadius: 0

            }]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    display: false

                }

            },

            scales: {

                x: {

                    ticks: {

                        color: "rgba(255,255,255,.5)"

                    },

                    grid: {

                        color: "rgba(255,255,255,.03)"

                    }

                },

                y: {

                    ticks: {

                        color: "rgba(255,255,255,.5)"

                    },

                    grid: {

                        color: "rgba(255,255,255,.03)"

                    }

                }

            }

        }

    });

}

// =========================================
// LIVE VALUE UPDATE
// =========================================

function startLiveUpdates() {

    setInterval(() => {

        const livePrice = document.getElementById("livePrice");

        if(!livePrice) return;

        const value =
            (Math.random() * 3 + 0.4).toFixed(2);

        livePrice.innerText =
            "+ " + value + "%";

    }, 3000);

}

// =========================================
// LOGOUT
// =========================================

function logout() {

    localStorage.removeItem("corax_user");

    window.location.href = "index.html";

}

// =========================================
// NAVIGATION
// =========================================

function goTo(page){

    window.location.href = page;

}
