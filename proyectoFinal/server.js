var express = require('express');
var axios = require('axios');
var path = require('path');
var multer = require('multer');
var fs = require('fs');
var upload = multer({dest: 'uploads/'});
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Distribuidos');

var Schema = mongoose.Schema;

var newsSchema = new Schema({
    title: String,
    description: String,
    image: String
});

var News = mongoose.model('News', newsSchema);

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization, sid");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
    next();
});
/*
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
*/

app.post('/', upload.any(), function(req, res, next) {
    if (req.files) {
        req.files.forEach(function (file) {

            var filename = (new Date).valueOf() + "-" + file.originalname;
            fs.rename(file.path, 'imagenes/' + filename, function (err) {
                if (err) throw err;
                //save

                var news = new News({
                    title: req.body.title,
                    description: req.body.description,
                    image: filename
                });

                model.save(function (err, result) {
                    if (err){

                    }
                    res.json(result);
                });
            })
        });
    }
});

app.get('/hola', function (req, res) {
	res.send("Hola Mundo Mensaje o algo asi");
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/pagina.html'));
});

app.post('/', function(req, res, next) {
    console.log(req.body);
    res.send("ok");
});

app.listen(3000, function () {
  console.log('Server on port ' + 3000);
});
