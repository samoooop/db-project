var year = getUrlParameter('year');
if (year === undefined) year = 0;
var type = getUrlParameter('type');
activeSideMenu(year);

$.ajax({
    type: "POST",
    url: '/studentRewardList',
    data: {
        year: year,
        type: type,
    },
    success: addRewardToTable,
});

function addRewardToTable(res) {
    console.log(res);
    data = res;
    var t = $('#rewardTable').DataTable();
    for (var i = 0; i < data.length; i++) {
        var r = data[i];
        var row = t.row.add([
            r.name,
            r.sid,
            r.first_name,
            r.last_name,
            r.date,
        ]).draw(false);
    }
}

function activeSideMenu(v) {
    $("#rewardSideMenu").addClass("active");
    for (var i = 0; i <= 5; i++) {
        $("#rewardSideMenn" + i).removeClass("active");
    }
    $("#rewardSideMenu" + v).addClass("active");
}