import React from 'react';
import * as ScreenNames from '../ScreenNames';
import { useMainStackNav } from '#hooks/useNavigators';

import Main from '../../screens/Main';

const MainStack = () => {
  const MainStack = useMainStackNav();

  return (
    <MainStack.Navigator>
      <MainStack.Screen name={ScreenNames.Main} component={Main} />
    </MainStack.Navigator>
  );
};

export default MainStack;
