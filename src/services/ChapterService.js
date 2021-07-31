import * as axios from './AxiosInstance';
import { useGetSWR } from '#hooks';
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
    return status;
  }

  static async useGET_getChapter(chapterId) {
    // const { data, status } = await axios
    //   .instance(`chapter/${chapterId}`)
    //   .catch(console.error);
    // const { code, item } = data;
    // console.log(item);
    // return { code, item };

    const { data, isLoading, error, mutate } = await useGetSWR(
      `chapter/${chapterId}`,
    );

    return { data, isLoading, error, mutate };
  }

  static async PUT_updateChater(chapterId, content) {
    const { status } = await axios.instance
      .put(`chapter/${chapterId}`, {
        content,
      })
      .catch(console.error);
    return status;
  }

  static async DELETE_deleteChapter(chapterId) {
    const { status } = await axios.instance
      .delete(`chapter/${chapterId}`)
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
