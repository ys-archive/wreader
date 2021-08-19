import React from 'react';
import * as ScreenNames from '../ScreenNames';
import { createStackNavigator } from '@react-navigation/stack';
import Main from '../../screens/Main';
import WriteChapterCard from '../../components/reader-card/WriteChapterCard';
// import CategoryCard from '../../components/reader-card/CategoryCard';
// import ChapterCard from '../../components/reader-card/ChapterCard';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
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
        // options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
