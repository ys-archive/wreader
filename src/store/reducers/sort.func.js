import { NativeViewGestureHandler } from "react-native-gesture-handler";
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
  const {
    coords,
    chapters,
    depth,
    setHeadChildrenId,
    headChildrenId,
    addHeadChildren,
    resetHeadChildren,
    headChildren,
    isSortedByLikes,
  } = props;
  const { d0, d1, d2, d3, d4, d5, d6, d7, d8, d9 } = coords;

  // const head = chapters[d0][d1].child[d2].deck;
  const target = iterateAndGetTarget(chapters[d0][d1], depth, coords);
  const head = target.deck;

  if (headChildrenId === -9999) {
    setHeadChildrenId(head.id);
  }

  const idChapter = getIdHead(chapters[d0][d1], depth, coords);
  const idChapterLength = idChapter?.child?.length;

  resetHeadChildren();
  for (let i = 1; i < idChapterLength; i++) {
    addHeadChildren(idChapter.child[i]);
  }

  // const rests = chapters[d0][d1].child[d2].child.map(ch => ch.deck);
  const rests = target.child.map(item => item.deck);
  const slice = [head, ...rests];
  console.log(`[sort] depth: ${depth}\nbefore sort\n`);
  console.log(
    slice.map(ch => ({
      content: ch.content,
      likes: ch.like_count,
      updateDt: ch.updateDt,
      isHide: ch.isHide,
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
      content: ch.content,
      likes: ch.like_count,
      updateDt: ch.updateDt,
      isHide: ch.isHide,
    })),
  );

  const newHead = sorted.shift();

  console.log(`headChildrenID: ${headChildrenId}, newHeadId: ${newHead.id}`);

  for (let i = 1; i < idChapterLength; i++) {
    idChapter.child[i].deck.isHide = headChildrenId !== newHead.id;
  }

  if (headChildrenId === newHead.id) {
    for (let i = 1; i < idChapterLength; ++i) {
      idChapter.child[i].deck = headChildren[i];
    }
    // resetHeadChildren();
  }

  target.deck = newHead;
  const childLength = target.child.length;
  target.child = [];

  for (let i = 0; i < childLength; ++i) {
    const newCard = sorted.shift();
    if (headChildrenId !== newCard.id) {
      target.child.push({
        deck: newCard,
        child: [],
      });
    } else {
      target.child.push({
        deck: newCard,
        child: [...headChildren],
      });
    }
  }

  // if (headChildrenId === newHead.id) {
  //   resetHeadChildren();
  // }
};
