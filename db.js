var express = require('express')
var mysql = require('mysql');
var AsyncPolling = require('async-polling');
var clientSessions = require('client-sessions');
var bodyParser = require('body-parser');
var async = require('async');
var users = require('./users.js');
var query = require('./query.js');
var mQuery = require('./managerQuery.js');

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

app.all('/becomeManager', function(req, res) {
    req.cookie.role = 'Manager';
    req.cookie.mid = 2110;
    res.send('Congrat!');
});

app.use(express.static("./public"));

app.all('/logout', function(req, res) {
    req.cookie = {};
    res.redirect('/login.html');
});

app.get('/index', function(req, res) {
    // console.log("requested " + req.cookies);
    // var connection = mysql.createConnection(dbconfig);
    // connection.connect();
    // console.log('index');
    getRole(req, () => {
        var r = getIDAndQuery(req);
        var id = r.id,
            q = r.q;
        promises = [];
        promises.push(q.getNumberOfStudent(id));
        promises.push(q.getNumberOfProbatedStudent(id));
        promises.push(q.getNumberOfExchangeStudent(id))
        promises.push(q.getNumberOfLeavingStudent(id));
        promises.push(q.getAverageGrade(id));
        promises.push(q.getNumberOfReward(id));
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
});

app.post('/detail', function(req, res) {
    var r = getIDAndQuery(req);
    var id = r.id,
        q = r.q;
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
    // console.log(byear, eyear);
    var promises = [];

    promises.push(q.getStudentListAll(id, byear, eyear));
    promises.push(q.getProbatedStudentList(id, byear, eyear));
    promises.push(q.getLeavingStudentList(id, byear, eyear));
    promises.push(q.getExchangeStudentList(id, byear, eyear));
    Promise.all(promises).then(result => {
        switch (type) {
            case 'normal':
                result[1] = [];
                result[2] = [];
                result[3] = [];
                break;
            case 'exchange':
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

app.post('/studentEnrolledCourse', function(req, res) {
    var sid = req.body.sid;

    var p = query.getStudentEnrolledCourse(sid);
    p.then(result => {
        res.send(result);
    });
});

app.post('/studentRewardList', function(req, res) {
    var r = getIDAndQuery(req);
    var id = r.id,
        q = r.q;

    var tid = req.cookie.id;
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

    var p = q.getStudentRewardList(byear, eyear, id);
    p.then(result => {
        // console.log(tid);
        console.log('reward ' + id, byear, eyear);
        console.log(result);
        res.send(result);
    });
});

app.post('/reqOutOfTimeCourseList', function(req, res) {
    var sid = req.body.sid;
    var p = query.getRequireRegistOutOfTime(sid);
    p.then(result => {
        // console.log(tid);
        // console.log('reward' + result);
        res.send(result);
    });
});

app.post('/requiredCourseList', function(req, res) {
    var sid = req.body.sid;
    var p = query.getRequireNotRegist(sid);
    p.then(result => {
        // console.log(tid);
        // console.log('reward' + result);
        res.send(result);
    });
});

app.post('/getAllSubjectInMajor', function(req, res) {
    var r = getIDAndQuery(req);
    var id = r.id,
        q = r.q;
    var p = q.getAllSubjectInMajor(id);
    p.then(result => {
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
                console.log(result[0]);
                if (result[0].mid === null) {
                    req.cookie.role = 'Instructor';
                    req.cookie.mid = null;
                    res.send({
                        whoami: 'Instructor',
                        id: req.cookie.id,
                    });
                } else {
                    req.cookie.role = 'Manager';
                    req.cookie.mid = result[0].mid;
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

function getIDAndQuery(req) {
    var id, q;
    // getRole(req);
    if (req.cookie.role == 'Manager') {
        id = req.cookie.mid;
        q = mQuery;
    } else {
        q = query;
        id = req.cookie.id;
    }
    console.log('index ' + id);
    console.log(req.cookie.role);
    return { id: id, q: q };
}

app.listen(3000, function() {
    console.log('app listening on port 3000!')
});

function getRole(req, cb) {
    var p = query.isATeacher(req.cookie.id);
    p.then(result => {
        // console.log('whoami ' + result[0].manage_mid);
        if (result.length == 0) {
            cb({
                whoami: 'unknown',
            });
        } else {
            console.log('lala' + result[0]);
            if (result[0].mid === null) {
                req.cookie.role = 'Instructor';
                req.cookie.mid = null;
                cb({
                    whoami: 'Instructor',
                    id: req.cookie.id,
                });
            } else {
                req.cookie.role = 'Manager';
                req.cookie.mid = result[0].mid;
                cb({
                    whoami: 'Manager',
                    id: req.cookie.id,
                    mid: req.cookie.mid,
                });
            }
        }
    });
}