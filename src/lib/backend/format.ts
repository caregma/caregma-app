export function formatCents(cents: number): string {
  return `$${(cents / 100).toFixed(0)}`;
}

export function formatCentsDecimal(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export function splitLines(value: string): string[] {
  return value
    .split(/\r?\n/)
    .map((line) => line.replace(/^[-—\d.\s]+/, "").trim())
    .filter(Boolean);
}
