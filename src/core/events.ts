import { searchParameters } from './index.js'
const controls = [document.getElementById('ingredients-controls')!, document.getElementById('appliances-controls')!, document.getElementById('ustensils-controls')!]
const searchbar = (<HTMLInputElement>document.getElementById('searchbar'))

export function addEventListeners (): void {
    controls.forEach(control => control.addEventListener('click', expandList))
    controls.forEach(control => control.addEventListener('focusout', hideList))
    searchbar!.addEventListener('keyup', handleKeyUp)
}

function expandList (evt: Event): void {
    const target = <HTMLElement>evt.target!
    const category = target.dataset.type
    const comboboxDOM = {
        combobox: document.getElementById(`${category}-combobox`)!,
        controls: document.getElementById(`${category}-controls`)!,
        button: document.getElementById(`${category}-btn`)!,
        list: document.getElementById(`${category}-list`)!
    }
    const listArray: Element[] = [].slice.call(comboboxDOM.list.children)

    if (evt.target === comboboxDOM.button) {
        // console.log(`${category}-btn clicked`)
        comboboxDOM.list.classList.add('expanded')
    }

    listArray.forEach(element => element.addEventListener('click', selectTag))
}

function selectTag (e: Event): void {
    console.log(e.target)

    console.log(<Element>e.target!.dataset.category)
    searchParameters[`${e.target.dataset.category}`].push(e.target.dataset.name)
    console.log(searchParameters)
}

function hideList (evt: Event): void {
    const target = <HTMLElement>evt.target!

    const category = target.dataset.type
    const comboboxDOM = {
        combobox: document.getElementById(`${category}-combobox`)!,
        controls: document.getElementById(`${category}-controls`)!,
        button: document.getElementById(`${category}-btn`)!,
        list: document.getElementById(`${category}-list`)!
    }
    comboboxDOM.list.classList.remove('expanded')
    comboboxDOM.list.classList.add('hidden')
}

function handleKeyUp ():void {
    // Note : prevent other keys than [AZ-az, space] to trigger search
    if (searchbar.value.length >= 3) {
        console.log('3 or more characters in searchbar:', searchbar.value)
    }
}
