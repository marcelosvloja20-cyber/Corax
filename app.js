/* =========================================
   CORΛX APP.JS
   FIXED VERSION
   FULL AUTH SYSTEM
========================================= */

const API = "https://corax-backend-92zg.onrender.com";

/* =========================================
   WAIT DOM LOAD
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       ELEMENTS
    ===================================== */

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

    /* =====================================
       CHECK ELEMENTS
    ===================================== */

    console.log("CORΛX APP STARTED");

    console.log(loginBtn);
    console.log(registerBtn);

    /* =====================================
       AUTO LOGIN
    ===================================== */

    const token = localStorage.getItem("corax_token");

    if (token) {

        loadDashboard();

    }

    /* =====================================
       REGISTER
    ===================================== */

    if (registerBtn) {

        registerBtn.onclick = async () => {

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            if (!email || !password) {

                alert("Fill all fields");
                return;

            }

            try {

                registerBtn.innerText = "Creating...";

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

                console.log(data);

                if (data.success) {

                    createExplosion(registerBtn);

                    alert("Account created 🚀");

                    registerBtn.innerText = "Create Account";

                } else {

                    alert(data.error || "Register failed");

                    registerBtn.innerText = "Create Account";

                }

            } catch (err) {

                console.error(err);

                alert("Server error");

                registerBtn.innerText = "Create Account";

            }

        };

    }

    /* =====================================
       LOGIN
    ===================================== */

    if (loginBtn) {

        loginBtn.onclick = async () => {

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            if (!email || !password) {

                alert("Fill all fields");
                return;

            }

            try {

                loginBtn.innerText = "Loading...";

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

                console.log(data);

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

                loginBtn.innerText = "Login";

            } catch (err) {

                console.error(err);

                alert("Server error");

                loginBtn.innerText = "Login";

            }

        };

    }

    /* =====================================
       LOAD DASHBOARD
    ===================================== */

    async function loadDashboard() {

        const token = localStorage.getItem("corax_token");

        if (!token) return;

        authScreen.style.display = "none";
        dashboard.style.display = "flex";

        try {

            const response = await fetch(`${API}/balance`, {

                method: "GET",

                headers: {
                    Authorization: token
                }

            });

            const data = await response.json();

            balanceValue.innerText =
                `$${Number(data.balance).toFixed(2)}`;

            loadHistory();

        } catch (err) {

            console.error(err);

        }

    }

    /* =====================================
       HISTORY
    ===================================== */

    async function loadHistory() {

        const token = localStorage.getItem("corax_token");

        try {

            const response = await fetch(`${API}/history`, {

                method: "GET",

                headers: {
                    Authorization: token
                }

            });

            const history = await response.json();

            historyList.innerHTML = "";

            if (!history.length) {

                historyList.innerHTML = `
                    <div class="empty-history">
                        No transactions yet
                    </div>
                `;

                return;

            }

            history.reverse().forEach(tx => {

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

        }

    }

    /* =====================================
       SEND PAYMENT
    ===================================== */

    if (sendBtn) {

        sendBtn.onclick = async () => {

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

            }

        };

    }

    /* =====================================
       LOGOUT
    ===================================== */

    if (logoutBtn) {

        logoutBtn.onclick = () => {

            localStorage.removeItem("corax_token");

            dashboard.style.display = "none";
            authScreen.style.display = "flex";

        };

    }

    /* =====================================
       PARTICLE FX
    ===================================== */

    function createExplosion(button) {

        const rect = button.getBoundingClientRect();

        for (let i = 0; i < 20; i++) {

            const particle = document.createElement("span");

            particle.className = "particle";

            document.body.appendChild(particle);

            particle.style.left =
                rect.left + rect.width / 2 + "px";

            particle.style.top =
                rect.top + rect.height / 2 + "px";

            const x =
                (Math.random() - 0.5) * 250;

            const y =
                (Math.random() - 0.5) * 250;

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
                    duration: 800
                }

            );

            setTimeout(() => {

                particle.remove();

            }, 800);

        }

    }

    /* =====================================
       MOBILE VIBRATION
    ===================================== */

    document.querySelectorAll("button").forEach(btn => {

        btn.addEventListener("click", () => {

            if (navigator.vibrate) {

                navigator.vibrate(25);

            }

        });

    });

    console.log("CORΛX READY 🚀");

});
