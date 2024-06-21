export const dateValidation = (date: string) => {
  if (Date.parse(date)) {
    return true;
  } else {
    return false;
  }
};
