var express = require('express');
var router = express.Router();

exports.insert = function(req,res,next){
  var us = mongoose.model('Employes',{ name: String,email:String});
  var Document = new us({name:req.body.name,email:req.body.email});
  Document.save(function(err,res){
  if(err) return next(err);
    res.send(res);
  });
};
