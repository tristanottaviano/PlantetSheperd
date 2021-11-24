//Ran when the page is loaded
$(document).ready(function($) {
    
    $("#detailedAnalysisButton").click(function(){

        $("#analysisModal").show();

    });
    $("#closeAnalysisModal").click(closeModal);

});

function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}


/* energyRepartitionGraph */
const eneregyLabels = [
    'Wind',
    'Solar',
    'Hydro', 
];

/* monthlyroductionGraph */
const monthLabels = [
    'September',
    'October',
    'November',
    'December',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August'
];

/* hourly ProductionGraph */
const hourLabels = [
    '00:00',
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00',
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00'
];

//Config the grpahs
//Energy Repartition
const energyRepartitionData = {
    labels: eneregyLabels,
    datasets: [{
        label: 'Energy repartition(kWh)',
        backgroundColor: [
            'rgb(150, 200, 250)',
            'rgb(255, 200, 86)',
            'rgb(50, 180, 235)',
        ],
        borderColor: 'rgb(10, 10, 10)',
        data: [45,25,30],
        hoverOffset: 2
    }]
};

const energyRepartitionGraphConfig = {
    type: 'doughnut',
    data: energyRepartitionData,
    options: {
        borderWidth: 0,
        plugins:{
            legend:{
                display: false,
            },
            title:{
                display: true,
                color: 'rgb(255,255,255)',
                text: 'Energy productction repartition(kWh)'
                
            }
        }        
    }
};

//Potential repartition
const potentialRepartitionData = {
    labels: eneregyLabels,
    datasets: [{
        label: 'Energy potential repartition(kWh)',
        backgroundColor: [
            'rgb(150, 200, 250)',
            'rgb(255, 200, 86)',
            'rgb(50, 180, 235)',

        ],
        borderColor: 'rgb(10, 10, 10)',
        data: [45,25,30],
        hoverOffset: 2
    }]
};

const potentialRepartitionGraphConfig = {
    type: 'doughnut',
    data: potentialRepartitionData,
    options: {
        borderWidth: 0,
        plugins:{
            legend:{
                display: false,
            },
            title:{
                display: true,
                color: 'rgb(255,255,255)',
                text: 'Energy potential repartition(kWh)'
            }
        }        
    }
};

const monthlyProductionData = {
    labels: monthLabels,
    datasets: [{
        label: 'Total',
        backgroundColor: 'rgb(250, 250, 250)',
        data: [56, 52, 47, 48, 51, 59, 60, 65, 64, 60, 58, 56],
    },
    {
        label: 'Wind',
        backgroundColor: 'rgb(150, 200, 250)',
        data: [56*0.3, 52*0.3, 47*0.2, 48*0.2, 51*0.3, 59*0.3, 60*0.3, 65*0.3, 64*0.3, 60*0.3, 58*0.3, 56*0.3],
    },
    {
        label: 'Hydrolic',
        backgroundColor: 'rgb(50, 180, 235)',
        data: [56*0.5, 52*0.6, 47*0.7, 48*0.7, 51*0.5, 59*0.5, 60*0.45, 65*0.3, 64*0.55, 60*0.5, 58*0.5, 56*0.5],
    },
    {
        label: 'Solar',
        backgroundColor: 'rgb(255, 200, 86)',
        data: [56*0.2, 52*0.15, 47*0.1, 48*0.12, 51*0.16, 59*0.2, 60*0.5, 65*0.3, 64*0.1, 60*0.2, 58*0.3, 56*0.3],
    }]
};

const monthlyProductionGraphConfig = {
    type: 'bar',
    data: monthlyProductionData,
    options: {
        borderWidth: 0,
        plugins:{
            legend:{
                display: false,
            },
            scales:{
                x:{
                    ticks:{
                        color:'rgb(255,255,255)'
                    }
                }
            },
            title:{
                display: true,
                color: 'rgb(255,255,255)',
                text: 'Monthly enegry prduction (MWh)'
            }
        }        
    }
};

const hourlyProductionData = {
    labels: hourLabels,
    datasets: [{
        label: 'Total',
        backgroundColor: 'rgb(250, 250, 250)',
        borderColor: 'rgb(250, 250, 250)',
        data: [35, 38, 40, 36, 38, 43, 48, 50, 51, 55, 52, 56, 52, 53, 55, 58, 55, 55, 56, 54, 52, 49, 48, 44],
    },
    {
        label: 'Wind',
        backgroundColor: 'rgb(150, 200, 250)',
        borderColor: 'rgb(150, 200, 250)',
        data: [40*0.3, 41*0.3, 40*0.3, 36*0.3, 38*0.3, 43*0.3, 48*0.3, 50*0.3, 51*0.3, 55*0.3, 52*0.3, 56*0.3, 52*0.3, 53*0.3, 53*0.3, 54*0.3, 51*0.3, 59*0.3, 60*0.3, 65*0.3, 64*0.3, 58*0.3, 55*0.3, 44*0.3],

    },
    {
        label: 'Hydrolic',
        backgroundColor: 'rgb(50, 180, 235)',
        borderColor: 'rgb(50, 180, 235)',
        data: [40*0.5, 41*0.5, 40*0.5, 38*0.5, 38*0.5, 43*0.5, 40*0.5, 43*0.5, 42*0.5, 38*0.5, 38*0.5, 45*0.5, 40*0.5, 42*0.5, 38*0.5, 37*0.5, 40*0.5, 45*0.5, 46*0.5, 41*0.5, 40*0.5, 39*0.5, 42*0.5, 44*0.5],

    },
    {
        label: 'Solar',
        backgroundColor: 'rgb(255, 200, 86)',
        borderColor: 'rgb(255, 200, 86)',
        data: [2*0.2, 3*0.2, 5*0.2, 10*0.2, 33*0.2, 43*0.2, 50*0.2, 55*0.2, 51*0.2, 55*0.2, 58*0.2, 58*0.2, 56*0.2, 53*0.2, 59*0.2, 60*0.2, 55*0.2, 52*0.2, 48*0.2, 40*0.2, 32*0.2, 23*0.2, 10*0.2, 5*0.2],
        
    }],
    fill: false,
    showLine: true
};

const hourlyProductionGraphConfig = {
    type: 'line',
    data: hourlyProductionData,
    options: {
        plugins:{
            legend:{
                display: false,
            },
            title:{
                display: true,
                color: 'rgb(255,255,255)',
                text: 'Hourly enegry production(kWh)'
            }
        } 
    }
};

const hourlyConsomationData = {
    labels: hourLabels,
    datasets: [{
        label: 'Total',
        backgroundColor: 'rgb(250, 250, 250)',
        borderColor: 'rgb(250, 250, 250)',
        data: [40, 41, 40, 36, 38, 43, 48, 50, 51, 55, 52, 56, 52, 53, 53, 54, 51, 59, 60, 65, 64, 58, 55, 44],
    }],
    fill: false,
    showLine: true
};

const hourlyConsomationGraphConfig = {
    type: 'line',
    data: hourlyConsomationData,
    options: {
        plugins:{
            legend:{
                display: false,
            },
            title:{
                display: true,
                color: 'rgb(255,255,255)',
                text: 'Hourly enegry consumption (kWh)'
            }
        } 
    }
};

const consomationVsProductionData = {
    labels: monthLabels,
    datasets: [{
        label: 'Production',
        backgroundColor: 'rgb(240, 240, 240)',
        data: [56, 52, 47, 48, 51, 59, 60, 65, 64, 60, 58, 56],
    },
    {
        label: 'Consomation',
        backgroundColor: 'rgb(20, 20, 20)',
        data: [56.1, 52.8, 47.2, 47.9, 51.1, 59.2, 60.6, 66.1, 64.6, 60.8, 58.1, 55.9],
    }]
};

const consomationVsProductionGraphConfig = {
    type: 'bar',
    data: consomationVsProductionData,
    options: {
        borderWidth: 0,
        plugins:{
            legend:{
                display: false,
            },
            title:{
                display: true,
                color: 'rgb(255,255,255)',
                text: 'Monthly Consumption VS Production (MWh)'
            }
        }        
    }
};

//Display the graphs
var energyRepartitionChart = new Chart( 
    document.getElementById("energyRepartitionGraph"),
    //Potential /!\
    potentialRepartitionGraphConfig
);

var energyRepartitionChart2 = new Chart( 
    document.getElementById("energyRepartitionGraph2"),
    energyRepartitionGraphConfig
);

var potentialRepartitionChart = new Chart( 
    document.getElementById("potentialRepartitionGraph"),
    potentialRepartitionGraphConfig
);

var monthlyProductionChart = new Chart( 
    document.getElementById("monthlyProductionGraph"),
    monthlyProductionGraphConfig
);
    
var hourlyProductionChart = new Chart( 
    document.getElementById("hourlyProductionGraph"),
    hourlyProductionGraphConfig
    );
    
var hourlyConsomationChart = new Chart( 
    document.getElementById("hourlyConsomationGraph"),
    hourlyConsomationGraphConfig
);

var consomationVsProductionChart = new Chart( 
    document.getElementById("consomationVsProductionGraph"),
    consomationVsProductionGraphConfig
);

//Refresh the analysis modal
function refreshGraphPanel(state){

    //Refresh the panel text
    $('#graphPanelConstructionCost').text("Construction cost: " + parseInt(pinCostAverage(state),10) +"$");
    $('#graphPanelMaintenanceCost').text("Maintenance cost: " + (parseInt(pinCostAverage(state),10)/5.5).toFixed(0) +"$/Yr");
    var sum = parseInt(pinEolienProdAverage(state),10)+parseInt(pinSolaireProdAverage(state),10)+parseInt(pinHydroProdAverage(state),10);
    $('#graphPanelProduction').text("Production : " + sum.toFixed(0) +"kWh/Month");

    var energyRepartitionDataset = [
        parseInt(pinEolienProdAverage(state),10),
        parseInt(pinSolaireProdAverage(state),10),
        parseInt(pinHydroProdAverage(state),10),
    ];
    
    var potentialRepartitionDataset = [
        parseInt(eolienAverage(state),10),
        parseInt(solaireAverage(state),10),
        parseInt(hydroAverage(state),10),
    ];

    
    console.log(potentialRepartitionDataset);
    console.log(energyRepartitionDataset);
    
    potentialRepartitionChart.data.datasets[0].data = potentialRepartitionDataset;
    potentialRepartitionChart.update();
    
    //energyRepartitionChart2.data.datasets[0].data = potentialRepartitionDataset;
    //energyRepartitionChart2.update();
    
    if (pinList.length!=0){

        //energyRepartitionChart.data.datasets[0].data = energyRepartitionDataset;
        //energyRepartitionChart.update();

    }


}














