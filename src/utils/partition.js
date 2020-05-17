Array.prototype.partition = function(fn) {
  const pt0 = this.filter(fn);
  const pt1 = this.filter(e => !fn(e));
  return [pt0, pt1];
}

const [pares,impares] = [0,1,2,3,4,5,6,7,8,9].partition(n => n % 2 === 0);
