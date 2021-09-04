export class Coordinates {
  constructor(x, y, z) {
    this._x = x;
    this._maxX = x;
    this._y = y;
    this._maxY = y;
    this._z = z;
    this._maxZ = z;
  }

  checkValid(val) {
    if (val < 0) throw new Error('coordinatex x is out of range');
    if (val > _maxX)
      throw new Error('coordinatex x cannot be greater than max');
  }

  set x(val) {
    checkValid(val);
    this._x = val;
  }

  get x() {
    return this._x;
  }

  set y(val) {
    checkValid(val);
    this._y = val;
  }

  get y() {
    return this._y;
  }

  set z(val) {
    checkValid(val);
    this._z = val;
  }

  set maxX(val) {
    if (val < 0) throw new Error('coordinatex x is out of range');

    this._maxX = val;
  }

  get maxX() {
    return this._maxX;
  }

  set maxY(val) {
    if (val < 0) throw new Error('coordinatex x is out of range');

    this._maxY = val;
  }

  get maxY() {
    return this._maxY;
  }

  set maxZ(val) {
    if (val < 0) throw new Error('coordinatex x is out of range');

    this._maxZ = val;
  }

  get maxZ() {
    return this._maxZ;
  }
}
