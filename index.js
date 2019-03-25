var express = require('express');
var app = express();
const path = require('path');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false })); 

/*
app.get('/', function (req, res) {
  res.send('Hello World!');
});*/

app.get("/", function(req, res){
    console.log("Request for root");
    res.sendFile(path.join(__dirname+'/home.html'));
});
app.get("/update", function(req, res){
  var name = req.body.name;
  var excercise = req.body.excercise;
  var weight = req.body.weight;
  console.log("name: " + name );
  console.log(excercise);
  console.log(weight);
  console.log("Request for update");
  res.sendFile(path.join(__dirname+'/public/update.html'));
});

app.use(express.static("public")); 


app.listen(process.env.PORT || 5000, function(){
    console.log('Server is running on port 5000');
});
