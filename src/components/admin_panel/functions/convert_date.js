export const convertDate = (date) => {
  const newDate = new Date(date);
  const stringDate = `${newDate.getDate()}.${
    newDate.getMonth() + 1
  }.${newDate.getFullYear()}`;

  return stringDate;
};

export const diffDays = (date) => {
  const diffTime = Math.abs(new Date() - new Date(date));
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
