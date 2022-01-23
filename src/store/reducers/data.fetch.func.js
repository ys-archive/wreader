export const iterateAndGetTarget = (head, targetDepth, coords) => {
  let res = head;
  for (let i = 2; i < targetDepth; ++i) {
    res = res.child[coords[`d${i}`]];
  }
  return res;
};

export const fetchOne_internal = props => {
  const { coords, newChapter, depth, chapters } = props;
  const { d0, d1, d2, d3, d4, d5, d6, d7, d8, d9 } = coords;

  const origPos = iterateAndGetTarget(chapters[d0][d1], depth + 1, coords);
  console.log("[data.fetchOneChapter] OUTDATED\n", origPos.deck, "\n");

  if (newChapter) {
    origPos.deck = newChapter;
  }
};
