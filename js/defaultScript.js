function getRole() {
    // console.log(1);
    $.getJSON("/whoami", function(res) {
        console.log(res.whoami);
        if (res.whoami == 'Manager') {
            $('#loginRole').html('ผู้บริหารภาควิชา');
            $('#loginID').html(res.id + '(' + res.mid + ')');
        } else if (res.whoami == 'Instructor') {
            $('#loginRole').html('อาจารย์');
            $('#loginID').html(res.id);
            $('#sideMenuSubject').hide();
        } else {
            window.location.replace("/login.html");
        }
    });
}

getRole();