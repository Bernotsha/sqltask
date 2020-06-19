const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mysql = require('mysql');

var con=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "codingmart"
});
con.connect(function(err){
    if(err) throw err;
    console.log("Connected successfully");
});


app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended: false}));

app.set('view engine','ejs');

app.get('/',function(req,res){
    res.render('formdatas');
});

app.post('/home',function(req,res){

    const data = req.body;
        var name=data.name;
        var address=data.address;
        var email=data.email;
        var phone = data.phone;

    var sql = "INSERT INTO mysql (name, address, email, phone) VALUES (?, ?, ?, ?)";
    con.query(sql,[name, address, email, phone], function (err, result) {
    if (err) throw err;
        console.log("1 record inserted");
    });

    var sql1="SELECT * from mysql";
    con.query(sql1,function(err,result,field){

        if(err) throw err;
        var info=result;
        console.log(info);
        console.log(result.length);

        res.render("output",{sqldata:info});



    });
      



});

app.listen(process.env.PORT || 3000,function(){
    console.log("SERVER STARTED");
});


