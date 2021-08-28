import React from 'react';
import { View } from 'react-native';
import { StyleSheet, Text } from '#components';

import { useFetchNextData } from './useFetchNextData';
import { useNextData } from '../../../../contexts/nextDataContext';
import ChapterCard from '../chapter-card/ChapterCard';

const CandidateNextCardContainer = ({ prvChapterIdx, categoryTitle }) => {
  useFetchNextData(prvChapterIdx);

  const [nextData] = useNextData();

  // 재귀 렌더 끝
  if (nextData.length === 0) return null;

  return (
    <>
      {/* 현재 카드 렌더 */}
      {nextData.map((nxt, i) => {
        return (
          <ChapterCard
            key={i}
            chpaterIdx={prvChapterIdx + 1}
            data={nxt}
            candidateIdx={prvChapterIdx + 1}
            categoryTitle={categoryTitle}
          />
        );
      })}
      {/* 새로운 write next card 카드 추가 */}
    </>
  );
};

export default CandidateNextCardContainer;

const styles = StyleSheet.create({});
