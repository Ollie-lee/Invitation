var mysql = require('mysql')
var faker = require('faker')
const { database } = require('faker')

var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'invitation',
    password:'zxas3229'
})

//query statement 
//selecting data
var q = 'select count(*) as total from users'

//inserting data
var person = {email:faker.internet.email()}

//for inserting database, not use this way
// connection.query(q,function(error, results, fields ){
//     if(error) throw error;
//     console.log(results[0]);
// })

connection.query('insert into users set ?', person, function (err, result) {
    if(err) throw err;
    console.log(result)
})

//!after node this file, the connection will begin
//! need to enter ctrl + c to exit or

connection.end()