function newStack() {
  var stack = [];

  return {
    push: function(item) {
      stack.push(item);
    },
    pop: function() {
      stack.pop();
    },
    printStack: function() {
      stack.forEach(function(item) {
        console.log(item);
      });
    },
  };
}
