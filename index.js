var express = require('express');
var app = express();
const path = require('path');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); 

/*
app.get('/', function (req, res) {
  res.send('Hello World!');
});*/

app.get("/", function(req, res){
    console.log("Request for root");
    res.sendFile(path.join(__dirname+'/home.html'));


app.listen(process.env.PORT || 5000, function(){
    console.log('Server is running on port 5000');
});
