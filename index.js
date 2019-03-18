const express = require("express");
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public")); // serve files in this folder
app.get("/", function(req, res){
    console.log("Request for root");
    res.sendFile(path.join(__dirname+'/index.html'));
});
app.listen(5000, function(){
    console.log("Server is listening on port 5000");
});