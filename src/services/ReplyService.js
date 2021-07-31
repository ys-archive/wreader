import axios from 'axios';
import { BASE_URL } from '@env';
import { useGetSWR } from '#hooks';

// https://app.gitbook.com/@wreader/s/wreader/undefined-2

class ReplyService {
  //TODO: user ID 직접 입력 or persisted store 에서 사용 할 지 결정
  static async POST_createReply(chapterId, { reply, userId }) {
    const { data, status } = await axios
      .post(`${BASE_URL}chapter/${chapterId}/reply`, {
        reply,
        userId,
      })
      .catch(console.error);
    const { code, message } = data;
  }

  static async GET_getReply(chapterId) {
    const { data, isLoading, error, mutate } = await useGetSWR(
      `chapter/${chapterId}/reply`,
    );
    if (!error) {
      return data.item;
    }
  }

  static async PUT_updateReply(replyId, { reply }) {
    const { data, status } = await axios
      .put(`${BASE_URL}reply/${chapterId}`, {
        reply,
      })
      .catch(console.error);
  }

  static async DELETE_deleteReply(replyId) {
    const { data, status } = await axios
      .delete(`${BASE_URL}reply/${replyId}`)
      .catch(console.error);
  }
}

export default ReplyService;
