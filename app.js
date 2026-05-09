/* =========================================
   CORΛX APP.JS
   FULL FRONTEND SYSTEM
   Connected to Render Backend
========================================= */

const API = "https://corax-backend-92zg.onrender.com";

/* =========================================
   ELEMENTS
========================================= */

const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const authScreen = document.getElementById("authScreen");
const dashboard = document.getElementById("dashboard");

const userEmail = document.getElementById("userEmail");
const balanceValue = document.getElementById("balanceValue");

const historyList = document.getElementById("historyList");

const logoutBtn = document.getElementById("logoutBtn");

const sendBtn = document.getElementById("sendBtn");

const sendTo = document.getElementById("sendTo");
const sendAmount = document.getElementById("sendAmount");

/* =========================================
   INIT
========================================= */

window.onload = () => {

    const token = localStorage.getItem("corax_token");

    if (token) {

        loadDashboard();

    }

};

/* =========================================
   REGISTER
========================================= */

registerBtn.addEventListener("click", async () => {

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {

        alert("Fill all fields");
        return;

    }

    try {

        const response = await fetch(`${API}/register`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })

        });

        const data = await response.json();

        if (data.success) {

            createExplosion(registerBtn);

            alert("Account created successfully 🚀");

        } else {

            alert(data.error || "Register failed");

        }

    } catch (err) {

        console.error(err);

        alert("Server error");

    }

});

/* =========================================
   LOGIN
========================================= */

loginBtn.addEventListener("click", async () => {

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {

        alert("Fill all fields");
        return;

    }

    try {

        const response = await fetch(`${API}/login`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })

        });

        const data = await response.json();

        if (data.token) {

            localStorage.setItem(
                "corax_token",
                data.token
            );

            createExplosion(loginBtn);

            loadDashboard();

        } else {

            alert(data.error || "Login failed");

        }

    } catch (err) {

        console.error(err);

        alert("Server error");

    }

});

/* =========================================
   LOAD DASHBOARD
========================================= */

async function loadDashboard() {

    const token = localStorage.getItem("corax_token");

    if (!token) return;

    authScreen.style.display = "none";
    dashboard.style.display = "flex";

    try {

        /* =========================
           BALANCE
        ========================= */

        const balanceResponse = await fetch(`${API}/balance`, {

            method: "GET",

            headers: {
                Authorization: token
            }

        });

        const balanceData = await balanceResponse.json();

        balanceValue.innerText =
            `$${balanceData.balance.toFixed(2)}`;

        /* =========================
           HISTORY
        ========================= */

        const historyResponse = await fetch(`${API}/history`, {

            method: "GET",

            headers: {
                Authorization: token
            }

        });

        const historyData = await historyResponse.json();

        historyList.innerHTML = "";

        if (!historyData.length) {

            historyList.innerHTML = `
                <div class="empty-history">
                    No transactions yet
                </div>
            `;

        }

        historyData.reverse().forEach(tx => {

            const item = document.createElement("div");

            item.className = "history-item";

            item.innerHTML = `
                <div class="tx-type">${tx.type}</div>
                <div class="tx-amount">-$${tx.amount}</div>
                <div class="tx-date">${tx.date}</div>
            `;

            historyList.appendChild(item);

        });

    } catch (err) {

        console.error(err);

        alert("Failed loading dashboard");

    }

}

/* =========================================
   SEND PAYMENT
========================================= */

sendBtn.addEventListener("click", async () => {

    const to = sendTo.value.trim();
    const amount = Number(sendAmount.value);

    if (!to || !amount) {

        alert("Fill all fields");
        return;

    }

    const token = localStorage.getItem("corax_token");

    try {

        const response = await fetch(`${API}/send`, {

            method: "POST",

            headers: {

                "Content-Type": "application/json",
                Authorization: token

            },

            body: JSON.stringify({
                to,
                amount
            })

        });

        const data = await response.json();

        if (data.success) {

            createExplosion(sendBtn);

            sendTo.value = "";
            sendAmount.value = "";

            loadDashboard();

        } else {

            alert(data.error || "Payment failed");

        }

    } catch (err) {

        console.error(err);

        alert("Server error");

    }

});

/* =========================================
   LOGOUT
========================================= */

logoutBtn.addEventListener("click", () => {

    localStorage.removeItem("corax_token");

    dashboard.style.display = "none";
    authScreen.style.display = "flex";

});

/* =========================================
   PARTICLE EXPLOSION FX
========================================= */

function createExplosion(button) {

    const rect = button.getBoundingClientRect();

    for (let i = 0; i < 25; i++) {

        const particle = document.createElement("span");

        particle.className = "particle";

        document.body.appendChild(particle);

        particle.style.left =
            rect.left + rect.width / 2 + "px";

        particle.style.top =
            rect.top + rect.height / 2 + "px";

        const x =
            (Math.random() - 0.5) * 300;

        const y =
            (Math.random() - 0.5) * 300;

        particle.animate(

            [
                {
                    transform: "translate(0,0) scale(1)",
                    opacity: 1
                },

                {
                    transform:
                        `translate(${x}px, ${y}px) scale(0)`,
                    opacity: 0
                }

            ],

            {
                duration: 900,
                easing: "cubic-bezier(.17,.67,.83,.67)"
            }

        );

        setTimeout(() => {

            particle.remove();

        }, 900);

    }

}

/* =========================================
   LIVE BALANCE FX
========================================= */

setInterval(() => {

    const balance = document.getElementById("balanceCard");

    if (balance) {

        balance.animate(

            [
                {
                    boxShadow:
                        "0 0 20px rgba(168,85,247,.15)"
                },

                {
                    boxShadow:
                        "0 0 40px rgba(168,85,247,.45)"
                },

                {
                    boxShadow:
                        "0 0 20px rgba(168,85,247,.15)"
                }

            ],

            {
                duration: 3000
            }

        );

    }

}, 3200);

/* =========================================
   MOBILE HAPTIC FEEDBACK
========================================= */

document.querySelectorAll("button").forEach(btn => {

    btn.addEventListener("click", () => {

        if (navigator.vibrate) {

            navigator.vibrate(25);

        }

    });

});

/* =========================================
   CORΛX SYSTEM READY
========================================= */

console.log("CORΛX APP INITIALIZED 🚀");
