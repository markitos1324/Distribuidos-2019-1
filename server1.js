var express = require('express');
var app = express();
var count = 0;
var msg = 'hola mundo mio';
var path = "http://192.168.0.21:3000/hola";
var servPathOne = "http://192.168.0.23:3000/hola";
var servPathTwo = "http://192.168.0.14:3000/hola";

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
	count ++;
	if (count >= 10) {
		res.send('<a href ="http://10.4.74.218:3000/"> ve a este sitio </a>');
		}else{
		res.send('(marco) eres: ' + count);		
	}
  
});

app.get('/hola', function (req, res) {
	res.send(msg); 
});

app.get('/servPathTwo', function (req, res) {
	res.send(path); 
});

app.get('/pagina', function (req, res) {
	res.send(
		'<!DOCTYPE html><html><head><meta charset="utf-8"><title>JS Bin</title>' +
		'<script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>' +
  		'<script src="https://cdnjs.cloudflare.com/ajax/libs/vue-resource/1.5.1/vue-resource.min.js"></script>' +
  		'<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.min.js"></script>' +
		'</head><body><div id="vueApp">' +
    	'<iframe id="frame" name="frame" src="http://10.4.73.46:3000/hola"></iframe>'+
     	'<input type="button" name="load"  onclick="load()">'+
   		'</div><script type="text/javascript">'+
   		'var path = "http://10.4.73.46:3000/hola";' +
   		'var servPathOne = "http://10.4.73.46:3000/hola";' +
   		'var servPathTwo = "http://10.4.74.218:3001/hola";' +
   		'Vue.prototype.$http = axios.min;'+
		'Vue.prototype.$http = axios;'+

  		'new Vue({'+
    		'el: \'#vueApp\','+
    		'data: {'+
    			
    		'},'+
    		
    	'});'+
    	 'console.log(\'Actual Server is: \' + path);' +
	    'function load(){'+
	       	'Vue.http.get(\'http://10.4.73.46:3000/hola\').then(function(response){'+
        	    	'if(response.status != response.error) {'+
        	    		'console.log(\'serv 1 status:\' + response.status);'+
        	    		'document.getElementById(\'frame\').src = "http://10.4.73.46:3000/hola";'+
        	    	'}'+
          	'}).catch(error => { ' +
    			'if (!error.response) {'+
            		// network error
            		'console.log(\'cambio serv\');'+
            		'Vue.http.get(\'servPathTwo\').then(function(response){'+
	       				'console.log(response.status);' +
        	    		'if(response.status != response.error) {'+
        	    			'console.log(\'serv 2 status:\' + response.status);'+
        	    			'document.getElementById(\'frame\').src = servPathTwo;'+
        	    		'}'+
          			'}).catch(error => { ' +
    					'if (!error.response) {'+
            				// network error
            				'console.log(\'error 2 \' + path);'+
        				'}'+
    				'})' +
        		'}'+
    		'})'+
        '}'+
   	'</script></body></html>'
); 
});

app.listen(3000, function () {
  console.log('Server on port 3000!');
});