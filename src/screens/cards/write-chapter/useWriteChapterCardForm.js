import { Alert } from '#components/alert';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useStoreState } from 'easy-peasy';
import { selImage } from '../../../store/selectors';

import { ChapterService } from '../../../services';

const initialValues = {
  sentence: '',
};

const validationSchema = Yup.object({
  sentence: Yup.string()
    .min(4)
    .required('Min is 4')
    .max(120)
    .required('Max is 120'),
});

export const useWriteChapterCardForm = (
  userId,
  currentChapterIdx,
  currentCategoryIdx,
  afterFormSubmitted,
) => {
  const cardImageUrl = useStoreState(selImage.card);

  const onSubmit = async values => {
    const { sentence } = values;

    const status = await ChapterService.POST_createChapter(
      userId,
      currentChapterIdx,
      sentence,
      currentCategoryIdx,
      cardImageUrl,
    );

    if (status === 200) {
      afterFormSubmitted();
    } else {
      Alert('Writing chapter fails');
    }
  };

  return useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
};
