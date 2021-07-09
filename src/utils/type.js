export const isTypeOf = (is, type) => typeof is === `${type}`;

export const isArrayTypeOf = (is, type) => typeof is[0] === `${type}`;

export const isTypeOfExcept = (is, type) => {
  if (!isTypeOf(is, type)) {
    throw new TypeError(`${is} is not of type ${type}`);
  }
};

export const isArrayTypeOfExcept = (is, type) => {
  if (!isArrayTypeof(is, type)) {
    throw new TypeError(`Array ${is} is not of type ${type}`);
  }
};
