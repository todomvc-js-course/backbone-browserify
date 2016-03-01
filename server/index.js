var fs = require('fs');
var path = require('path');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var defaultData = JSON.parse(fs.readFileSync(path.join(__dirname, 'todos.json'), 'utf-8'));
var fakeDB = new (require('./fake-database.js'))(defaultData);

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

app.use(express.static(path.join(process.cwd(), 'public')));
app.listen(3000);
