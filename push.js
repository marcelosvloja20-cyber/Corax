/* ===================================
   CORΛX PUSH NOTIFICATIONS
=================================== */

async function enableNotifications(){

if(!("Notification" in window)){
alert("Notifications not supported");
return;
}

const permission = await Notification.requestPermission();

if(permission === "granted"){

new Notification("CORΛX", {
body: "Notifications enabled 🚀",
icon: "logo.png"
});

}else{
alert("Permission denied");
}

}

/* TEST NOTIFICATION */
function sendTestNotification(){

if(Notification.permission === "granted"){

new Notification("Payment Received", {
body: "You received $120 💰",
icon: "logo.png"
});

}

}
