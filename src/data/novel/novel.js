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

import Pages from './pages';

export class Novel {
  constructor(genre, title, author) {
    this.state = {
      genre,
      title,
      author,
      comments: new Comments(),
      pages: new Pages(),
    };
  }

  get getPages() {
    return this.state.pages;
  }
}
