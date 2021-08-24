import { useEffect, useState } from 'react';
import { CommentsService } from '../../../../services';

export const useCommentsCount = chapterId => {
  const [commentsCount, setCommentsCount] = useState(0);

  useEffect(() => {
    async function fetchCommentsCount() {
      const { data, status } = await CommentsService.GET_getComment(chapterId);
      if (status === 200) {
        if (data && data.item && data.item.length) {
          setCommentsCount(data.item.length);
        }
      }
    }
    fetchCommentsCount();
  }, [chapterId]);

  return commentsCount;
};
