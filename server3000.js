var express = require('express');
var fs = require('fs');
var axios = require('axios');
var app = express();

var count = 0;

/*
    lider tecnico
    GOTO
    FLOW QCON

    micro servicis
    apache
    ingenieria orientada al caos
    
 */
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
    var list = 1;
    axios.post('http://127.0.0.1:3001/', list).then(response => {
        res.render('index', { title: 'Express' });
    }).catch(error => {

        res.render('index', { title: 'Error' });
    });
});

app.get('/test', function (req, res) {
    axios.post('http://127.0.0.1:3001',{list:['server3001']}).then(response => {
        res.render('index', { title: 'Express' });
    }).catch(error => {
        res.render('index', { title: 'Error' });
    });
});

app.post('/', function(req, res, next) {
    console.log(req.body);
    res.send("ok");
});

app.listen(3000, function () {
  console.log('Server on port 3000!');
});