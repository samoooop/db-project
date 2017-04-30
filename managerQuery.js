var year = 2559;
var mysql = require('mysql');
var fs = require('fs');
var q = require('./sqlLoader.js');
var queryString = q.queryStringManager;

var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,
    host: '139.59.100.65',
    user: 'root',
    password: 'password',
    database: 'Project2',
    port: 3306,
});



exports.getNumberOfStudent = function(ID) {
    return new Promise(function(resolve, reject) {
        // console.log('query by ' + ID);
        // console.log(q.queryString.numberOfStudent);
        pool.query(queryString.numberOfStudent, [ID], function(err, result, field) {
            if (err) return reject(err);
            return resolve(mapToResult(result));
        });
    });
}

exports.getAverageGrade = function(ID) {
    return new Promise(function(resolve, reject) {
        // console.log('query by ' + ID);
        // console.log(q.queryString.averageGrade);
        pool.query(queryString.averageGrade, [ID], function(err, result, field) {
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
        pool.query(queryString.numberOfReward, [ID], function(err, result, field) {
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
        pool.query(queryString.numberOfProbatedStudent, [ID], function(err, result, field) {
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
        pool.query(queryString.numberOfLeavingStudent, [ID], function(err, result, field) {
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
        pool.query(queryString.numberOfExchangeStudent, [ID], function(err, result, field) {
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
        pool.query(queryString.getStudentListAll, [year - begin, year - end, ID], function(err, result, field) {
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
        pool.query(queryString.getProbatedStudentList, [year - begin, year - end, ID], function(err, result, field) {
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
        pool.query(queryString.getLeavingStudentList, [year - begin, year - end, ID], function(err, result, field) {
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
        pool.query(queryString.getExchangeStudentList, [year - begin, year - end, ID], function(err, result, field) {
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
        pool.query(queryString.getStudentDetail, [tid, sid], function(err, result, field) {
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

exports.getStudentEnrolledCourse = function(sid) {
    return new Promise(function(resolve, reject) {
        // console.log('query by ' + ID);
        // console.log(q.queryString.getProbatedStudentList);
        pool.query(queryString.getStudentEnrolledCourse, [sid], function(err, result, field) {
            // console.log(result);   
            if (err) return reject(err);
            return resolve(result);
        });
    });
}

exports.getStudentRewardList = function(byear, eyear, tid) {
    return new Promise(function(resolve, reject) {
        // console.log('query by ' + ID);
        // console.log(q.queryString.getProbatedStudentList);
        pool.query(queryString.getStudentRewardList, [byear, eyear, tid], function(err, result, field) {
            // console.log(result);   
            if (err) return reject(err);
            return resolve(result);
        });
    });
}

exports.getRequireNotRegist = function(sid) {
    return new Promise(function(resolve, reject) {
        // console.log('query by ' + ID);
        // console.log(q.queryString.getProbatedStudentList);
        pool.query(queryString.getRequireNotRegist, [sid, sid], function(err, result, field) {
            // console.log(result);   
            if (err) return reject(err);
            return resolve(result);
        });
    });
}


exports.getRequireRegistOutOfTime = function(sid) {
    return new Promise(function(resolve, reject) {
        // console.log('query by ' + ID);
        // console.log(q.queryString.getProbatedStudentList);
        pool.query(queryString.getRequireRegistOutOfTime, [sid, sid, sid], function(err, result, field) {
            // console.log(result);   
            if (err) return reject(err);
            return resolve(result);
        });
    });
}

exports.getAllSubjectInMajor = function(tid) {
    return new Promise(function(resolve, reject) {
        // console.log('query by ' + ID);
        // console.log(q.queryString.getProbatedStudentList);
        pool.query(queryString.getAllSubjectInMajor, [tid], function(err, result, field) {
            // console.log(result);   
            if (err) return reject(err);
            return resolve(result);
        });
    });
}


exports.isATeacher = function(tid) {
    return new Promise(function(resolve, reject) {
        // console.log('query by ' + ID);
        // console.log(q.queryString.getProbatedStudentList);
        pool.query(queryString.isATeacher, [tid], function(err, result, field) {
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