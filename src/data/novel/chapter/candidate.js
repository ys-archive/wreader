class Canditate {
  constructor(id, contents, author) {
    this._id = id;
    this._contents = contents;
    this._author = author;
    this._comments = [];
    this._likeCount = 0;
  }
}

export default Canditate;
