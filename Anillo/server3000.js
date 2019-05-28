var express = require('express');
var axios = require('axios');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

const name = "3000";
var servNext = "3001";
var currentLeader = name;
var weight = 9;
var canLeader = true;
/*
    lider tecnico
    GOTO
    FLOW QCON

    micro servicis
    apache
    ingenieria orientada al caos

 */
// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/hola', function (req, res) {
	res.send("Hola Mundo Mensaje o algo asi");
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/pagina.html'));
    /*
    axios.post('http://localhost:3001/lounchLeader', {leader: name}).then(response => {
        res.sendFile("OK");
    }).catch(error => {
        res.send("Fallo");
        console.log("error");
    });
    */
});

app.post('/test', function (req, res) {
    console.log("inicio" + currentLeader);
    canLeader = false;
    var sendLeaderData;
    if (canLeader){
        sendLeaderData = {leader: [name, weight]};
    }else{
        sendLeaderData = {leader: ["", 0]};
    }
    axios.post('http://localhost:' + servNext + '/newLeaderOperate', sendLeaderData).then(response => {
        res.send("OK");
    }).catch(error => {
        res.send("Fallo");
        console.log("error test");
    });
});

app.post('/newLeaderOperate', function(req, res, next) {
    console.log("inicio changeLeader: " + currentLeader);
    var number = (req.body.leader[1] > weight) ? req.body.leader[1] : weight ;
    var newLeader = (req.body.leader[1] > weight) ? req.body.leader[0] : name;
    var sendLeaderData;
    if (canLeader){
        sendLeaderData = {leader: [newLeader, number]};
    }else{
        sendLeaderData = {leader: [req.body.leader[0], req.body.leader[1]]};
    }
    currentLeader = newLeader;
    console.log("actual leader: " + sendLeaderData);
    axios.post('http://localhost:' + servNext + '/newLeaderOperate', sendLeaderData).then(response => {
        res.sendFile("ok");
    }).catch(error => {
        res.send("Fallo");
        console.log("error newLeader");
    });
});

app.post('/newLeaderFinish', function(req, res, next) {
    console.log("Finish " + currentLeader);
    axios.post('http://localhost:' + servNext + '/commentNewLeader', {name: req.body.leader[0]}).then(response => {
        res.sendFile("ok");
    }).catch(error => {
        res.send("Fallo");
        console.log("error newLeader");
    });
});

app.post('/commentNewLeader', function(req, res, next) {
    currentLeader = req.body.name;
    console.log("actual leader: " + currentLeader);
    axios.post('http://localhost:' + servNext + '/commentNewLeader', {name: req.body.name}).then(response => {
        res.sendFile("ok");
    }).catch(error => {
        res.send("Fallo");
        console.log("error newLeader");
    });
});

app.post('/commentNewLeaderFinish', function(req, res, next) {
    currentLeader = req.body.name;
    res.send("ok");
});

app.get('/launchLeader', function(req, res, next) {
    res.send(currentLeader);
});

app.get('/status', function(req, res, next) {
    res.send(canLeader);
});

app.post('/', function(req, res, next) {
    console.log(req.body);
    res.send("ok");
});

app.listen(name, function () {
  console.log('Server on port ' + name);
});