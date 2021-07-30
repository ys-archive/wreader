import { action } from 'easy-peasy';

const model = {
  profileLocalImagePath: '',
  profileImageUrl: '',
};

export default {
  model,

  reset: action(state => {
    state.image.model.profileLocalImagePath = '';
    state.image.mosdel.profileImageUrl = '';
  }),

  setProfileLocalIamgePath: action((state, payload) => {
    if (typeof payload !== 'string') {
      throw new Error(
        'setProfileLocalImagePath 는 반드시 string 이어야 합니다.',
      );
    }

    state.image.model.profileLocalImagePath = payload;
  }),

  setProfileImageUrl: action((state, payload) => {
    if (typeof payload !== 'string') {
      throw new Error('setProfileImageUrl 는 반드시 string 이어야 합니다.');
    }

    state.image.model.profileImageUrl = payload;
  }),
};
