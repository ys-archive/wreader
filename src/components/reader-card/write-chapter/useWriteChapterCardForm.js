// import { AlertWithValue } from '#components';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useStoreState, useStoreActions } from 'easy-peasy';
import { selImage } from '../../../store/selectors';
import { actImage } from '../../../store/actions';

import { ChapterService } from '../../../services';

const initialValues = {
  // title: '',
  sentence1: '',
  sentence2: '',
  sentence3: '',
  sentence4: '',
  sentence5: '',
  sentence6: '',
  // sentence7: '',
  // sentence8: '',
  // sentence9: '',
  // sentence10: '',
  // sentence11: '',
};

const validationSchema = Yup.object({
  // title: Yup.string().required('You have to input a title'),

  sentence1: Yup.string()
    .min(4)
    .required('Min is 4')
    .max(20)
    .required('Max is 20'),

  sentence2: Yup.string().min(0).max(20),
  sentence3: Yup.string().min(0).max(20),
  sentence4: Yup.string().min(0).max(20),
  sentence5: Yup.string().min(0).max(20),
  sentence6: Yup.string().min(0).max(20),
  // sentence7: Yup.string().min(0).max(20),
  // sentence8: Yup.string().min(0).max(20),
  // sentence9: Yup.string().min(0).max(20),
  // sentence10: Yup.string().min(0).max(20),
});

export const useWriteChapterCardForm = (
  userId,
  currentCategoryIdx,
  currentChapterIdx,
  afterFormSubmitted,
) => {
  const cardImageUrl = useStoreState(selImage.card);
  const resetCard = useStoreActions(actImage.resetCard);

  const onSubmit = async values => {
    const sentences = Object.values(values).reduce(
      (prv, cur) => `${prv}${cur}`,
    );
    const status = await ChapterService.POST_createChapter(
      userId,
      currentChapterIdx,
      sentences,
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
