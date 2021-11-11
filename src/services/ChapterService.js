import * as axios from './AxiosInstance';
class ChapterService {
  static async POST_createChapter(
    userId,
    groupIndex,
    content,
    categoryId,
    imgPath = '',
  ) {
    console.log(
      'creating chapter: ',
      groupIndex,
      content,
      categoryId,
      userId,
      imgPath,
    );
    const { data, status } = await axios.instance
      .post('chapter', {
        groupIndex,
        content,
        categoryId: categoryId + 5,
        userId,
        imgPath,
      })
      .catch(console.error);
    console.log(data);
    return status;
  }

  static async GET_getChapter(chapterOrder, userId) {
    // console.log('get Chapter with userID: ', userId);
    const { data, status } = await axios.instance
      .get(`chapter/${chapterOrder}`, { params: { userId: +userId } })
      .catch(console.error);
    return { data, status };
  }

  static async GET_getCategory(userId) {
    // console.log('get Category with userID: ', userId);
    const { data, status } = await axios.instance
      .get('category', { params: { userId: +userId } })
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
      .delete(`chapter/${chapterId}/like`, { data: { userId } })
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
        data: {
          userId,
        },
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
