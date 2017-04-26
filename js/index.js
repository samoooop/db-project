// $.ajax({
//     dataType: "jsonp",
//     jsonp: false,
//     url: "http://127.0.0.1:3000/json",
//     data: data,
//     success: function() {
//         console.log("yay");
//     },
//     error: function(err) {
//         console.log("fuc12k")
//     },
// });
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "Not found in" + document.cookie;
}

var result

function updateOverviewData(year) {
    $.getJSON("http://127.0.0.1:3000/index", function(res) {
        console.log(res);
        result = res
            // for (var i = 0; i < result.length; i++) {
            //     // console.log(result[i].Fname)
            // }
        $('#numberOfStudent').html(res.numberOfStudent.reduce((a, b) => a + b, 0));
        $('#numberOfFineStudent').html(res.numberOfFineStudent.reduce((a, b) => a + b, 0));
        $('#numberOfProbatedStudent').html(res.numberOfProbatedStudent.reduce((a, b) => a + b, 0));
        $('#numberOfExchangeStudent').html(res.numberOfExchangeStudent.reduce((a, b) => a + b, 0));
        $('#numberOfLeavingStudent').html(res.numberOfLeavingStudent.reduce((a, b) => a + b, 0));
        totalChartData.datasets[0].data = res.numberOfFineStudent;
        totalChartData.datasets[1].data = res.numberOfProbatedStudent;
        totalChartData.datasets[2].data = res.numberOfLeavingStudent;
        totalChartData.datasets[3].data = res.numberOfExchangeStudent;
        // totalChart.config.data.datasets = [1, 2, 3, 4, 5];
        gradeChartConfig.data.datasets[0].data = res.averageGrade;
        rewardChartData.datasets[0].data = res.numberOfReward;
        if (year == 0) {
            $("#totalChartDiv").show();
            $("#rewardChartDiv").show();
            $("#averageGradeChartDiv").show();
            indivGradeChart.update();
            $("#indivGradeChartDiv").hide();
        } else {
            $("#totalChartDiv").hide();
            $("#rewardChartDiv").hide();
            $("#averageGradeChartDiv").hide();
            $("#indivGradeChartDiv").show();
        }
        totalChart.update();
        gradeChart.update();
        rewardChart.update();
        indivGradeChart.update();
        createIndivGradeChart();
        // console.log(totalChart)
    });
}
updateOverviewData(0);
// console.log("sdasd")
// $("#numberOfStudent").html(1922)
// $("#1234").val("200")
// console.log(getCookie('ID'))
// document.cookie = "ID=5731037421; username=John Smith; expires=Thu, 18 Dec 2017 12:00:00 UTC;";
// console.log(getCookie('ID'))

function overviewFunc(v) {
    for (var i = 0; i <= 5; i++) {
        $("#overviewSideMenu" + i).removeClass("active");
    }
    $("#overviewSideMenu" + v).addClass("active");
    updateOverviewData(v);
    console.log(v)
}