import { useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';
import * as ScreenNames from '../../../navigators/ScreenNames';

import { useStoreState } from 'easy-peasy';
import {
  selectCurrentCandidateIdx,
  selectLastCandidateIdx,
} from '#store/selectors';

export const useOpenWriteCard = (categoryTitle, chapterIdx) => {
  const currentCandidateIdx = useStoreState(selectCurrentCandidateIdx);
  const lastCandidateIdx = useStoreState(selectLastCandidateIdx);

  const nav = useNavigation();

  useEffect(() => {
    // 스와이프 후 현재 후보 인덱스가 마지막이면
    // WriteCard 열기
    if (lastCandidateIdx !== 0 && currentCandidateIdx === lastCandidateIdx) {
      nav.navigate(ScreenNames.MainWriteCard, {
        categoryTitle,
        chapterIdx,
      });
    }
  }, [lastCandidateIdx, currentCandidateIdx, categoryTitle, chapterIdx]);
};
