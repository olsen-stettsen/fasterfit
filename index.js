var express = require('express');
var app = express();
const path = require('path');
const bodyParser = require('body-parser');
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');

const { Client } = require('pg');

app.use(bodyParser.urlencoded({ extended: true })); 
app.set('view engine', 'ejs');

app.get("/", function(req, res){
    console.log("Request for root");
    res.sendFile(path.join(__dirname+'/home.html'));
});
app.post("/main", function(req, res){
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  posttodb(username, email, password);
  console.log("Request for update");
  console.log(username + " " + email + " " + password);
  getfromdb();
  setTimeout(function(){ 
    var workoutdata = localStorage.getItem("results");
    console.log("workoutdata: " + workoutdata);
    res.render(path.join(__dirname+'/public/main.ejs'), {username: username, email: email, password: password, results: workoutdata});  
  }, 1000);
});
app.post("/writeworkout", function(req, res){
  console.log(JSON.stringify(req));
  postworkouttodb();
});
function getfromdb(){
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });
  client.connect();
  client.query('SELECT * FROM account;', (err, res) => {
    localStorage.setItem("results", JSON.stringify(res.rows));
    client.end();
  })
}

function posttodb(username, email, password){
  console.log("user name: " + username);
  console.log("email: " + email);
  console.log("password: " + password);
  
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });
  
  client.connect();
  client.query('INSERT INTO account (user_name, user_email, user_password) VALUES (\'' + username + '\',\'' + email + '\',\'' + password+ '\');', (err, res) => {
    var results = [];
    if (err) throw err;
    for (let row of res.rows) {
      results.push(row);
    }
    client.end();
  });
  localStorage.setItem('username', username);
}
function postworkouttodb(){
  console.log("posting to workout to db");
}

app.use(express.static("public")); 


app.listen(process.env.PORT || 5000, function(){
    console.log('Server is running on port 5000');
});
