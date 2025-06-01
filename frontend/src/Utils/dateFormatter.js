export function formatDateToShortMonthYear(dateStr) {
    const date = new Date(dateStr);
    const options = { month: 'short' };
    const month = new Intl.DateTimeFormat('en-US', options).format(date);
    const year = String(date.getFullYear()).slice(-2);
    return `${month} '${year}`;
}