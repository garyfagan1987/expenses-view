import * as Yup from 'yup';

export const authenticateSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(8).required(),
});

export const userSchema = Yup.object().shape({
  businessName: Yup.string().required(),
  email: Yup.string().email().required(),
  name: Yup.string().required(),
  password: Yup.string().min(8).required(),
});

export const changeDetailsSchema = Yup.object().shape({
  businessName: Yup.string().required(),
  name: Yup.string().required(),
});

export default Yup.object().shape({
  date: Yup.date().required(),
  isPaid: Yup.boolean(),
  isPublished: Yup.boolean(),
  items: Yup.array().of(Yup.object().shape({
    date: Yup.date().required(),
    description: Yup.string().required(),
    miles: Yup.number().when('title', {
      is: 'Mileage Allowance',
      then: Yup.number().moreThan(0).required(),
    }),
    price_gross: Yup.number().required(),
    price_net: Yup.number().required(),
    price_vat: Yup.number().required(),
    title: Yup.string().required(),
    vehicle: Yup.string().when('title', {
      is: 'Mileage Allowance',
      then: Yup.string().required(),
    }),
  })),
  title: Yup.string().required(),
});
