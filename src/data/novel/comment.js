import { isTypeOfExcept, isArrayTypeOfExcept } from '#utils';

class Comment {
  constructor(author, contents) {
    isTypeOfExcept(author, 'string');
    isArrayTypeOfExcept(contents, 'string');

    this.author = author;

    this.contents = contents;
  }
}

export default Comment;
