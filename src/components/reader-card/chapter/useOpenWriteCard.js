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
    if (lastCandidateIdx !== 0 && currentCandidateIdx === lastCandidateIdx) {
      nav.navigate(ScreenNames.MainWriteCard, {
        categoryTitle,
        chapterIdx,
      });
    }
  }, [lastCandidateIdx, currentCandidateIdx, categoryTitle, chapterIdx]);
};
