import React from 'react';
import * as ScreenNames from '../ScreenNames';
import { createStackNavigator } from '@react-navigation/stack';

import Main from '../../screens/Main';
import WriteChapterCard from '../../components/reader-card/write-chapter/WriteChapterCard';
import Comments from '../../screens/comments/comments/Comments';

import { ChapterDataProvider } from '../../contexts/chapterDataContext';
// import { NextDataProvider } from '../../contexts/nextDataContext';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <ChapterDataProvider>
      <Stack.Navigator
        initialRouteName={ScreenNames.Main}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name={ScreenNames.Main}
          component={Main}
          options={{
            overlay: {
              interceptTouchOutside: false,
            },
          }}
        />

        <Stack.Screen
          name={ScreenNames.MainWriteCard}
          component={WriteChapterCard}
        />

        <Stack.Screen name={ScreenNames.MainComments} component={Comments} />
      </Stack.Navigator>
    </ChapterDataProvider>

    //   <NextDataProvider>

    //   </NextDataProvider>
  );
};

export default MainStack;
