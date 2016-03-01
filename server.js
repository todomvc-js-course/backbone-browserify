var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fakeDB = require('./fake-database.js');

app.use(bodyParser.json());

app.get('/api/todos', function(req, res) {
  res.json(fakeDB.get());
});

app.get('/api/todos/:id', function(req, res) {
  res.json(fakeDB.get(req.params.id));
});

app.put('/api/todos/:id', function(req, res) {
  var id = req.params.id;
  fakeDB.set(id, req.body);
  res.send();
});

app.put('/api/todos/:id', function(req, res) {
  fakeDB.set(req.params.id, req.body);
  res.send();
});

app['delete']('/api/todos/:id', function(req, res) {
  fakeDB.remove(req.params.id);
  res.send();
});

app.use(express.static('public'));
app.listen(3000);
