// =========================================
// CORΛX REGISTER-SW.JS
// Service Worker Loader
// =========================================

// =========================================
// REGISTER
// =========================================

if("serviceWorker" in navigator){

    window.addEventListener("load", () => {

        navigator.serviceWorker

        .register("/service-worker.js")

        .then(registration => {

            console.log(

                "CORΛX Service Worker Registered 🚀",
                registration.scope

            );

        })

        .catch(error => {

            console.log(

                "CORΛX SW Error ❌",
                error

            );

        });

    });

}

// =========================================
// INSTALL PROMPT
// =========================================

let deferredPrompt;

window.addEventListener(

    "beforeinstallprompt",

    e => {

        e.preventDefault();

        deferredPrompt = e;

        showInstallButton();

    }

);

// =========================================
// INSTALL BUTTON
// =========================================

function showInstallButton(){

    const button =
        document.createElement("button");

    button.innerText =
        "Install CORΛX";

    button.className =
        "install-btn";

    document.body.appendChild(button);

    button.addEventListener("click", async () => {

        if(!deferredPrompt) return;

        deferredPrompt.prompt();

        const choice =
            await deferredPrompt.userChoice;

        if(choice.outcome === "accepted"){

            console.log(
                "CORΛX Installed ✅"
            );

        } else {

            console.log(
                "CORΛX Install Cancelled"
            );

        }

        deferredPrompt = null;

        button.remove();

    });

}

// =========================================
// APP INSTALLED
// =========================================

window.addEventListener("appinstalled", () => {

    console.log(
        "CORΛX App Installed 🚀"
    );

});

// =========================================
// NETWORK STATUS
// =========================================

window.addEventListener("offline", () => {

    createToast(
        "Offline Mode Enabled"
    );

});

window.addEventListener("online", () => {

    createToast(
        "Connection Restored"
    );

});

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
// READY
// =========================================

console.log("CORΛX PWA SYSTEM READY 📱");
