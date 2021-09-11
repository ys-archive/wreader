import React from 'react';
import ChapterIndicatorCard from '../components/reader-card/chapter/chapter-card/ChapterIndicatorCard';
import CategoryIndicatorCard from '../components/reader-card/category/CategoryIndicatorCard';

const indicatorPos = {
  top: '-80%',
  bottom: '-80%',
  left: '-87%',
  right: '-87%',
};

const MakeIndicators = (dir, coords) => {
  const { d0, d1, d2, d3 } = coords;

  return Object.entries(dir).map((d, i) => {
    const [direction, set] = d;
    const [has, isCategory] = set;
    // console.log(direction, has, isCategory);

    if (has) {
      return isCategory === 0 ? (
        <CategoryIndicatorCard
          key={i}
          pos={{ position: 'absolute', [direction]: indicatorPos[direction] }}
          order={direction === 'top' ? d0 - 1 : d0 + 1}
        />
      ) : (
        <ChapterIndicatorCard
          key={i}
          pos={{ position: 'absolute', [direction]: indicatorPos[direction] }}
          order={d0}
        />
      );
    }
  });
};

export const renderWithDepth0 = (coords, maxCoords) => {
  const { d0 } = coords;
  const { d0: md0, d1: md1 } = maxCoords;

  const hasPrvCategory = d0 !== 0 && d0 < md0;
  const hasNextCategory = d0 < md0 - 1;
  const hasChapter = md1 !== 0;

  return MakeIndicators(
    {
      top: [hasPrvCategory, 0],
      bottom: [hasNextCategory, 0],
      right: [hasChapter, 1],
    },
    coords,
  );
};

export const renderWithDepth1 = (coords, maxCoords) => {
  const { d1 } = coords;
  const { d1: md1, d2: md2 } = maxCoords;
  const hasCategory = d1 === 0;
  const hasPrvChapter = d1 !== 0;
  const hasNextChapter = d1 < md1 - 1;
  const hasUserChapter = md2 > 0;

  return MakeIndicators(
    {
      left: hasCategory
        ? [hasCategory, 0]
        : hasPrvChapter && [hasPrvChapter, 1],
      right: [hasNextChapter, 1],
      bottom: [hasUserChapter, 1],
    },
    coords,
  );
};

export const renderWithDepth2 = (coords, maxCoords) => {
  const { d2 } = coords;
  const { d2: md2, d3: md3 } = maxCoords;

  const hasChapter = d2 === 0;
  const hasPrvUserChapter = d2 !== 0;
  const hasNextUserChapter = d2 < md2 - 1;
  const hasUserNext = md3 !== 0;

  return MakeIndicators(
    {
      top: hasChapter
        ? [hasChapter, 1]
        : hasPrvUserChapter && [hasPrvUserChapter, 1],
      right: [hasUserNext, 1],
      bottom: [hasNextUserChapter, 1],
    },
    coords,
  );
};

export const renderWithDepth3 = (coords, maxCoords) => {
  const { d3 } = coords;
  const { d3: md3 } = maxCoords;

  const hasUserChapter = d3 === 0;
  const hasPrvUserNext = d3 !== 0;
  const hasNextUserNext = d3 < md3 - 1;

  return MakeIndicators(
    {
      left: hasUserChapter
        ? [hasUserChapter, 1]
        : hasPrvUserNext && [hasPrvUserNext, 1],
      right: [hasNextUserNext, 1],
    },
    coords,
  );
};
