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
    var list = req.body.list;
    console.log(list);
    list.push('Server3003');
    axios.post('http://127.0.0.1:3000/', {list: list})
        .then(response => {
            res.send("ok");
        })
        .catch(error => {
            res.send("ok");
        });
});

app.listen(3003, function () {
  console.log('Server on port 3003!');
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
    var list = req.body.list;
    console.log(list);
    list.push('Server3003');
    axios.post('http://127.0.0.1:3000/', {list: list})
        .then(response => {
            res.send("ok");
        })
        .catch(error => {
            res.send("ok");
        });
});

app.listen(3003, function () {
  console.log('Server on port 3003!');
});


>>>>>>> e1241c1467f77a81b4f4a2758af209fa9a504916
