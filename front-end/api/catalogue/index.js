(function (){
  'use strict';

  var express   = require("express")
    , request   = require("request")
    , endpoints = require("../endpoints")
    , helpers   = require("../../helpers")
    , app       = express()

  app.get("/catalogue/images*", function (req, res, next) {
    var url = endpoints.catalogueUrl + req.url.toString();
    console.log("images url "+url);
    request.get(url)
        .on('error', function(e) { next(e); })
        .pipe(res);
  });

  app.get("/getProducts", function (req, res, next) {
    var x = endpoints.catalogueUrl+"/getProducts" ;//+ req.url.toString();
    console.log("getProducts "+x);
    helpers.simpleHttpRequest(x
     , res, next);
  });
  // app.post('/newProduct', function(req, res) {
  //   var x = endpoints.catalogueUrl+"/newProduct" ;//+ req.url.toString();
  //   console.log("newProduct"+x);
  //   helpers.simpleHttpRequest(x
  //    , res);
  // });

  app.post('/newProduct',function(req,res){
    var x = endpoints.catalogueUrl+"/newProduct" ;//+ req.url.toString();
    console.log("newProduct"+ x);

    var options = {
      uri: x,
      method: 'POST',
      json: true,
      body: req.body
  };
  
    helpers.simpleHttpRequest(x,req, res);
    res.end("yes");
  });

  app.get("/tags", function(req, res, next) {
    helpers.simpleHttpRequest(endpoints.tagsUrl, res, next);
  });

  module.exports = app;
}());
