var express = require('express')
var mysql = require('mysql');
var AsyncPolling = require('async-polling');

var dbconfig = {
    host: '139.59.100.65',
    user: 'root',
    password: 'password',
    database: 'Company',
    port: 3306,
}
var connection = mysql.createConnection(dbconfig);
connection.connect();

var app = express()
app.use(express.static("."));

app.get('/json', function(req, res) {
    console.log("A request la" + req.query.ID)
        // res.send(JSON.stringify(response))
    connection.query('SELECT * from employee', function(error, results, fields) {
        if (error) console.log(error)
            // console.log('The solution is: ', results);
        res.send(results)
    });
})

app.get('/index', function(req, res) {
    console.log("requested" + req.cookies)
    var connection = mysql.createConnection(dbconfig);
    // connection.connect();
    var response = {
        // [1st,2nd,3rd,4th,other]
        numberOfStudent: [1, 2, 3, 4, 5],
        numberOfFineStudent: [1, 2, 3, 4, 5],
        numberOfProbatedStudent: [1, 2, 3, 4, 5],
        numberOfExchangeStudent: [1, 2, 3, 4, 5],
        numberOfLeavingStudent: [1, 2, 3, 4, 5],
        averageGrade: [2.5, 3.1, 3.6, 4.0, 2.00],
        numberOfReward: [100, 200, 300, 400, 500],
    }
    res.send(response);
    // connection.end();
    console.log("requested")
})

app.listen(3000, function() {
    console.log('app listening on port 3000!')
})

AsyncPolling(function(end) {
    // Beat
    connection.query('SELECT 1', function(error, results, fields) {});
    end();
}, 3000).run();