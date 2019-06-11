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
    list.push('Server3002');
    axios.post('http://127.0.0.1:3003/', {list: list})
        .then(response => {
            res.send("ok");
        })
        .catch(error => {
            res.send("ok");
        });
});

app.listen(3002, function () {
  console.log('Server on port 3002!');
});

