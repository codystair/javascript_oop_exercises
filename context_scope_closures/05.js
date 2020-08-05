function myBind(func, ctx) {
  var partialArgs = [].slice.apply(arguments, [2]);

  return function() {
    var remainingArgs = [].slice.apply(arguments);
    var fullArgs = partialArgs.concat(remainingArgs);

    return func.apply(ctx, fullArgs);
  };
}
