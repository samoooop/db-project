var year = 2017;
var queryString = "select count(student.sid) as result from student where student.tid =  ? and ? -  year(student.since) +1  = ?;";

exports.getNumberOfStudent = function(connection, ID) {
    console.log(ID);
    connection.query(queryString, [ID, year, 1], function(err, result, field) {
        console.log(result[0].result);
    });
}