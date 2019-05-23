import * as Yup from 'yup';

export const authenticate = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(8).required(),
});

export default Yup.object().shape({
  date: Yup.date().required(),
  isPublished: Yup.boolean(),
  title: Yup.string().required(),
});
