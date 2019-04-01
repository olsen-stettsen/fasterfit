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
  var workoutdata = getfromdb();
  res.render(path.join(__dirname+'/public/main.ejs'), {username: username, email: email, password: password, results: workoutdata});
});
/*
function getfromdb(){
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });
  
  client.connect();
  var results = [];
  var count = 0;
  client.query('SELECT * FROM account;', (err, res) => {
    
    client.end();
  });
  //results[0] = "dd";
  //results[1] = "ee";
  return JSON.stringify(results);
}*/
function getfromdb(){
  const results = [];
    pg.connect(connectionString, (err, client, done) => {
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM account;');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
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

app.use(express.static("public")); 


app.listen(process.env.PORT || 5000, function(){
    console.log('Server is running on port 5000');
});
