var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Client = require('ssh2');
var mongoose = require('mongoose');
var app = express();
var child = require('child_process');
var api = require('./controller/apiVM.js');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

       var conn = new Client();

       mongoose.connect('mongodb://localhost/remotecontrole');


        app.use(function(err, req, res, next) {
          res.locals.message = err.message;
          res.locals.error = req.app.get('env') === 'development' ? err : {};
          res.status(err.status || 500);
          res.render('error');
        });
                  

       app.get('/', function (req,res) {

         res.render('pages/index');

       })

app.get('/testdde', function (req,res) {



})

 app.post('/vmcreate', api.post);
 app.get('/thread/:title.:format?', api.show);
 app.get('/test', api.list);


       app.get('/ssh', function(req, res) {
           conn.on('ready', function(){
               console.log("connected");
           });
           conn.on('error', function(){
               console.log("fails");
           });
           conn.connect({
               host:'192.168.254.128',
               port: 22,
               username:'oracle',
               password:'98528576'
           });
       });

        app.get('/host', function(req, res) {
            conn.exec('ls -l', function (err, stream) {
                if (err) throw err;
                stream.on('close', function () {
                    console.log('Stream :: close');
                }).on('data', function (data) {
                    console.log('STDOUT: ' + data);
                }).stderr.on('data', function (data) {
                    console.log('STDERR: ' + data);
                });

            });
        });


         app.get('/getip', function(req, res) {

             conn.exec('sqlplus / as sysdba', function (err, stream) {
                 if (err) throw err;
                 stream.on('close', function () {
                     console.log('Stream :: close');
                 }).on('data', function (data) {
                     console.log('STDOUT: ' + data);
                 }).stderr.on('data', function (data) {
                     console.log('STDERR: ' + data);
                 });

             });
         });

          app.get('/sql', function(req, res) {
              conn.exec('java -version',function(err,stream){
                  if (err) throw err;
                  stream.on('close', function () {
                      console.log('Stream :: close');
                  }).on('data', function (data) {
                      console.log('STDOUT: ' + data);
                  }).stderr.on('data', function (data) {
                      console.log('STDERR: ' + data);
                  });
          });
          });



          app.use(function(req, res, next) {
              var err = new Error('Not Found');
              err.status = 404;
              next(err);
          });

          module.exports = app;
          app.listen(8080);
