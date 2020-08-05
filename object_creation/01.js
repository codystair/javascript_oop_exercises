Object.prototype.ancestors = function() {
  var result = [];
  var proto = Object.getPrototypeOf(this);

  while (Object.getPrototypeOf(proto)) {
    result.push(proto.name);
    proto = Object.getPrototypeOf(proto);
  }

  return result.concat('Object.prototype');
};

var foo = {name: 'foo'};
var bar = Object.create(foo);
bar.name = 'bar';
var baz = Object.create(bar);
baz.name = 'baz';
var qux = Object.create(baz);
qux.name = 'qux';

console.log(qux.ancestors());  // returns ['baz', 'bar', 'foo', 'Object.prototype']
console.log(baz.ancestors());  // returns ['bar', 'foo', 'Object.prototype']
console.log(bar.ancestors());  // returns ['foo', 'Object.prototype']
console.log(foo.ancestors());  // returns ['Object.prototype']
