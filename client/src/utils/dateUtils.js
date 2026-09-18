/**
 * Converts a quarter-based date string (e.g., "Q3/24" or "Q1/25") to a JavaScript Date object.
 * The date will be set to the last day of the quarter.
 */
export function quarterToDate(quarterStr) {
  const match = quarterStr.match(/^Q([1-4])\/(\d{2})$/);
  if (!match) {
    throw new Error(
      'Invalid quarter format. Expected format: "QX/YY" (e.g., "Q3/24")'
    );
  }

  const [, quarter, year] = match;
  const fullYear = 2000 + parseInt(year, 10);
  const lastMonth = quarter * 3;
  return new Date(fullYear, lastMonth, 0);
}

export function sortByDate(arr) {
  if (!Array.isArray(arr)) return [];
  return [...arr].sort((a, b) => new Date(a.date) - new Date(b.date));
}

export function formatNumber(val, digits = 1) {
  if (val == null || Number.isNaN(Number(val))) return "—";
  return Number(val).toFixed(digits);
}
