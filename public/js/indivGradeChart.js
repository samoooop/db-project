var rainbow = new Rainbow();
var randomScalingFactor = function() {
    return Math.round(Math.random() * 100);
};

var indivGradeChartConfig = {
    type: 'bar',
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label: "จำนวนนิสิต",
            data: [2.5, 3.3, 3.0, 3.4, 3.5],
            fill: false,
            pointRadius: 5,
            pointHoverRadius: 5,
            showLine: false // no line shown
        }]
    },
    options: {
        responsive: true,
        title: {
            display: true,
        },
        legend: {
            display: false
        },
        elements: {
            point: {
                pointStyle: 'circle'
            }
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Value'
                },
                ticks: {
                    suggestedMin: 0.0,
                    suggestedMax: 4.0,
                }
            }]
        }
    }
};


var ctx = document.getElementById("indivGradeChart");
var indivGradeChart = new Chart(ctx, indivGradeChartConfig);

function createIndivGradeChart() {
    var step = 0.1
    var ctx = document.getElementById("indivGradeChart");
    var newData = [randomScalingFactor()];
    var newLabel = ["<2"];

    indivGradeChart.destroy();
    for (var i = 2; i <= 4; i += step) {
        var j = Number((i).toFixed(1));
        newData.push(randomScalingFactor());
        newLabel.push('>' + j);
    }
    var numberOfItems = 4 / step;
    rainbow.setNumberRange(1, numberOfItems);
    rainbow.setSpectrum('grey', 'skyblue');
    var colors = [];
    for (var i = 1; i <= numberOfItems; i++) {
        var hexColour = rainbow.colourAt(i);
        colors.push('#' + hexColour);
    }
    // console.log(colors);
    // console.log(newData);
    indivGradeChartConfig.data.labels = newLabel;
    indivGradeChartConfig.data.datasets[0].data = newData;
    indivGradeChartConfig.data.datasets[0].backgroundColor = colors;
    // indivGradeChartConfig.data.datasets[0].pointBackgroundColor = colors;
    indivGradeChart = new Chart(ctx, indivGradeChartConfig);
    // indivGradeChart.update();
}