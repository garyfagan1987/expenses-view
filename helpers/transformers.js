export const transformCreateSheet = data => ({
  date: data.date,
  isPublished: data.isPublished ? true : false,
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
  id: sheet._id,
  isPublished: sheet.isPublished,
  title: sheet.title,
}));
