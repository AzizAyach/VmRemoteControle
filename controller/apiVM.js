

var express = require('express');
var app = express();
var VM = require('../model/VM.js');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var main = require('../app.js');






exports.post = function(req, res) {
    console.log(req.body);

   new VM({name: req.body.name, ipadresse:req.body.ip, username:req.body.username, os:req.body.os, harddisk:req.body.hdd,
       Ram:req.body.ram, cpu:req.body.cpu, created_at:Date.now(), updated_at:Date.now()})
       .save(function(err){
           if(err){
           }
           else {

                   res.redirect('/test');

           }
       });


}

exports.list = function(req, res) {
    VM.find(function(err, vm) {
        res.render('pages/vmmanager',{listvm:vm});
    });
}

exports.show = (function(req, res) {
    VM.findOne({title: req.params.title}, function(error, thread) {

    })
});

exports.delete = (function(req, res) {
  VM.findByIdAndRemove(req.body.id, function(err) {
        if (!err) {
            res.get('referer');
        }
        else {
        console.log(err);
        }
    });
});

exports.home = function(req, res) {
    VM.find(function(err, vm) {
        res.render('pages/dashbordvm',{listvm:vm});
    });
}