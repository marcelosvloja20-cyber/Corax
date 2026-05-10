// =========================================
// CORΛX REGISTER-SW.JS
// Service Worker Registration
// =========================================

// =========================================
// START
// =========================================

window.addEventListener(

    "load",

    () => {

        registerServiceWorker();

    }

);

// =========================================
// REGISTER
// =========================================

async function registerServiceWorker(){

    // =====================================
    // SUPPORT CHECK
    // =====================================

    if(

        !("serviceWorker" in navigator)

    ){

        console.log(
            "Service Worker not supported"
        );

        return;

    }

    try{

        // =================================
        // REGISTER
        // =================================

        const registration =

            await navigator
            .serviceWorker
            .register(

                "/service-worker.js"

            );

        console.log(

            "CORΛX Service Worker Registered 🚀",

            registration

        );

        // =================================
        // UPDATE FOUND
        // =================================

        registration.addEventListener(

            "updatefound",

            () => {

                console.log(
                    "New update detected ⚡"
                );

            }

        );

    } catch(error){

        console.error(

            "Service Worker Error:",

            error

        );

    }

}

// =========================================
// ONLINE
// =========================================

window.addEventListener(

    "online",

    () => {

        createConnectionToast(

            "Connection Restored 🌐"

        );

    }

);

// =========================================
// OFFLINE
// =========================================

window.addEventListener(

    "offline",

    () => {

        createConnectionToast(

            "Offline Mode Enabled ⚡"

        );

    }

);

// =========================================
// TOAST
// =========================================

function createConnectionToast(message){

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
// READY
// =========================================

console.log(
    "CORΛX PWA Engine Active 📲"
);
