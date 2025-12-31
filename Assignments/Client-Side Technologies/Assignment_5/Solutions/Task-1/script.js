const message = prompt("Enter a message: ");
showMsg(message);

// Show message on the page in different headings
function showMsg(msg) {
    if (msg == "" && msg == null) {     // no message
        document.write("No message");
    } else {
        printHeadings(msg);
    }
}
// Print message in different headings
function printHeadings(msg) {
    for (let i = 0; i < 6; i++) {
        let headTag = "<h" + (i + 1) + ">";
        let msgBody = headTag + msg + headTag;
        document.write(msgBody);
    }
}
