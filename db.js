var express = require('express')
var mysql = require('mysql');
var AsyncPolling = require('async-polling');
var clientSessions = require('client-sessions');
var bodyParser = require('body-parser');
var async = require('async');
var users = require('./users.js');
var query = require('./query.js');

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

app.use(express.static("."));

app.all('/logout', function(req, res) {
    req.cookie = {};
    res.redirect('/login.html');
});

app.get('/index', function(req, res) {
    console.log("requested " + req.cookies);
    // var connection = mysql.createConnection(dbconfig);
    // connection.connect();
    console.log('index');
    promises = [];
    promises.push(query.getNumberOfStudent(req.cookie.id));
    promises.push(query.getNumberOfProbatedStudent(req.cookie.id));
    promises.push(query.getNumberOfExchangeStudent(req.cookie.id))
    promises.push(query.getNumberOfLeavingStudent(req.cookie.id));
    promises.push(query.getAverageGrade(req.cookie.id));
    promises.push(query.getNumberOfReward(req.cookie.id));
    Promise.all(promises).then(result => {
        var response = {
                // [1st,2nd,3rd,4th,other]
                numberOfStudent: result[0],
                numberOfFineStudent: result[0].map((x, idx) => x - result[1][idx] - result[3][idx]),
                numberOfProbatedStudent: result[1],
                numberOfExchangeStudent: result[2],
                numberOfLeavingStudent: result[3],
                averageGrade: result[4],
                numberOfReward: result[5],
            }
            // console.log(response);
        res.send(response);
    });
});

app.post('/detail', function(req, res) {
    var year = req.body.year;
    var type = req.body.type;
    var byear = parseInt(year) - 1;
    var eyear = parseInt(year) - 1;
    if (byear < 0) {
        byear = 999;
        eyear = -999;
    } else if (byear >= 4) {
        byear = 999;
        eyear = 4;
    }
    console.log(byear, eyear);
    var promises = [];

    promises.push(query.getStudentListAll(req.cookie.id, byear, eyear));
    promises.push(query.getProbatedStudentList(req.cookie.id, byear, eyear));
    promises.push(query.getLeavingStudentList(req.cookie.id, byear, eyear));
    promises.push(query.getExchangeStudentList(req.cookie.id, byear, eyear));
    Promise.all(promises).then(result => {
        switch (type) {
            case 'normal':
                result[1] = [];
                result[2] = [];
                result[3] = [];
                break;
            case 'exchage':
                result[0] = [];
                result[1] = [];
                result[2] = [];
                break;
            case 'probated':
                result[0] = [];
                result[2] = [];
                result[3] = [];
                break;
            case 'leaving':
                result[0] = [];
                result[1] = [];
                result[3] = [];
                break;
            default:
                break;
        }
        //filter student by entry year
        // result.map((arr) => { arr.filter((x)=>{
        //     return x.entry_year == year+1;
        // }) });
        console.log(result);
        res.send(result);
    });
    // res.send('dummy');
});

app.post('/studentDetail', function(req, res) {
    var sid = req.body.sid;
    // var tid = req.cookie.id;
    var p = query.getStudentDetail(sid);
    p.then(result => {
        console.log(result);
        res.send(result);
    });
});

app.post('/studentActivity', function(req, res) {
    var sid = req.body.sid;
    // var tid = req.cookie.id;
    var p = query.getStudentActivity(sid);
    p.then(result => {
        console.log(result);
        res.send(result);
    });
});

app.get('/whoami', function(req, res) {
    console.log('whoami');
    console.log('using as ' + req.cookie.id);
    if (req.cookie.id === undefined) {
        console.log('not found');
        res.send({
            whoami: 'unknown',
        });
    } else {
        var p = query.isATeacher(req.cookie.id);
        p.then(result => {
            // console.log('whoami ' + result[0].manage_mid);
            if (result.length == 0) {
                res.send({
                    whoami: 'unknown',
                });
            } else {
                if (result.manage_mid !== '') {
                    req.cookie.role = 'Instructor';
                    res.send({
                        whoami: 'Instructor',
                        id: req.cookie.id,
                    });
                } else {
                    req.cookie.role = 'Manager';
                    req.cookie.mid = result.manage_mid;
                    res.send({
                        whoami: 'Manager',
                        id: req.cookie.id,
                        mid: req.cookie.mid,
                    });
                }
            }
        });
        // var whoami = users.getRole(req.cookie.id);
        // console.log('whoami : ', whoami)
        // res.send({
        //     whoami: whoami,
        // });
    }
});

app.listen(3000, function() {
    console.log('app listening on port 3000!')
});