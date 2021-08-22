import { useState, useEffect } from 'react';
import { CommentsService } from '../../../services';

export const useCommentsLogic = (chapterId, userId) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // TODO: Get all comments along the chapter id
    async function fetchAllComments() {
      const { data } = await CommentsService.GET_getComment(chapterId);
      if (data) {
        setData(data);
      }
    }
    fetchAllComments();
  }, [chapterId, userId]);

  return data;
};
