export default function getFirstAndLastDateByMonth(
  month: string,
  year: number
) {
  const monthsMap: Record<string, number> = {
    janeiro: 0,
    jan: 0,
    fevereiro: 1,
    fev: 1,
    março: 2,
    mar: 2,
    abril: 3,
    abr: 3,
    maio: 4,
    mai: 4,
    junho: 5,
    jun: 5,
    julho: 6,
    jul: 6,
    agosto: 7,
    ago: 7,
    setembro: 8,
    set: 8,
    outubro: 9,
    out: 9,
    novembro: 10,
    nov: 10,
    dezembro: 11,
    dez: 11,
  };

  const normalized = month.trim().toLowerCase();
  const monthNumber = monthsMap[normalized] ?? Number(month) - 1;

  if (monthNumber < 0 || monthNumber > 11 || Number.isNaN(monthNumber)) {
    throw new Error(`Mês inválido: ${month}`);
  }

  const firstDateMonth = new Date(year, monthNumber, 1, 0, 0, 0, 0);
  const lastDateMonth = new Date(year, monthNumber + 1, 0, 23, 59, 59, 999);

  return { firstDateMonth, lastDateMonth };
}
