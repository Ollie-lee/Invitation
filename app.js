var mysql = require('mysql')
var faker = require('faker')
const { database } = require('faker')

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'invitation',
    password: 'zxas3229'
})

//query statement 
//selecting data
var q = 'select count(*) as total from users'

//inserting data
var person = {
    email: faker.internet.email(),
    //mysql library help us convert the format
    created_at: faker.date.past()
}

//for inserting database, not use this way
// connection.query(q,function(error, results, fields ){
//     if(error) throw error;
//     console.log(results[0]);
// })

// connection.query('insert into users set ?', person, function (err, result) {
//     if(err) throw err;
//     console.log(result)
// })

// //!after node this file, the connection will begin
// //! need to enter ctrl + c to exit or

// connection.end()

//! inserting lots of data

var data = [];
for (var i = 0; i < 500; i++) {
    data.push([
        faker.internet.email(),
        faker.date.past()
    ])
}

var q = 'insert into users (email, created_at) values ?';

connection.query(q, [data], function (err, result) {
    console.log("result", result)
    console.log("err", err)

})

connection.end()