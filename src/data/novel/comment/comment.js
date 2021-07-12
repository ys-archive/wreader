import { isTypeOfExcept, isArrayTypeOfExcept } from '#utils';

class Comment {
  constructor(id, chapterId, userId, contents, likeCount = 0) {
    isTypeOfExcept(id, 'number');
    isTypeOfExcept(chapterId, 'number');
    isTypeOfExcept(userId, 'number');
    isArrayTypeOfExcept(contents, 'string');
    isTypeOfExcept(likeCount, 'number');

    this._id = id;
    this._chapterId = chapterId;
    this._userId = userId;
    this._contents = contents;
    this._likeCount = likeCount;
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
