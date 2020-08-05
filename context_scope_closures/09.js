var greeter = {
  message: (function () {
    var name = 'Naveed';
    var greeting = 'Hello';

    return greeting + ' ' + name + '!';
  })(),
  sayGreetings: function() {
    console.log(this.message);
  },
};
