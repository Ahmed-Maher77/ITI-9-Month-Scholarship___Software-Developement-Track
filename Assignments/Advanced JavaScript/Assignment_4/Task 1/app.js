// selectors
const paragraph = document.querySelector('p');
const fontFamilyRadios = document.querySelectorAll('input[name="font-family"]');
const textAlignRadios = document.querySelectorAll('input[name="text-align"]');
const lineHeightRadios = document.querySelectorAll('input[name="line-height"]');
const letterSpacingRadios = document.querySelectorAll('input[name="letter-spacing"]');


// Main function calls
handleRadioChange(fontFamilyRadios, ['font-arial', 'font-times']);
handleRadioChange(textAlignRadios, ['text-left', 'text-center', 'text-right']);
handleRadioChange(lineHeightRadios, ['line-height-normal', 'line-height-10', 'line-height-15', 'line-height-1_5']);
handleRadioChange(letterSpacingRadios, ['letter-spacing-normal', 'letter-spacing--1', 'letter-spacing-2', 'letter-spacing-3']);


function handleRadioChange(radioNodeList, classArray) {
    // loop through the group
    for (const radio of radioNodeList) {
        if (radio.checked) {
            // initial check
            handleChange(radio, classArray);
        }
        // when change happens
        radio.addEventListener("change", function() {
            handleChange(radio, classArray);
        })
    }
}




function handleChange(targetElement, classArray) {
    if (!(paragraph.classList.contains(targetElement.value))) {
        // remove previous class
        removePreviousClasses(classArray);
        // add the new class
        paragraph.classList.add(targetElement.value);
    }
}

function removePreviousClasses(classArray) {
    for (const className of classArray) {
        paragraph.classList.remove(className);
    }
}