export class Coordinates {
  constructor(params) {
    const { d0, d1, d2, d3 } = params;

    if ('d0' in params) this.d0 = +d0;
    if ('d1' in params) this.d1 = +d1;
    if ('d2' in params) this.d2 = +d2;
    if ('d3' in params) this.d3 = +d3;
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
}
