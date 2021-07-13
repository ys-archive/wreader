// auth
export const selectIsAutoLogin = state => state.auth.model.isAutoLogin;
export const selectIsLoggedIn = state => state.auth.model.isLoggedIn;

// swiper
export const selectIsLastCategory = state => state.swiper.model.isLastCategory;
export const selectIsLastChapter = state => state.swiper.model.isLastChapter;
export const selectSwiperThresholdHorizontal = state =>
  state.swiper.model.swiperThresholdHorizontal;
export const selectSwiperThresholdVertical = state =>
  state.swiper.model.selectSwiperThresholdVertical;
