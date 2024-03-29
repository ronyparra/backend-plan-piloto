export const current_date = () => new Date().toISOString().substr(0, 10);

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

export const substract_days = (date, dias) => {
  let fecha = new Date(date);
  fecha.setDate(fecha.getDate() - dias);
  return fecha.toISOString().substr(0, 10);
};

export const calc_diff_days = (date1, date2) => {
  let diff = Math.floor(new Date(date1).getTime() -new Date(date2).getTime());
  let day = 1000 * 60 * 60 * 24;
  let days = Math.floor(diff / day);
  return days;
};
