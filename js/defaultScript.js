function getRole() {
    // console.log(1);
    $.getJSON("/whoami", function(res) {
        // console.log(res.whoami);
        if (res.whoami == 'Manager') {
            $('#loginRole').html('ผู้บริหารภาควิชา');
        } else if (res.whoami == 'Instructor') {
            $('#loginRole').html('อาจารย์');
        } else {
            window.location.replace("/login.html");
        }
    });
}

getRole();