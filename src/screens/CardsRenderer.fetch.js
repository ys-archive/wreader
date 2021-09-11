import { useStoreState } from 'easy-peasy';
import { selData, selSwiper } from '../store/selectors';
import {
  useCategoriesFetch,
  useChaptersFetch,
  useUserChaptersFetch,
  useNextFetch
} from '../hooks';

const initStates = () => {
  const categories = useStoreState(selData.categories);
  const chapters = useStoreState(selData.chapters);
  const isLoaded = useStoreState(selData.isLoaded);

  const depth = useStoreState(selSwiper.depth);
  const coords = useStoreState(selSwiper.coords);
  const maxCoords = useStoreState(selSwiper.maxCoords);

  return {
    categories,
    chapters,
    isLoaded,
    depth,
    coords,
    maxCoords,
  };
};

const FetchBeforeRender = () => {
  // const {} = initStates();

  useCategoriesFetch();
  useChaptersFetch();
  useUserChaptersFetch();
  useNextFetch();
};

export default FetchBeforeRender;
