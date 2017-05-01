$.ajax({
    type: "POST",
    url: "/getAllSubjectInMajor",
    data: {},
    success: addSubject,
    error: function() {
        console.log("shit")
    },
});

function addSubject(res) {
    // console.log('req not regist');
    console.log(res);
    data = res;
    var t = $('#subjectTable').DataTable();
    // console.log(res);
    for (var i = 0; i < data.length; i++) {
        var course = data[i];
        console.log(course.cid);
        var row = t.row.add([
            course.cid,
            course.courseName,
            course.managedTeacher,
            course.avgGrade,
            course.F,
            course.W,
        ]).draw(false);
    }
}

$('#sideMenuSubject').addClass('active');