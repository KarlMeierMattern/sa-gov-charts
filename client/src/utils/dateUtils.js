/**
 * Converts a quarter-based date string (e.g., "Q3/24" or "Q1/25") to a JavaScript Date object.
 * The date will be set to the last day of the quarter.
 *
 * @param {string} quarterStr - The quarter string in format "QX/YY" where X is 1-4 and YY is the year
 * @returns {Date} A Date object representing the last day of the specified quarter
 * @throws {Error} If the input string is not in the correct format
 */
export function quarterToDate(quarterStr) {
  // Validate input format
  const match = quarterStr.match(/^Q([1-4])\/(\d{2})$/);
  if (!match) {
    throw new Error(
      'Invalid quarter format. Expected format: "QX/YY" (e.g., "Q3/24")'
    );
  }

  const [, quarter, year] = match;
  const fullYear = 2000 + parseInt(year, 10); // Convert YY to YYYY

  // Calculate the last month of the quarter
  const lastMonth = quarter * 3; // Q1=3, Q2=6, Q3=9, Q4=12

  // Create date for the last day of the quarter
  const date = new Date(fullYear, lastMonth, 0); // 0th day of next month = last day of current month

  return date;
}

/**
 * Formats a Date object to a quarter string (e.g., "Q3/24")
 *
 * @param {Date} date - The date to format
 * @returns {string} The quarter string in format "QX/YY"
 */
export function dateToQuarter(date) {
  const month = date.getMonth() + 1; // JavaScript months are 0-based
  const quarter = Math.ceil(month / 3);
  const year = date.getFullYear().toString().slice(-2);

  return `Q${quarter}/${year}`;
}
