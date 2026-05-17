function Document(header, footer, pages, text) {
    this.header = header;
    this.footer = footer;
    this.pages = pages;
    this.text = text;
}
Document.prototype.clone = function () {
    return new Document(this.header, this.footer, [...this.pages], this.text);
};
const originalDocument = new Document("Company Header", "Company Footer", [1, 2, 3], "Original Content");
const copiedDocument = originalDocument.clone();
copiedDocument.text = "Modified Copy Content";
console.log(originalDocument);
console.log(copiedDocument);
export {};
//# sourceMappingURL=documentClone.js.map