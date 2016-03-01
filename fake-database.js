function FakeDatabase() {
  this._data = this.setDataDefault();
}

FakeDatabase.prototype.setDataDefault = function() {
  var res = {};
  var titles = ['Hello, world!', 'Yep!', 'How are you doing?'];
  var l = 3;

  while (l--) {
    var id = Math.random();
    res[id] = {
      id: id,
      title: titles[l],
      hidden: false,
      completed: false
    }
  }
  return res;
};

FakeDatabase.prototype.set = function(id, data) {
  this._data[id] = data;
};

FakeDatabase.prototype.get = function(id) {
  if (!id) {
    return this._getCollection();
  }
  return this._data[id];
};

FakeDatabase.prototype.remove = function(id) {
  if (!this._data[id]) {
    return;
  }
  delete this._data[id];
};

FakeDatabase.prototype._getCollection = function() {
  var res = [];

  for (var id in this._data) {
    if (this._data.hasOwnProperty(id)) {
      res.push(this._data[id]);
    }
  }
  return res;
};

module.exports = new FakeDatabase();
