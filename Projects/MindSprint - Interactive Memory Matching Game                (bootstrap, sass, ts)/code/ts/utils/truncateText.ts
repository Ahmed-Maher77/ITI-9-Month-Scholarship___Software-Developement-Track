// Truncates long text and appends ellipsis when it exceeds maxLength.
function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
        return text;
    } else {
        return text.slice(0, maxLength - 3) + "...";
    }
}



export default truncateText;