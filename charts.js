// =========================================
// CORΛX CHARTS.JS
// Premium Market Charts
// =========================================

// =========================================
// START
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    initializeMarketChart();

});

// =========================================
// MARKET CHART
// =========================================

function initializeMarketChart(){

    const canvas =
        document.getElementById(
            "marketChart"
        );

    if(!canvas) return;

    const ctx =
        canvas.getContext("2d");

    // =====================================
    // DATA
    // =====================================

    const labels = [

        "MON",
        "TUE",
        "WED",
        "THU",
        "FRI",
        "SAT",
        "SUN"

    ];

    const prices = [

        0.42,
        0.58,
        0.82,
        1.14,
        1.48,
        1.92,
        2.48

    ];

    // =====================================
    // GRADIENT
    // =====================================

    const gradient =
        ctx.createLinearGradient(
            0,
            0,
            0,
            260
        );

    gradient.addColorStop(

        0,

        "rgba(168,85,247,.45)"

    );

    gradient.addColorStop(

        1,

        "rgba(168,85,247,0)"

    );

    // =====================================
    // CHART
    // =====================================

    new Chart(ctx, {

        type:"line",

        data:{

            labels,

            datasets:[{

                label:"CRX",

                data:prices,

                borderColor:"#A855F7",

                backgroundColor:
                gradient,

                fill:true,

                tension:.45,

                borderWidth:4,

                pointRadius:0,

                pointHoverRadius:8,

                pointHoverBorderWidth:3,

                pointHoverBackgroundColor:
                "#ffffff",

                pointHoverBorderColor:
                "#A855F7"

            }]

        },

        options:{

            responsive:true,

            maintainAspectRatio:false,

            interaction:{

                intersect:false,
                mode:"index"

            },

            plugins:{

                legend:{

                    display:false

                },

                tooltip:{

                    backgroundColor:
                    "#111111",

                    borderColor:
                    "#A855F7",

                    borderWidth:1,

                    padding:14,

                    titleColor:"#fff",

                    bodyColor:"#fff",

                    displayColors:false

                }

            },

            scales:{

                x:{

                    grid:{

                        display:false

                    },

                    ticks:{

                        color:
                        "rgba(255,255,255,.45)",

                        font:{

                            size:12,
                            weight:"600"

                        }

                    }

                },

                y:{

                    grid:{

                        color:
                        "rgba(255,255,255,.04)"

                    },

                    ticks:{

                        color:
                        "rgba(255,255,255,.45)",

                        callback:value => {

                            return "$" + value;

                        }

                    }

                }

            }

        }

    });

    // =====================================
    // LIVE PRICE
    // =====================================

    startLivePrice();

}

// =========================================
// LIVE PRICE FX
// =========================================

function startLivePrice(){

    const livePrice =
        document.getElementById(
            "livePrice"
        );

    if(!livePrice) return;

    let value = 2.48;

    setInterval(() => {

        const movement =
            (Math.random() * .12) - .06;

        value += movement;

        if(value < 0){

            value = 0.12;

        }

        const formatted =
            value.toFixed(2);

        const positive =
            movement >= 0;

        livePrice.innerText =

            (positive ? "+" : "-")
            +
            Math.abs(movement * 100)
            .toFixed(2)
            +
            "%";

        livePrice.className =

            positive
            ?
            "positive"
            :
            "negative";

    },2500);

}

// =========================================
// READY
// =========================================

console.log(
    "CORΛX Charts Engine Active 📈"
);
