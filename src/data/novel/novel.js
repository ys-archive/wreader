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

import Page from './page';

export class Novel {
  constructor(genre, title) {
    this.state = {
      genre,
      title,
      page: new Page(),
    };
  }

  get getPage() {
    return this.state.page;
  }
}
