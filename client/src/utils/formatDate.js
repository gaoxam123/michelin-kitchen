export function formatDate(timestamp) {
    const date = new Date(timestamp); // Convert timestamp to Date object

    // const day = String(date.getDate()).padStart(2, "0"); // Add leading zero if needed
    // const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    // const year = date.getFullYear();

    return date.toLocaleString()
}