import React, { useCallback } from "react";

import { useStoreActions } from "easy-peasy";
import { actSwiper } from "../../store/actions";

export const useCardResetToStartScreen = () => {
  const resetToStartScreen = useStoreActions(actSwiper.resetToStartScreen);

  return useCallback(() => {
    resetToStartScreen();
  }, []);
};
