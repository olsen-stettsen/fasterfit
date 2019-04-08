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
  //console.log(req);
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  posttodb(username, email, password);
  console.log("Request for main");
  console.log(username + " " + email + " " + password);
  getfromdb();
  setTimeout(function(){ 
    var recs = make_recs();
    var workoutdata = localStorage.getItem("results");
    //console.log("workoutdata: " + workoutdata);
    res.render(path.join(__dirname+'/public/main.ejs'), {username: username, email: email, password: password, results: workoutdata, recs: recs});  
  }, 1000);
});


app.post("/signin", function(req, res){
  var email = req.body.email;
  var password = req.body.password;
  console.log("Request for signin");
  getusername(password, email);
  setTimeout(function(){ 
    getfromdb();
  }, 1000);
  setTimeout(function(){ 
    var recs = make_recs();
    var username = localStorage.getItem("username");
    var workoutdata = localStorage.getItem("results");
    console.log("workouts: " + workoutdata);
    res.render(path.join(__dirname+'/public/main.ejs'), {username: username, email: email, password: password, results: workoutdata, recs: recs});  
  }, 2000);
});


app.use(express.json());
app.post("/writeworkout", function(req, res){
  console.log("req.body = " + JSON.stringify(req.body));

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });
  
  client.connect();
  var username = localStorage.getItem("username");
  console.log("username: " + username);
  client.query('INSERT INTO exercise (user_id, exercise_name, sets_reps_json) VALUES ((SELECT user_id FROM account WHERE user_name = \'' + username + '\'),\'' + req.body.name + '\',\'' + JSON.stringify(req.body) + '\');', (err, res) => {
    var results = [];
    if (err) throw err;
    for (let row of res.rows) {
      results.push(row);
    }
    client.end();
  });
});
function getfromdb(){
  var username = localStorage.getItem("username");
  console.log(username);
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });
  client.connect();
  client.query('SELECT * FROM exercise WHERE user_id = (SELECT user_id FROM account WHERE user_name = \'' + username + '\');', (err, res) => {
    //console.log("getfromdb = " + JSON.stringify(res.rows));
    localStorage.setItem("results", JSON.stringify(res.rows));
    client.end();
  })
}
function getusername(password, email){
  console.log("getusername funtion called");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });
  console.log('SELECT user_name FROM account WHERE user_email = \'' + email + '\' AND user_password = \'' + password + '\';');
  
  client.connect();
  client.query('SELECT user_name FROM account WHERE user_email = \'' + email + '\' AND user_password = \'' + password + '\';', (err, res) => {
    if (err) throw err;
    console.log("res.row[0] = " + res.rows[0].user_name);
    localStorage.setItem("username", res.rows[0].user_name);
    client.end();
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
/***********************
 * Make recomendations
 **********************/
function make_recs() {
  var workouts = JSON.parse(localStorage.getItem("results"));
  var mostrecent = [];
  for (var count = 0; count < workouts.length; count++) {
    var wd = JSON.parse(workouts[count].sets_reps_json);
    var found = false;
    for (var u = 0; u < mostrecent.length; u++) {
      if (wd.name.toUpperCase() == mostrecent[u].name.toUpperCase()) {
        mostrecent[u].sets = wd.sets;
        found = true;
      }
    }
    if (!found) {
      var wO = new Workout();
      wO.name = wd.name.toUpperCase();
      wO.sets = wd.sets;
      mostrecent[mostrecent.length] = wO;
    }
  }
  var recomendationsforyousir = "";
  for(var s = 0; s < mostrecent.length; s++){
    var workyout = JSON.parse(mostrecent[s]);
    //var topnum = workyout.sets[workyout.sets.length];
    console.log("ssssss: " + workyout);
  }
  return JSON.stringify(mostrecent);
}
function Workout(){
  this.name;
  this.sets = {};
  }
app.use(express.static("public")); 


app.listen(process.env.PORT || 5000, function(){
    console.log('Server is running on port 5000');
});
