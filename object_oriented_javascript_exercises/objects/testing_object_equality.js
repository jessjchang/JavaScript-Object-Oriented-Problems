function objectsEqual(obj1, obj2) {
  if (obj1 === obj2) return true;

  return sameKeys(obj1, obj2) && sameValues(obj1, obj2);
}

function sameKeys(obj1, obj2) {
  let obj1Keys = Object.keys(obj1);
  let obj2Keys = Object.keys(obj2);

  if (obj1Keys.length !== obj2Keys.length) return false;

  return obj1Keys.every(key => obj2Keys.includes(key));
}

function sameValues(obj1, obj2) {
  let obj1Values = Object.values(obj1);
  let obj2Values = Object.values(obj2);

  return obj1Values.every(value => obj2Values.includes(value));
}

console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false
