var express = require('express')
var app = express()

var response = {
    name: "Hello World2",
    from: "3",
    isIt: true,
}

app.use(express.static("."));

app.get('/json', function(req, res) {
    console.log("A request la")
    res.send(JSON.stringify(response))
})

app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
})