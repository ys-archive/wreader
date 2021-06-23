import React from 'react';
import constate from 'constate';

// TODO: stack Nav, drawer Nav 갯수 확정.
// TODO: tabNav 넣을 지 정해야함.
// const [tabNav] = React.useState(tabNav);
export const [NavigatorsProvider, useStackNav, useDrawerNav] = constate(
  ({ stack, drawer }) => {
    // const { stack, draw } = navs;

    const [Stack] = React.useState(stack);
    const [Drawer] = React.useState(drawer);
    return { Stack, Drawer };
  },
  value => value.Stack,
  value => value.Drawer
);
