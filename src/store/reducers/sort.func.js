import { sorterByDate, sorterByLikeCount } from "./sort.type";

const iterateAndGetTarget = (head, targetDepth, coords) => {
  // const depth = targetDepth
  let res = head;
  const standard = 2;

  const isStillInRange = targetDepth % standard === 0;
  if (!isStillInRange) {
    --targetDepth;
  }

  for (let i = 2; i <= targetDepth; ++i) {
    res = res.child[coords[`d${i}`]];
  }
  return res;
};

const getIdHead = (head, targetDepth, coords) => {
  // const depth = targetDepth
  let res = head;
  const standard = 2;

  const isStillInRange = targetDepth % standard === 0;
  if (!isStillInRange) {
    --targetDepth;
  }

  for (let i = 2; i < targetDepth - 1; ++i) {
    res = res.child[coords[`d${i}`]];
  }
  return res;
};

export const sortByDepth = props => {
  const { coords, chapters, depth, isSortedByLikes, sortInfo, setSortInfo } =
    props;
  const { d0, d1, d2, d3, d4, d5, d6, d7, d8, d9 } = coords;

  // const head = chapters[d0][d1].child[d2].deck;
  const target = iterateAndGetTarget(chapters[d0][d1], depth, coords);
  const head = target.deck;
  const idChapter = getIdHead(chapters[d0][d1], depth, coords);
  const idChapterLength = idChapter?.child?.length;

  let tempNewSortInfo = undefined;
  if (!sortInfo[depth]) {
    const chd = [];
    for (let i = 1; i < idChapterLength; i++) {
      chd.push(idChapter.child[i]);
    }
    tempNewSortInfo = {
      [depth]: {
        id: head.id,
        children: chd,
      },
    };
    setSortInfo(tempNewSortInfo);
  }

  // const rests = chapters[d0][d1].child[d2].child.map(ch => ch.deck);
  const rests = target.child.map(item => item.deck);
  const slice = [head, ...rests];
  console.log(`[sort] depth: ${depth}\nbefore sort\n`);
  console.log(
    slice.map(ch => ({
      id: +ch.id,
      content: ch.content,
      likes: ch.like_count,
      updateDt: ch.updateDt,
    })),
  );

  console.log("--------------------------------------------------------");
  console.log("--------------------------------------------------------");

  const sorted = slice.sort((a, b) => {
    return isSortedByLikes
      ? sorterByDate(a, b, false)
      : sorterByLikeCount(a, b, false);
  });

  console.log(`[sort] depth: ${depth}\nafter sort\n`);
  console.log(
    slice.map(ch => ({
      id: +ch.id,
      content: ch.content,
      likes: ch.like_count,
      updateDt: ch.updateDt,
    })),
  );

  const currentHead = sorted.shift();
  console.log(tempNewSortInfo);
  const sortInfoId = tempNewSortInfo[depth].id;
  const sortInfoChildren = tempNewSortInfo[depth].children;
  const currentId = currentHead.id;
  console.log(
    `sort Info Id: ${tempNewSortInfo}, current Head Id: ${currentId}`,
  );

  for (let i = 1; i < idChapterLength; i++) {
    idChapter.child[i].deck.isHide = sortInfoId !== currentId;
  }

  if (sortInfoId === currentId) {
    for (let i = 1; i < idChapterLength; ++i) {
      idChapter.child[i].deck = sortInfoChildren;
    }
    // resetHeadChildren();
  }

  target.deck = currentHead;
  const childLength = target.child.length;
  target.child = [];

  for (let i = 0; i < childLength; ++i) {
    const newCard = sorted.shift();
    if (+sortInfoId !== +newCard.id) {
      target.child.push({
        deck: newCard,
        child: [],
      });
    } else {
      target.child.push({
        deck: newCard,
        child: [...sortInfoChildren],
      });
    }
  }

  // if (headChildrenId === newHead.id) {
  //   resetHeadChildren();
  // }
};
