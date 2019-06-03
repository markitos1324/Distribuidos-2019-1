var express = require('express');
var axios = require('axios');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

const name = "3002";
var servList = ["3000", "3001", "3002", "3003"];
var currentLeader = "3000";
var weight = 3;
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
    console.log("Comenzando Proceso...");
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
    console.log("Enviando Respuesta: status" + response.server.status + " nombre" + response.server.name);
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
        console.log("Enviando nuevo lider: " + servList[i]);
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

app.post('/canLeader', function(req, res, next) {
    console.log("enviando si puedo ser leader");
    axios.post('http://localhost:' + currentLeader + '/resCanLeader', {name: currentLeader}).then(response => {
        res.sendFile("ok");
    }).catch(error => {
        res.send("Fallo");
        console.log("error newLeader");
    });
    res.send(canLeader);
});

app.post('/resCanLeader', function(req, res, next) {
    currentLeader = req.body.name;
    if (!currentLeader){
        var sendLeaderData;
        if (canLeader){
            sendLeaderData = {leader: [name, weight]};
        }else{
            sendLeaderData = {leader: ["", 0]};
        }
        console.log("Comenzando Proceso...");
        for (var i = 0; i < servList.length; i++){
            axios.post('http://localhost:' + servList[i] + '/newLeaderOperate', sendLeaderData).then(response => {

            }).catch(error => {
                res.send("Fallo");
                console.log("error test");
            });
        }
    }
    res.send("ok");
});
/*
function contador() {
    console.log("hola");
    if (currentLeader != name) {
        axios.post('http://localhost:' + currentLeader + '/canLeader', {name: name}).then(response => {
            res.sendFile("ok");
        }).catch(error => {
            res.send("Fallo");
            console.log("error newLeader");
        });
    }
}
*/
app.listen(name, function () {
    console.log('Server on port ' + name);
    //setTimeout(contador,1000);
});