var express = require('express')
var app = express()
var mysql = require('mysql')
var bodyParser = require('body-parser')

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'invitation',
    password: 'zxas3229'
})

app.set('view engine', 'ejs')
//tell app we are using body-parser and do not do anything
//! we can use req.body
app.use(bodyParser.urlencoded({extended:true}))
//Everything inside the public directory is now available in our views.
app.use(express.static(__dirname + "/public"))

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

        //find views in default. looking for home/ejs
        res.render('home', { count: count })
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

app.post('/register', function (req, res) {
    //data will be inserted
    const person = {
        email: req.body.email,
        //mysql library help us convert the format
        // created_at: faker.date.past()
    }

    connection.query('insert into users set ?', person, function (err, result) {
        if(err) throw err;
        //0.
        //res.send("thank you for participating~")
        //1.or redirect to another page ,by res.render()
        //2.
        res.redirect('/')
    })
})