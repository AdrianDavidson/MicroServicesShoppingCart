var express = require("express")
    , morgan = require("morgan")
    , path = require("path")
    , bodyParser = require("body-parser")

    , app = express();


app.use(morgan('combined'));
app.use(morgan("dev", {}));
app.use(bodyParser.json());

//app.use(morgan("dev", {}));
var cart = [];

//  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                      Check for double cart entries
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

var itemIsDouble;

var myProdID = [];
var doubledItemID;

app.post("/add", function (req, res, next) 
{
    var obj = req.body;
    itemIsDouble = false;
    console.log("Attempting to add to cart: " + JSON.stringify(req.body));
    for (var i = 0; i < myProdID.length; i++) 
    {
      if(myProdID[i] == obj.productID)
      {
        itemIsDouble = true;
        doubledItemID = obj.productID;
      }
    }

    if(itemIsDouble != true)
    {
      myProdID.push(obj.productID);
      console.log(myProdID);
      
      var max = 0;
      var ind = 0;
      if (cart["" + obj.custId] === undefined)
          cart["" + obj.custId] = [];
      var c = cart["" + obj.custId];
      for (ind = 0; ind < c.length; ind++)
          if (max < c[ind].cartid)
              max = c[ind].cartid;
      var cartid = max + 1;
      
      var data = {
          "cartid": cartid,
          "productID": obj.productID,
          "name": obj.name,
          "price": obj.price,
          "image": obj.image,
          "quantity": obj.quantity
      };
      console.log(JSON.stringify(data));
      c.push(data);
    }
        else{
        x = cart["" + obj.custId];
        for (var i = 0; i < x.length; i++) {
            if(x[i].productID == doubledItemID){
            console.log("Found It:");
            x[i].quantity = parseInt(obj.quantity) + parseInt(x[i].quantity) ;
            }
        }
        }


    res.status(201);

    res.send("");


});

//  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                     Delete product from cart
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

app.delete("/cart/:custId/items/:id", function (req, res, next) 
{
    x = cart["" + req.params.custId.toString()];
    
    for (var i = 0; i < x.length; i++) 
    {
      if(x[i].productID == req.params.id.toString())
      {
        x.splice(i,1);
        myProdID.splice(i,1);
      }
    }
    res.send('item deleted');
});


app.get("/cart/:custId/items", function (req, res, next) {


    var custId = req.params.custId;
    console.log("getCart" + custId);


    console.log('custID ' + custId);


    console.log(JSON.stringify(cart["" + custId], null, 2));

    res.send(JSON.stringify(cart["" + custId]));
    console.log("cart sent");

});


var server = app.listen(process.env.PORT || 3003, function () {
    var port = server.address().port;
    console.log("App now running in %s mode on port %d", app.get("env"), port);
});
