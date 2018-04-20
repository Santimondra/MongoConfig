const express = require("express"), 
      consolidate = require("consolidate"),
      MongoClient = require("mongodb").MongoClient;
      
var app = express(), db;
app.engine("hbs", consolidate.handlebars);
app.set("views", "./views");
app.set("view engine", "hbs");

app.get("/", function(req, res){
    db.collection("countries")
    .find(
        {area:{$lt: 20}},
        {
            projection:{area: 1, "name.common": 1}
        }
    )
    .sort({area: 1})
    .limit(2)
    .toArray(function(err, result){
        res.render("index",{ 
            title: "hola",
            countries: result
        });
    });
    
});

MongoClient.connect("mongodb://localhost:27017",
    function(err, client){
        if(err) throw err;

        console.log(err);
        db = client.db("test");
       
        }
    );

app.listen(5000);
