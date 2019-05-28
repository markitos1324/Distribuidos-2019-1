var express = require('express');
var axios = require('axios');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

const name = "3001";
var servList = ["3000", "3001", "3002", "3003"];
var currentLeader = "3000";
var weight = 7;
var canLeader = true;
var vote = {server: [200, weight, name]};

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

app.get('/leader', function (req, res) {
    res.send("El lider Actual es: " + currentLeader);
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
    for (var i = 0; i < servList.length; i++){
        axios.post('http://localhost:' + servList[i] + '/newLeaderOperate', sendLeaderData).then(response => {

        }).catch(error => {
            res.send("Fallo");
            console.log("error test");
        });
    }
});

app.post('/newLeaderOperate', function(req, res, next) {
    if (canLeader) {
        var response = {server: {status: 200, size: weight, name: name}};
    }else{
        var response = {server: {status: 500, size: weight, name: name}};
    }
    axios.post('http://localhost:' + currentLeader + '/newLeaderFinish', response).then(response => {
        res.send("ok")
    }).catch(error => {
        res.send("Fallo");
        console.log("error test");
    });
});

app.post('/newLeaderFinish', function(req, res, next) {
    vote.server = req.body.server;
    var finalleader;
    var actual = weight;
    for (let i in vote){
        if (vote[i].status != 500 ){
            if (actual > vote[i].size) {
                currentLeader = vote[i].name;
            }
        }
    }
    for (var i=0;i<servList.length;i++){
        axios.post('http://localhost:' + servList[i] + '/commentNewLeader', {name: currentLeader}).then(response => {
            res.sendFile("ok");
        }).catch(error => {
            res.send("Fallo");
            console.log("error newLeader");
        });
    }
});

app.post('/commentNewLeader', function(req, res, next) {
    currentLeader = req.body.name;
    console.log("LIDER: " + currentLeader);
});


app.post('/commentNewLeaderFinish', function(req, res, next) {
    currentLeader = req.body.name;
    res.send("ok");
});

app.get('/launchLeader', function(req, res, next) {
    res.send(currentLeader);
});

app.post('/', function(req, res, next) {
    console.log(req.body);
    res.send("ok");
});

app.listen(name, function () {
    console.log('Server on port ' + name);
});