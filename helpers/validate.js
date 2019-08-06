import * as Yup from 'yup';

export const authenticate = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(8).required(),
});

export default Yup.object().shape({
  date: Yup.date().required(),
  isPublished: Yup.boolean(),
  items: Yup.array().of(Yup.object().shape({
    date: Yup.date().required(),
    price_gross: Yup.number().required(),
    price_net: Yup.number().required(),
    price_vat: Yup.number().required(),
    title: Yup.string().required(),
  })),
  title: Yup.string().required(),
});
