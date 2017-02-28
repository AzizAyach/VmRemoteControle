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

 app.get('/dash', api.home);
 app.post('/vmcreate', api.post);
 app.delete('/vmdelete', api.delete);
 app.get('/thread/:title.:format?', api.show);
 app.get('/test', api.list);

app.get('/home', function (req,res) {

    res.render('pages/home');

})


 exports.home = function(req, res) {
     VM.find(function (err, vm) {
         res.redirect('/test', api.list);
     });
 }

       app.get('/ssh', function(req, res , next) {

           var session =false;


               conn.on('ready', function(){
                   console.log("connect");
               var op ={'msg':'connect','location':'/home'};
                   res.writeHead(200, {"Content-Type": "application/json"});
                   res.end(JSON.stringify(op));
               });
               conn.on('error', function(){
                   console.log("fails");

               });
               conn.connect({
                   host: req.query.ip ,
                   port: 22,
                   username: req.query.user,
                   password: req.query.password
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


         app.get('/sql', function(req, res) {

             conn.on('ready', function() {
                 console.log('Connection :: ready');
                 conn.shell( function(err, stream) {
                     if (err) throw err;
                     stream.on('close', function() {
                         console.log('Stream :: close');
                         conn.end();
                     }).on('data', function(data) {

                         stream.write('sqlplus / as sysdba');
                         stream.write('DROP USER SOLIFE307GBE CASCADE;');


                     });
         });
             });
         });


app.post('/import', function(req, res) {


        var str = 'impdp '+req.body.username+'/'+req.body.password+'@'+req.body.database+' directory=DATAPUMP dumpfile='+req.body.dumpfile+'.EXP logfile= imp-'+req.body.dumpfile+' schemas='+req.body.schema+' remap_tablespace='+req.body.rmp+':'+req.body.rmps ;


        conn.exec(str,function(err,stream){
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

     app.post('/export', function(req, res) {


       conn.exec('expdp '+req.body.username+'/'+req.body.password+'@'+req.body.database+' schemas='+req.body.schema+' directory=DATAPUMP dumpfile='+req.body.dumpfile+'.EXP logfile='+req.body.logfile,function(err,stream){
        if (err) throw err;
        stream.on('close', function () {
            console.log('Stream :: close');
            res.redirect('/home');
        }).on('data', function (data) {
            console.log('STDOUT: ' + data);
        }).stderr.on('data', function (data) {
            console.log('STDERR: ' + data);
        });
    });
});

app.post('/importtest', function(req, res) {

    conn.exec('impdp IS601DEVX/IS601DEVX@orcl directory=DATAPUMP dumpfile=IS601DEVX.EXP logfile=imp-IS601DEVX.log schemas=IS601DEVX  remap_tablespace=USERS:BSBIS_DATA',function(err,stream){
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

app.post('/exporttest', function(req, res) {
    conn.exec('expdp IS601DEVX/IS601DEVX@orcl schemas=IS601DEVX directory=DATAPUMP dumpfile=firstexp.EXP logfile=expdp.log content=DATA_ONLY',function(err,stream){
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

app.get('/install', function(req, res) {
    conn.exec('cd /home/oracle/app/solife_install && java -jar com.bsb.solife.jboss-installer-6.1.4.jar auto_install_21.xml',
        function(err,stream){
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
