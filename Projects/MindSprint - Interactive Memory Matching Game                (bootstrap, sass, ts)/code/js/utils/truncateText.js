// Truncates long text and appends ellipsis when it exceeds maxLength.
function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
        return text;
    }
    else {
        return text.slice(0, maxLength - 3) + "...";
    }
}
export default truncateText;
//# sourceMappingURL=truncateText.js.map