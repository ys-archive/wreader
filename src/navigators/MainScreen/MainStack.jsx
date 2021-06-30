import React from 'react';
import * as ScreenNames from '../ScreenNames';
import { useMainStackNav } from '../../hooks/useNavigators';
import { useMainStackScreenOptions } from '../../hooks/useNavigationScreenOptions';

import Main from '../../screens/Main';

const MainStack = () => {
  const MainStack = useMainStackNav();
  const mainStackScreenOptions = useMainStackScreenOptions();

  return (
    <MainStack.Navigator screenOptions={{ ...mainStackScreenOptions }}>
      <MainStack.Screen name={ScreenNames.Main} component={Main} />
    </MainStack.Navigator>
  );
};

export default MainStack;
