import { action } from "easy-peasy"

export default {
  // model,
  profile: "",
  isProfileStartUploading: false,
  isProfileUploaded: false,

  card: "",
  isCardStartUploading: false,
  isCardUploaded: false,

  // actions
  resetProfile: action(state => {
    state.profile = ""
    state.isProfileUploaded = false
  }),

  resetCard: action(state => {
    state.card = ""
    state.isCardUploaded = false
  }),

  setProfile: action((state, payload) => {
    if (typeof payload !== "string") {
      throw new Error("setProfileImageUrl 는 반드시 string 이어야 합니다.")
    }

    state.profile = payload
  }),

  startUploadingProfile: action(state => {
    state.isProfileUploaded = false
    state.isProfileStartUploading = !state.isProfileStartUploading
  }),

  completeUploadingProfile: action(state => {
    state.isProfileStartUploading = false
    state.isProfileUploaded = !state.isProfileUploaded
  }),

  setCard: action((state, payload) => {
    if (typeof payload !== "string") {
      throw new Error("setWriteCardImageUrl 는 반드시 string 이어야 합니다.")
    }

    state.card = payload
  }),

  startUploadingCard: action(state => {
    state.isCardUploaded = false
    state.isCardStartUploading = !state.isCardStartUploading
  }),

  completeUploadingCard: action(state => {
    state.isCardStartUploading = false
    state.isCardUploaded = !state.isCardUploaded
  }),
}

export const selectors = {
  profile: state => state.image.profile,
  isProfileStartUploading: state => state.image.isProfileStartUploading,
  isProfileUploaded: state => state.image.isProfileUploaded,

  card: state => state.image.card,
  isCardStartUploading: state => state.image.isCardStartUploading,
  isCardUploaded: state => state.image.isCardUploaded,
}

export const actions = {
  resetProfile: actions => actions.image.resetProfile,
  resetCard: actions => actions.image.resetCard,

  setProfile: actions => actions.image.setProfile,
  startUploadingProfile: actions => actions.image.startUploadingProfile,
  completeUploadingProfile: actions => actions.image.completeUploadingProfile,

  setCard: actions => actions.image.setCard,
  startUploadingCard: actions => actions.image.startUploadingCard,
  completeUploadingCard: actions => actions.image.completeUploadingCard,
}
