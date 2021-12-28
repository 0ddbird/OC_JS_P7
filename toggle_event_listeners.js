let option = 'add';
let option = 'remove';

function toggleLightboxListeners(option) {
    const DOMElement = document.body
    let eventMethod = (element) => element[`${option}EventListener`]
    eventMethod(DOMElement)('click', callbackFunction, false);
}

function callbackFunction() {
    return;
}