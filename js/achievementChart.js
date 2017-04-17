var barChartData = {
    labels: ["ปี1", "ปี2", "ปี3", "ปี4", "Other"],
    datasets: [{
        backgroundColor: "rgb(75, 192, 192)",
        label: 'ผลงาน',
        data: [
            10, 45, 60, 50, 30
        ],
        backgroundColor: [
            color(chartColors.blue).alpha(0.7).rgbString(),
            color(chartColors.green).alpha(0.7).rgbString(),
            color(chartColors.red).alpha(0.7).rgbString(),
            color(chartColors.orange).alpha(0.7).rgbString(),
            color(chartColors.yellow).alpha(0.7).rgbString(),
        ],
    }]

};
var ctx = document.getElementById("achievementChart");

var myChart = new Chart(ctx, {
    type: 'bar',
    data: barChartData,
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