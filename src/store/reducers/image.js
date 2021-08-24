import { action } from 'easy-peasy';

const model = {
  profileLocalImagePath: '',
  profileImageUrl: '',
  isProfileImageUploaded: false,

  writeCardImageUrl: '',
  isWriteCardImageUploaded: false,
};

export default {
  model,

  reset: action(state => {
    state.model.profileLocalImagePath = '';
    state.model.profileImageUrl = '';
    state.model.isProfileImageUploaded = false;

    state.model.writeCardImageUrl = '';
    state.model.isWriteCardImageUploaded = false;
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

  completeUploadProfileImage: action(state => {
    state.model.isProfileImageUploaded = !state.model.isProfileImageUploaded;
  }),

  setWriteCardImageUrl: action((state, payload) => {
    if (typeof payload !== 'string') {
      throw new Error('setWriteCardImageUrl 는 반드시 string 이어야 합니다.');
    }

    state.model.writeCardImageUrl = payload;
  }),

  completeUploadWriteCardImage: action(state => {
    state.model.isWriteCardImageUploaded = !state.model.isWriteCardImageUploaded;
  })
};
