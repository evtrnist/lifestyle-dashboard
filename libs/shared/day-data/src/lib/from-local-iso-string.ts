export function fromLocalIsoString(s: string): Date {
  const m = s.match(
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})([+-])(\d{2}):(\d{2})$/,
  );
  if (!m) throw new Error('Bad local ISO');
  const [, Y, Mo, D, H, Mi, S] = m;

  return new Date(
    Number(Y),
    Number(Mo) - 1,
    Number(D),
    Number(H),
    Number(Mi),
    Number(S),
    0,
  );
}
