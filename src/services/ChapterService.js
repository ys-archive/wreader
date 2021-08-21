import * as axios from './AxiosInstance';
class ChapterService {
  //TODO: user ID 직접 입력 or persisted store 에서 사용 할 지 결정
  static async POST_createChapter(userId, groupIndex, content, categoryId) {
    const { data, status } = await axios.instance
      .post('chapter', {
        groupIndex,
        content,
        categoryId,
        userId,
      })
      .catch(console.error);
    console.log(data);
    return status;
  }

  static async GET_getChapter(chapterOrder, userId) {
    const { data, status } = await axios.instance
      .get(`chapter/${chapterOrder}`, { params: { userId } })
      .catch(console.error);
    return { data, status };
  }

  static async PUT_updateChapter(chapterId, content) {
    const { status } = await axios.instance
      .put(`chapter/${chapterId}`, {
        content,
      })
      .catch(console.error);
    return status;
  }

  static async DELETE_deleteChapter(chapterId, userId) {
    const { status } = await axios.instance
      .delete(`chapter/${chapterId}/like`, { userId })
      .catch(console.error);
    return status;
  }

  static async POST_likeChapter(chapterId, userId) {
    const { status } = await axios.instance
      .post(`chapter/${chapterId}/like`, {
        userId,
      })
      .catch(console.error);
    return status;
  }

  static async DELETE_unlikeChapter(chapterId, userId) {
    const { status } = await axios.instance
      .delete(`chapter/${chapterId}/like`, {
        userId,
      })
      .catch(console.error);

    if (status === 302) {
      throw new Error('이미 삭제되었거나, 없는 chapter!');
    } else {
      return status;
    }
  }
}

export default ChapterService;
