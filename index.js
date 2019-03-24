var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(process.env.PORT || 5000, function(){
    console.log('Server is running on port 5000');
});
