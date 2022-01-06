export class Coordinates {
  constructor(params) {
    const { d0, d1, d2, d3, d4, d5, d6, d7, d8, d9 } = params;

    if ("d0" in params) this.d0 = +d0;
    if ("d1" in params) this.d1 = +d1;
    if ("d2" in params) this.d2 = +d2;
    if ("d3" in params) this.d3 = +d3;
    if ("d4" in params) this.d4 = +d4;
    if ("d5" in params) this.d5 = +d5;
    if ("d6" in params) this.d6 = +d6;
    if ("d7" in params) this.d7 = +d7;
    if ("d8" in params) this.d8 = +d8;
    if ("d9" in params) this.d9 = +d9;
  }

  setD0(val) {
    this.d0 = +val;
  }
  setD1(val) {
    this.d1 = +val;
  }
  setD2(val) {
    this.d2 = +val;
  }
  setD3(val) {
    this.d3 = +val;
  }
  setD4(val) {
    this.d4 = +val;
  }
  setD5(val) {
    this.d5 = +val;
  }
  setD6(val) {
    this.d6 = +val;
  }
  setD7(val) {
    this.d7 = +val;
  }
  setD8(val) {
    this.d8 = +val;
  }
  setD9(val) {
    this.d9 = +val;
  }

  setD3(val) {
    this.d3 = +val;
  }
}
