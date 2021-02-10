export const current_date = () =>
  format_date(new Date().toISOString().substr(0, 10));

export const format_date = (date) => {
  if (!date) return null;
  const [year, month, day] = date.split("-");
  return `${day}-${month}-${year}`;
};
export const parse_date = (date) => {
  if (!date) return null;
  const [day, month, year] = date.split("-");
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};
