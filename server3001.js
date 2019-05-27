<<<<<<< HEAD
var express = require('express');
var fs = require('fs');
var axios = require('axios');
var app = express();

var count = 0;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/hola', function (req, res) {
	res.send(msg); 
});

app.get('/', function (req, res) {
	var html = fs.readFileSync('./pagina.html', 'utf8')
	res.send(html);
});

app.post('/', function(req, res, next) {
    console.log(req);
    var list = req.body.list;
    list.push('Server3001');
    axios.post('http://127.0.0.1:3002/', {list: list})
        .then(response => {
            res.send("ok");
        })
        .catch(error => {
            res.send("ok");
        });
});

app.listen(3001, function () {
  console.log('Server on port 3001!');
});


=======
var express = require('express');
var fs = require('fs');
var axios = require('axios');
var app = express();

var count = 0;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/hola', function (req, res) {
	res.send(msg); 
});

app.get('/', function (req, res) {
	var html = fs.readFileSync('./pagina.html', 'utf8')
	res.send(html);
});

app.post('/', function(req, res, next) {
    console.log(req);
    var list = req.body.list;
    list.push('Server3001');
    axios.post('http://127.0.0.1:3002/', {list: list})
        .then(response => {
            res.send("ok");
        })
        .catch(error => {
            res.send("ok");
        });
});

app.listen(3001, function () {
  console.log('Server on port 3001!');
});


>>>>>>> e1241c1467f77a81b4f4a2758af209fa9a504916
