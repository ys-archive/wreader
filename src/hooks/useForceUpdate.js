import { useState } from 'react';

export const useForceUpdate = () => useState(false)[1];
