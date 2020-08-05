var franchise = {
  name: 'How to Train Your Dragon',
  allMovies: function() {
    var addNum = function(number) {
      return this.name + ' ' + number;
    }.bind(this);
    return [1, 2, 3].map(addNum);
  },
};

console.log(franchise.allMovies());