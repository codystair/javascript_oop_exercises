function objectsEqual(obj1, obj2) {
  var obj1Keys = Object.keys(obj1);
  var obj2Keys = Object.keys(obj2);
  var i;
  var key;

  if (obj1Keys.length !== obj2Keys.length) {
    return false;
  }

  for (i = 0; i < obj1Keys.length; i += 1) {
    key = obj1Keys[i];

    if (obj1[key] !== obj2[key] || !obj2.hasOwnProperty(key)) {
      return false;
    }
  }

  return true;
}

console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false
