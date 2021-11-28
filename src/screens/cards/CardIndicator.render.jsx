import React, { useMemo } from "react"
import ChapterIndicatorCard from "./chapter-card/ChapterIndicatorCard"
import CategoryIndicatorCard from "./category/CategoryIndicatorCard"

const indicatorPos = {
  top: "-80%",
  bottom: "-80%",
  left: "-87%",
  right: "-87%",
}

const MakeIndicators = (dir, coords) => {
  const { d0 } = coords

  return Object.entries(dir).map((d, i) => {
    const [direction, set] = d
    const [has, isCategory] = set

    if (has) {
      return isCategory === 0 ? (
        <CategoryIndicatorCard
          key={i}
          pos={{ position: "absolute", [direction]: indicatorPos[direction] }}
          order={direction === "top" ? d0 - 1 : d0}
        />
      ) : (
        <ChapterIndicatorCard
          key={i}
          pos={{ position: "absolute", [direction]: indicatorPos[direction] }}
          order={d0}
        />
      )
    }
  })
}

export const renderWithDepth0 = (coords, maxCoords) => {
  const { d0 } = coords
  const { d0: md0, d1: md1 } = maxCoords

  const hasPrvCategory = d0 !== 0 && d0 < md0
  const hasNextCategory = d0 < md0 - 1
  const hasChapter = md1 > 0

  return MakeIndicators(
    {
      top: [hasPrvCategory, 0],
      bottom: [hasNextCategory, 0],
      right: [hasChapter, 1],
    },
    coords,
  )
}

export const renderWithDepth1 = (coords, maxCoords, chapters) => {
  const { d0, d1 } = coords
  const { d1: md1, d2: md2 } = maxCoords

  const hasCategory = d1 === 0
  const hasPrvChapter = d1 !== 0
  const hasNextChapter = chapters[d0][d1 + 1] !== undefined
  const hasUserChapter = chapters[d0][d1].child.length > 0

  return MakeIndicators(
    {
      left: hasCategory
        ? [hasCategory, 0]
        : hasPrvChapter && [hasPrvChapter, 1],
      right: [hasNextChapter, 1],
      bottom: [hasUserChapter, 1],
    },
    coords,
  )
}

export const renderWithDepth2 = (coords, maxCoords, chapters) => {
  const { d0, d1, d2 } = coords
  const { d2: md2, d3: md3 } = maxCoords

  const hasChapter = d2 === 0
  const hasPrvUserChapter = d2 !== 0
  const hasNextUserChapter = d2 < md2 - 1
  const hasUserNext = chapters[d0][d1].child[d2].child.length > 0

  return MakeIndicators(
    {
      top: hasChapter
        ? [hasChapter, 1]
        : hasPrvUserChapter && [hasPrvUserChapter, 1],
      right: [hasUserNext, 1],
      bottom: [hasNextUserChapter, 1],
    },
    coords,
  )
}

export const renderWithDepth3 = (coords, maxCoords) => {
  const { d0, d1, d2, d3 } = coords
  const { d3: md3 } = maxCoords

  const hasUserChapter = d3 === 0
  const hasPrvUserNext = d3 !== 0
  const hasNextUserNext = d3 < md3 - 1

  return MakeIndicators(
    {
      left: hasUserChapter
        ? [hasUserChapter, 1]
        : hasPrvUserNext && [hasPrvUserNext, 1],
      right: [hasNextUserNext, 1],
    },
    coords,
  )
}
