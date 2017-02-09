var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//var path = require('path');
//var favicon = require('serve-favicon');
//var logger = require('morgan');
//var cookieParser = require('cookie-parser');
//var bodyParser = require('body-parser');

//var routes = require('./routes/index');
////var users = require('./routes/users');


// use middleware
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname,'bower_components')));



var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
  endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});

var docClient = new AWS.DynamoDB.DocumentClient()

var table = "Movies";

 var year = 2015;
 var title = "The Big New Movie";

var params = {
    TableName: table,
    Key:{
        "year": year,
         "title": title
    }
};

docClient.get(params, function(err, data) {
    if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
    }
});


var todoItems = [
    { id: 1, desc: 'food' },
    { id: 2, desc: 'dood' },
    { id: 3, desc: 'eood' },
];

var automationCategory =[
 {   desc: 'foo' },
 {   desc: 'dd' }
];

app.get('/', function (req, res) {
    res.render('index', {
        title: 'My App',
        items: todoItems
    });

});


app.post('/add', function (req, res) {
    var newItem = req.body.newItem;
    todoItems.push({
        id: todoItems.length + 1,
        desc: newItem
    });
    res.redirect('/');
});


app.get('/getCategory', function (req, res) {
     var newItem = req.query.automationType;
    console.log('newItem Value is');
    console.log(newItem);


    res.send(todoItems)
 //   res.redirect('index', { data: newItem });
 //   res.redirect('/');
});

app.listen(7000, function () {
    console.log('Ready on Port 7000');
});


//// uncomment after placing your favicon in /public
////app.use(favicon(__dirname + '/public/favicon.ico'));
//app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
//app.use(require('stylus').middleware(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
//app.use('/users', users);

//// catch 404 and forward to error handler
//app.use(function (req, res, next) {
//    var err = new Error('Not Found');
//    err.status = 404;
//    next(err);
//});

//// error handlers

//// development error handler
//// will print stacktrace
//if (app.get('env') === 'development') {
//    app.use(function (err, req, res, next) {
//        res.status(err.status || 500);
//        res.render('error', {
//            message: err.message,
//            error: err
//        });
//    });
//}

//// production error handler
//// no stacktraces leaked to user
//app.use(function (err, req, res, next) {
//    res.status(err.status || 500);
//    res.render('error', {
//        message: err.message,
//        error: {}
//    });
//});


//module.exports = app;
