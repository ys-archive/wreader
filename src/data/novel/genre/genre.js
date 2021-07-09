export const GENRE = {
  romance: '로맨스',
  comedy: '코메디',
  romanticFantasy: '로맨틱 판타지',
  modernFantasy: '모던 판타지',
  lifeStyle: '라이프 스타일',
  mystery: '미스터리',
  thriller: '스릴러',
};

class Genre {
  constructor(genreName) {
    this.value = GENRE[genreName];
  }
}

export default Genre;
