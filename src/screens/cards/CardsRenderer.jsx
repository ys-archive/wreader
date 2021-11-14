import React from "react"

import { useStoreState, useStoreActions } from "easy-peasy"
import { selData, selSwiper } from "../../store/selectors"
import { actDataFetch } from "../../store/actions"

import CategoryCard from "./category/CategoryCard"
import ChapterCard from "./chapter-card/ChapterCard"

import CardIndicator from "./CardIndicator"
import { DEPTH_NAME } from "../../store/reducers/swiper.depth"

const initStates = () => {
  const categories = useStoreState(selData.categories)
  const chapters = useStoreState(selData.chapters)
  const isLoaded = useStoreState(selData.isLoaded)

  const depth = useStoreState(selSwiper.depth)
  const coords = useStoreState(selSwiper.coords)

  const fetchCategory = useStoreActions(actDataFetch.fetchCategory)
  const fetchChapters = useStoreActions(actDataFetch.fetchChapters)

  return {
    categories,
    chapters,
    isLoaded,
    depth,
    coords,
    fetchCategory,
    fetchChapters,
  }
}

const CardsRenderer = () => {
  const {
    categories,
    chapters,
    isLoaded,
    depth,
    coords,
    fetchCategory,
    fetchChapters,
  } = initStates()

  React.useEffect(() => {
    fetchCategory()
    fetchChapters(1)
  }, [])

  // if (!isLoaded.d0) return null
  // if (!isLoaded.d1) return null

  // const { d0: md0, d1: md1, d2: md2, d3: md3 } = maxCoords;
  // console.log(
  //   `max coords---> md0:${md0} | md1:${md1} | md2:${md2} | md3:${md3}`,
  // );

  if (categories.length === 0) return null
  if (chapters.length === 0) return null

  const { d0, d1, d2, d3 } = coords

  // console.log(`    coords---> d0:${d0} | d1:${d1} | d2:${d2} | d3:${d3}`);
  const currentCategoryTitle = categories[d0].title
  let CardJSX = null

  switch (depth) {
    case DEPTH_NAME.CATEGORY:
      CardJSX = <CategoryCard data={categories[d0]} />
      break

    case DEPTH_NAME.CHAPTER:
      {
        const chDat = chapters[d0][d1].deck
        CardJSX = (
          <ChapterCard
            data={chDat}
            categoryTitle={currentCategoryTitle}
            order={d1}
          />
        )
      }
      break

    case DEPTH_NAME.USER_CHAPTER:
      {
        const chDat = chapters[d0][d1].child[d2].deck
        CardJSX = (
          <ChapterCard
            data={chDat}
            categoryTitle={currentCategoryTitle}
            order={d1}
          />
        )
      }
      break

    case DEPTH_NAME.NEXT:
      {
        const chDat = chapters[d0][d1].child[d2].child[d3].deck
        CardJSX = (
          <ChapterCard
            data={chDat}
            categoryTitle={currentCategoryTitle}
            order={d3 + 1 + d1}
          />
        )
      }
      break
  }

  return <CardIndicator>{CardJSX}</CardIndicator>
}

export default CardsRenderer
