import { isTypeOfExcept, isArrayTypeOfExcept } from '#utils';

class Comments {
  constructor() {
    this._counts = 0;
    this._comments = [];
  }

  addNewComment(author, contents, id) {
    isTypeOfExcept(author, 'string');
    isArrayTypeOfExcept(contents, 'string');
    isTypeOfExcept(id, 'string');

    this._comments.push(new Comment(author, contents, id));
  }

  removeCommentById(id) {
    isTypeOfExcept(id, 'string');

    this._comments = this._comments.filter(comment => comment.id !== id);
  }

  removeCommentByAuthor(author) {
    isTypeOfExcept(author, 'string');

    this._comments = this._comments.filter(
      comment => comment.author !== author,
    );
  }
}

export default Comments;
