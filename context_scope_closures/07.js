function makeCounter() {
  var count = 1;

  return function() {
    console.log(count++);
  };
}

var counter = makeCounter();
counter();
