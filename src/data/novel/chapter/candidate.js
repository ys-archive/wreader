import { isTypeOfExcept, isArrayTypeOfExcept } from '#utils';

class Canditate {
  constructor(id, contents, author) {
    
    this._id = id;
    this._contents = contents;
    this._author = author;
  }

  get id() {
    return this._id;
  }

  get contents() {
    return this._contents;
  }

  get author() {
    return this._author;
  }

  get comments() {
    return this._comments;
  }

  get likeCount() {
    return this._likeCount;
  }
}

export default Canditate;
