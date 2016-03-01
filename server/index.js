var fs = require('fs');
var path = require('path');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var data = JSON.parse(fs.readFileSync(path.join(__dirname, 'todos.json'), 'utf-8'));
var FakeDB = require('fake-db');
var db = new FakeDB(data);

app.use(bodyParser.json());

app.get('/api/todos', function(req, res) {
  db.getCollection().then(function(collection) {
    res.json(collection);
  });
});

app.get('/api/todos/:id', function(req, res) {
  db.getItem(req.params.id).then(function(item) {
    req.json(item);
  });
});

app.put('/api/todos/:id', function(req, res) {
  db.setItem(req.params.id, req.body).then(function() {
    res.send();
  });
});

app['delete']('/api/todos/:id', function(req, res) {
  db.removeItem(req.params.id).then(function() {
    res.send();
  });
});

app.use(express.static(path.join(process.cwd(), 'public')));
app.listen(3000, function() {
  console.log('dev server is running');
});
