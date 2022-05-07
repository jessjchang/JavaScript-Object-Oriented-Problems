function myBind(func, contextObj) {
  return function(...args) {
    return func.apply(contextObj, args);
  };
}
