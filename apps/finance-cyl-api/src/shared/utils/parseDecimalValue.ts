export default function parseDecimalValue(value: unknown): number {
  if (typeof value === 'number') {
    return value;
  }

  if (typeof value === 'string') {
    // Remove espaços e símbolos de moeda
    const sanitized = value.trim().replace(/[^\d.,-]/g, '');

    // Se tiver vírgula e ponto, assume padrão brasileiro
    if (sanitized.includes(',') && sanitized.includes('.')) {
      // Ex: 4.500,75 -> remove ponto e troca vírgula por ponto
      return Number(sanitized.replace(/\./g, '').replace(',', '.'));
    }

    // Se tiver só vírgula, troca por ponto (ex: 4500,75 -> 4500.75)
    if (sanitized.includes(',')) {
      return Number(sanitized.replace(',', '.'));
    }

    // Caso padrão (ex: "4500.75" -> 4500.75)
    return Number(sanitized);
  }

  return NaN;
}
