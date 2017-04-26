var express = require('express')
var mysql = require('mysql');
var AsyncPolling = require('async-polling');
var clientSessions = require('client-sessions');
var bodyParser = require('body-parser');
var async = require('async');
var users = require('./users.js');
var query = require('./query.js');

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
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));


app.use(clientSessions({
    cookieName: 'cookie', // cookie name dictates the key name added to the request object
    secret: 'blargadeeblargblarg', // should be a large unguessable string
    duration: 24 * 60 * 60 * 1000, // how long the session will stay valid in ms
    activeDuration: 1000 * 60 * 5 // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
}));

app.all('/auth', function(req, res) {
    console.log(req.cookie);
    console.log(req.cookie.id);
    console.log(req.body);
    if (req.body != null) {
        id = users.isOkay(req.body.username, req.body.password);
        console.log(id);
        if (id != -1) { // success login
            req.cookie.id = id;
            return res.redirect('/index.html');
        }
    }
    res.redirect('/login.html');
});

// app.use(function(req, res, next) {
//     if (req.cookie !== undefined && req.cookie.id !== undefined) {
//         next();
//     }
//     res.redirect('/login.html');
// });

app.use(express.static("."));

app.all('/logout', function(req, res) {
    req.cookie = {};
    res.redirect('/login.html');
});

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
    console.log("requested" + req.cookies);
    // var connection = mysql.createConnection(dbconfig);
    // connection.connect();
    var response = {
        // [1st,2nd,3rd,4th,other]
        numberOfStudent: [2, 2, 2, 2, 2],
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