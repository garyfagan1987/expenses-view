// eslint-disable-next-line import/prefer-default-export
export const currency = (amount = 0) => `£${parseFloat(amount).toFixed(2)}`;
