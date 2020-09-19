export function distance(a, b) {
  var x = b[0] - a[0],
    y = b[1] - a[1];
  return Math.hypot(x, y);
}

export function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1];
}