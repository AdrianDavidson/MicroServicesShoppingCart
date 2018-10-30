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

    app.post("/newProduct", function(req, res) {
      var body = '';
      req.on('data', function (data) {
        body += data;
      });
      req.on('end', function () {
        var options = {
            uri: endpoints.newProductUrl+"/newProduct",
            method: 'POST',
            json: true,
            body: body
        };
        request(options, function(res) {
            req.on('data', function (data) {
            });
         });
      });
      res.send("the new product has been updated");
    });

  app.get("/tags", function(req, res, next) {
    helpers.simpleHttpRequest(endpoints.tagsUrl, res, next);
  });

  module.exports = app;
}());
