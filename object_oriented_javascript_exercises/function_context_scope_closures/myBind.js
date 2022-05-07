function myBind(func, contextObj, ...partialArgs) {
  return function(...args) {
    let allArgs = partialArgs.concat(args);
    
    return func.apply(contextObj, allArgs);
  };
}
