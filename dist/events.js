import { addTag } from './factory/tagselect.js'
import { searchParameters } from './index.js'
import { updateResults } from './search.js'

const controls = [document.getElementById('ingredients-controls'), document.getElementById('appliances-controls'), document.getElementById('ustensils-controls')]
const searchbar = document.getElementById('searchbar')
export function addEventListeners () {
    controls.forEach(control => control.addEventListener('click', expandList))
    controls.forEach(control => control.addEventListener('focusout', (evt) => {
        const combobox = evt.target.parentNode.parentNode
        const category = evt.target.dataset.type
        const comboboxDOM = {
            combobox: document.getElementById(`${category}-combobox`),
            controls: document.getElementById(`${category}-controls`),
            button: document.getElementById(`${category}-btn`),
            list: document.getElementById(`${category}-list`)
        }

        if (!combobox.contains(evt.relatedTarget)) {
            hideList(comboboxDOM.list)
        }
    }))
    searchbar.addEventListener('keyup', handleKeyUp)
}

function expandList (evt) {
    const target = evt.target
    const category = target.dataset.type
    const comboboxDOM = {
        combobox: document.getElementById(`${category}-combobox`),
        controls: document.getElementById(`${category}-controls`),
        button: document.getElementById(`${category}-btn`),
        list: document.getElementById(`${category}-list`)
    }
    const listArray = [].slice.call(comboboxDOM.list.children)
    if (evt.target === comboboxDOM.button) {
        console.log('is comboboxDOM button')
        comboboxDOM.list.classList.toggle('hidden')
    }
    listArray.forEach(element => element.addEventListener('click', selectTag))
}

function hideList (list) {
    list.classList.toggle('hidden')
}

function handleKeyUp () {
    // Note : prevent other keys than [AZ-az, space] to trigger search
    if (searchbar.value.length < 3 && searchParameters.textSearch.length > 0) {
        searchParameters.textSearch = ''
        updateResults()
    }

    if (searchbar.value.length >= 3) {
        searchParameters.textSearch = searchbar.value
        updateResults()
    }
}

function selectTag (e) {
    const category = e.target.dataset.category
    const name = e.target.dataset.name
    searchParameters[`${category}`].push(name)
    addTag(name, category)
    hideList(document.getElementById(`${category}-list`))
    updateResults()
}
