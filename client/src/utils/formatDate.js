export function formatDate(timestamp) {
    const date = new Date(timestamp); // Convert timestamp to Date object

    return date.toLocaleString()
}