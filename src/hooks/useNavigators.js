import React from 'react';
import constate from 'constate';

// TODO: stack Nav, drawer Nav 갯수 확정.
export const [
  NavigatorsProvider,
  useRootStackNav,
  useMainStackNav,
  useDrawerNav,
] = constate(
  ({ rootStack, mainStack, drawer }) => {
    const [RootStack] = React.useState(rootStack);
    const [MainStack] = React.useState(mainStack);
    const [Drawer] = React.useState(drawer);
    return { RootStack, MainStack, Drawer };
  },
  value => value.RootStack,
  value => value.MainStack,
  value => value.Drawer,
);
