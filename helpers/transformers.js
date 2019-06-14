import { currency } from './parsers';

export const transformCreateSheet = data => ({
  date: data.date,
  isPublished: !!data.isPublished,
  items: data.items,
  title: data.title,
});

export const transformUpdateSheet = data => ({
  date: data.date,
  isPublished: data.isPublished,
  items: data.items,
  title: data.title,
});

export const transformSheets = sheets => (sheets).map(sheet => ({
  date: sheet.date,
  // eslint-disable-next-line no-underscore-dangle
  id: sheet._id,
  isPublished: sheet.isPublished,
  title: sheet.title,
  totalGross: currency(sheet.totalGross),
  totalVat: currency(sheet.totalVat),
}));

export const transformSheetsForTable = sheets => (sheets).map(sheet => ({
  date: sheet.date,
  isPublished: sheet.isPublished,
  key: sheet.id,
  title: sheet.title,
  totalGross: sheet.totalGross,
  totalVat: sheet.totalVat,
}));
