const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const fs = require('fs')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET, PUT, DELETE');
  next();
});

app.use(bodyParser.json())

var returnFileContent = function(filePath, response) {
  fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
      if (err) {
        console.log("err: ",err);
      }
      else{
          response.json(JSON.parse(data))
      }
  });   
}

app.get('/albums', function (req, res) {
  returnFileContent("data/albums-list.json",res);
})
app.get('/users/albums/:id', function (req, res) {
  returnFileContent("data/user-albums-list-"+req.params.id+".json",res);
})
app.get('/users/posts/:id', function (req, res) {
  returnFileContent("data/user-posts-list-"+req.params.id+".json",res);
})

app.get('/users', function (req, res) {
  returnFileContent("data/users-list.json",res);
})
app.get('/users/:id', function (req, res) {
  returnFileContent("data/user-"+req.params.id+".json",res);
})

app.listen(3000, function () {
  console.log('Music App server listening on port 3000!')
})
