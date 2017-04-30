$.ajax({
    type: "POST",
    url: '/studentRewardList',
    data: {},
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