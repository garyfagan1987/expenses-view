import * as Yup from 'yup';

export default Yup.object().shape({
  date: Yup.date().required(),
  isPublished: Yup.boolean(),
  title: Yup.string().required(),
});
