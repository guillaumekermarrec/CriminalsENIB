var express = require('express');
var http = require('http');
var path = require('path');
var jwt = require('jwt-simple');
var _ = require('underscore');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var errorhandler = require('errorhandler');
var favicon = require('serve-favicon');
var morgan = require('morgan');

var app = express();
var mongoose = require('mongoose');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('jwtTokenSecret', '123456ABCDEF');

app.use(favicon(__dirname + '/favicon.ico'));

app.use(morgan('combined'));
app.use(bodyParser() );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: false }) );
app.use(methodOverride());
//app.use(app.router);
//app.use(express.static(path.join(__dirname, 'public')));
app.use("/",express.static(__dirname));
app.use("styles",express.static(__dirname + '/styles'));
app.use("scripts", express.static(__dirname + '/scripts'));
app.use("images",  express.static(__dirname + '/images'));
app.use("views",  express.static(__dirname + '/views'));
app.use("criminals",  express.static(__dirname + '/criminals'));
app.use("bower_components", express.static(__dirname + '/bower_components'));

var tokens = [];

function requiresAuthentication(request, response, next) {
    console.log(request.headers);
    if (request.headers.access_token) {
        var token = request.headers.access_token;
        if (_.where(tokens, token).length > 0) {
            var decodedToken = jwt.decode(token, app.get('jwtTokenSecret'));
            if (new Date(decodedToken.expires) > new Date()) {
                next();
                return;
            } else {
                removeFromTokens();
                response.end(401, "Your session is expired");
            }
        }
    }
    response.end(401, "No access token found in the request");
}

function removeFromTokens(token) {
    for (var counter = 0; counter < tokens.length; counter++) {
        if (tokens[counter] === token) {
            tokens.splice(counter, 1);
            break;
        }
    }
}

// development only
if ('development' == app.get('env')) {
  app.use(errorhandler());
}

app.get('/', function(request, response) {
    response.sendfile(__dirname + "/index.html");
});

app.post('/api/login', function(request, response) {
    var userName = request.body.userName;
    var password = request.body.password;

    if (userName === "test" && password === "test") {
        var expires = new Date();
        expires.setDate((new Date()).getDate() + 5);
        var token = jwt.encode({
            userName: userName,
            expires: expires
        }, app.get('jwtTokenSecret'));

        tokens.push(token);

        response.send(200, { access_token: token, userName: userName });
    } else {
        response.send(401, "Invalid credentials");
    }
});

app.post('/api/logout', requiresAuthentication, function(request, response) {
    console.log("logout-------------------------");
    var token= request.headers.access_token;
    removeFromTokens(token);
    response.send(200);
});

mongoose.connect('mongodb://localhost/web4', function(err) {
    if (err) { throw err; }
    console.log("successfully logged!");
});
 
var criminalSchema = new mongoose.Schema({
  first_name : String,
  last_name : String,
  offense : String,
  gender : String,
  numberArrestation: String,
  picture: String
});

app.post('/search', function(request, response) {

    //console.log(request["body"]);
    //model du criminal
    var model= mongoose.model('criminals', criminalSchema);

    //element du champ Nom/Prénom
    var str_element = request["body"]["name"];

    model.find({'first_name' : new RegExp('^' + str_element)}, function(err, item)
    {
        if (err)
            return console.log(err);
        console.log(item); //print de l'élément correspondant de la BDD

        response.send(item); //renvoie au client de l'élément
    });
}); 

app.get('/search', function(request, response) {

    //console.log(request["body"]);
    //model du criminal
    var model= mongoose.model('criminals', criminalSchema);

    model.find(function(err, item)
    {
        if (err)
            return console.log(err);
        console.log(item); //print de l'élément correspondant de la BDD

        response.send(item); //renvoie au client de l'élément
    });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
