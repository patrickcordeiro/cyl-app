export default function isValidDate(date: Date | string): boolean {
  const isValidStringDate =
    typeof date === 'string' && Number.isNaN(Date.parse(date));
  const isValidDateInstance =
    typeof date === 'object' &&
    Object.prototype.toString.call(date) === '[object Date]' &&
    !Number.isNaN(date.getTime());

  return isValidStringDate || isValidDateInstance;
}
