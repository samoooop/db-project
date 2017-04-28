var year = 2559;
var mysql = require('mysql');
var fs = require('fs');
var q = require('./sqlLoader.js');

var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,
    host: '139.59.100.65',
    user: 'root',
    password: 'password',
    database: 'Project',
    port: 3306,
});



exports.getNumberOfStudent = function(ID) {
    return new Promise(function(resolve, reject) {
        // console.log('query by ' + ID);
        // console.log(q.queryString.numberOfStudent);
        pool.query(q.queryString.numberOfStudent, [ID], function(err, result, field) {
            if (err) return reject(err);
            return resolve(mapToResult(result));
        });
    });
}

exports.getAverageGrade = function(ID) {
    return new Promise(function(resolve, reject) {
        // console.log('query by ' + ID);
        // console.log(q.queryString.averageGrade);
        pool.query(q.queryString.averageGrade, [ID], function(err, result, field) {
            // console.log(result);
            if (err) return reject(err);
            return resolve(mapToResult(result));
        });
    });
}

exports.getNumberOfReward = function(ID) {
    return new Promise(function(resolve, reject) {
        // console.log('query by ' + ID);
        // console.log(q.queryString.numberOfReward);
        pool.query(q.queryString.numberOfReward, [ID], function(err, result, field) {
            // console.log(result);
            if (err) return reject(err);
            return resolve(mapToResult(result));
        });
    });
}

exports.getNumberOfProbatedStudent = function(ID) {
    return new Promise(function(resolve, reject) {
        // console.log('query by ' + ID);
        // console.log(q.queryString.numberOfProbatedStudent);
        pool.query(q.queryString.numberOfProbatedStudent, [ID], function(err, result, field) {
            // console.log(result);
            if (err) return reject(err);
            return resolve(mapToResult(result));
        });
    });
}

exports.getNumberOfLeavingStudent = function(ID) {
    return new Promise(function(resolve, reject) {
        // console.log('query by ' + ID);
        // console.log(q.queryString.numberOfLeavingStudent);
        pool.query(q.queryString.numberOfLeavingStudent, [ID], function(err, result, field) {
            console.log(result);
            if (err) return reject(err);
            return resolve(mapToResult(result));
        });
    });
}

exports.getNumberOfExchangeStudent = function(ID) {
    return new Promise(function(resolve, reject) {
        // console.log('query by ' + ID);
        // console.log(q.queryString.numberOfLeavingStudent);
        pool.query(q.queryString.numberOfExchangeStudent, [ID], function(err, result, field) {
            // console.log(result);
            if (err) return reject(err);
            return resolve(mapToResult(result));
        });
    });
}

exports.getStudentListAll = function(ID, begin, end) {
    return new Promise(function(resolve, reject) {
        // console.log('query by ' + ID);
        // console.log(q.queryString.numberOfLeavingStudent);
        pool.query(q.queryString.getStudentListAll, [year - begin, year - end, ID], function(err, result, field) {
            // console.log(result);   
            if (err) return reject(err);
            return resolve(result);
        });
    });
}

exports.getProbatedStudentList = function(ID, begin, end) {
    return new Promise(function(resolve, reject) {
        // console.log('query by ' + ID);
        // console.log(q.queryString.getProbatedStudentList);
        pool.query(q.queryString.getProbatedStudentList, [year - begin, year - end, ID], function(err, result, field) {
            // console.log(result);   
            if (err) return reject(err);
            return resolve(result);
        });
    });
}

exports.getLeavingStudentList = function(ID, begin, end) {
    return new Promise(function(resolve, reject) {
        // console.log('query by ' + ID);
        // console.log(q.queryString.getProbatedStudentList);
        pool.query(q.queryString.getLeavingStudentList, [year - begin, year - end, ID], function(err, result, field) {
            // console.log(result);   
            if (err) return reject(err);
            return resolve(result);
        });
    });
}

exports.getExchangeStudentList = function(ID, begin, end) {
    return new Promise(function(resolve, reject) {
        // console.log('query by ' + ID);
        // console.log(q.queryString.getProbatedStudentList);
        pool.query(q.queryString.getExchangeStudentList, [year - begin, year - end, ID], function(err, result, field) {
            // console.log(result);   
            if (err) return reject(err);
            return resolve(result);
        });
    });
}

exports.getStudentDetail = function(tid, sid) {
    return new Promise(function(resolve, reject) {
        // console.log('query by ' + ID);
        // console.log(q.queryString.getProbatedStudentList);
        pool.query(q.queryString.getStudentDetail, [tid, sid], function(err, result, field) {
            // console.log(result);   
            if (err) return reject(err);
            return resolve(result);
        });
    });
}

exports.getStudentActivity = function(sid) {
    return new Promise(function(resolve, reject) {
        // console.log('query by ' + ID);
        // console.log(q.queryString.getProbatedStudentList);
        pool.query(q.queryString.getStudentActivity, [sid], function(err, result, field) {
            // console.log(result);   
            if (err) return reject(err);
            return resolve(result);
        });
    });
}


function mapToResult(result) {
    var totalStudent = 0;
    var studentsInYear = {};
    for (var i = 0; i < result.length; i++) {
        totalStudent += result[i].result;
        studentsInYear[result[i].year] = result[i].result;
    }
    var studentPerYear = [];
    var otherYear = totalStudent;
    for (var i = 0; i < 4; i++) {
        studentPerYear.push(studentsInYear[(year - i).toString()]);
        if (studentPerYear[i] === undefined) {
            studentPerYear[i] = 0;
        }
        otherYear -= studentPerYear[i];
    }
    studentPerYear.push(otherYear);
    // console.log(studentsInYear);
    // console.log(studentPerYear);
    return studentPerYear;
}