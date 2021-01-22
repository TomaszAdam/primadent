import XLSX from "xlsx";
import { convertDate } from "./convert_date";

let csvData = [];

const exportRejected = (data) => {
  let helperArr = [
    [
      "ID",
      "Data zapytania",
      "Data odrzucenia",
      "powód",
      "Imię i Nazwisko",
      "Email",
      "PESEL",
      "Telefon",
      "Leki",
    ],
  ];
  data.forEach((receipt) => {
    let row = [
      receipt.internalId,
      convertDate(receipt.createdAt),
      convertDate(receipt.rejectDate),
      receipt.reason,
      receipt.name,
      receipt.email,
      receipt.pesel,
      receipt.phone,
      receipt.medicines,
    ];
    helperArr.push(row);
  });
  return helperArr;
};
const exportAccepted = (data, isPaid) => {
  let helperArr = [
    [
      "ID",
      "Data zapytania",
      isPaid ? "Data zaplaty" : "Data akceptacji",
      "Kwota",
      "Imię i Nazwisko",
      "Email",
      "PESEL",
      "Telefon",
      "Leki",
    ],
  ];
  data.forEach((receipt) => {
    let row = [
      receipt.internalId,
      convertDate(receipt.createdAt),
      isPaid ? convertDate(receipt.paidDate) : convertDate(receipt.acceptDate),
      receipt.amount,
      receipt.name,
      receipt.email,
      receipt.pesel,
      receipt.phone,
      receipt.medicines,
    ];
    helperArr.push(row);
  });
  return helperArr;
};

const exportNew = (data) => {
  let helperArr = [
    [
      "ID",
      "Data zapytania",
      "Imię i Nazwisko",
      "Email",
      "PESEL",
      "Telefon",
      "Leki",
    ],
  ];
  data.forEach((receipt) => {
    let row = [
      receipt.internalId,
      convertDate(receipt.createdAt),
      receipt.name,
      receipt.email,
      receipt.pesel,
      receipt.phone,
      receipt.medicines,
    ];
    helperArr.push(row);
  });
  return helperArr;
};
export const exportFile = (data, currentView) => {
  console.log(data);

  let title = ``;
  switch (currentView) {
    case "paid":
      csvData = exportAccepted(data, true);
      title = "oplacone";
      break;
    case "accepted":
      csvData = exportAccepted(data, false);
      title = "zaakceptowane";
      break;
    case "rejected":
      csvData = exportRejected(data);
      title = "odrzucone";
      break;
    case "finished":
      csvData = exportAccepted(data, true);
      title = "zrealizowane";
      break;
    case "new":
      title = "nowe";
      csvData = exportNew(data);
      break;
    default:
      return null;
  }
  console.log(csvData);
  const wb = XLSX.utils.book_new();
  const wsAll = XLSX.utils.aoa_to_sheet(csvData);
  XLSX.utils.book_append_sheet(wb, wsAll, "Recepty");
  XLSX.writeFile(wb, `${title}-recepty.xlsx`);
};
