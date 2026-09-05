const PALETTE = ["#00A884", "#3B82C4", "#A855F7", "#E0A030", "#DB5C5C", "#4FB0AE"];

export function initialsFor(name: string, phone: string): string {
  const source = name && name !== phone ? name : phone;
  const parts = source.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return source.slice(0, 2).toUpperCase();
}

export function colorFor(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return PALETTE[Math.abs(hash) % PALETTE.length];
}
