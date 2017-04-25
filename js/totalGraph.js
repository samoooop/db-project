var totalChartData = {
    labels: ["ปี1", "ปี2", "ปี3", "ปี4", "Other"],
    datasets: [{
        label: 'ปกติ',
        backgroundColor: "rgb(75, 200, 75)",
        data: [
            40, 30, 24, 20, 30
        ]
    }, {
        label: 'under probation',
        backgroundColor: "rgb(255, 50, 50)",
        data: [
            0, 5, 1, 4, 3
        ]
    }, {
        label: 'leaving',
        backgroundColor: "rgb(255, 99, 0)",
        data: [
            0, 5, 1, 4, 3
        ]
    }, {
        label: 'exchange',
        backgroundColor: "rgb(255, 175, 45)",
        data: [
            0, 5, 1, 4, 3
        ]
    }]

};
var ctx = document.getElementById("totalChart");

var totalChart = new Chart(ctx, {
    type: 'horizontalBar',
    backgroundColor: "rgb(255, 255, 255)",
    data: totalChartData,
    options: {
        title: {
            display: true,
            text: ""
        },
        tooltips: {
            mode: 'index',
            intersect: false
        },
        responsive: true,
        scales: {
            xAxes: [{
                stacked: true,
            }],
            yAxes: [{
                stacked: true
            }]
        }

    }
});