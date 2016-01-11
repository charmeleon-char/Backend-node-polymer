var express = require('express');
var router = express.Router();
var path = require("path");
var mongoose = require('mongoose');
/* GET home page. */
router.get('/', function(req, res, next) {
  mongoose.model('Employes').find(function(err,Employes) {
    res.header("Access-Control-Allow-Origin","*");
    res.send(Employes);
  });
});

module.exports = router;
