import { action } from 'easy-peasy';

export default {
  // model,
  profile: '',
  isProfileUploaded: false,

  card: '',
  isCardUploaded: false,

  // actions
  reset: action(state => {
    state.profile = '';
    state.isProfileUploaded = false;

    state.card = '';
    state.isCardUploaded = false;
  }),

  setProfile: action((state, payload) => {
    if (typeof payload !== 'string') {
      throw new Error('setProfileImageUrl 는 반드시 string 이어야 합니다.');
    }

    state.profile = payload;
  }),

  completeUploadingProfile: action(state => {
    state.isProfileUploaded = !state.isProfileUploaded;
  }),

  setCard: action((state, payload) => {
    if (typeof payload !== 'string') {
      throw new Error('setWriteCardImageUrl 는 반드시 string 이어야 합니다.');
    }

    state.card = payload;
  }),

  completeUploadingCard: action(state => {
    state.isCardUploaded = !state.isCardUploaded;
  }),
};

export const selectors = {
  profile: state => state.image.profile,
  isProfileUploaded: state => state.image.isProfileUploaded,

  card: state => state.image.card,
  isCardUploaded: state => state.image.isCardUploaded,
};

export const actions = {
  reset: actions => actions.image.reset,

  setProfile: actions => actions.image.setProfile,
  completeUploadingProfile: actions => actions.image.completeUploadingProfile,

  setCard: actions => actions.image.setCard,
  completeUploadingCard: actions => actions.image.completeUploadingCard,
};
