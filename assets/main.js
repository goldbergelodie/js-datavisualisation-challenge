const table = document.getElementById('table1');


//assign variables


let json = [];
let years = [];
let countries = [];


/*year variable*/
for (let a = 0; a < table.rows[1].cells.length - 2; a++) {
    years[a] = table.rows[1].cells[a + 2].innerHTML;
}

/*country variable*/

for (let b = 0; b < table.rows.length - 2; b++) {
    countries[b] = table.rows[b + 2].cells[1].innerHTML.replace(/\W/gi, '');
}

/*tables*/

for (let c = 0; c < table.rows.length - 2; c++) {
    let tableRow = table.rows[c + 2];
    let rowData = [];
    for (let d = 0; d < table.rows[2].cells.length - 2; d++) {
        rowData.push(tableRow.cells[d + 2].innerHTML);
    }
    json.push(rowData);
}


/*graphic charts of crimes recorded*/

const container = document.getElementById('Crimes_et_d.C3.A9lits_enregistr.C3.A9s_par_les_services_de_police');
let data = {
    categories: years,
    series: []
};

// json data

for (let e = 0; e < countries.length; e++) {
    let countryData = {};
    countryData.name = countries[e];
    countryData.data = json[e];
    data.series.push(countryData);
}

const options = {
    chart: {
        width: 850,
        height: 550,
        title: 'Crimes in Europe'
    },
    yAxis: {
        title: 'Number of Crimes in thousands',
    },
    xAxis: {
        title: 'Year',
        pointOnColumn: true,
        dateFormat: 'MM',
        tickInterval: 'auto'
    },
    series: {
        showDot: false,
        zoomable: true
    },
    tooltip: {
        suffix: 'thousands'
    }

};
const theme = {
    series: {
        colors: [
            '#83b14e', '#458a3f', '#295ba0', '#2a4175', '#289399',
            '#289399', '#617178', '#8a9a9a', '#516f7d', '#dddddd'
        ]
    }
};


const chart = tui.chart.lineChart(container, data, options);


// ===============HOMICIDE TABLE=========================

const homicideTable = document.getElementById('table2');

let homicideCountries = [];
let homicideJSON = [];


// get countries from table

for (let y = 0; y < homicideTable.rows.length - 1; y++) {
    homicideCountries[y] = homicideTable.rows[y + 1].cells[1].innerHTML;
}

// get homicide data

for (let d = 0; d < homicideTable.rows[1].cells.length - 2; d++) {
    let rowData = [];
    for (k = 0; k < homicideTable.rows.length - 1; k++) {
        let tableRow = homicideTable.rows[k + 1];
        rowData.push(tableRow.cells[d + 2].innerHTML);
    }
    homicideJSON.push(rowData);
}
// Homicide chart API from TOAST UI chart.

var homicideContainer = document.getElementById('Homicides');
var homicideData = {
    categories: homicideCountries,
    series: [
        {
            name: '2007-09',
            data: homicideJSON[0]
        },
        {
            name: '2010-12',
            data: homicideJSON[1]
        }
    ]
};
var homicideOptions = {
    chart: {
        width: 900,
        height: 1000,
        title: 'Homicides in Euroupe',
        format: '1,000'
    },
    yAxis: {
        title: 'Countries'
    },
    xAxis: {
        title: 'Number of Cases(per 100,000 inhabitants)',
        min: 0,
        max: 400,
        suffix: ''
    },
    series: {
        showLabel: true
    }
};
var theme1 = {
    series: {
        colors: [
            '#83b14e', '#458a3f', '#295ba0', '#2a4175', '#289399',
            '#289399', '#617178', '#8a9a9a', '#516f7d', '#dddddd'
        ]
    }
};

tui.chart.barChart(homicideContainer, homicideData, homicideOptions);




// SECOND CHART


const xData = [];
const yData = [];

fetch('https://canvasjs.com/services/data/datapoints.php')
    .then(response => response.json()
        .then(data => { // data is an array
            data.forEach((element) => {
                xData.push(element[0]);
                yData.push(element[1]);
            })
            updateData(); // add and update xData and yData into chartJS
            updateChart();
        }))

// fetch new data every second then push 1 pair (out of 10) into datasets.
const updateChart = () => {
    fetch('https://canvasjs.com/services/data/datapoints.php')
        .then(response => response.json()
            .then(data => {
                yData.push(data[5][1]); // 5 can be changed to any number within 0-9
                xData.push(xData.length);
                updateData(); // add and update xData and yData into chartJS
                setTimeout(function () { updateChart() }, 1000);
            }))
}

// every second a new array of data is fetched, new data is added and updated
const updateData = () => {
    chartJS.data.labels = xData;
    chartJS.data.datasets[0].data = yData;
    chartJS.update();
}

// Insert <canvas> into DOM

document.getElementById('firstHeading').insertAdjacentHTML('beforeend', "<canvas id='myChart'></canvas>");

// Chart.js line chart API

var ctx = document.getElementById('myChart').getContext('2d');
var chartJS = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: [],
        datasets: [{
            label: 'Crimes Statistics In Europe',
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'transparent',
            data: []
        }]
    },
    // Configuration options go here
    options: {}
});
