import { useState, useEffect } from 'react';
import { CommentsService } from '../../../services';

export const useCommentsLogic = (chapterId, hasNew) => {
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
  }, [chapterId, hasNew.d0, hasNew.d1, hasNew.d2, hasNew.d3]);

  return data;
};
