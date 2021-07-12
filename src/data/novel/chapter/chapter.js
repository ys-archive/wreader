import { isInstanceOfExcept, isTypeOfExcept } from '#utils';
// import Candidate from './candidate';

class Chapter {
  constructor(
    id,
    categoryId,
    userId,
    contents,
    replyCount,
    likeCount,
    groupIdx,
    depth,
    isLastChapter = false,
  ) {
    this._id = id;
    this._categoryId = categoryId;
    this._userId = userId;
    this._contents = contents;
    this._replyCount = replyCount;
    this._likeCount = likeCount;
    this._groupIdx = groupIdx;
    this._depth = depth;

    this._candidates = [];
    this._currentChapterIdx = 0;
    this._isLastChapter = isLastChapter;
  }

  get isLastChapter() {
    return this._isLastChapter;
  }

  get currentChapterIdx() {
    return this._currentChapterIdx;
  }

  currentChapter(idx) {
    isTypeOfExcept(idx, 'number');
    if (idx < 0 || idx > _candidates.length) {
      throw new Error(
        "idx can't be below 0 or bigger than length of candidates",
      );
    }
    return this._candidates[idx];
  }

  addNewCandidate(newCandidate) {
    isInstanceOfExcept(newCandidate, NewCandidate);
    this._candidates.push(newCandidate);
  }

  removeCandidateById(id) {
    isTypeOfExcept(id, 'string');
    this._candidates.filter(candidate => candidate.id !== id);
  }
}

export default Chapter;
