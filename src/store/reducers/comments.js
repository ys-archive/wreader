import { action } from "easy-peasy";

export default {
  commentsUpdated: false,

  updateComments: action(state => {
    state.commentsUpdated = !state.commentsUpdated;
  }),
};

export const selectors = {
  commentsUpdated: state => state.comments.commentsUpdated,
};

export const actions = {
  updateComments: actions => actions.comments.updateComments,
};
