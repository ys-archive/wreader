import { useState } from 'react';
import constate from 'constate';

export const [GestureContextProvider, useSwipeDirection, useSetSwipeDirection] =
  constate(
    () => {
      const [swipeDirection, setSwipeDirection] = useState('');
      return { swipeDirection, setSwipeDirection };
    },
    value => value.swipeDirection,
    value => value.setSwipeDirection,
  );
