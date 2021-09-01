import React, { useMemo, useState, useEffect } from 'react';
import * as _ from 'lodash';
import { Dimensions, View, TouchableWithoutFeedback } from 'react-native';
import { StyleSheet, Text } from '#components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { colors } from '#constants';

import { useStoreState } from 'easy-peasy';
import {
  selectCurrentCategoryIdx,
  selectCurrentChapterIdx,
  selectCurrentCandidateIdx,
  selectCurrentCandidateNextIdx,
  selectUserId,
} from '#store/selectors';

import { useOpenWriteCard } from './useOpenWriteCard';
import {
  useChapterData,
  useNextData,
} from '../../../../contexts/chapterDataContext';
// import { useForceUpdate } from '../../../../hooks';

import { useFetchNextData } from '../candidate-next/useFetchNextData';
import { useFetchChapterData } from '../chapter-card-container/useFetchChapterData';

import ChapterCard from '../chapter-card/ChapterCard';
import { ChapterService } from '../../../../services';
import CandidateNextCardContainer from '../candidate-next/CandidateNextCardContainer';
// import CandidateNextCardContainer from '../candidate-next/CandidateNextCardContainer';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const CandidateCardContainer = ({ chapterIdx, categoryTitle }) => {
  const currentCategoryIdx = useStoreState(selectCurrentCategoryIdx);
  const currentChapterIdx = useStoreState(selectCurrentChapterIdx);
  const currentCandidateIdx = useStoreState(selectCurrentCandidateIdx);
  const currentCandidateNextIdx = useStoreState(selectCurrentCandidateNextIdx);
  const userId = useStoreState(selectUserId);

  // const [prvGroupId, setPrvGroupId] = useState(undefined);
  const [nextData, setNextData] = useState(undefined);
  const [chapterData] = useChapterData();

  useFetchChapterData();

  // 새로운 후보 챕터
  useOpenWriteCard(categoryTitle, chapterIdx);

  useEffect(() => {
    async function fetchNextData() {
      const { data } = await ChapterService.GET_getChapter(
        nextData === undefined
          ? chapterData.item[currentCandidateIdx - 1].id
          : nextData[nextData.length - 1].id,
        userId,
      );
      // console.log(final, '로 fetch 함');

      if (data.item.length === 0) return;

      setNextData(prv => {
        if (prv) {
          return [...prv, ...data.item];
        } else {
          return data.item;
        }
      });
    }

    if (!chapterData) return;
    if (currentCandidateIdx < 1) return;
    // if (currentCandidateNextIdx < 1) return;
    console.log('fetch new nexts!');
    fetchNextData();
  }, [userId, currentCandidateIdx, chapterData]);

  const Candidates =
    currentChapterIdx - 1 === chapterIdx &&
    chapterData.item?.map((candidateData, i) => {
      // 현재 후보 챕터가 선택한 카테고리랑 맞는 것만 렌더
      if (currentCategoryIdx !== Math.max(0, candidateData.categoryId - 5))
        return null;

      return (
        <View style={s.root} key={i}>
          <View>
            <ChapterCard
              chapterIdx={chapterIdx}
              data={candidateData}
              candidateIdx={i}
              categoryTitle={categoryTitle}
            />
          </View>
          {nextData ? (
            <CandidateNextCardContainer
              prvChapterIdx={candidateData.id}
              categoryTitle={categoryTitle}
              nextData={nextData}
            />
          ) : (
            <View
              style={{
                minWidth: wp('100%'),
                maxWidth: wp('100%'),
                minHeight: hp('100%'),
                maxHeight: hp('100%'),
                // flex: 1,
                backgroundColor: colors.light.ivory4,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text>Empty</Text>
            </View>
          )}
          {/* {currentCandidateIdx - 1 === i && (
          )} */}
        </View>
      );
    });

  // return <View>{Candidates}</View>;
  return Candidates;
};

export default CandidateCardContainer;

const s = StyleSheet.create({
  root: {
    flexDirection: 'row',
    // flex: 1,
    // minHeight: '100%',
    // maxHeight: '100%',
    // overflow: 'visible',
  },
});
