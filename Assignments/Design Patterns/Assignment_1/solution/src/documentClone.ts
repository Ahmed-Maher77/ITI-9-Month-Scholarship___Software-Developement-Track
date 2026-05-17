function Document(
  this: any,
  header: string,
  footer: string,
  pages: number[],
  text: string
) {
  this.header = header;
  this.footer = footer;
  this.pages = pages;
  this.text = text;
}

Document.prototype.clone = function () {
  return new (Document as any)(
    this.header,
    this.footer,
    [...this.pages],
    this.text
  );
};


const originalDocument = new (Document as any)(
  "Company Header",
  "Company Footer",
  [1, 2, 3],
  "Original Content"
);

const copiedDocument = originalDocument.clone();

copiedDocument.text = "Modified Copy Content";

console.log(originalDocument);
console.log(copiedDocument);