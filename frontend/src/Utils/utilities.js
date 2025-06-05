export const getRandomBrightColor = () => {
    const hue = Math.floor(Math.random() * 360);
    const saturation = 100;
    const lightness = 50 + Math.floor(Math.random() * 20);
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
export const formatLabel = (label) => {
    return label
        .replace(/_/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase())
}
export const formatDateToShortMonthYear = (dateStr) => {
    const date = new Date(dateStr);
    const options = { month: 'short' };
    const month = new Intl.DateTimeFormat('en-US', options).format(date);
    const year = String(date.getFullYear()).slice(-2);
    return `${month} '${year}`;
}