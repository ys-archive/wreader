import * as axios from './AxiosInstance';
import { useGetSWR } from '#hooks';

class ChapterService {
  //TODO: user ID 직접 입력 or persisted store 에서 사용 할 지 결정
  static async POST_createChapter(groupIndex, content, categoryId, userId) {
    const { status } = await axios.instance.post('chapter', {
      groupIndex,
      content,
      categoryId,
      userId,
    });
    return status;
  }

  static async GET_getChapter(chapterId) {
    const { data, isLoading, error, mutate } = await useGetSWR(
      `chapter/${chapterId}`,
    );
    return { item: data.item, isLoading, error, mutate };
  }

  static async PUT_updateChater(chapterId, content) {
    const { status } = await axios.instance.put(`chapter/${chapterId}`, {
      content,
    });
    return status;
  }

  static async DELETE_deleteChapter(chapterId) {
    const { status } = await axios.instance.delete(`chapter/${chapterId}`);
    return status;
  }

  //TODO: user ID 직접 입력 or persisted store 에서 사용 할 지 결정
  static async POST_likeChapter(chapterId, userId) {
    const { status } = await axios.instance.post(`chapter/${chapterId}/like`, {
      userId,
    });
    return status;
  }

  //TODO: user ID 직접 입력 or persisted store 에서 사용 할 지 결정
  static async DELET_unlikeChapter(chapterId, userId) {
    const { status } = await axios.instance.delete(
      `chapter/${chapterId}/like`,
      {
        userId,
      },
    );
    if (status === 302) {
      throw new Error('이미 삭제되었거나, 없는 chapter!');
    } else {
      return status;
    }
  }
}

export default ChapterService;
