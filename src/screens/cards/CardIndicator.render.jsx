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
      let order = d0

      switch (direction) {
        case "top":
          order = d0 - 1
          break

        case "bottom":
          order = d0 + 1
          break
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

  const hasCategory = d1 === 0
  const hasPrvChapter = d1 !== 0
  const hasNextChapter = chapters[d0][d1 + 1] !== undefined
  const hasUserChapter = chapters[d0][d1].child.length > 0

  return MakeIndicators(
    {
      left: [hasCategory, 0],
      top: [hasPrvChapter, 1],
      bottom: [hasNextChapter, 1],
      right: [hasUserChapter, 1],
    },
    coords,
  )
}

export const renderWithDepth2 = (coords, maxCoords, chapters) => {
  const { d0, d1, d2 } = coords
  const { d2: md2 } = maxCoords

  const hasChapter = d2 === 0
  const hasPrvUserChapter = d2 !== 0
  const hasNextUserChapter = d2 < md2 - 1
  const hasUserNext = chapters[d0][d1].child[d2].child.length > 0

  return MakeIndicators(
    {
      left: hasChapter
        ? [hasChapter, 1]
        : hasPrvUserChapter && [hasPrvUserChapter, 1],
      right: [hasUserNext, 1],
      bottom: [hasNextUserChapter, 1],
    },
    coords,
  )
}

export const renderWithDepth3 = (coords, maxCoords) => {
  const { d3 } = coords
  const { d3: md3 } = maxCoords

  const hasUserChapter = d3 === 0
  const hasPrvUserNext = d3 !== 0
  const hasNextUserNext = d3 < md3 - 1

  return MakeIndicators(
    {
      top: hasUserChapter
        ? [hasUserChapter, 1]
        : hasPrvUserNext && [hasPrvUserNext, 1],
      bottom: [hasNextUserNext, 1],
    },
    coords,
  )
}
