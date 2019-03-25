var express = require('express');
var app = express();
const path = require('path');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); 
app.set('view engine', 'ejs');

app.get("/", function(req, res){
    console.log("Request for root");
    res.sendFile(path.join(__dirname+'/home.html'));
});
app.post("/update", function(req, res){
  var name = req.body.name;
  var excercise = req.body.excercise;
  var weight = req.body.weight;
  posttodb(name, excercise, weight);
  console.log("Request for update");
  res.sendFile(path.join(__dirname+'/public/update.html'));
});

function posttodb(name, excercise, weight){
  console.log("name: " + name);
  console.log("excercise: " + excercise);
  console.log("weight: " + weight);
}

app.use(express.static("public")); 


app.listen(process.env.PORT || 5000, function(){
    console.log('Server is running on port 5000');
});
