export function formatDate(dateString: string) {
    const date = new Date(dateString);

    return isNaN(date.getTime())
        ? dateString
        : date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
}