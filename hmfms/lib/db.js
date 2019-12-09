var mysql = require('mysql');
var conn = mysql.createConnection({
    host : 'localhost',
    port : '3306',
    user: 'root',
    password : '123456',
    database : 'hmfmsdatabase'
});

conn.connect(function(err){
    if(err) throw err;
    console.log('Connected!');
})
