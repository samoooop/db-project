function activeSideMenu(v) {
    $("#detailSideMenu").addClass("active");
    for (var i = 0; i <= 5; i++) {
        $("#detailSideMenn" + i).removeClass("active");
    }
    $("#detailSideMenu" + v).addClass("active");
}

var year = getUrlParameter('year');
if (year === undefined) year = 0;
var type = getUrlParameter('type');
activeSideMenu(year);

$.ajax({
    type: "POST",
    url: '/detail',
    data: {
        year: year,
        type: type,
    },
    success: addDataToTable,
});

function addDataToTable(res) {
    console.log(res);
    console.log(res[0].length);
    var totalRows = 1;
    var table = document.getElementById('studentTable');
    var t = $('#studentTable').DataTable({
        'paging': false,
        // "ajax": "data/arrays.txt",
        // "columnDefs": [{
        //     "targets": -1,
        //     "data": null,
        //     "defaultContent": "<button class='btn btn-success'>ปกติ</button>"
        // }]
    });

    function addToTable(status, data) {
        var rows = table.rows;
        var BTN = {
            'FINE': "<button class='btn btn-success'>Fine</button>",
            'PROBATED': "<button class='btn btn-danger'>Pro</button>",
            'EXCHANGE': "<button class='btn btn-warning'>Exchange</button>",
            'LEAVING': "<button class='btn btn-warning'>Leaving</button>",
        }
        for (var i = 0; i < data.length; i++) {
            var student = data[i];
            // console.log(student.first_name);
            // console.log(rows.length - 1);
            // console.log(res[0][i].gpx);
            var row = t.row.add([
                student.sid,
                student.first_name,
                student.last_name,
                parseFloat(Math.round(student.gpax * 100) / 100).toFixed(2),
                student.rewardAmount,
                student.enYear,
                student.tid,
                student.mid,
                BTN[status],
            ]).draw(false);
            // rows[i + 1].id = student.sid;
            // console.log(t.cell(totalRows - 1, 5).data());

            function gen(sid) {
                var x = sid;
                return function() {
                    window.location.replace("/studentDetail.html?id=" + x);
                    // console.log(x);
                }
            }
            rows[totalRows].onclick = gen(student.sid);
            // console.log(rows[rows.length - 1].cells[5]);
            // var cell = rows[totalRows].cells[5];
            // <button type="button" class="btn btn-link">Link</button>
            // cell.appendChild(creatStatusBtn(status, student.sid));
            totalRows = totalRows + 1;
            // console.log(rows[i]);
        }
    }
    console.log(res[1].length);
    addToTable('FINE', res[0]);
    addToTable('PROBATED', res[1]);
    addToTable('LEAVING', res[2]);
    addToTable('EXCHANGE', res[3]);
    // document.getElementById('statusBtn'+5530000321);
}

function creatStatusBtn(status, id) {
    var btn = document.createElement('BUTTON');
    if (status == 'fine') {
        btn.className = 'btn btn-success';
        btn.innerText = 'ปกติ';
    } else if (status == 'probated') {
        btn.className = 'btn btn-danger';
        btn.innerText = 'ติด pro'
    }
    btn.id = 'statusBtn' + id;
    // console.log(btn.id);
    return btn;
}
// working click
// $("#studentTable").on('click', 'tr', function() {
//     // alert('Clicked row ' + ($(this).index() + 1));
//     console.log(this.cells[0].innerText);
// });