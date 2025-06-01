export const formatLabel = (label) => {
    return label
        .replace(/_/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase())
}