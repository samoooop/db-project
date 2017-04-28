var fs = require('fs');

exports.queryString = {
    numberOfStudent: fs.readFileSync('sql/GetNumberOfStudent.sql', 'utf8'),
    averageGrade: fs.readFileSync('sql/GetAverageGrade.sql', 'utf8'),
    numberOfReward: fs.readFileSync('sql/GetNumberOfReward.sql', 'utf8'),
    numberOfProbatedStudent: fs.readFileSync('sql/GetNumberOfProbatedStudent.sql', 'utf8'),
    numberOfLeavingStudent: fs.readFileSync('sql/GetNumberOfLeavingStudent.sql', 'utf8'),
    numberOfExchangeStudent: fs.readFileSync('sql/GetNumberOfExchangeStudent.sql', 'utf8'),
    getStudentListAll: fs.readFileSync('sql/GetStudentListAll.sql', 'utf8'),
    getProbatedStudentList: fs.readFileSync('sql/GetProbatedStudentList.sql', 'utf8'),
    getLeavingStudentList: fs.readFileSync('sql/GetLeavingStudentList.sql', 'utf8'),
    getExchangeStudentList: fs.readFileSync('sql/GetExchangeStudentList.sql', 'utf8'),
    getStudentDetail: fs.readFileSync('sql/GetStudentDetail.sql', 'utf8'),
    getStudentActivity: fs.readFileSync('sql/GetStudentActivity.sql', 'utf8'),
}