export default function formatDate(value: Date | null | undefined): string | null {
  if (!value) {
    return null;
  }

  return new Date(value).toLocaleDateString();
}
