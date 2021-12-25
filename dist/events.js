const controls = [document.getElementById('ingredients-controls'), document.getElementById('appliances-controls'), document.getElementById('ustensils-controls')];
const searchbar = document.getElementById('searchbar');
export function addEventListeners() {
    controls.forEach(control => control.addEventListener('click', expandList));
    controls.forEach(control => control.addEventListener('focusout', hideList));
    searchbar.addEventListener('keyup', handleKeyUp);
}
function expandList(evt) {
    const target = evt.target;
    const category = target.dataset.type;
    const comboboxDOM = {
        combobox: document.getElementById(`${category}-combobox`),
        controls: document.getElementById(`${category}-controls`),
        button: document.getElementById(`${category}-btn`),
        list: document.getElementById(`${category}-list`)
    };
    if (evt.target === comboboxDOM.button) {
        console.log(`${category}-btn clicked`);
        comboboxDOM.list.classList.add('expanded');
    }
}
function hideList(evt) {
    const target = evt.target;
    const category = target.dataset.type;
    const comboboxDOM = {
        combobox: document.getElementById(`${category}-combobox`),
        controls: document.getElementById(`${category}-controls`),
        button: document.getElementById(`${category}-btn`),
        list: document.getElementById(`${category}-list`)
    };
    comboboxDOM.list.classList.remove('expanded');
    comboboxDOM.list.classList.add('hidden');
}
function handleKeyUp() {
    // Note : prevent other keys than [AZ-az, space] to trigger search
    if (searchbar.value.length >= 3) {
        console.log('3 or more characters in searchbar:', searchbar.value);
    }
}
