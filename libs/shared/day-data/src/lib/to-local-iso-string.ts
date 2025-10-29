export function toLocalIsoString(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');

  const y = d.getFullYear();
  const m = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const hh = pad(d.getHours());
  const mm = pad(d.getMinutes());
  const ss = pad(d.getSeconds());

  const tz = -d.getTimezoneOffset();
  const sign = tz >= 0 ? '+' : '-';
  const tzh = pad(Math.floor(Math.abs(tz) / 60));
  const tzm = pad(Math.abs(tz) % 60);

  return `${y}-${m}-${day}T${hh}:${mm}:${ss}${sign}${tzh}:${tzm}`;
}