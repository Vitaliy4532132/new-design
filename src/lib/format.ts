const MONTHS = [
  "января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря",
];

/**
 * Формат даты из строки вида «2026-08-12».
 *
 * Разбираем сами, а не через toLocaleDateString: у сервера и браузера могут
 * отличаться локаль и часовой пояс, и React сообщил бы о рассинхроне разметки.
 */
export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

/**
 * Сумма со знаком: «+6 000₽» или «−5 000₽».
 *
 * Разряды делим сами по той же причине, что и дату: разделитель в
 * toLocaleString зависит от сборки ICU, и у Node с браузером он может разойтись.
 */
export function formatAmount(value: number) {
  const sign = value < 0 ? "−" : "+";
  const digits = String(Math.abs(value)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${sign}${digits}₽`;
}
