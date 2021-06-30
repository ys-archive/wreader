import { useState } from 'react';
import constate from 'constate';

export const [
  NavigationScreenOptionsProvider,
  useMainDrawerScreenOptions,
  useMainStackScreenOptions,
] = constate(
  ({ mainDrawerScreenOptions, mainStackScreenOptions }) => {
    const [MainDrawerScreenOptions] = useState(mainDrawerScreenOptions);
    const [MainStackScreenOptions] = useState(mainStackScreenOptions);
    return { MainDrawerScreenOptions, MainStackScreenOptions };
  },
  value => value.MainDrawerScreenOptions,
  value => value.MainStackScreenOptions,
);
