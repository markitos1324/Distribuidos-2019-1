var express = require('express');
var axios = require('axios');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

const name = "3000";
var servNext = "3001";

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

app.post('/', function(req, res, next) {
    var currentDate = new Date();
    var hours = currentDate.getHours();
    var minuts = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();

    console.log(hours + ":" + (minuts) + ":" + seconds);

    res.send("ok");
    /*
    axios.post('http://localhost:' + servNext + '/commentNewLeader', {name: req.body.name}).then(response => {
        res.sendFile("ok");
    }).catch(error => {
        res.send("Fallo");
        console.log("error newLeader");
    });
*/
});

app.listen(name, function () {
  console.log('Server on port ' + name);
});
