/* eslint-disable new-cap */
import moment from 'moment';

const transform = items => items.map(item => [item.title, moment(item.date).format('DD/MM/YYYY'), item.description, item.price_net, item.price_vat, item.price_gross]);

const downloadReport = (values) => {
  const jspdf = require('jspdf');
  require('jspdf-autotable');

  const { date, isPaid, isPublished, title, totalGross, totalNet, totalVat } = values;
  const doc = new jspdf();

  doc.setFontSize(20);
  doc.text(title, 10, 20);
  doc.setFontSize(12);
  doc.text(`Date: ${moment(date).format('DD/MM/YYYY')}`, 10, 30);
  doc.text(`Paid: ${isPaid ? 'Yes' : 'No'}`, 10, 38);
  doc.text(`Published: ${isPublished ? 'Yes' : 'No'}`, 10, 46);

  const data = [
    ...transform(values.items),
    [
      { colSpan: 3, content: 'Total', styles: { fontStyle: 'bold' } },
      { content: totalNet, styles: { fontStyle: 'bold' } },
      { content: totalVat, styles: { fontStyle: 'bold' } },
      { content: totalGross, styles: { fontStyle: 'bold' } },
    ],
  ];

  doc.autoTable({
    body: data,
    head: [['Title', 'Date', 'Description', 'Net', 'VAT', 'Gross']],
    margin: 10,
    startY: 54,
    styles: {
      fontSize: 12,
    },
  });

  doc.save(`${title}.pdf`);
};

export default downloadReport;
