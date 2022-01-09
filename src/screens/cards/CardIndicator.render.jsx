import React, { useMemo } from "react";
import ChapterIndicatorCard from "./chapter-card/ChapterIndicatorCard";
import CategoryIndicatorCard from "./category/CategoryIndicatorCard";

const indicatorPos = {
  top: "-80%",
  bottom: "-80%",
  left: "-87%",
  right: "-87%",
};

const MakeIndicators = (dir, coords) => {
  const { d0 } = coords;

  return Object.entries(dir).map((d, i) => {
    const [direction, set] = d;
    const [has, isCategory] = set;

    if (has) {
      let order = d0;

      switch (direction) {
        case "top":
          order = d0 - 1;
          break;

        case "bottom":
          order = d0 + 1;
          break;
      }

      return isCategory === 0 ? (
        <CategoryIndicatorCard
          key={i}
          pos={{ position: "absolute", [direction]: indicatorPos[direction] }}
          order={order}
        />
      ) : (
        <ChapterIndicatorCard
          key={i}
          pos={{ position: "absolute", [direction]: indicatorPos[direction] }}
          order={d0}
        />
      );
    }
  });
};

export const renderWithDepth0 = (coords, maxCoords) => {
  const { d0 } = coords;
  const { category, chapter } = maxCoords;

  const hasPrv = d0 !== 0 && d0 < category;
  const hasNxt = d0 < category - 1;
  const hasNxtDepth = chapter > 0;

  return MakeIndicators(
    {
      top: [hasPrv, 0],
      bottom: [hasNxt, 0],
      right: [hasNxtDepth, 1],
    },
    coords,
  );
};

export const renderWithDepth1 = (coords, chapters) => {
  const { d0, d1 } = coords;

  const hasPrvDepth = d1 === 0;
  const hasPrv = d1 !== 0;
  const hasNxt = chapters[d0][d1 + 1] !== undefined;
  const hasNextDepth = chapters[d0][d1].child.length > 0;
  // const hasNextDepth = chapters[d0][d1 + 1] !== null;

  return MakeIndicators(
    {
      left: [hasPrvDepth, 0],
      top: [hasPrv, 1],
      bottom: [hasNxt, 1],
      right: [hasNextDepth, 1],
    },
    coords,
  );
};

export const renderWithDepth2 = (coords, chapters) => {
  const { d0, d1, d2 } = coords;

  const hasPrvDepth = d2 === 0;
  const hasPrv = d2 !== 0;
  const hasNxt = chapters[d0][d1].child[d2 + 1] !== undefined;
  const hasNxtDepth = chapters[d0][d1].child[d2].child.length > 0;

  return MakeIndicators(
    {
      left: hasPrvDepth ? [hasPrvDepth, 1] : hasPrv && [hasPrv, 1],
      right: [hasNxt, 1],
      bottom: [hasNxtDepth, 1],
    },
    coords,
  );
};

export const renderWithDepth3 = (coords, chapters) => {
  const { d0, d1, d2, d3 } = coords;

  const hasPrvDepth = d3 === 0;
  const hasPrv = d3 !== 0;
  const hasNxt = chapters[d0][d1].child[d2].child[d3 + 1] !== undefined;
  const hasNxtDepth = chapters[d0][d1].child[d2].child[d3].child.length > 0;

  return MakeIndicators(
    {
      top: hasPrvDepth ? [hasPrvDepth, 1] : hasPrv && [hasPrv, 1],
      right: [hasNxtDepth, 1],
      bottom: [hasNxt, 1],
    },
    coords,
  );
};

export const renderWithDepth4 = (coords, chapters) => {
  const { d0, d1, d2, d3, d4 } = coords;

  const hasPrvDepth = d4 === 0;
  const hasPrv = d4 !== 0;
  const hasNxt =
    chapters[d0][d1].child[d2].child[d3].child[d4 + 1] !== undefined;
  const hasNxtDepth =
    chapters[d0][d1].child[d2].child[d3].child[d4].child.length > 0;

  return MakeIndicators(
    {
      left: hasPrvDepth ? [hasPrvDepth, 1] : hasPrv && [hasPrv, 1],
      right: [hasNxt, 1],
      bottom: [hasNxtDepth, 1],
    },
    coords,
  );
};

export const renderWithDepth5 = (coords, chapters) => {
  const { d0, d1, d2, d3, d4, d5 } = coords;

  const hasPrvDepth = d5 === 0;
  const hasPrv = d5 !== 0;
  const hasNxt =
    chapters[d0][d1].child[d2].child[d3].child[d4].child[d5 + 1] !== undefined;
  const hasNxtDepth =
    chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child.length > 0;

  return MakeIndicators(
    {
      top: hasPrvDepth ? [hasPrvDepth, 1] : hasPrv && [hasPrv, 1],
      right: [hasNxtDepth, 1],
      bottom: [hasNxt, 1],
    },
    coords,
  );
};

export const renderWithDepth6 = (coords, chapters) => {
  const { d0, d1, d2, d3, d4, d5, d6 } = coords;

  const hasPrvDepth = d6 === 0;
  const hasPrv = d6 !== 0;
  const hasNxt =
    chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[d6 + 1] !==
    undefined;
  const hasNxtDepth =
    chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[d6].child
      .length > 0;

  return MakeIndicators(
    {
      left: hasPrvDepth ? [hasPrvDepth, 1] : hasPrv && [hasPrv, 1],
      right: [hasNxt, 1],
      bottom: [hasNxtDepth, 1],
    },
    coords,
  );
};

export const renderWithDepth7 = (coords, chapters) => {
  const { d0, d1, d2, d3, d4, d5, d6, d7 } = coords;

  const hasPrvDepth = d7 === 0;
  const hasPrv = d7 !== 0;
  const hasNxt =
    chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[d6].child[
      d7 + 1
    ] !== undefined;
  const hasNxtDepth =
    chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[d6].child[d7]
      .length > 0;

  return MakeIndicators(
    {
      top: hasPrvDepth ? [hasPrvDepth, 1] : hasPrv && [hasPrv, 1],
      right: [hasNxtDepth, 1],
      bottom: [hasNxt, 1],
    },
    coords,
  );
};

export const renderWithDepth8 = (coords, chapters) => {
  const { d0, d1, d2, d3, d4, d5, d6, d7, d8, d9 } = coords;

  const hasPrvDepth = d8 === 0;
  const hasPrv = d8 !== 0;
  const hasNxt =
    chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[d6].child[d7]
      .child[d8].child[d9 + 1] !== undefined;
  const hasNxtDepth =
    chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[d6].child[d7]
      .child[d8].child[d9].length > 0;

  return MakeIndicators(
    {
      left: hasPrvDepth ? [hasPrvDepth, 1] : hasPrv && [hasPrv, 1],
      right: [hasNxtDepth, 1],
      bottom: [hasNxt, 1],
    },
    coords,
  );
};

export const renderWithDepth9 = (coords, chapters) => {
  const { d0, d1, d2, d3, d4, d5, d6, d7, d8, d9 } = coords;

  const hasPrvDepth = d9 === 0;
  const hasPrv = d9 !== 0;
  const hasNxt =
    chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[d6].child[d7]
      .child[d8].child[d9 + 1] !== undefined;

  return MakeIndicators(
    {
      top: hasPrvDepth ? [hasPrvDepth, 1] : hasPrv && [hasPrv, 1],
      right: [hasNxtDepth, 1],
      bottom: [hasNxt, 1],
    },
    coords,
  );
};
