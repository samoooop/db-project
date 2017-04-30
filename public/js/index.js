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
    $.getJSON("/index", function(res) {
        console.log(res);
        result = res
            // for (var i = 0; i < result.length; i++) {
            //     // console.log(result[i].Fname)
            // }
        if (year == 0) {
            // change data
            $('#numberOfStudent').html(res.numberOfStudent.reduce((a, b) => a + b, 0));
            // $('#numberOfFineStudent').html(res.numberOfFineStudent.reduce((a, b) => a + b, 0));
            $('#numberOfProbatedStudent').html(res.numberOfProbatedStudent.reduce((a, b) => a + b, 0));
            $('#numberOfExchangeStudent').html(res.numberOfExchangeStudent.reduce((a, b) => a + b, 0));
            $('#numberOfLeavingStudent').html(res.numberOfLeavingStudent.reduce((a, b) => a + b, 0));
            totalChartData.datasets[0].data = res.numberOfFineStudent;
            totalChartData.datasets[1].data = res.numberOfProbatedStudent;
            totalChartData.datasets[2].data = res.numberOfLeavingStudent;
            totalChartData.datasets[3].data = res.numberOfExchangeStudent;
            gradeChartConfig.data.datasets[0].data = res.averageGrade;
            rewardChartData.datasets[0].data = res.numberOfReward;
            // show/hide chart
            $("#totalChartDiv").show();
            $("#rewardChartDiv").show();
            $("#averageGradeChartDiv").show();
            // indivGradeChart.update();
            $("#indivGradeChartDiv").hide();
        } else {
            $('#numberOfStudent').html(res.numberOfStudent[year - 1]);
            // $('#numberOfFineStudent').html(res.numberOfFineStudent[year - 1]);
            $('#numberOfProbatedStudent').html(res.numberOfProbatedStudent[year - 1]);
            $('#numberOfExchangeStudent').html(res.numberOfExchangeStudent[year - 1]);
            $('#numberOfLeavingStudent').html(res.numberOfLeavingStudent[year - 1]);
            totalChartData.datasets[0].data = res.numberOfFineStudent;
            totalChartData.datasets[1].data = res.numberOfProbatedStudent;
            totalChartData.datasets[2].data = res.numberOfLeavingStudent;
            totalChartData.datasets[3].data = res.numberOfExchangeStudent;
            gradeChartConfig.data.datasets[0].data = res.averageGrade;
            rewardChartData.datasets[0].data = res.numberOfReward;
            $("#totalChartDiv").hide();
            $("#rewardChartDiv").hide();
            $("#averageGradeChartDiv").hide();
            $("#indivGradeChartDiv").show();
        }
        if (year == 0) {
            $('#pageDescription').text('ภาพรวมของทุกชั้นปี');
        } else if (year > 4) {
            $('#pageDescription').text('ภาพรวมของนิสิตปีอื่นๆ (>4)');
        } else {
            $('#pageDescription').text('ภาพรวมของนิสิตปี ' + year);
        }
        // totalChart.clear();
        totalChart.update();
        gradeChart.update();
        rewardChart.update();
        // indivGradeChart.update();
        createIndivGradeChart();
        // console.log(totalChart)
    });
}

function overviewFunc(v) {
    $('#personAll').attr('href', '/detail.html?year=' + v + '&type=all');
    $('#personProbated').attr('href', '/detail.html?year=' + v + '&type=probated');
    $('#personExchange').attr('href', '/detail.html?year=' + v + '&type=exchange');
    $('#personLeaving').attr('href', '/detail.html?year=' + v + '&type=leaving');

    for (var i = 0; i <= 5; i++) {
        $("#overviewSideMenu" + i).removeClass("active");
    }
    $("#overviewSideMenu" + v).addClass("active");
    updateOverviewData(v);
    console.log(v)
}

var year = getUrlParameter('year');
if (year === undefined) year = 0;
$("#sideMenuOverview").addClass("active");
overviewFunc(year);
updateOverviewData(year);