import { useEffect } from 'react';
import * as _ from 'lodash';

import { ChapterService } from '#services';

import { useStoreState } from 'easy-peasy';
import { selectUserId } from '#store/selectors';
import {
  useNextData,
  useNextLikeUpdate,
  useNextWriteCard,
} from '../../../../contexts/nextDataContext';

export const useFetchNextData = prvChapterIdx => {
  const userId = useStoreState(selectUserId);
  const [nextData, setNextData] = useNextData();

  const [isLikeUpdated] = useNextLikeUpdate();
  const [isNewNextWritten] = useNextWriteCard();

  useEffect(() => {
    async function fetchNextData(fetchChapterIdx) {
      if (!fetchChapterIdx) return;

      const { data } = await ChapterService.GET_getChapter(
        fetchChapterIdx,
        userId,
      );

      if (data.item.length === 0) return;

      if (nextData.length > 0) {
        // console.log(nextData[nextData.length - 1]);

        if (_.isEqual(nextData[nextData.length - 1], data.item[0])) {
          return;
        }
      }

      // console.log('previous chapter id : ', fetchChapterIdx);

      setNextData(prv => {
        console.log('prv: ', prv);
        if (prv.length > 1) {
          const filtered = prv.filter(
            prvItem =>
              data.item.filter(dataItem => !_.isEqual(prvItem, dataItem))
                .length === 0,
          );

          const newData = [...prv, ...filtered];
          // console.log('filtered data: ', newData);
          // console.log(
          //   '--------------------------------------------------------',
          // );
          return newData;
        } else {
          return data.item;
        }
      });

      // console.log(
      //   nextData,
      //   '  --------------------------------------------------------',
      // );

      await fetchNextData(data.item.id);
    }

    fetchNextData(+prvChapterIdx);
  }, [userId, isLikeUpdated, isNewNextWritten]);

  // candidate 선택 후에, 각 swipe horizontal 마다 fetch
};
