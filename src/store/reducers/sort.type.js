export const SORT_TYPES = {
  ByDate: "ByDate",
  ByLikes: "ByLikes",
};

export const sorterByDate = (a, b, hasDeck = true) => {
  const bStr = hasDeck ? b.deck.updateDt : b.updateDt;
  const bb = new Date(
    +bStr.slice(0, 4),
    +bStr.slice(5, 7),
    +bStr.slice(8, 10),
    +bStr.slice(11, 13),
    +bStr.slice(14, 16),
    +bStr.slice(17, 19),
  );

  const aStr = hasDeck ? a.deck.updateDt : a.updateDt;
  const aa = new Date(
    +aStr.slice(0, 4),
    +aStr.slice(5, 7),
    +aStr.slice(8, 10),
    +aStr.slice(11, 13),
    +aStr.slice(14, 16),
    +aStr.slice(17, 19),
  );

  // console.log(bb, aa, bb - aa);

  return bb - aa;
};

export const sorterByLikeCount = (a, b, hasDeck = true) =>
  hasDeck ? b.deck.like_count - a.deck.like_count : b.like_count - a.like_count;
