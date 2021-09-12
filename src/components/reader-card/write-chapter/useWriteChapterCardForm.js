// import { AlertWithValue } from '#components';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useStoreState, useStoreActions } from 'easy-peasy';
import { selImage } from '../../../store/selectors';
import { actImage } from '../../../store/actions';

import { ChapterService } from '../../../services';

const initialValues = {
  // title: '',
  sentence: '',
};

const validationSchema = Yup.object({
  // title: Yup.string().required('You have to input a title'),

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
  const resetCard = useStoreActions(actImage.resetCard);

  const onSubmit = async values => {
    const { sentence } = values;
    // const sentences = Object.values(values).reduce(
    //   (prv, cur) => `${prv}${cur}`,
    // );
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
    resetCard();
  };

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit,
    });

  return { handleChange, handleBlur, handleSubmit, values, errors, touched };
};
