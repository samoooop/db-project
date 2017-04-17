var chartColors = window.chartColors;
var color = Chart.helpers.color;
var config = {
    type: 'pie',
    data: {
        datasets: [{
            data: [
                145, 5, 2, 1
            ],
            backgroundColor: [
                color(chartColors.green).alpha(1).rgbString(),
                color(chartColors.red).alpha(1).rgbString(),
                color(chartColors.orange).alpha(1).rgbString(),
                color(chartColors.yellow).alpha(1).rgbString(),
            ],
            label: 'My dataset' // for legend
        }],
        labels: [
            "ปกติ",
            "Under Probation",
            "On Leave",
            "Exchange",
        ]
    },
    options: {
        responsive: true,
        legend: {
            position: 'right',
        },
        title: {
            display: true,
            text: 'Chart.js Polar Area Chart'
        },
        scale: {
            ticks: {
                beginAtZero: true
            },
            reverse: false
        },
        animation: {
            animateRotate: false,
            animateScale: true
        }
    }
};

var ctx = document.getElementById("overviewChart");
window.overviewChart = new Chart(ctx, config);