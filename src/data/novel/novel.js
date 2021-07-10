// export const NOVEL = [
//   {
//     genre: GENRE.romance,
//     title: 'love is..',
//     pages: new Pages(),
//   },
//   {
//     genre: GENRE.comedy,
//     title: '웃지못하는 24시!',
//     pages: new Pages(),
//   },
// ];

import Pages from './page/pages';

class Novel {
  constructor(id, genre, title, author) {
    this._state = {
      id,
      genre,
      title,
      // pages: new Pages(),
      chapter: new Chapter(),
    };
    // this._state = {
    //   id,
    //   genre,
    //   title,
    //   author,
    //   comments: new Comments(),
    //   pages: new Pages(),
    // };
  }

  get state() {
    return this._state;
  }
}

export default Novel;
