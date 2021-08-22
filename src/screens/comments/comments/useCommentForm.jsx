import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CommentsService } from '../../../services';

const initialValues = {
  contents: '',
};

export const validationSchema = Yup.object({
  contents: Yup.string()
    .min(2)
    .required('Min is 2')
    .max(45)
    .required('Max is 45'),
});

export const useCommentForm = (chapterId, userId) => {
  const onSubmit = async values => {
    const { contents } = values;

    const { data, status } = await CommentsService.POST_createComment(
      chapterId,
      contents,
      userId,
    );
  };

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit,
    });

  return { handleChange, handleBlur, handleSubmit, values, errors, touched };
};
