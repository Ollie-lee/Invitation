var express = require('express')
var app = express()
var mysql = require('mysql')

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'invitation',
    password: 'zxas3229'
})

app.set('view engine', 'ejs')

app.listen(8080, function (req, res) {
    console.log('connection 8080')
});

app.get('/', function (req, res) {
    //? find count of users in database
    var q = 'select count(*) as count from users'
    connection.query(q, function (err, results) {
        if (err) throw err;
        var count = results[0].count
        //run inside inside the callback ,no one will guarantee which 
        //will run first, if placed outside the callback
        res.send(`${count} users`)
    })
    //? respond with that count
    // res.send('home page')
})

app.get('/joke', function (req, res) {
    var joke = 'relax, it is a joke'
    res.send(joke)
})

app.get('/random_num', function (req, res) {
    var num = Math.floor((Math.random() * 10) + 1);
    res.send(`your lucky number is ${num}`)
})