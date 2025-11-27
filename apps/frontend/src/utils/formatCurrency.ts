export default function formatCurrency(value: number | null | undefined): string {
  if (!value) {
    return '0';
  }

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}
