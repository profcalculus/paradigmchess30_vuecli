class Test {
  constructor (x, y) {
    this.x = x;
    this.y = y;
    this.z = 33;
    let p = Object.getPrototypeOf (this);
  }

  product () {
    return this.x * this.y;
  }
  product_xyz () {
    return this.product () * this.z;
  }
}

let t = new Test (2, 3);
let proto = Object.getPrototypeOf (t);
console.log (t);
console.log (proto);
console.log (t.product ());
console.log (t.product_xyz ());
console.log (t.z);
