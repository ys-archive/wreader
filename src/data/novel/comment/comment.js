import { isTypeOfExcept, isArrayTypeOfExcept } from '#utils';

class Comment {
  constructor(author, contents = '', id = '') {
    isTypeOfExcept(author, 'string');
    isArrayTypeOfExcept(contents, 'string');

    this._id = id;
    this._author = author;
    this._contents = contents;
    this._likeCount = 0;
    // TODO: Date format
    this._createdAt = new Date();
  }

  increaseLike() {
    ++this._likeCount;
  }

  decreaseLike() {
    --this._likeCount;
  }
}

export default Comment;
