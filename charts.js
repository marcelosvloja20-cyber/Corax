// =========================================
// CORΛX CHARTS.JS
// Live Web3 Market Charts
// =========================================

// =========================================
// START
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    initializeMainChart();

    initializeMiniCharts();

    initializeLiveTicker();

});

// =========================================
// MAIN CHART
// =========================================

function initializeMainChart(){

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

        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun"

    ];

    const values = [

        1.20,
        1.42,
        1.60,
        1.54,
        1.88,
        2.10,
        2.48

    ];

    // =====================================
    // CHART
    // =====================================

    const chart =
        new Chart(ctx, {

            type:"line",

            data:{

                labels,

                datasets:[{

                    label:"CRX",

                    data:values,

                    borderColor:"#A855F7",

                    backgroundColor:
                        "rgba(168,85,247,.12)",

                    borderWidth:4,

                    tension:.45,

                    fill:true,

                    pointRadius:5,

                    pointHoverRadius:7,

                    pointBackgroundColor:"#fff",

                    pointBorderColor:"#A855F7",

                    pointBorderWidth:3

                }]

            },

            options:{

                responsive:true,

                maintainAspectRatio:false,

                plugins:{

                    legend:{

                        display:false

                    }

                },

                scales:{

                    x:{

                        ticks:{

                            color:"rgba(255,255,255,.55)"

                        },

                        grid:{

                            color:
                            "rgba(255,255,255,.03)"

                        }

                    },

                    y:{

                        ticks:{

                            color:"rgba(255,255,255,.55)"

                        },

                        grid:{

                            color:
                            "rgba(255,255,255,.03)"

                        }

                    }

                }

            }

        });

    // =====================================
    // LIVE UPDATE
    // =====================================

    setInterval(() => {

        const next =
            (
                values[values.length - 1]
                +
                ((Math.random() - .4) * .18)
            ).toFixed(2);

        values.push(next);

        values.shift();

        chart.update();

        updatePrice(next);

    },3500);

}

// =========================================
// LIVE PRICE
// =========================================

function updatePrice(price){

    const live =
        document.getElementById(
            "livePrice"
        );

    if(!live) return;

    const percent =
        (
            (Math.random() * 4)
        ).toFixed(2);

    live.innerText =
        `+${percent}%`;

    live.animate([

        {

            transform:"scale(1)"

        },

        {

            transform:"scale(1.15)"

        },

        {

            transform:"scale(1)"

        }

    ],{

        duration:500

    });

}

// =========================================
// MINI CHARTS
// =========================================

function initializeMiniCharts(){

    console.log(
        "Mini charts loaded 🚀"
    );

}

// =========================================
// LIVE TICKER
// =========================================

function initializeLiveTicker(){

    const prices = [

        "BTC $68,420",
        "ETH $3,180",
        "SOL $188",
        "CRX $2.48"

    ];

    let index = 0;

    setInterval(() => {

        console.log(
            "Ticker:",
            prices[index]
        );

        index++;

        if(index >= prices.length){

            index = 0;

        }

    },2500);

}

// =========================================
// READY
// =========================================

console.log(
    "CORΛX Charts Engine Active 📈"
);
