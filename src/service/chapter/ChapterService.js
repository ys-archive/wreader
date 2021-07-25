import axios from 'axios';
import { BASE_URL } from '@env';
import { useGetSWR } from '#hooks';

class ChapterService {
  //TODO: user ID 직접 입력 or persisted store 에서 사용 할 지 결정
  static async POST_createChapter({ groupIndex, content, categoryId, userId }) {
    const { data } = await axios.post(`${BASE_URL}chapter`, {
      groupIndex,
      content,
      categoryId,
      userId,
    });
    const { code, message } = data;
  }

  static async GET_getChapter(chapterId) {
    const { data, isLoading, error, mutate } = await useGetSWR(
      `chapter/${chapterId}`,
    );

    if (!error) {
      const { item } = data;
    } else {
      throw new Error('Fail to GET Chapter');
    }
  }

  static async PUT_updateChater(chapterId, { content }) {
    const { data } = await axios.put(`${BASE_URL}chapter/${chapterId}`, {
      content,
    });
    const { code, message } = data;
  }

  static async DELETE_deleteChapter(chapterId) {
    const { data } = await axios.delete(`${BASE_URL}chapter/${chapterId}`);
    const { code, message } = data;
  }

  //TODO: user ID 직접 입력 or persisted store 에서 사용 할 지 결정
  static async POST_likeChapter(chapterId, { userId }) {
    const { data } = await axios.post(`${BASE_URL}chapter/${chapterId}/like`, {
      userId,
    });
    const { code, message } = data;
  }

  //TODO: user ID 직접 입력 or persisted store 에서 사용 할 지 결정
  static async DELET_unlikeChapter(chapterId, { userId }) {
    const { data } = await axios.delete(
      `${BASE_URL}chapter/${chapterId}/like`,
      { userId },
    );
    const { code, message } = data;
  }
}

export default ChapterService;
