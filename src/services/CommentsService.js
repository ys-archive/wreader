import * as axios from './AxiosInstance';

class CommentsService {
  static async POST_createComment(chapterId, contents, userId) {
    const { data, status } = await axios.instance
      .post(`chapter/${chapterId}/reply`, {
        reply: contents,
        userId,
      })
      .catch(console.error);
    return status;
  }

  static async GET_getComment(chapterId) {
    const { data, status } = await axios.instance
      .get(`chapter/${chapterId}/reply`)
      .catch(console.error);
    return { data, status };
  }

  static async UPDATE_updateComment(chapterId, contents) {
    const { data, status } = await axios.instance
      .put(`reply/${chapterId}`, {
        contents,
      })
      .catch(console.error);
    return { data, status };
  }

  static async DELETE_deleteComment(chapterId) {
    const { data, status } = await axios.instance
      .delete(`reply/${chapterId}`)
      .catch(console.error);
    return { data, status };
  }
}

export default CommentsService;
