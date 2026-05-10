// =========================================
// CORΛX NOTIFICATIONS.JS
// Push Notification System
// =========================================

// =========================================
// START
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    initializeNotifications();

});

// =========================================
// INIT
// =========================================

async function initializeNotifications(){

    if(!("Notification" in window)){

        console.log(
            "Notifications not supported"
        );

        return;

    }

    // =====================================
    // REQUEST PERMISSION
    // =====================================

    const permission =
        await Notification.requestPermission();

    if(permission === "granted"){

        console.log(
            "CORΛX Notifications Enabled 🔔"
        );

        showWelcomeNotification();

    }

}

// =========================================
// WELCOME
// =========================================

function showWelcomeNotification(){

    new Notification(

        "CORΛX",

        {

            body:
            "Money Without Borders 🚀",

            icon:
            "/icon-192.png",

            badge:
            "/icon-192.png"

        }

    );

}

// =========================================
// MARKET ALERT
// =========================================

function showMarketAlert(price){

    new Notification(

        "CRX Market Update",

        {

            body:
            `CRX moved to $${price}`,

            icon:
            "/icon-192.png"

        }

    );

}

// =========================================
// SEND ALERT
// =========================================

function sendTransactionAlert(type,amount){

    new Notification(

        "Wallet Activity",

        {

            body:
            `${type}: ${amount}`,

            icon:
            "/icon-192.png"

        }

    );

}

// =========================================
// LIVE TEST
// =========================================

setTimeout(() => {

    if(Notification.permission === "granted"){

        showMarketAlert("2.48");

    }

},12000);

// =========================================
// READY
// =========================================

console.log(
    "CORΛX Notification Engine Active 🔔"
);
