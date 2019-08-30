import { currency } from './parsers';

export const transformCreateSheet = data => ({
  date: data.date,
  isPaid: !!data.isPaid,
  isPublished: !!data.isPublished,
  items: data.items,
  title: data.title,
});

export const transformUpdateSheet = data => ({
  date: data.date,
  isPaid: data.isPaid,
  isPublished: data.isPublished,
  items: data.items,
  title: data.title,
});

export const transformSheets = reports => (reports).map(report => ({
  date: report.date,
  // eslint-disable-next-line no-underscore-dangle
  id: report._id,
  isPaid: report.isPaid,
  isPublished: report.isPublished,
  title: report.title,
  totalGross: currency(report.totalGross),
  totalNet: currency(report.totalNet),
  totalVat: currency(report.totalVat),
}));

export const transformSheetsForTable = reports => (reports).map(report => ({
  date: report.date,
  isPaid: report.isPaid,
  isPublished: report.isPublished,
  key: report.id,
  title: report.title,
  totalGross: report.totalGross,
  totalNet: report.totalNet,
  totalVat: report.totalVat,
}));
