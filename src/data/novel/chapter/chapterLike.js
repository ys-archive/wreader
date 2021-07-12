import { isTypeOfExcept } from '#utils';

class ChapterLike {
  constructor(id, chapterId, userId) {
    isTypeOfExcept(id, 'number');
    isTypeOfExcept(chapterId, 'number');
    isTypeOfExcept(userId, 'number');
    this._id = id;
    this._chapterId = chapterId;
    this._userId = userId;
  }
}

export default ChapterLike;
