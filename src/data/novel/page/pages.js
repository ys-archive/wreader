import { isTypeOfExcept, isArrayTypeOfExcept } from '#utils';

class Pages {
  onPageMoved;
  onFirstPageReached;
  onLastPageReached;

  get contents() {
    return this._contents;
  }

  set contents(newContents) {
    isArrayTypeOfExcept(newContents, 'string');
    this._contents = newContents;
  }

  constructor(content) {
    this._currentPage = 0;
    this._lastPage = 10;

    if (typeof content === 'string') {
      this._contents = content;
    }
  }

  static _checkPageIsNumber(page) {
    isTypeOfExcept(page, 'number');

    if (page < 0) {
      throw new Error('page cannot be under 0');
    }

    if (page > this._lastPage) {
      throw new Error('page cannot be greater than last page');
    }
  }

  setContent(page, newContent) {
    Pages._checkPageIsNumber(page);
    this._contents[page] = newContent;
  }

  moveTo(page) {
    Pages._checkPageIsNumber(page);
    this._currentPage = page;
  }

  moveToNext() {
    if (this._currentPage >= this._lastPage) {
      this.onLastPageReached();
      return;
    }

    onPageMoved(++this._currentPage);
  }

  moveToPrevious() {
    if (this._currentPage <= 0) {
      this.onFirstpageReached();
      return;
    }

    onPageMoved(--this._currentPage);
  }

  moveToFirst() {
    this._currentPage = 0;
    onPageMoved(0);
    onFirstPageReached();
  }

  moveToLast() {
    this._currentPage = this._lastPage;
    onPageMoved(this._lastPage);
    onFirstPageReached();
  }
}

export default Pages;
