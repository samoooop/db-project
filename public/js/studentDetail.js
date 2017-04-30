var sid = getUrlParameter('id');

$.ajax({
    type: "POST",
    url: '/studentDetail',
    data: {
        sid: sid,
    },
    success: editInfo,
});

function editInfo(res) {
    var s = res[0];
    document.getElementById('Student_ID').innerText = s.sid;
    document.getElementById('Student_Fname').innerText = s.first_name;
    document.getElementById('Student_Lname').innerText = s.last_name;
    document.getElementById('Student_GPA').innerText = parseFloat(Math.round(s.gpax * 100) / 100).toFixed(2);
    document.getElementById('StudentBehavioralScore').innerText = s.behavioral_score;
    document.getElementById('Student_Pnumber').innerText = s.phone_number;
    document.getElementById('StudentEntryYear').innerText = s.enYear;
    document.getElementById('StudentMajor').innerText = s.majorName;
}

$.ajax({
    type: "POST",
    url: '/studentActivity',
    data: {
        sid: sid,
    },
    success: editActs,
});

function editActs(res) {
    // console.log(res);
    data = res;
    var t = $('#activityTable').DataTable();
    for (var i = 0; i < data.length; i++) {
        var act = data[i];
        var row = t.row.add([
            act.actName,
            act.hour,
        ]).draw(false);
    }
}

$.ajax({
    type: "POST",
    url: '/studentEnrolledCourse',
    data: {
        sid: sid,
    },
    success: editCourses,
});

function editCourses(res) {
    // console.log(res);
    data = res;
    var t = $('#courseTable').DataTable();
    for (var i = 0; i < data.length; i++) {
        var course = data[i];
        // console.log(course.cid);
        var row = t.row.add([
            course.cid,
            course.courseName,
            course.grade,
            course.term,
        ]).draw(false);
    }
}

$.ajax({
    type: "POST",
    url: '/reqOutOfTimeCourseList',
    data: {
        sid: sid,
    },
    success: editOutOfTimeCourses,
});

function editOutOfTimeCourses(res) {
    console.log('out of time regist');
    console.log(res);
    data = res;
    var t = $('#regOutOfTimeCourseTable').DataTable();
    // console.log(res);
    for (var i = 0; i < data.length; i++) {
        var course = data[i];
        console.log(course.cid);
        var row = t.row.add([
            course.cid,
            course.courseName,
            course.RequireTerm,
        ]).draw(false);
    }
}

$.ajax({
    type: "POST",
    url: '/reqOutOfTimeCourseList',
    data: {
        sid: sid,
    },
    success: reqNotRegistCourses,
});

function reqNotRegistCourses(res) {
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