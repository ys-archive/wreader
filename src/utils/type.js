export const isTypeOf = (is, type) => typeof is === `${type}`;

export const isArrayTypeOf = (is, type) => typeof is[0] === `${type}`;

export const isInstanceOf = (is, type) => is instanceof type;

export const isTypeOfExcept = (is, type) => {
  if (!isTypeOf(is, type)) {
    throw new TypeError(`${is} is not of type ${type}`);
  }
};

export const isArrayTypeOfExcept = (is, type) => {
  if (!isArrayTypeOf(is, type)) {
    throw new TypeError(`Array ${is} is not of type ${type}`);
  }
};

export const isInstanceOfExcept = (is, type) => {
  if (!isInstanceOf(is, type)) {
    throw new TypeError(`Instance ${is} is not of instance type ${type}`);
  }
};
