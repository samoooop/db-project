$.ajax({
    type: "POST",
    url: "/getAllSubjectInMajor",
    data: {},
    success: addSubject,
});

function addSubject(res) {
    console.log('req not regist');
    console.log(res);
    data = res;
    var t = $('#requiredCourseTable').DataTable();
    // console.log(res);
    for (var i = 0; i < data.length; i++) {
        var course = data[i];
        console.log(course.cid);
        var row = t.row.add([
            course.cid,
            course.courseName,
        ]).draw(false);
    }
}

$('#sideMenuSubject').addClass('active');