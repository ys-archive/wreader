import Genre from './genre/genre';
import Chapter from './chapter/chapter';

class Novel {
  constructor(id, genreName, title) {
    this._id = id;
    this._genre = new Genre(genreName);
    this._title = title;
    // last chapter (i === 9) -> last chapter marked!
    this._chapters = new Array(10).fill(0).map((_, i) => new Chapter(i === 9));
  }

  get id() {
    return this._id;
  }

  get genre() {
    return this._genre;
  }

  get title() {
    return this._title;
  }

  get chapters() {
    return this._chapters;
  }
}

export default Novel;
