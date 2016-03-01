function FakeDatabase(defaultTodos) {
  this._hashStorage = this._getHashFromCollection(defaultTodos);
}

FakeDatabase.prototype.set = function(id, data) {
  this._hashStorage[id] = data;
};

FakeDatabase.prototype.get = function(id) {
  if (!id) {
    return this._getCollectionFromHash();
  }
  return this._hashStorage[id];
};

FakeDatabase.prototype.remove = function(id) {
  if (!this._hashStorage[id]) {
    return;
  }
  delete this._hashStorage[id];
};

FakeDatabase.prototype._getHashFromCollection = function(collection) {
  var result = {};

  collection.forEach(function(item) {
    var id = Math.random();

    item.id = id;
    result[id] = item;
  });
  return result;
};

FakeDatabase.prototype._getCollectionFromHash = function() {
  var result = [];

  for (var id in this._hashStorage) {
    if (this._hashStorage.hasOwnProperty(id)) {
      result.push(this._hashStorage[id]);
    }
  }
  return result;
};

module.exports = FakeDatabase;
