var randomScalingFactor = function() {
    return Math.round(Math.random() * 100);
};

var datapoints = [2.5, 3.3, 3.0, 3.4, 3.5];
var config = {
    type: 'line',
    data: {
        labels: ["ปี1", "ปี2", "ปี3", "ปี4", "Other"],
        datasets: [{
            label: "เกรดเฉลี่ย",
            data: datapoints,
            borderColor: "rgb(0,200,0)",
            backgroundColor: 'rgba(0, 200, 0, 0)',
            fill: true,
            lineTension: 0
        }]
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: ""
        },
        tooltips: {
            mode: 'index'
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
                    suggestedMin: 2.0,
                    suggestedMax: 4.0,
                }
            }]
        }
    }
};

var ctx = document.getElementById("gradeChart");
window.myLine = new Chart(ctx, config);