var express = require('express');
var cors = require('cors');
var mysql=require('mysql');
var bodyParser= require('body-parser');
var path = require('path');
var app=express();
app.use(cors());

app.use(bodyParser.json({limit: '50mb'}));
app.use(express.static('./dist/SampGridApp'));

var connection = mysql.createConnection({       
    host: "192.168.100.114",
	user: "user1",  
	password: "user1@123",
	database:"user4"
});
connection.connect();

//const PORT = 5000;

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 5000
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/dist/SampGridApp/index.html'))
});

app.get('/:name/:pass',function(req,res){
    var str = req.url.substr(1);
    var splitted = str.split("/");
    var url = "SELECT UserName,Password FROM security_users where isDeleted=0 and isActive=1 and UserName='"+splitted[0]+"' and Password='"+splitted[1]+"'"
	connection.query(url, function(err, rows, fields) {
		if (err) throw err;
		var data=[];
        if(rows.length != 0)
        {
            for(var i=0;i<rows.length;i++){
                data.push(rows[i]);
            }
            res.end(JSON.stringify(data));
        }
        res.end("No data found");
	});
});

app.post('/adduser', function(req, res) {
	var idata = req.body;
	var query = connection.query('insert into security_users set UserKey=UUID(), ? , isDeleted=0, isActive=1', idata, function (err,result) {
		if (err) {
			return res.send(err);
		} else {
			return res.send('Ok');
		}
	});
});

app.get('/userslist',function(req,res){
	connection.query('SELECT * FROM security_users where isDeleted=0', function(err, rows, fields) {
		if (err) throw err;
		var data=[];
		for(i=0;i<rows.length;i++){
			data.push(rows[i]);
		}
		res.end(JSON.stringify(data));		
	});
});

app.put('/userslist/delete', function(req, res){
	var id = req.body;
	var sql = "update security_users set isDeleted = 1, isActive=0 where ?";
	var query = connection.query(sql, id, function (err,result) {
		if (err) {
			return res.send(err);
		} else {
			return res.send('Ok');
		}
	});
});

app.put('/userslist/modify:num', function(req, res) {
	var str = req.url.substr(1);
    var splitted = str.split("/");
    var num = splitted[1].substr(6);
	var mdata = req.body;
	var sql = "update security_users set ? where UserKey = ?";	
	var data = [mdata, num];
	var query = connection.query(sql, data, function (err,result) {
		if (err) {
			return res.send(err);
		} else {
			return res.send('Ok');
		}
	});
});


app.get('/userslist:id',function(req,res){
	var  id = req.url.substr(10);
	connection.query("SELECT * FROM security_users WHERE UserKey = '"+id+"'", function(err, rows, fields) {
		if (err) throw err;
		var data=[];
		for(var i=0;i<rows.length;i++){
			data.push(rows[i]);
		}
		res.end(JSON.stringify(data));
	});
});

app.get('/table',function(req,res){
	connection.query('SELECT * FROM employee where isdelete=0', function(err, rows, fields) {
		if (err) throw err;
		var data=[];
		for(i=0;i<rows.length;i++){
			data.push(rows[i]);
		}
		res.end(JSON.stringify(data));		
	});
});


app.get('/table:id',function(req,res){
	var id = req.url.substr(6);
	connection.query("SELECT * FROM employee WHERE id = '"+id+"'", function(err, rows, fields) {
		if (err) throw err;
		var data=[];
		for(var i=0;i<rows.length;i++){
			data.push(rows[i]);
		}
		res.end(JSON.stringify(data));
	});
});

app.post('/insert', function(req, res) {
	var idata = req.body;
	var query = connection.query('insert into employee set ? , isdelete=0', idata, function (err,result) {
		if (err) {
			return res.send(err);
		} else {
			return res.send('Ok');
		}
	});
});

app.put('/modify:num', function(req, res) {
	var num = req.url.substr(7);
	var mdata = req.body;
	var sql = "update employee set ? where id = ?";	
	var data = [mdata, num];
	var query = connection.query(sql, data, function (err,result) {
		if (err) {
			return res.send(err);
		} else {
			return res.send('Ok');
		}
	});
});

app.put('/delete', function(req, res){
	var id = req.body;
	var sql = "update employee set isdelete = 1 where ?";
	var query = connection.query(sql, id, function (err,result) {
		if (err) {
			return res.send(err);
		} else {
			return res.send('Ok');
		}
	});
});

server.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", port " + server_port )
});

