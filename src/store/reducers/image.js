import { action } from 'easy-peasy';

const model = {
  profileLocalImagePath: '',
  profileImageUrl: '',
  isImageUploaded: false,
};

export default {
  model,

  reset: action(state => {
    state.model.profileLocalImagePath = '';
    state.model.profileImageUrl = '';
    state.model.isImageUploaded = false;
  }),

  setProfileLocalIamgePath: action((state, payload) => {
    if (typeof payload !== 'string') {
      throw new Error(
        'setProfileLocalImagePath 는 반드시 string 이어야 합니다.',
      );
    }

    state.model.profileLocalImagePath = payload;
  }),

  setProfileImageUrl: action((state, payload) => {
    if (typeof payload !== 'string') {
      throw new Error('setProfileImageUrl 는 반드시 string 이어야 합니다.');
    }

    state.model.profileImageUrl = payload;
  }),

  completeUpload: action(state => {
    state.model.isImageUploaded = !state.model.isImageUploaded;
  })
};
