// auth
export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectUserId = state => state.auth.userId;
export const selectEmail = state => state.auth.email;
export const selectPassword = state => state.auth.password;
export const selectUserInfo = state => state.auth.info;

// reader

export const selectIsMovingChapterLock = state =>
  state.reader.model.isMovingChapterLock;

export const selectIsMovingCategoryLock = state =>
  state.reader.model.isMovingCategoryLock;

export const selectHasCandidateChapter = state =>
  state.reader.model.hasCandidateChapter;

export const selectCurrentCategoryIdx = state =>
  state.reader.model.currentCategoryIdx;
export const selectLastCategoryIdx = state =>
  state.reader.model.lastCategoryIdx;

export const selectCurrentChapterIdx = state =>
  state.reader.model.currentChapterIdx;
export const selectLastChapterIdx = state => state.reader.model.lastChapterIdx;

export const selectCurrentCandidateIdx = state =>
  state.reader.model.currentCandidateIdx;
export const selectLastCandidateIdx = state =>
  state.reader.model.lastCandidateIdx;

export const selectCurrentCandidateNextIdx = state =>
  state.reader.model.currentCandidateNextIdx;
export const selectLastCandidateNextIdx = state =>
  state.reader.model.lastCandidateNextIdx;

export const selectIsFirstCategory = state => state.reader.isFirstCategory;
export const selectIsLastCategory = state => state.reader.isLastCategory;

export const selectIsFirstChapter = state => state.reader.isFirstChapter;
export const selectIsLastChapter = state => state.reader.isLastChapter;

export const selectIsFirstCandidate = state => state.reader.isFirstCandidate;
export const selectIsLastCandidate = state => state.reader.isLastCandidate;

export const selectIsFirstCandidateNext = state =>
  state.reader.isFirstCandidateNext;
export const selectIsLastCandidateNext = state =>
  state.reader.isLastCandidateNext;

export const selectIsCategorySelected = state =>
  state.reader.model.isCategorySelected;

export const selectIsCandidateSelected = state =>
  state.reader.model.isCandidateSelected;

// persistence
// export const selectIsAutoLogin = state => state.persistence.model.isAutoLogin;
// export const selectIsDueDateOver = state => stat.persistence.isDueDateOver;

// preference

// image

export const selectProfileLocalImagePath = state =>
  state.image.model.profileLocalImagePath;
export const selectProfileImageUrl = state => state.image.model.profileImageUrl;
export const selectIsProfileImageUploaded = state =>
  state.image.model.isProfileImageUploaded;
export const selectWriteCardImageUrl = state =>
  state.image.model.writeCardImageUrl;
export const selectIsWriteCardImageUploaded = state =>
  state.image.model.isWriteCardImageUploaded;

import { selectors as selAuth } from '../reducers/auth';
import { selectors as selData } from '../reducers/data';

export { selAuth, selData };
