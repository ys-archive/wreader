import { useEffect, useRef, useState } from 'react';
import * as _ from 'lodash';

import { ChapterService } from '#services';

import { useStoreState, useStoreActions } from 'easy-peasy';
import {
  selectUserId,
  selectCurrentCandidateNextIdx,
  selectCurrentCandidateIdx,
} from '#store/selectors';
import { actionsSetLastCandidateNextIdx } from '../../../../store/actions';
import {
  useNextData,
  useNextLikeUpdate,
  useNextWriteCard,
} from '../../../../contexts/nextDataContext';

export const useFetchNextData = prvChapterIdx => {
  const userId = useStoreState(selectUserId);
  // const setLastCandidateNextIdx = useStoreActions(
  //   actionsSetLastCandidateNextIdx,
  // );

  const currentCandidateNextIdx = useStoreState(selectCurrentCandidateNextIdx);
  // const currentCandidateIdx = useStoreState(selectCurrentCandidateIdx);

  // let length = useRef(0).current;
  // const [_, setNextData] = useNextData();
  const [nextData, setNextData] = useState([]);

  const [isLikeUpdated] = useNextLikeUpdate();
  const [isNewNextWritten] = useNextWriteCard();

  useEffect(() => {
    async function fetchNextData() {
      const { data } = await ChapterService.GET_getChapter(
        prvChapterIdx,
        userId,
      );

      if (data.item.length === 0) return;

      setNextData(prv => {
        if (prv.length > 1) {
          // const filtered = prv.filter(
          //   prvItem =>
          //     data.item.filter(dataItem => !_.isEqual(prvItem, dataItem))
          //       .length === 0,
          // );

          // const filtered = data.item.filter(
          //   dataItem =>
          //     prv.filter(prvItem => !_.isEqual(prvItem, dataItem)).length === 0,
          // );
          const nextData = [...prv, ...data.item];
          return nextData;
        } else {
          return data.item;
        }
      });

      // setNextData(data.item[0]);

      // ++length;
      // setLastCandidateNextIdx(length);
      fetchNextData(+data.item[0].id);
    }

    fetchNextData();
  }, [isLikeUpdated, isNewNextWritten, currentCandidateNextIdx]);

  return nextData;
};
