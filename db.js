var express = require('express')
var app = express()

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '139.59.100.65',
    user: 'root',
    password: 'password',
    database: 'Company',
    port: 3306,
});

var response = {
    name: "Hello World2",
    from: "3",
    isIt: true,
}

app.use(express.static("."));

app.get('/json', function(req, res) {
    console.log("A request la")
        // res.send(JSON.stringify(response))

    connection.connect();

    connection.query('SELECT * from employee', function(error, results, fields) {
        if (error) throw error;
        // console.log('The solution is: ', results);
        res.send(results)
    });

    connection.end();
})

app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
})