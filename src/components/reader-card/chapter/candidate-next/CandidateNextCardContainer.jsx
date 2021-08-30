import React, { useEffect, useState } from 'react';
import { View, Dimensions } from 'react-native';
import { StyleSheet, Text } from '#components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { colors } from '#constants';

import { useFetchNextData } from './useFetchNextData';
import { useNextData } from '../../../../contexts/nextDataContext';
import ChapterCard from '../chapter-card/ChapterCard';

import { useStoreState, useStoreActions } from 'easy-peasy';
import {
  selectCurrentCandidateIdx,
  selectCurrentCandidateNextIdx,
  selectUserId,
} from '../../../../store/selectors';
import { actionsSetLastCandidateNextIdx } from '../../../../store/actions';
import { ChapterService } from '../../../../services';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const CandidateNextCardContainer = ({
  prvChapterIdx,
  categoryTitle,
  order,
  prvGroupId,
  setPrvGroupId,
}) => {
  const currentCandidateIdx = useStoreState(selectCurrentCandidateIdx);
  const currentCandidateNextIdx = useStoreState(selectCurrentCandidateNextIdx);
  const userId = useStoreState(selectUserId);

  const [nextData, setNextData] = useState(undefined);

  const final = prvGroupId === undefined ? prvChapterIdx : prvGroupId;

  useEffect(() => {
    async function fetchNextData() {
      const { data } = await ChapterService.GET_getChapter(final, userId);
      // console.log(final, '로 fetch 함');

      if (data.item.length === 0) return;

      setNextData(prv => {
        if (prv) {
          return [...prv, ...data.item];
        } else {
          return data.item;
        }
      });
      setPrvGroupId(data.item[order].id);
    }

    if (currentCandidateIdx < 1) return;
    if (currentCandidateNextIdx < 1) return;
    fetchNextData();
  }, [userId, order, currentCandidateIdx, prvChapterIdx, prvGroupId]);

  console.log(nextData);
  console.log('----------------------------------------------------');

  return (
    <>
      {nextData &&
        nextData.length &&
        nextData.map((next, i) => (
          <ChapterCard
            key={i}
            chpaterIdx={order}
            data={next}
            candidateIdx={order}
            categoryTitle={categoryTitle}
          />
        ))}
    </>
  );
};

export default CandidateNextCardContainer;

const s = StyleSheet.create({
  root: {
    flexDirection: 'row',
    flex: 1,
    // minWidth: SCREEN_WIDTH,
    // maxWidth: SCREEN_WIDTH,
  },
});
